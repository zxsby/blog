# 说一下ajax/axios/fetch三者的区别

### 1.ajax
    ajax是对原生xhr的封装,除此之外还增添了对jsonp的支持,Jquery ajax经过多年的跟新维护十分方便了,如果还有缺点的话，那就是：
      · 本身是针对MVC的编程,不符合现在的前端MVVM的潮流
      · 基于原生的xhr的开发,xhr本身的架构不清晰,已有fetch的替代方案
      · JQuery整个项目太大,单纯使用ajax却要引入整个JQuery非常不合理(采用个性化打包的方案有不能享受CND服务)
    尽管JQuery对前端的开发工作有着深远的影响,但随着Vue,React新一代的崛起以及ES规范的完善,更多api的更新,JQuery这种大而全的js库,未来的道路回越来越窄

### 2.axios

    axios本质上也是对原生xhr的封装,只不过是promise的版本,符合最新的ES规范,从官网上可以看到以下几条特点：
      · 从node.js创建http请求
      · 支持Promise api
      · 客户端支持防止CSRF（Cross-site request forgery）跨站请求伪造,通过伪装来自受信任用户的请求来利用受信任的网站
      · 提供了一些并发请求的接口
    防止CSRF的攻击实现原理:在每个请求都带一个cookie中拿到的key,根据浏览器的同源策略,假冒的网站时拿不到cookie中的key,这样后台轻松辨别出这个请求是否是用户的假冒网站上的误导输入从而采取正确的策略
    axios提供了并发的封装,体积较少,是非常实用当下潮流的方式

### 3.fetch

    fetch号称是ajax的替代品。它的好处有以下几点
      · 语法简洁,跟加语义化
      · 基于promise实现,支持async/await
      · 更加接近底层,提供丰富的api
      · 脱离xhr,是ES规范的新的实现方式
# 说一下ajax/axios/fetch三者的区别

### 1.ajax
    ajax是对原生xhr的封装,除此之外还增添了对jsonp的支持,Jquery ajax经过多年的跟新维护十分方便了,如果还有缺点的话，那就是：
      · 本身是针对MVC的编程,不符合现在的前端MVVM的潮流
      · 基于原生的xhr的开发,xhr本身的架构不清晰,已有fetch的替代方案
      · JQuery整个项目太大,单纯使用ajax却要引入整个JQuery非常不合理(采用个性化打包的方案有不能享受CND服务)
    尽管JQuery对前端的开发工作有着深远的影响,但随着Vue,React新一代的崛起以及ES规范的完善,更多api的更新,JQuery这种大而全的js库,未来的道路回越来越窄

### 2.axios

    axios本质上也是对原生xhr的封装,只不过是promise的版本,符合最新的ES规范,从官网上可以看到以下几条特点：
      · 从node.js创建http请求
      · 支持Promise api
      · 客户端支持防止CSRF（Cross-site request forgery）跨站请求伪造,通过伪装来自受信任用户的请求来利用受信任的网站
      · 提供了一些并发请求的接口
    防止CSRF的攻击实现原理:在每个请求都带一个cookie中拿到的key,根据浏览器的同源策略,假冒的网站时拿不到cookie中的key,这样后台轻松辨别出这个请求是否是用户的假冒网站上的误导输入从而采取正确的策略
    axios提供了并发的封装,体积较少,是非常实用当下潮流的方式

### 3.fetch

    fetch号称是ajax的替代品。它的好处有以下几点
      · 语法简洁,跟加语义化
      · 基于promise实现,支持async/await
      · 更加接近底层,提供丰富的api
      · 脱离xhr,是ES规范的新的实现方式
