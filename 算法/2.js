function compatible(p,q,n){
    const [x1, y1] = [~~(p/n),p%n]
    const [x2, y2] = [~~(q/n),q%n]
    return x1 !== x2 && y1 != y2 && Math.abs(x1-x2) !== Math.abs(y1 - y2)
}
function is_goal(n,decisions){
    for(let i = 0; i<n;i++){
        for(let j = i+1; j<n;j++){
            if(i===j){
                containue
            }
            if(!compatible(decisions[i],decisions[j],n)){
                return false
            }
        }
    }
    return true
}
function queen(n,decisions = []){
    if(decisions.length === n){
        // console.log(decisions,'decisions')
        return is_goal(n,decisions) ? [decisions]:[]
    }
    let r = []
    for(let i =0;i<n*n;i++){
        if(decisions.indexOf(i)===-1){
            debugger
            r = r.concat(queen(n,decisions.concat(i)))
        }
    }
    return r
}
console.log(queen(4))