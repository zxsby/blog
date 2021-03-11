# cookie

    cookie是用来识别身份的 因为http是无状态的，无法确定用户身份
    服务端/浏览器都可以设置cookie
    每次请求都会携带cookie (cookie过大 可能会造成页面白屏,流量浪费)
    合理设置cookie,定期删除cookie,根据路径合理设置cookie(cookie最终存放在客户端上的)

    设置cookie参数
    key/value/domain/path/maxAge/expires/httpOnly
    domain 限制域名 默认为当前域名
    path限制设置cookie的路径，减少cookie的传入
    maxAge(多少秒)/expires 确切的时间点
    httpOnly 不能通过代码去修改cookie

# session
    为了解决cookie不安全的问题 session存在服务端(session是基于cookie)

# locaStorage
    本地存储 可以存放一些资源 关闭网页后下次访问依旧可以使用

# sessionStorage
    用于页面跳转传值 玩也关闭后会销毁
