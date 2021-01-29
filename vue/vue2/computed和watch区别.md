# computed和watch区别
- computed 和 watch 都是基于Watcher来实现的
- computed 属性具备缓存功能，依赖的值不发生变化,对其取值的计算属性方法不会重新执行
- watch则是监控值得变化,当值发生变化时调用对应得回调函数

      src/core/instance/state.js:58

      src/core/instance/state.js:241 计算属性取值函数

      src/core/instance/state.js:345 watch的实现

### 1.computed
```js
function createComputedGetter (key) {
  return function computedGetter () {
    const watcher = this._computedWatchers &&
this._computedWatchers[key]
    if (watcher) {
      if (watcher.dirty) { // 如果值是脏的 进行求值操作
        watcher.evaluate()
     }
      if (Dep.target) { // 让计算属性所依赖的属性 收集渲染watcher
      watcher.depend()
     }
      return watcher.value
   }
 }
}
```
### 1.watcher
```js
Vue.prototype.$watch = function (
expOrFn: string | Function,
cb: any,
options?: Object
): Function {
    const vm: Component = this
    if (isPlainObject(cb)) {
        return createWatcher(vm, expOrFn, cb, options)
   }
    options = options || {}
    options.user = true // 标记为用户watcher
    const watcher = new Watcher(vm, expOrFn, cb, options)
}

```
