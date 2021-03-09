let tree = {
  val: 1,
  left: {
      val: 2,
      left: {
          val: 4,
          left: null,
          right: null
      },
      right: {
          val: 5,
          left: null,
          right: null
      }
  },
  right: {
      val: 3,
      left: null,
      right: null
  }
}

// 例如以上的树，总共有从根节点到叶子节点的路径3条，分别为：1->2->4,1->2->5,1->3
// 则计算方法为：124+125+13=262


// 深度优先遍历
function traverse(tree,prevSum = 0){
  if(tree === null){
    return 0
  }
  const sum = prevSum*10+tree.val
  if(tree.left==null && tree.right==null){
    return sum
  }else{
    return traverse(tree.left,sum) + traverse(tree.right,sum)
  }
}

//广度优先遍历
function traversevar(root) {
  if (root === null) {
      return 0;
  }
  let sum = 0;
  const nodeQueue = [];
  const numQueue = [];
  nodeQueue.push(root);
  numQueue.push(root.val);
  while (nodeQueue.length) {
      const node = nodeQueue.shift();
      const num = numQueue.shift();
      const left = node.left, right = node.right;
      if (left === null && right === null) {
          sum += num;
      } else {
          if (left !== null) {
              nodeQueue.push(left);
              numQueue.push(num * 10 + left.val);
          }
          if (right !== null) {
              nodeQueue.push(right);
              numQueue.push(num * 10 + right.val);
          }
      }
  }
  return sum;
};


console.log(traverse(tree,0))
