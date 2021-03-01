<<<<<<< HEAD
function bsearch(A,p,r,x){
    const guess = Math.floor((r-p)/2)
    console.log(guess)
    if(A[guess] === x) return guess
    return A[guess]>x?console.log('a',A,p,guess-1,x):bsearch(A,guess+1,r,x)
    // bsearch(A,p,guess-1,x):bsearch(A,guess+1,r,x)
}

let arr = [1,2,3,4,6,7,8,9]
bsearch(arr,0,arr.length-1,6)
=======
const A=[2,5,3,9,6,7,10,1]
// const B = [1,2,3,4,5,6,9,10,11]
// const C =[2]

// function insert(arr,i,x){
//   let p = i
//   while(p>=0&&arr[p]>x){
//     arr[p+1] = arr[p]
//     p--
//   }
//   arr[p+1] = x
// }
// function insertion_sort(A){
//   for(let i=0; i <A.length-1; i++){
//     insert(A,i,A[i+1])
//   }
// }
// insertion_sort(A)

// const A=[1,2,4,6,7,8,9]
// function efcz(arr,z){
//    let i= 0,
//       r = arr.length-1,
//       x
//     while(i<=r){
//       x = Math.floor((r+i)/2)
//       if(arr[x]==z) return x
//       arr[x]>z?r=--x:i=++x
//     }
//     return -1
// }
// console.log(efcz(A,5))

function mppx(A){
  for(let i = A.length; i>=1; i--){
    for(let j = 1;j<=i;j++){
      if(A[j-1] > A[j] ){
        let l = A[j-1]
        A[j-1] = A[j]
        A[j] = l
      }
    }
  }
}
mppx(A)
console.log(A)
>>>>>>> eb049dec10889a3b55f8157e81743cf0dba9c7b2
