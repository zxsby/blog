//实现new Proxy

import { TrackOpTypes, TriggerOrTypes } from "./operators"
import { extend, hasChanged, hasOwn, isArray, isIntegerKey, isObject } from "@vue/shared/src"
import { reactive, readonly } from "./reactive"
import { track, trigger } from "./effect"

//是不是仅读的，仅读的属性set会报异常
//是不是深度的
function createGetter(isReadonly = false, shallow = false) { // 拦截获取功能
  return function get(target, key, receiver){
    //proxy + reflect
    // 后续Object上的方法，会被迁移到Reflect上
    // 以前target[key] = value 方式设置值可能会失败，并1不会报异常，也没有返回值标识
    //Reflect具备返回值
    const res = Reflect.get(target, key, receiver)// === target[key]

    if(!isReadonly){
      //如果不是仅读的，需要收集依赖，数据变化后更新对应的视图
      track(target,TrackOpTypes.GET,key)
    }
    if(shallow){ // 如果是浅的直接返回
      return res
    }
    if(isObject(res)){ // 不是浅的递归收集依赖
      //vue2 是一上来就递归, vue3 是当取值时会进行代理。vue3的代理模式是懒代理
      return isReadonly ? readonly(res) : reactive(res)
    }

    return res
  }
}
function createSetter(shallow = false) { // 拦截设置功能
  return function set(target, key, value, receiver){
    const oldValue = target[key]; //获取老的值
    let hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length:hasOwn(target,key) //判断新增还是修改
    const result = Reflect.set(target,key,value,receiver)
    //我们要区分是新增还是修改 vue2里无法监控更改索引，无法监控数组的长度变化=》
    if(!hadKey){
      //新增
      trigger(target,TriggerOrTypes.ADD,key,value)
    }else if(hasChanged(oldValue,value)){
      //修改
      trigger(target,TriggerOrTypes.SET,key,value,oldValue)
    }
    //当数据更新时 通知对应属性的efact重新执行
    return result
  }
}

const get = createGetter() //不是仅读的 不是浅的
const shallowGet = createGetter(false,true) // 不是仅读的，是浅的
const readonlyGet = createGetter(true) // 是仅读的，不是浅的
const shallowReadonlyGet = createGetter(true,true) // 是仅读的，是浅的

const set = createSetter()
const shallowSet = createSetter()


export const mutableHandlers = {
  get,
  set
}
export const shallowReactiveHandlers={
  get: shallowGet,
  set: shallowSet
}

let readonlyObj = {
  set:(target,key) => {
    console.warn(`xxxx`)
  }
}
export const readonlyHandlers = extend({
  get: readonlyGet
},readonlyObj)

export const shallowReadonlyHandlers =extend({
  get: shallowReadonlyGet
},readonlyObj)
