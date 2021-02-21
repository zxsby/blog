## instanceof

instanceof: 用来检测某个实例是否属于这个类

    实例instanceof类，属于返回true，不属于返回false
    局限性:要求检测的实例必须是对象数据类型的,基本数据类型的实例是无法基于它检测出来的


基本数据类型在JS中的特殊性
  - 一定是自己所属类的实例
  - 但是不一定是对象数据类型的
```js
  console.log(1 instanceof Number); // false
```

```js
  let person = function(){}
  let nicole = new person();
  nicole instanceof person
```

instaceof 也可以判断一个实例是否是其父类型或者祖先类型的实例
```js
  let person = function(){}
  let programmer = function(){}
  programmer.prototype = new person()
  let nicole = new programmer()
  nicole instanceof person // true
  nicole instanceof programmer // true
```

`自己实现`

```js
function new_instance_of(leftValue,rightValue) {
  let rightProto = rightValue.prototype;//取右边表达式的prototype值
  leftValue = l
}
```
