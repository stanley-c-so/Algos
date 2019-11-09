// SOURCE: LEETCODE (https://leetcode.com/problems/kth-smallest-element-in-a-bst/)

// Given a binary search tree, write a function kthSmallest to find the kth smallest element in it.

// Note:
// You may assume k is always valid, 1 ≤ k ≤ BST's total elements.

// Example 1:

// Input: root = [3,1,4,null,2], k = 1
//    3
//   / \
//  1   4
//   \
//    2
// Output: 1

// Example 2:

// Input: root = [5,3,6,2,4,null,null,1], k = 3
//        5
//       / \
//      3   6
//     / \
//    2   4
//   /
//  1
// Output: 3

// Follow up:
// What if the BST is modified (insert/delete operations) often and you need to find the kth smallest frequently? How would you optimize the kthSmallest routine?

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
  kthSmallest (k) { return this.solution_2(...arguments); }

  solution_1 (k) {             // if writing this out as a separate function, there would be a "root" argument as well. here, we can just reference 'this'
    // SOLUTION 1 [O(???) time, O(???) space]:
    //

    // HELPER FUNCTION
    const helper = root => root ? [...helper(root.left), root.value, ...helper(root.right)] : [];

    // INVOKE HELPER, GRAB kth ELEMENT FROM ARRAY OF VALUES
    return helper(this)[k - 1];
  }

  solution_2 (k) {             // if writing this out as a separate function, there would be a "root" argument as well. here, we can just reference 'this'
    // SOLUTION 2 [O(???) time, O(???) space]:
    //

    let root = this;          // this line is needed because there is no "root" parameter. otherwise, root would already be defined
    const stack = [];
    while (true) {
      while (root) {
        stack.push(root);
        root = root.left;
      }
      root = stack.pop();
      k--;
      if (k === 0) return root.value;
      root = root.right;
    }
  }

}

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = (new BST).kthSmallest;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  BST: new BST(5)
    .insert(3)
    .insert(2)
    .insert(4)
    .insert(6)
    .insert(7),
  k: 5,
};
expected = 6;
test(func.bind(input.BST), {k: input.k}, expected, testNum, lowestTest, highestTest);