#  vue中set方法实现
`当修改的是数组的时候，调用重写过的splice方法来触发跟新视图---2`

`当修改的是对象，且key在对象中已经在data中监测过，则直接修改即可---3`

`当修改的是对象，且key在对象中没有定义，及未被检测过，则通过defineReactive来添加响应式---6`
```js
export function set (target: Array | Object, key: any, val: any): any {
    // 1.是开发环境 target 没定义或者是基础类型则报错
    if (process.env.NODE_ENV !== 'production' &&
        (isUndef(target) || isPrimitive(target))
    ) {
        warn(`Cannot set reactive property on undefined, null, or primitive value: ${(target: any)}`)
    }
    // 2.如果是数组 Vue.set(array,1,100); 调用我们重写的splice方法 (这样可以更新视图)
    if (Array.isArray(target) && isValidArrayIndex(key)) {
        target.length = Math.max(target.length, key)
        target.splice(key, 1, val)
        return val
    }
    // 3.如果是对象本身的属性，则直接添加即可
    if (key in target && !(key in Object.prototype)) {
        target[key] = val
        return val
    }
    const ob = (target: any).__ob__
    // 4.如果是Vue实例 或 根数据data时 报错
    if (target._isVue || (ob && ob.vmCount)) {
        process.env.NODE_ENV !== 'production' && warn(
        'Avoid adding reactive properties to a Vue instance or its root $data ' +
        'at runtime - declare it upfront in the data option.'
        )
        return val
    }
    // 5.如果不是响应式的也不需要将其定义成响应式属性
    if (!ob) {
        target[key] = val
        return val
    }
    // 6.将属性定义成响应式的
    defineReactive(ob.value, key, val)
    // 7.通知视图更新
    ob.dep.notify()
    return val
}
```
