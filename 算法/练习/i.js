const arr = [2, 3, 1, 5, 6, 8, 7, 9, 4];
getSequence(arr)
function getSequence(arr){
    let len = arr.length
    let result =[0]
    let p = Array.from({length:len})
    let start;
    let end;
    let middle
    for(let i = 0;i<len;i++){
        const arrI = arr[i]
        if(arrI!=0){
             let resultLastIndex = result[result.length - 1];
             if(arrI>arr[resultLastIndex]){
                p[i] = resultLastIndex
                 result.push(i)
                 continue
             }
            start = 0;
            end = result.length-1
            while(start<end){
                middle = ((start+end)/2)|0
                if(arr[result[middle]]<arrI){
                    start = middle+1
                }else{
                    end = middle
                }
            }
            if(arrI<arr[result[start]]){
                if(start >0 ){
                    p[i] = result[start - 1]
                }
                
                result[start] = i
            }
        }
    }
    
    let lens = result.length
    let last = result[lens - 1]
    while(lens-- >0){
        result[lens] = last
        last = p[last]
    }
    console.log(result,p)
}