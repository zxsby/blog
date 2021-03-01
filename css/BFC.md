# BFC是什么?
    BRC即Block Formatting Contexts(块级格式话上下文)
    具有 BFC 特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且 BFC 具有普通容器所没有的一些特性
    通俗一点来讲，可以把 BFC 理解为一个封闭的大箱子，箱子内部的元素无论如何翻江倒海，都不会影响到外部。

## 触发BEC
只要元素满足下面任意一条即可触发BFC特性:
- body根元素
- 浮动元素: float除none以外的值
- 绝对定位元素: position(absoulte,fixed)
- display 为inline-block table-cells flex
- overflow除了visible 以外的值(hidden,auto,scroll23.)

## BEC 特性应用
- 同一个 BFC 下外边距会发生折叠
