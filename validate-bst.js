// SOURCE: LEETCODE (https://leetcode.com/problems/validate-binary-search-tree/)

// Given a binary tree, determine if it is a valid binary search tree (BST).

// Assume a BST is defined as follows:

// The left subtree of a node contains only nodes with keys less than the node's key.
// The right subtree of a node contains only nodes with keys greater than the node's key.
// Both the left and right subtrees must also be binary search trees.


// Example 1:

//    2
//   / \
//  1   3

// Input: [2, 1, 3]
// Output: true

// Example 2:

//      5
//     / \
//    1   4
//       / \
//      3   6

// Input: [5, 1, 4, null, null, 3, 6]
// Output: false
// Explanation: The root node's value is 5 but its right child's value is 4.

// NOTE: I developed the following BinaryTree and Batch classes for easy creation of binary trees with arbitrary values.

class BinaryTree {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
  insert(left, right, firstInsert = false) {
    if (left !== null) this.left = new BinaryTree(left);
    if (right !== null) this.right = new BinaryTree(right);
    return firstInsert ? new Batch(this, [this.left, this.right]) : [this.left, this.right];
  }
}

class Batch {
  constructor(root, nodes) {
    this.root = root;
    this.batch = nodes;
  }
  insert(lastInsert, ...values) {
    const nextBatch = [];
    for (let i = 0; i < this.batch.length; i++) {
      if (this.batch[i] !== null) {
        nextBatch.push(...(this.batch[i].insert(
          values[2 * i] === undefined ? null : values[2 * i],
          values[2 * i + 1] === undefined ? null : values[2 * i + 1],
        )));
      } else {
        nextBatch.push(null, null);
      }
    }
    return lastInsert ? this.root : new Batch(this.root, nextBatch);
  }
}

// SWITCHING BETWEEN SOLUTIONS:
const isValidBST = solution_1;

function solution_1 (root, min = -Infinity, max = Infinity) {

  // SOLUTION 1 [O(?) time, O(?) space]:
  // description

  return !root || (
    root.val > min && root.val < max &&
    isValidBST(root.left, min, root.val) &&
    isValidBST(root.right, root.val, max)
  );
}

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = isValidBST;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  root: new BinaryTree(2)
    .insert(1, 3, true)
    .insert(true),
};
expected = true;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  root: new BinaryTree(5)
    .insert(1, 4, true)
    .insert(true, null, null, 3, 6),
};
expected = false;
test(func, input, expected, testNum, lowestTest, highestTest);