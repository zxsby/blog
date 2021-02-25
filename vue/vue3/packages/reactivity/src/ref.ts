//ref 和 reactive的区别 reactive内部采用了proxy ref中内部采用的是definedProperty

import { TrackOpTypes, TriggerOrTypes } from "./operators"
import { hasChanged, isArray, isObject } from "@vue/shared/src"
import { track, trigger } from "./effect"

import { reactive } from "./reactive"

export function ref(value){ // value是一个普通类型,但也可以是对象，但是一般情况下是对象直接用reactive更合理
    //将普通类型 变成一个对象
    return createRef(value)
}

export function shallowRef(value){
  return createRef(value,true)
}
const convert = (val) => isObject(val)?reactive(val):val
class RefImpl {
  public _value //表示声明了一个_value属性 但是没有赋值
  public _v_isRef = true //表示是一个ref属性
  constructor(public rawValue,public shallow){ // 参数中前面增加修饰符 标识此属性放到实力上
    this._value =  shallow ? rawValue : convert(rawValue)// 如果是深度的 需要把里面的都变成响应式的
  }
  //类的属性访问器
  get value(){
    track(this,TrackOpTypes.GET,'value')
    return this._value
  }
  set value(newValue){
    if(hasChanged(newValue,this.rawValue)){ // 判断老值和新值是否发生变化
      this.rawValue = newValue
      this._value = this.shallow ? newValue : convert(newValue)// 如果是深度的 需要把里面的都变成响应式的
      trigger(this,TriggerOrTypes.SET,'value',newValue)
    }
  }
}
function createRef(rawValue,shallow = false){
  return new RefImpl(rawValue,shallow)
}

class ObjectRefImpl {
  public _v_isRef = true
  constructor(public target,public key){
  }
  get value(){
    return this.target[this.key]
  }
  set value(newValue){
    this.target[this.key] = newValue
  }
}

export function toRef(target,key){ //可以将一个对象的属性变成ref
  return new ObjectRefImpl(target,key)
}


export function toRefs(object){//object 可能传递的是一个数组或者对象
  const ret = isArray(object)?new Array(object.length):{}
  for(let key in object){
    ret[key] = toRef(object,key)
  }
  return ret
}
