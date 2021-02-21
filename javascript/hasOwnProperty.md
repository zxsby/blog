# hasOwnProperty
检测某一个属性名是否为当前对象的私有属性
'in':检测这个属性是否属于某个对象(不管是私有属性还是公有属性,只要是它的属性，结果就为TRUE)
```js
let ary = [10,20,30];
console.log('0' in ary);
console.log('push' in ary);
```
