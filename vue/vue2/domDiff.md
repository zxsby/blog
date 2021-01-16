# DomDiff解析

## 构建虚拟dom

```js
import {compileToFunction} from 'complier/index.js'
import {patch,createElm} from 'vnode/patch'
//1.创建第一个虚拟节点
let vm1 = new Vue({data:{name:'vm1'}})
let render1 = compileToFunction('<div>{{name}}</div>')
let oldVnode = render1.call(vm1)

//2.创建第二个虚拟节点
let vm2 = new Vue({data:{name:'vm2'}})
let render2 = compileToFunction('<div>{{name}}</div>')
let newVnode = render2.call(vm2)

//3.通过第一个虚拟节点做首次渲染
let el = createElm(oldVdeom)
document.body.appendChild(el)

//4.调用patch方法进行对比操作
patch(oldVnode,newVnode)
```
![](./image/vue-diff.4c21677d.jpg)

### 1.比对标签
```js
// 如果标签名称不一样 直接删掉老的换成新的
if(oldVnode.tag!==newVnode.tag){
    //可以通过oldVnode.el。获取到真是dom元素
    return oldVnode.parentNode.replaceChild(creatElm(newVnode).oldVnode.el)
}
//标签相同，都是文本的情况
if(!oldVnode.tag){
    //如果老的文本和新的文本不相同则替换
    if(oldVnode.text!==newVnode.text){
        oldVnode.el.textContent = newVnode.text
    }
}
```
### 2.比对属性
```js
//复用标签，更新属性
let el = newVnode.el = oldVnode.el
patchProps(newVnode,oldVnode.data)
function patchProps(vnode,oldProps={}){
    let newProps = vnode.data || {} //新props
    let el = vnode.el //真实dom
    //比对样式
    let newStyle = newProps.style || {}
    let oldStyle = oldProps.style || {}
    for(let key in oldStyle){
        //如果老的有新的没有则删除
        if(!newStyle[key]){
            el.style[key] = ''
        }
    }
    //如果老的有其它属性，新的没有同样删除
    for(let key in oldProps){
        if(!newProps[key]){
            el.removeAttribute(key)
        }
    }
    //开始替换和新增属性
    for(let key in newProps){
        if(key === 'style'){
            for(let styleName in newProps.style){
                el.style[styleName] = newProps.style[styleName]
            }
        }else if (key === 'class'){
            el.className = newProps.class
        }else{
            //添加属性
            el.setAttribute(key,newProps[key])
        }
    }
}

```
### 3.比对子元素
```js
let oldChildren = oldVnode.children || []
let newChildren = newVnode.children || []

if(oldChildren.length > 0 && newChildren.length > 0){
    // 如果双方都有孩子，进行孩子的比对策略
    patchChildren(el,oldChildren,newChildren)
}else if(oldChildren.length > 0){
    //老的有儿子，新的没有则清空即可
    el.innerHtml = ''
}else if(newChildren.length > 0){
    //新的有儿子，老的没有，循环添加
    newChildren.map(item=>{
        el.appendChild(createElm(child))
    })
}
```
```js
    //判断标签和key是否相同，是否可复用
    function isSameVnode(oldVnode,newVnode){
        return (oldVnode.tag === newVnode.tag) && (oldVnode.key === newVnode.key)
    }
```
```js
//比对方法,采用双指针的方式
//dom的生成 ast => render方法 => 虚拟节点 => 真实dom
//更新时不在需要从新创建ast语法树
//如果动态的添加节点(绕过vue添加的vue监控不到的)
// 
function makeIndexByKey(childrens){
    let map = {};
    childrens.map((item,index)=>{
        map[item.key] = index
    })
}
let keysMap = makeIndexByKey(oldChildren)//老的映射表
function patchChildren(el,oldChildren,newChildren){
    let oldStartIndex = 0; //老的开始指针
    let oldStartVnode = oldChildren[0];//老的开始虚拟dom
    let oldEndIndex = oldChildren.length - 1;//老的尾指针
    let oldEndVnode = oldChildren[oldEndIndex]; // 老的结尾虚拟dom

    let newStartIndex = 0; //新的开始指针
    let newStartVnode = newChildren[0]; //新的开始虚拟dom
    let newEndIndex = newChildren.length - 1;//新的尾指针
    let newEndVnode = newChildren[newEndIndex];//新的结尾虚拟dom
    
    while(oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex){
        //如果已经被移动走了
        if(!oldStartVnode){//向后一位
            oldStartVnode = oldChildren[++oldStartIndex];
        }else if(!oldEndVnode){
            oldEndVnode = oldChildren[--oldEndIndex];
        }
        if(isSameVnode(oldStartVnode,newStartVnode)){//头头比较
            patch(oldStartVnode,newStartVnode)//头部标签一致，继续比较
            oldStartVnode = oldChildren[++oldStatrIndex];//后移
            newStartVnode = newChildren[++newStartIndex];//后移
        }else if(isSameVnode(oldEndVnode,newEndVnode)){//尾尾比较
            patch(oldEndVnode.newEndVnode)
            oldEndVnode = oldChildren[--olnEndIndex];//前移
            newEndVnode = newChildren[--newEndIndex];//前移
        }else if(isSameVnode(oldStartVnode,newEndVnode)){//头尾比较
            patch(oldStartVnode.newEndVnode)
            el.insertBefore(oldStartVnode.el,oldEndVnode.el.nextSiblinng);//头移动到尾部
            oldStartVnode = oldChildren[++oldStartIndex];
            newEndVnode = newChildren[--newEndIndex];
        }else if(isSameVnode(oldEndVnode,newStartVnode)){//尾头比较
            patch(oldStartVnode.newEndVnode)
            el.insertBefore(oldEndVnode.el,oldStartVnode.el);//尾移动到头部
            oldEndVnode = oldChildren[--oldEndIndex];
            newStartVnode = newChildren[++newStartIndex]
        }else{
            //乱序比对 核心diff
            //需要根据key和对应索引将老的内容生成映射表
            let moveIndex = keysMap[newStartVnode.key];//用新的去老的中查找
            if(!moveIndex){//如果找不到可复用的直接创建新的插入到老的节点开头处
                el.insertBefore(createElm(newStartVnode),oldStateVnode.el)
            }else{
                let moveNode = oldChildren[moveIndex];
                oldChildren[moveIndex] = null
                el.insterBefore(moveNode.el,oldStartVnode.el);//移动到老的头部
                patch(moveNode,newStartVnode);//比较两个节点的属性
            }
            newStartVnode = newChildren[++newStartIndex]
        }
    }
    //此时还没比对完，新的后面可能还有
    if(newStartIndex <= newEndIndex){
        for(let i = newStartIndex; i<=newEndIndex; i++){
            let anchor = newChildren[newEndIndex + 1] == null ? null : newChildren[newEndIndex + 1].el
            el.insertBefore(createElm(newChildren[i]),anchor)
        }
    }
    if(oldStartIndex <= oldEndIndex){
        for(let i = oldStartIndex; i <= oldEndIndex; i++){
            if(oldChildren[i]!==null){
                el.removeChild(oldChildrem[i].el)
            }
        }
    }
}
```