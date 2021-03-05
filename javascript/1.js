// let obj = { a: 1, b: { c: 2 }, d: [1, 2, 3], e: [{ f: [4, 5, 6] }] };
//   let r1 = parse(obj, 'a');// = 1;
//   let r2 = parse(obj, 'b.c');// = 2;
//   let r3 = parse(obj, 'd[2]');// = 3;
//   let r4 = parse(obj, 'e[0].f[0]');// = 4;
//   // function parse(obj,key){
//   //   let fn =  new Function('obj','return obj.'+key)
//   //   return fn(obj)
//   // }
//   function parse(obj,str){
//     str = str.replace(/\[(\d+)\]/g,'.$1'); // 替换[]为.
//     let arr = str.split('.');
//     arr.map((item)=>{
//       obj = obj[item]
//     })
//     return obj
//   }
//   console.log(r1,r2,r3,r4)

let a = 1; let b = { num: 1 }
setTimeout(() => {
  a = 2; b.num=2}, 200);
module.exports = { a, b, };
