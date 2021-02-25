## js中的类型转化的规则
```js

//如果每有Symbol.toPrimitive先调valueOf 如果valueOf返回的不是一个原始数据类型，则接着取调toString方法
let obj = {
  [Symbol.toPrimitive](){
    return 500
  },
  valueOf(){
    return 100 //{}
  },
  toString(){
    return 200
  }
}
console.log(true+obj) // 101
```


```js
//比较运算 > = <
console.log('a'<'b') // 会调用"a".charCodeAt(0),"b".charCodeAt(0)
console.log(1<'b'); //如果不能转换成数字返回false
console.log(undefined==0); //null和undefined和其它类型比较都返回的是false
console.log(undefined==null);//true
console.log(NaN==NaN);//NaN任何类型比较都不相等
```
