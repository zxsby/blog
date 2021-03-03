# history和hash两种路由

## 1.hash模式

使用window.location.hash属性及窗口的onhashchange事件实现
可以通过location.hash来获取和设置hash值
```js
  window.addEventListener('hashChange',() => {
    let pathName = window.location.hash.slice(1)
  })
```

## 2.history模式

- window.history属性指向History对象，它表示当前窗口的浏览历史,当发生改变时，只会改变页面的路径，不会刷新页面。
- History对象保存了当前窗口访问过的所有页面地址，

history.pushState(object,title,url);

 - object：是一个对象，通过 pushState 方法可以将该对象内容传递到新页面中。如果不需要这个对象，此处可以填 null。
 - title：指标题，几乎没有浏览器支持该参数，传一个空字符串比较安全。
 - url：新的网址，必须与当前页面处在同一个域。不指定的话则为当前的路径，如果设置了一个跨域网址，则会报错。

history.pushState()
  修改history当前记录，参数与pushState相同

popstate

仅仅调用pushState()方法或replaceState()方法 ，并不会触发该事件;
每当 history 对象出现变化时，就会触发 popstate 事件。

```js
window.addEventListener('popstate', function(e) {
	//e.state 相当于 history.state
	console.log('state: ' + JSON.stringify(e.state));
	console.log(history.state);
});
```


```js
//改写原有的pushState方法去触发事件监听
 var historyObj = window.hisroty
    //监听路径的改变事件 表示将当前的状态变更了，弹出了
    //pop在栈数据结构表示移除元素的意思
    window.onpopstate = (event) => {
      console.log(event)
      root.innerHTML = window.location.pathname
    }
    window.onpushstate = (event) => {
      console.log(event)
      root.innerHTML = window.location.pathname
    }
    (function (historyObj){
     let oldPushState = history.pushState
     historyObj.pushState = function(state,title,pathname){
      let result = oldPushState.apply(history,...arguments)
      if(typeof window.onpushstate === 'function'){
        window.onpushstate({state,pahtname,type:'pushstate'})
      }
       return reusltm
     }

     })(historyObj)
    historyObj.pushState({page:1},{title:'page1'},'/page1')
```
