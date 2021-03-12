// function lcs(s,t){

//   if(s==='' || t===''){
//     return 0
//   }
//   if(s[s.length - 1] === t[t.length - 1]){
//     return lcs(
//       s.substr(0,s.length - 1),
//       t.substr(0,t.length - 1)
//     ) + 1
//   }else{
//     return Math.max(
//       lcs(s.substr(0,s.length - 1),t),
//       lcs(s,t.substr(0,t.length - 1))
//     )
//   }
// }

// console.log(lcs('banana','atana'))


// var solveNQueens = function(n) {
//   const board = new Array(n)
//   for(let i=0; i<n;i++){
//       board[i] = new Array(n).fill('.')
//   }

//   const cols = new Set(); //出现过皇后列的记录
//   const dian1 = new Set();//正对角线
//   const dian2 = new Set();//反对角线
//   const res = []
//   const helper = (row) =>{
//       if(row === n){//终止条件
//           const stringBoard = board.slice() // 复制一份
//           for (let i = 0; i < n; i++) {
//               stringsBoard[i] = stringsBoard[i].join('');
//           }
//           res.push(stringsBoard);
//           return;
//       }
//       for(let col = 0; col<n;col++){
//           if(!cols.has(col)&&!dian1.has(row+col)&&dian2.has(row-col)){
//               board[row][col] = 'Q' //放置皇后
//               cols.add(col);          // 记录放了皇后的列
//               diag1.add(row + col);   // 记录放了皇后的正对角线
//               diag2.add(row - col);   // 记录放了皇后的负对角线
//               helper(row+1)
//               board[row][col] = '.' //撤销该点的皇后
//               cols.delete(col);          // 记录放了皇后的列
//               diag1.delete(row + col);   // 记录放了皇后的正对角线
//               diag2.delete(row - col);   // 记录放了皇后的负对角线
//           }
//       }
//   }
//   helper(0)
//   return res
// }
// console.log(solveNQueens(4))

var exist = function(board, word) {
  let wordArr = word.split('')
  let pos = []
  for(let i = 0; i < board.length; i++){
      for(let z = 0; z< board[0].length; z++){
          if(board[i][z] === wordArr[0]){
              pos.push([i,z])
          }
      }
  }
  if(!pos.length){
      return false
  }
  wordArr.shift()
  nextStep(board,pos[0],wordArr,step=[])
};
function nextStep(board,[y,x],wordArr,step){
  let str = wordArr.shift()
  const nextArr = [
      [y+1,x],[y-1,x],
      [y,x+1],[y,x-1]
  ].filter(([y,x])=>{
      return y>=0&&x>=0&&y<board.length&&x<board[0].length&&(board[y][x] === str)
  })
  for(let item of nextArr){
      step.push
      nextStep(board,item,wordArr)
  }
}

exist([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]],"ABCCED")
