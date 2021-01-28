# 为什么useState要使用数组而不是对象?

### 1.useState

```js
  const [num,setNum] = useState(0)
```

`useState运用了JS解构赋值的思想`

    数组和对象解构赋值的区别：

    - 数组的元素是按次序排列的,数组解构时变量的取值由数组元素的位置决定,变量名可以任意命名。

    - 数组的元素是按次序排列的,数组解构时变量的取值由元素的位置决定,变量名可以任意命名。

    - 对象的属性则没有次序,解构时变量名必须与属性同名才能取到正确的值

    - 因此使用数组会更灵活,可以任意命名state和修改state的方法

### 2.之所以使用数组的原因 因为useState内部原理把state声明成一个数组,需要顺序一一对应

```js
  function Com(){
    const [num,setNum] = useState(0)
    return (
      <div className="num">
        <p>{num}</p>
        <p>
          <button onClick={()=>setNum(num+1)}>增加<button>
        </p>
      </div>
    )
  }
```
每点击一次button,num就会增加1,组件就会重新render

### 3.自己实现useState代码

`1.初版代码`
```js
  let _state; //全局_state用来存储state的值,避免重新渲染的时候被useState重置为初始值
  const useState = initialValue => {
    _state = _state === undefined ? initialValue:_state
    const setState=(newValue)=>{
      _state = newValue
      render()
    }
    return [_state,setState]
  }
```
上面的方案用一个useState还可以,如果一个组件有多个useState,由于数据都放在_state里面,所以会有冲突 改进的地方,把_state修改为数组,比如_state=[]

`2.改进代码`

```js
let _state = [];//全局_state用来存储state的值,避免重新渲染的时候被useState重置为初始值
let index = 0;
const useState = initialValue => {
  const currentIndex = index;
  _state[currentIndex] = _state[currentIndex] === undefined ? initialValue:_state[currentIndex];
  const setState = (newValue)=>{
    _state[currentIndex] = newValue
    render()
  }
  index +=1

  return [_state[currentIndex], setState]
}
```
## 结论：

- `[state,setState] = useState(initialValue)`返回一个包含两个元素的数组:`状态值`和`状态更新函数`
- 内部原理是吧state声明成一个数组,需要顺序一一对应
- 由于一个组件可以使用多个useState,为了避免冲突并确保state的准确性,useState中全局state要使用数组而不是对象
