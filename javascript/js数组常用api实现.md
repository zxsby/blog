# js数组常用api实现

```js
//   callback
      // 生成新数组元素的函数，使用三个参数：
      // currentValue
      // callback 数组中正在处理的当前元素。
      // index可选
      // callback 数组中正在处理的当前元素的索引。
      // array可选
      // map 方法调用的数组。
// thisArg可选
      // 执行 callback 函数时值被用作this
  Array.prototype.map = function(callback,thisArg){
    let length = this.length
    let A = new Array(length)
    for(let k = 0; k < length; i++){
      let mapResultValue = callback.call(thisArg,A[k],k,A)
      A.push(mapResultValue)
    }
    return A
  }
```

```js
Array.prototype.reduce = function(callback,initValue){
  let k = 0,preSum=initValue,curVal
  if(initValue === undefined){
    preSum = this[k++]
  }
  for(,k<this.length;i++){
    preSum = callback.call(undefined,preSum,this[k])
  }
  return preSum
}
```
