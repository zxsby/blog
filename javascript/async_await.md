# async_await

async是Generator函数的语法糖，并对Generator函数进行了改进

async的实现就是将Generator 函数和自动执行器，包装在一个函数里。

```js
  async function fn(args) {
    // ...
  }

  // 等同于
  function fn(args) {
    return spawn(function* () {
      // ...
    });
  }
```

```js
function spawn(genF){
  return new Promise((resolve,reject) => {
    const gen = genF();//执行generator函数，拿到遍历器对象
    function step(nextF){
      let next;
      try{
        next = nextF()
      }catch(e){
        reject(e)
      }
      if(next.done){//是否全部执行完
        return resolve(next.value)
      }
      //next.value包装为promise，以兼容yield后面跟基本类型的情况
      Promise.resolve(next.value).then((res) => {
        step(()=>{return gen.next(res)})
      },(err) => {
        step(()=>{return gen.thorw(err)})
      })
    }
    step(()=>{return gen.next()})
  })
}

```
