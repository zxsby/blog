
# `$nextTick`实现原理

✨利用了浏览器事件环原理,微任务队列在`宏任务执行之后`,`ui渲染前`执行并清空队列

✨同时采用了`防抖节流`的原理,多次触发只执行一次

    判断当前环境支持哪些`微任务`,如果没有这采用`setImmediate(ie),setTimout`(宏任务)
    vue中响应式更新操作都是异步的，也是利用了`$nextTick`


```js
let waiting = false; //状态标记
let callbacks = []; //需要执行的异步函数

function timer(flushCallbacks){
  let timerFn;
  if(Promise){
    timerFn=()=>{
      Promise.resolve().then(flushCallbacks)
    }
  } else if (MutationObserver) {
    let textNode = document.createTextNode(1);
    let observe = new MutationObserver(flushCallbacks)
    observe.observe(textNode, {
        characterData: true
    })
    timerFn = () => {
        textNode.textContent = 3;
    }
    //微任务
  }else if(setImmediate){
      timerFn = () => {
        setImmediate(flushCallbacks)
      }
  } else {
      timerFn = () => {
          setTimeout(flushCallbacks)
      }
  }
  timerFn()
}

function flushCallbacks(){
  callbacks.forEach(cb => cb())
  waiting = false
}
// 微任务是在页面渲染前执行 此时取的是内存中的dom,不关心ui渲染完毕没有
function nextTick(cb){
  callbacks.push(cb); // flushSchedulerQueue / userCallback
  if(!waiting){
    timer(flushCallbacks)
    waiting = true
  }
}

```
