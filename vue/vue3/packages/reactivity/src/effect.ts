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
