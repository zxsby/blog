import { isArray, isIntegerKey } from "@vue/shared/src";

import { TriggerOrTypes } from "./operators";

export function effect(fn,options:any={}) {
  //需要让这个effect变成响应式的effect,可以做到数据变化重新执行
  const effect = createReactiveEffect(fn, options)

  if(!options.lazy){
    effect() //响应事的effect默认会先执行一次
  }
  return effect
}


let uid = 0
let activeEffect; //存储当前的effect
const effectStack = []
function createReactiveEffect(fn, options){
  const effect = function reactiveEffect(){
    if(!effectStack.includes(effect)){//保证effect没有加入到effectStack
      try{
        effectStack.push(effect)
        activeEffect = effect
        return fn() //函数执行时会去取值,会去执行get方法
      }finally{
        effectStack.pop()
        activeEffect = effectStack[effectStack.length-1]
      }
    }
  }
  effect.id = uid++; //制作一个effect标识，用于区分effect
  effect._isEffect = true; // 用于标识这个是响应式的effect
  effect.row = fn; // 保留effect对应的原函数
  effect.options = options; //在effect上保存用户的属性
  return effect
}

const targetMap = new WeakMap()
// 让某个对象中的属性 收集当前它对应的effect函数
export function track(target,type,key) {
  if(activeEffect === undefined){
    return
  }
  let depsMap = targetMap.get(target)
  if(!depsMap){
    targetMap.set(target,(depsMap = new Map))
  }
  let dep = depsMap.get(key)
  if(!dep){
    depsMap.set(key,(dep = new Set))
  }
  if(!dep.has(activeEffect)){
    dep.set(activeEffect)
  }
}



//找属性对的effect让其执行
export function trigger(target,type,key?,newValue?,oldValue?){
  //如果这个属性没有收集过effect，则不需要任何操作
  const depsMap = targetMap.get(target)
  if(!depsMap) return
  const effects = new Set(); // 用于存放需要更新的effect，并去重，最后一起执行

  const add = (effectsToAdd) => {
    if(effectsToAdd){
      effectsToAdd.forEach(effect => effects.add(effect))
    }
  }
  //1.看修改的是不是数组的长度 因为改长度影响比较大
  if(key === 'length' && isArray(target)){
    // 如果对应的长度 也有依赖收集则需要更新
    depsMap.forEach((dep,key) => {
      if(key === 'length'|| key > newValue){// 如果修改的长度，小于收集的索引，则这个收集的索引也需要触发它收集的effect重新执行
        add(dep)
      }
    })
  }else{
    // 可能是对象
    if(key !==undefined){
      add(depsMap.get(key))
    }
    //如果修改的是数组中的某一个索引，该索引未被收集,单数组有被收集则可以通过触发数组长度的更新
    switch(type){
      case TriggerOrTypes.ADD:
        if(isArray(target) && isIntegerKey(key)){
          add(depsMap.get('length'))
        }
    }
  }
  effects.forEach((effect:any)=>effect())
}
