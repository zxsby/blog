function bsearch(A,p,r,x){
    const guess = Math.floor((r-p)/2)
    console.log(guess)
    if(A[guess] === x) return guess
    return A[guess]>x?console.log('a',A,p,guess-1,x):bsearch(A,guess+1,r,x)
    // bsearch(A,p,guess-1,x):bsearch(A,guess+1,r,x)
}

let arr = [1,2,3,4,6,7,8,9]
bsearch(arr,0,arr.length-1,6)