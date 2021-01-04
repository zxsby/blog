# nrm

`nrm` 是一个npm源管理器，允许你快速在npm源之间进行切换。

```json
npm install -g nrm  //安装nrm
nrm ls //查看可选源(带*号的为当前源)
nrm current //查看当前使用源
nrm use <registry>  //registry为源名  比如切换taobao源
nrm add <registry> <url>   //registry为源名  url为源地址
nrm del <registry>  //registry为源名，删除某个源，比如删除刚刚的company
nrm test <registry>  //registry为源名，测试源的响应时间
```
