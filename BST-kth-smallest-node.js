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
    // SOLUTION 1 [O(n) time, O(n) space]:
    // in this solution, we collect into an array the values of all nodes via recursive in-order traversal, and then return the kth element from the array. the recursion is done
    // in the helper function, which returns an empty array in the base case (where root node does not exist), and merges the array from recursed call at root.left, root.value,
    // and recursed call at root.right.

    // HELPER FUNCTION
    const helper = root => root ? [...helper(root.left), root.value, ...helper(root.right)] : [];

    // INVOKE HELPER, GRAB kth ELEMENT FROM ARRAY OF VALUES
    return helper(this)[k - 1];
  }

  solution_2 (k) {
    // SOLUTION 2 [O(n) time, O(n) space]:
    // similar to solution 1 using recursion, but we add the ability to stop once we find the kth smallest element: whenever a new potential output is found, we decrement `k` and we
    // check if `k` has reached 0. if so, we immediately return from the current stack frame. we have to add two of these checks - once immediately after recursing to the left, and once
    // after processing current node (when `output` is set to `root.value`).
    
    let output;
    function helper (root) {
      if (root.left) {                        // if there is anything to the left, we start by recursing there
        helper(root.left);
        if (!k) return;                       // if `k` became 0 somewhere while recursing to the left, we need to add a check here to prevent further processing
      }
      output = root.value;                    // now we process current node. we reassign `output` to `root.value` as this node is potentially the kth smallest node
      --k;                                    // decrement `k` as we approach the kth smallest node
      if (!k) return;                         // the moment `k` becomes 0, we stop processing
      if (root.right) helper(root.right);     // if there is anything to the right, we recurse there next
    }
    helper(this);
    return output;
  }

  solution_3 (k) {             // if writing this out as a separate function, there would be a "root" argument as well. here, we can just reference 'this'
    // SOLUTION 3 [O(n) time, O(n) space]:
    // in this iterative solution, we do not need to burden the call stack. the key difference is that as soon as the kth smallest element has been found, we can end our traversal
    // immediately. i'm not entirely sure what the complexities would be in the average case (i suspect log(n)) but in the worst case it would be n (if given a degenerate tree). the
    // way the iterative solution works is to use a stack to keep track of ancestor nodes. we initialize `root` to the actual root of the initial tree - think of `root` as
    // `currentNode` if it makes it less confusing. next, we keep a main loop going forever (the only way to break out is by finding and returning the kth node). within that loop,
    // note the in-order traversal pattern of LEFT-SELF-RIGHT. LEFT: we run another while loop as long as `root` (or currentNode) is a valid node. we push that node into our stack
    // and reset `root` (or currentNode) to the left child. eventually, when we can no longer run down the left branches (i.e. we hit null), the inner while loop will exit. SELF:
    // we then reset `root` (or currentNode) to whatever gets popped out of the stack. this means we have successfully found the next in-order node, so we can decrement k to denote
    // that we are one step closer to finding the kth node. indeed, after we decrement, check if k === 0 and if so, we have found the kth node so return the node's value. otherwise,
    // RIGHT: reset `root` (or currentNode) now to the right child. this is the end of the outer while loop - we repeat the process going forward.

    let root = this;          // this line is needed because there is no "root" parameter. otherwise, root would already be defined
    const ancestorStack = [];           // think of stack as holding all ancestors of the current node
    while (true) {                      // we can run this loop forever since we will return the kth smallest node as soon as we find it
      while (root) {                      // LEFT: this inner while loop is for running as far down left as we can
        ancestorStack.push(root);         // whenever a node exists, push it into ancestorStack
        root = root.left;                 // attempt to go farther down to the left
      }
      root = ancestorStack.pop();         // SELF: when root === null, we have gone as far down left as we can. therefore, reset root to whatever is popped out of ancestorStack
      k--;                                // we are now staring at the next in-order node. decrement k to indicate that we have found the next node.
      if (k === 0) return root.value;     // if k is now 0, then we have found the kth smallest node, so return its value!
      root = root.right;                  // RIGHT: reset root to the right child now, and repeat the entire process
    }
  }

}

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = (new BST).kthSmallest;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
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

// Test case 2
input = {
  BST: new BST(2)
    .insert(3)
    .insert(4)
    .insert(5)
    .insert(6)
    .insert(7),
  k: 5,
};
expected = 6;
test(func.bind(input.BST), {k: input.k}, expected, testNum, lowestTest, highestTest);

// Test case 3
input = {
  BST: new BST(7)
    .insert(6)
    .insert(5)
    .insert(4)
    .insert(3)
    .insert(2),
  k: 5,
};
expected = 6;
test(func.bind(input.BST), {k: input.k}, expected, testNum, lowestTest, highestTest);

// Test case 4
input = {
  BST: new BST(7)
    .insert(6)
    .insert(5)
    .insert(4)
    .insert(3)
    .insert(2),
  k: 5,
};
expected = 6;
test(func.bind(input.BST), {k: input.k}, expected, testNum, lowestTest, highestTest);