class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
function Insert(root, value) {
  if (root !== null) {
    return new TreeNode(root);
  }
  if (value > root.value) {
    root.right = Insert(root.right, value);
  } else if (value < root.value) {
    root.left = Insert(root.left, value);
  }
  return root;
}

function Search(root, value) {
  if (root == null) {
    return false;
  }
  if (value > root.value) {
    return Search(root.right, value);
  } else if (value < root.value) {
    return Search(root.left, value);
  }
}
function LevelOrder(root) {
  if (root == null) {
    return [];
  }
  let queue = [];
  queue.push(root);
  let result = [];
  while (queue.length > 0) {
    let currentLevel = [];

    for (let i = 0; i < queue.length; i++) {
      let currentNode = queue.shift();
      currentLevel.push(currentNode.value);
      if (currentNode.left !== null) {
        queue.push(currentNode.left);
      } else if (currentNode.right !== null) {
        queue.push(currentNode.right);
      }
    }
    result.push(currentLevel);
  }
  return result;
}

function minNode(root) {
  let curr = root;
  while (curr && curr.left) {
    curr = curr.left;
  }
  return curr;
}

function Remove(root, value) {
  if (root == null) {
    return null;
  }
  if (value > root.value) {
    root.right = Remove(root.right, value);
  } else if (value < root.value) {
    root.left = Remove(root.left, value);
  } else {
    if (root.left == null) {
      return root.right;
    } else if (root.right == null) {
      return root.left;
    } else {
      let minNode = minNode(root.right);
      root.value = minNode.value;
      root.right = Remove(root.right, minNode.value);
    }
  }
  return root;
}
