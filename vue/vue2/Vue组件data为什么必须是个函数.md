# Vue组件data为什么必须是个函数？
- 每次使用组件时都会对组件进行实例化操作,并且调用data函数返回一个对象作为组件的数据源。这样可以保证多个组件间数据互不影响

```js
function Vue() {}
function Sub() { //会将data存起来
console.log(this.constructor.options)
  this.data = this.constructor.options.data
}
Vue.extend = function(options) {
  Sub.options = options
  return Sub
}
let Child = Vue.extend({
  data:{name:'xxx'}
})
let Child1 = new Child()
let Child2 = new Child()
console.log(Child1.data.name);
Child1.data.name = 'jw';
console.log(Child2.data.name);
```
`源码位置：src/core/util/options.js:121 data的合并策略`

```js
  strats.data = function (
  parentVal: any,
  childVal: any,
  vm?: Component
): ?Function {
  if (!vm) { // 组件在合并时并没有产生实例，所以会校验类型
    if (childVal && typeof childVal !== 'function') {
      process.env.NODE_ENV !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
     )
      return parentVal
   }
    return mergeDataOrFn(parentVal, childVal)
 }
  return mergeDataOrFn(parentVal, childVal, vm)
}
```
```js
/**
 * Data
 */
export function mergeDataOrFn (
  parentVal: any,
  childVal: any,
  vm?: Component
): ?Function {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData( // 合并两个对象
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      const instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal
      const defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal
      if (instanceData) {
        return mergeData(instanceData, defaultData) // 合并两个对象
      } else {
        return defaultData
      }
    }
  }
}
```

```js
/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to: Object, from: ?Object): Object {
  if (!from) return to
  let key, toVal, fromVal

  const keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from)

  for (let i = 0; i < keys.length; i++) {
    key = keys[i]
    // in case the object is already observed...
    if (key === '__ob__') continue
    toVal = to[key]
    fromVal = from[key]
    if (!hasOwn(to, key)) {
      set(to, key, fromVal)
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal) // 递归合并属性
    }
  }
  return to
}
```
