# vue中模板编译原理

`templat => ast语法树 =>(width + new Function) 生成render函数 => 虚拟dom => 真实dom`

### 1.拿到编译模板template

    vue渲染优先级 render > template > $el

### 2.将模板转化成AST语法树(用js语法表示dom树结构，parserHTML)

```js
  // ast 元素结构
  {
    tag:tagName,
    type:1,
    children:[],
    parent:null,
    attrs
  }

  //ast 文本结构
  {
    type:3,
    text
  }
```
```js
2.1 利用正则可以匹配到 开始标签,属性,子元素(便签,文本),闭合标签;

// 2.2 初始化根节点 root = null; 开始匹配开始标签，第一个开始标签必然为根节点

2.2 匹配开始标签,拿到开始标签后,将开始标签存储,并删除当前以匹配到的字符串;接着开始匹配属性,拿到对应属性后存储

2.3 创建新的ast语法节点,将获取到的tag和attrs值存储到新建的节点上,若栈(stack) 中无值,将第一个ast节点作为根节点;如果栈中有值,则去最后一个作为根节点

2.4 如果匹配到的为开始标签,则重复2.2 --- 2.3操作;若匹配到的为文本,那就截取到下一个标签开始的位置(并删除原有文本),创建文本元素,放入栈中最后一个元素的children中

2.5 如果匹配到的是结束标签,就将栈(stack) 中对吼一个元素删除,并删除结束标签(若结束标签中最后一个标签名不同,则结构出现问题,会抛错),继续匹配；

2.6 重复上述操作，直到模板长度为零(栈中清空),至此传入薄板对应的AST语法树生成
```

### 3.将AST语法树转化成 虚拟dom(generate)即: _c('div',{id:'app',a:1},_c('span',{},'world',_v()))结构


```js
  3.1 首先拼接最外层结构, _c('标签',{属性},子元素)generate;

  3.2 获取子元素,将子元素逐个拆分,将当前元素当做跟节点,重新调用generate,得出结果后,并用','拼接

  3.3 元素属性拼接(genProps):

      3.3.1 style 属性特殊处理其值:将style的值拼接成{key1 = name1; key2 = name2;}形式

      3.3.2 将属性拼接成  `${attr.name}:${JSON.stringify(attr.value)}`的形式

3.4 子元素拼接(gen):

      3.4.1 若子元素是元素类型,则重复3.2操作,继续拆分;

      3.4.2 若子元素类型为文案：

            3.4.2.1 普通文案,则直接返回 `_v('${text}')`

            3.4.2.2 取值变量,返回`_s(${变量名})`

3.5 至此,获得编译后的模板字符串。
```

### 4.将模板字符串变成render函数
```js
let render = compileToFunction(template);
options.render = render;

···
export function compileToFunction(template){
  // 生成AST语法树
  let root = parserHTML(template)

  //生成编译后的模板字符串
  let code = generate(root)

  //生成render函数
  let render = new Function(`width(this){return ${code}}`); //code 中会会用到数据 数据在vm上

  return render
}
```
### 5. render函数执行 (将生成实例vm绑定,方便在vm上取值),调用Vue.prototype上 _c,_v,_s方法，生成虚拟dom。
`_c方法用于创建元素(createElement)  _v方法用于创建文本(createTextNode)  _s用于格式话文本/字符串/对象等(JSON.stringify)`

### 6.将虚拟dom转化成真实dom(patch)
```js
  6.1 获取旧节点元素;

  6.2 将新的虚拟dom递归生成新的元素;

  6.3 将新元素插入当前元素的前面;

  6.4 删除当前元素;
```
