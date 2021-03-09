# eval 和 new Function 的区别

    eval和new Function都可以动态解析和执行字符串
    但是它们对解析内容的运行环境判定不同。


## eval
    eval中的代码执行时的作用域会为当前作用域
```js
var a = 'global a'
function fn(){
  var a = 'fn a'
  eval('console.log(a)');// fn a
}
```

## new Function
    new Function 中代码执行时的作用域是全局，不论它的在哪个地方调用的。所以它访问的是全局变量a。它根本无法访问b函数内的局部变量。
    但可以使用width+new Function来改变
```js
var a = 'global a'
function fn(){
  var a = 'fn a'
  (new Function('','console.log(a)'))() // global
}
```

```js
var a = 'global a'
function fn(){
  var a = 'fn a'
  let obj = {
     a:'fn a'
  }
  createVdom(obj,'console.log(a)')
}
function createVdom(vm, code) {
  const f = new Function('vm', `with(vm){return ${code}}`)
  return f(vm)
}
```
