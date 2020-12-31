# let 和 var 的区别

  ✨let不存在`变量xin提升`(当前作用域中,不能在let声明前使用变量)

  ✨同一作用域中,let不允许`重复声明`

  ✨let解决了typeof的一个`暂时性死区`问题

  ✨全局作用域中,使用let声明的变量并没有给`window`加上对应的属性

  ✨let会存在`块作用域`(除对象以外的大括号都可被看做块级`私有作用域`)
______

# 箭头函数

  ✨箭头函数中的`this`永远指向所处环境的`上下文`

### `call/bind/appaly` 不能改变箭头函数中的`this指向`

  ```js
    window.name = "window";
    let fn = n => {
      console.log(this.name)
    }; // 所处执行上下文中的this指向window
    let obj = {
      name: '彭于晏',
      fn: fn
    };
    fn(10); // => this:window / 'window'
    fn.call(obj, 10); // this:window 不是我们预期的obj / 'window'
    obj.fn(10); // this:window 不是我们预期的obj / 'window'
    document.body.onclick = fn; // this:window 不是我们预期的document.body(BODY) / 'window'
  ```

  ```js
    let obj = {
      name: '彭于晏',
      fn: function () {
        // => this:obj 当前普通函数中的this指向obj
        let f = () => {
          console.log(this) // => this:obj
        }
        f()
        return f
      }
    };
    let f = obj.fn()
    f() // => this:obj
  ```

### 箭头函数的利用

```js
  let obj = {
    name: '彭于晏',
    fn: function () {
      // => this:obj 当前普通函数中的this指向obj
      // => 原本期望的需求是在1s后把obj中的name改为'sby'

      /* setTimout(function()=>{
        console.log(this) // this => window
        this.name = 'sby' // window.name = 'sby'
      },1000) */

     /* let that = this  // 把需要的this保存起来
      setTimout(function()=>{
        console.log(that) // this => window
        that.name = 'sby'
      },1000) */

      setTimout(()=>{
        console.log(that) // this => obj
        that.name = 'sby'
      },1000)
    }
  };
  obj.fn()

```
