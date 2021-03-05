let {a, b} = require('./1');
 console.log(a); // 1
 console.log(b); // { num: 1 }
 setTimeout(() => {
   console.log(a); // 1
   console.log(b); // { num: 1 }
  }, 500);
