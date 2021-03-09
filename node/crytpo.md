## crytpo

    md5(摘要算法)
      - md5不能反解
      - 摘要 不能根据摘要的结果 反推摘要前的 如果内容发生一点变化 摘要出来的结果完全不同
      - 相同的内容摘要出来的结果相同
      - 所有摘要出来的长度都相同

    sha1/sha256(加盐算法)
      加盐算法如果内容一致的 但是加的盐值不同结果也不相同

```js
  const crytpo = require('crypto')
  crytpo.createHash('md5').update('123').update('123').digest('base64')


```
