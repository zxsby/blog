# npm私有库--Cnpmjs.org

## Cnpmjs.org的流程

github的[地址](https://github.com/cnpm/cnpmjs.org)

```js
//安装cnpmjs.org  建议克隆源码，针对公司内部进行个性化改造
git clone https://github.com/cnpm/cnpmjs.org.git

//安装项目依赖   cd cnpmjs.org
npm install
```

安装完后，在项目的根目录下找配置文件 config/index.js ，这里面的信息量很多，我们只需要关注下几项就可以啦，详细配置的[地址](https://github.com/cnpm/cnpmjs.org/blob/3.0.0-rc.37/config/index.js)

```js
/*
 * server configure //服务器配置
 */

registryPort: 7001,         //仓库访问端口（执行发布安装）
webPort: 7002,              //展示查询站点访问端口
bindingHost: '',            //监听绑定的 Host，默认127.0.0.1，外网访问注释掉此项即可


/**
* database config           //数据库相关设置
*/

database: {
    db: 'cnpmjs',           //数据库名称
    username: 'root',       //数据库访问账号
    password: '123456',     //数据库访问密码

    // the sql dialect of the database  数据库支持的类型
    // - currently supported: 'mysql', 'sqlite', 'postgres', 'mariadb'
    dialect: 'mysql',       //使用数据库，默认sqlite，这里我们改成mysql

    // custom host; default: 127.0.0.1
    host: '127.0.0.1',      //数据库访问IP，通常127.0.0.1

    // custom port; default: 3306
    port: 3306,             //数据库访问端口，通常3306

  // 数据库连接池使用默认配置就好
  // 目前只支持  mysql 和 postgresql (since v1.5.0)
  pool: {
    maxConnections: 10,
    minConnections: 0,
    maxIdleTime: 30000
//...

// 模块文件存储，默认将发布的私有模块跟缓存公共模块存储在本地文件系统中，路径~/.cnpmjs.org/nfs ,也就是模块文件都存储在这个目录下；或者可以选择三方储存方式比如七牛等，着这里配置插件；也支持接口开发扩展储存；

nfs: require('fs-cnpm')({
    dir: path.join(dataDir, 'nfs')
}),

// registry url name        //模块注册列表访问域名，默认r.cnpmjs.org，安装模块时会到这个域名下查找，这个默认设置略坑，建议没有外网域名的先清空回头再配
registryHost: '',


// default system admins    //默认管理员账号
  admins: {
    // name: email
    //fengmk2: 'fengmk2@gmail.com',
    admin: 'admin@cnpmjs.org',
    //dead_horse: 'dead_horse@qq.com',
  },


/*
 * registry mode config  私有模块发布相关配置
*/

  //是否开启私有模式，默认为 false；
  //私有模式下只有管理员能发布模块，其他账号只有同步权限
  //非私有模式，注册用户都可以发布模块
  enablePrivate: false,

  // registry scopes
  //若为非私有模式发布则此项必填，非管理员发布模块式命名必须以scopes字段开头，模块命名示例“@cnpm/packagename”
  //更多了解npm-scope请查阅https://docs.npmjs.com/misc/scope
  scopes: [ '@cnpm', '@cnpmtest', '@cnpm-test' ],

  // 私有模块非scopes白名单，各种非以scope方式发布的老模块的白名单管理，数组形式维护
  privatePackages: [],


/**
* sync configs 同步源仓库相关设置
*/

//npm官方registry地址，不会直接从这个地址同步模块，但有时会从这里获取模块信息，除非必要请勿更改
officialNpmRegistry: 'https://registry.npmjs.com',
officialNpmReplicate: 'https://replicate.npmjs.com',

//同步模块上游registry地址
sourceNpmRegistry: 'https://registry.npm.taobao.org',

//上游registry是否是cnpm，默认true，若要使用npm官方地址作为同步上游，请设置为false
sourceNpmRegistryIsCNpm: true,

//若安装时模块不存在，是否向源registry进行同步，默认true
syncByInstall: true,

// 同步模式选项
// none: 不进行同步，只管理用户上传的私有模块，公共模块直接从上游获取
// exist: 只同步已经存在于数据库的模块
// all: 定时同步所有源registry的模块
syncModel: 'none', // 'none', 'all', 'exist'

// 同步时间间隔，默认10分钟
syncInterval: '10m',


// 是否同步模块中devDependencies，默认false
syncDevDependencies: false,

//用户账号系统接入，可以扩展接入公司的账号系统
//详见https://github.com/cnpm/cnpmjs.org/wiki/Use-Your-Own-User-Authorization
userService: null,
enableAbbreviatedMetadata: true,
```

## 安装数据库

我选择的 mysql ，这里不介绍怎么安装 mysql 了，有需要[请戳这里](https://www.runoob.com/mysql/mysql-install.html) 。当然你也可以选择其他数据库，目前支持 mysql、 sqlite、 postgres、 mariadb，默认是 sqlite。

`启动mysql`

```js
mysql -uroot -p123456   //mysql  -u 用户名 -p 密码  要跟前面的文件进行数据库配置呀！
```
`创建数据库`
```js
create database cnpmjs;
```
`切换到cnpmjs数据库`
```js
use cnpmjs;
```
`导入cnpmjs的数据库配置文件`  文件是在：/cnpmjs.org/docs/db.sql

```js
source docs/db.sql; //默认当前操作路径就在 cnpmjs.org 项目下，如果不是，请使用 db.sql 的绝对路径
```

`小小注意`：由于cnpmjs.org本身并不支持window环境，所以在window启动需要修改一些东西

直接在当前文件目录下，cmd输入：`node dispatch.js`

或者修改下`package.json` ,把`"dev": "DEBUG=cnpm* node dispatch.js"` 修改为`"dev": "set DEBUG=cnpm* node dispatch.js"`

![https://cdn.nlark.com/yuque/0/2021/png/466273/1609507586762-a16a07bf-c9aa-495e-80db-7a8946e6a3dc.png?x-oss-process=image%2Fresize%2Cw_746](https://cdn.nlark.com/yuque/0/2021/png/466273/1609507586762-a16a07bf-c9aa-495e-80db-7a8946e6a3dc.png?x-oss-process=image%2Fresize%2Cw_746)

在浏览器地址栏输入：`127.0.0.1:7002`  回车，打开页面即为成功！

`127.0.0.1:7001` 也很重要呀，用于发布包和进行权限的作用！

```js
nrm add test http://127.0.0.1:7001
nrm use test
//换成私服状态啦，就可以继续下面的流程啦
//接下来靠自己来一遍啦  ~_~
```

还有一点需要注意的是包的名称必须含有下图所示的字段，否则一直发布不了，报403错误。npm init 的时候记得取名字的时候带上这个字段。

![https://cdn.nlark.com/yuque/0/2021/png/466273/1609507705849-846cdd57-a8fa-4335-8ab0-9aa16b17451e.png](https://cdn.nlark.com/yuque/0/2021/png/466273/1609507705849-846cdd57-a8fa-4335-8ab0-9aa16b17451e.png)

## 小小扩展 ---私有包存储上云

cnpmjs.org 项目配置项里面有一个 `nfs` 配置，这里定义了一个 npm 文件系统（NFS）。私有仓库在同步和上传的时候，会交给 NFS 对象相应的函数去处理，NFS 对象返回处理结束之后再返回下载链接，所以通过自定义 NFS 模块可以实现 npm 包的各种定制存储。目前官方默认使用 `fs-cnpm`，该模块会将上传或者同步的包保存在服务器本地的 `/root/.cnpmjs.org/doenloads/` 目录下。这种方式比较传统，一方面随着私有包数量的不断增加，存储资源会是一个瓶颈。另一方面需要定时的备份资源.

这个时候将私有包或者同步的资源放到云上就是一个非常好的方案。cnpmjs.org 官方早就为我们想到了这点，给出了下面几种 NFS 模块：

* upyun-cnpm (https://link.jianshu.com?t=https://github.com/cnpm/upyun-cnpm)：又拍云存储插件
* fs-cnpm (https://link.jianshu.com?t=https://github.com/cnpm/fs-cnpm)：本地存储的插件
* sfs-client (https://link.jianshu.com?t=https://github.com/cnpm/sfs-client)：SFS (https://link.jianshu.com?t=https://github.com/cnpm/sfs)（Simple FIle Store）存储插件
* qn-cnpm (https://link.jianshu.com?t=https://github.com/cnpm/qn-cnpm)：七牛云存储插件
* oss-cnpm (https://link.jianshu.com?t=https://github.com/cnpm/oss-cnpm)：阿里云 OSS 存储插件

这些模块已经能够满足我们绝大部分的场景，如果你有特殊的需求，可以参看 nfs模块规范 (https://www.v2ex.com/t/294255) 进行定制化开发。
