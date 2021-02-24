# map 和普通对象
    Map对象保存键值对,并且能够记住键的原始插入顺序。
1.Map对象可以迭代，对象则需要object.keys/object.values/for...in /object.entries()

```js
 // object.entries() 返回一个给定对象自身可枚举属性的键值对数组
 let obj = {
   a:1,
   b:2,
   c:3
 }
 Object.entries(obj)// [['a',1],['b',2],['c',3]]
```

2.Map的键可以是任意值(函数，对象，任意基本类型)。Object的键必须是一个String或者Symbol

3.Map的键值对个数可以通过size直接获取，Object的键值对个数则需要手动计算

```js
  //Map api
  Map.clear()//清空所有键值对
  Map.delete(key)//删除map中指定key的键值对，如果map中存在该元素，则返回true，如果不存在则返回false
  Map.entries()//类似Object.entries返回Map对象中每个元素的[key,value]的数组
  Map.forEach(cb)//同数组的forEach
  Map.get(key)//返回key对应的值，如果不存在，则返回undefined
  Map.has(key)//返回boolean值，验证是否有对应key的键值对
  Map.values()
```
Map为什么可能会造成内存泄漏

- 在 JavaScript 里，map API 可以通过使其四个 API 方法共用两个数组(一个存放键,一个存放值)来实现。给这种 map 设置值时会同时将键和值添加到这两个数组的末尾。从而使得键和值的索引在两个数组中相对应。当从该 map 取值的时候，需要遍历所有的键，然后使用索引从存储值的数组中检索出相应的值。

-但这样的实现会有两个很大的缺点，首先赋值和搜索操作都是 O(n) 的时间复杂度( n 是键值对的个数)，因为这两个操作都需要遍历全部整个数组来进行匹配。另外一个缺点是可能会导致内存泄漏，`因为数组会一直引用着每个键和值。这种引用使得垃圾回收算法不能回收处理他们，即使没有其他任何引用存在了`。

# weakMap
    weakMap的key只能是Object类型,原始数据类型不能作为key
    weakMap持有的是每个键对象的“弱引用”，这意味着在没有其他引用存在时垃圾回收能正确进行
    WeakMap 的 key 是不可枚举的 (没有方法能给出所有的 key)

weekMap的弱引用
进行中
