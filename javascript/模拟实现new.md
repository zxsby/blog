# 模拟实现一个new

```js
function mockNew(){
  let constructor = [].shift.call(arguments);//拿到构造函数
  let obj = {};//创建返回对象
  obj.__proto__ = constructor.prototype
  let result = constructor.apply(obj,arguments);//把剩余的参数传入，并执行
  return result instanceof Object ? result : obj ; //如果构造函数返回的是引用类型则返回该引用类型
}
```
