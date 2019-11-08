// SOURCE: LEETCODE https://leetfree.com/problems/inorder-successor-in-bst.html

// Given a binary search tree and a node in it ("predecessor"), find the in-order successor of that node in the BST.

// Note: If the given node has no in-order successor in the tree, return null.

// Note: The BST class with constructor and "insert" method are already provided. The code for this comes from AlgoExpert.

class BST {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  insert(value) {
    if (value < this.value) {
      if (this.left === null) {
        this.left = new BST(value);
      } else {
        this.left.insert(value);
      }
    } else {
      if (this.right === null) {
        this.right = new BST(value);
      } else {
        this.right.insert(value);
      }
    }
    return this;
  }

  // SWITCHING BETWEEN SOLUTIONS:
  inOrderSuccessor () { return this.solution_1(...arguments); }

  solution_1 (predecessor = this) {             // if writing this out as a separate function, there would be a "root" argument before "predecessor"...
    let currentNode = this;                     // ...and this line would be `let currentNode = root;`
    let mostRecentNodeWhereYouWentLeft = null;  // have to initialize this as null in case predecessor is the rightmost node (and has no successor)

    // NAVIGATE BST TO FIND predecessor
    while (currentNode !== predecessor) {
      if (predecessor.value < currentNode.value) {
        mostRecentNodeWhereYouWentLeft = currentNode;
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    // NOW YOU'RE AT predecessor. IF NO RIGHT CHILDREN, RETURN "MRNWYWL"
    if (!currentNode.right) return mostRecentNodeWhereYouWentLeft;

    // ELSE, GO RIGHT, AND THEN GO AS LEFT AS YOU CAN, AND RETURN THAT
    currentNode = currentNode.right;
    while (currentNode.left !== null) {
      currentNode = currentNode.left;
    }
    return currentNode;
  }
}

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = (new BST).inOrderSuccessor;
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  BST: new BST(3)
    .insert(12)
    .insert(7)
    .insert(4)
    .insert(13)
    .insert(5)
    .insert(14)
    .insert(6)
    .insert(15)
    .insert(2)
    .insert(11)
    .insert(9)
    .insert(8)
    .insert(1)
    .insert(10),
};
expected = input.BST.right.right;
test(func.bind(input.BST), {predecessor: input.BST.right}, expected, testNum, lowestTest, highestTest);