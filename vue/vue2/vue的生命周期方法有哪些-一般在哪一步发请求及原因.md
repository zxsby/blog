# vue的生命周期方法有哪些

- beforeCreate 在实例`初始化之后`，数据观测(`data observer`)和`event/watcher` 事件配置`之前`被调用。

- created 实例已经`创建完成之后`被调用。实例完成以下配置:`数据观测(data observer)，属性和方法的运算，watch/event事件回调`。此时`没有$el`

- beforeMount 在`挂载开始之前`被调用:相关的`render函数首次被调用`

- mounted el被新创建的vm.$el替换,并`挂载到实例上去之后`调用该钩子。

- beforeUpdate 数据跟新时被调用，发生在虚拟DOM`重新渲染和打补丁之前`

- updated 由于数据更改导致的虚拟DOM重新渲染和打补丁，在这之后调用该钩子

- beforeDestory `实例销毁之前`调用。在这一步,实例仍然完全可用

- destroyed Vue实例销毁后调用。调用后，Vue实例指示的所有东西都会解除绑定，
所有的事件监听器会被移除，所有的子实例也会被销毁。该钩子在`服务器渲染期间不被调用`

# 钩子函数的作用

- created 实例已经创建完成，因为它是最早触发的原因可以进行一些数据/资源的请求。(服务端渲染支持created方法)

- mounted 实例已经挂载完成，可以进行一些DOM操作

- beforUpdate 可以在这个钩子中进一步的更改状态，这不会触发附加的重复渲染过程。

- updated 可以执行依赖于DOM的操作。该钩子在服务器端渲染期间不被调用

- destroyed 可以执行一些优化操作,清空定时器，解除事件绑定
