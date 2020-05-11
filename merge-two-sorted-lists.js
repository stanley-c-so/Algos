// SOURCE: LEETCODE (https://leetcode.com/explore/interview/card/bloomberg/69/linked-list/2926/)

// Merge two sorted linked lists and return it as a new list. The new list should be made by splicing together the nodes of the first two lists.

// Example:

// Input: 1 -> 2 -> 4, 1 -> 3 -> 4
// Output: 1 -> 1 -> 2 -> 3 -> 4 -> 4

// Note: The singly-linked list node class with constructor is already provided. The code for this comes from LeetCode. I added the insert method.

// SWITCHING BETWEEN SOLUTIONS:
const mergeTwoLists = solution_1;

class ListNode {
  constructor(val, ...extraVals) {
    this.val = val;
    this.next = null;
    if (extraVals.length) this.insert(...extraVals);
  }
  insert(...vals) {
    let currentNode = this;
    for (const val of vals) {
      const nextNode = new ListNode(val);
      currentNode.next = nextNode;
      currentNode = nextNode;
    }
    return this;
  }
}

function solution_1 (l1, l2) {

  // SOLUTION 1 [O(m + n) time, where m and n are the lengths of l1 and l2, O(1) space]:
  // start with a `dummy` node that will be at the front of the list, because we don't know if the first node of `l1` or `l2` will go first. the
  // `dummy` node can be initialized with any value. we'll initialize `node`, a variable that tracks the current tail of our output, at `dummy`.
  // then, while `l1` OR `l2` are not null, we need to connect the tail of our output to the next node - this will either be `l1` or `l2`. we
  // would only choose `l1` if `l2` is done, OR `l1` is NOT done, AND its value is less than that of `l2`. in either case we connect current
  // `node` to `l1`, and advance `l1` to its .next. otherwise, we connect current `node` to `l2`, and advance `l2` to its .next. either way, we
  // also advance `node` to its .next. when the while loop finally exits, our output has been created using constant space, but it is still
  // connected to our `dummy`. we can either simply return `dummy.next` (which is the true head of the output), or, if we care about the extra
  // connection, we can save a reference to `dummy.next`, sever `dummy`'s connection, and then return the reference we saved.

  const dummy = new ListNode(null);         // this will be a temporary head node
  let node = dummy;                         // initialize current `node` at `dummy`
  while (l1 || l2) {
    if (!l2 || l1 && l1.val < l2.val) {     // connect to `l1` if `l2` is done, OR `l1` is NOT done, AND its value is less than that of `l2`
      node.next = l1;
      l1 = l1.next;
    } else {
      node.next = l2;
      l2 = l2.next;
    }
    node = node.next;
  }
  return dummy.next;                        // or if you don't want `dummy` to be connected, save `dummy.next`, disconnect `dummy`, and return
}

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = mergeTwoLists;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  l1: new ListNode(1, 2, 4),
  l2: new ListNode(1, 3, 4),
};
expected = new ListNode(1, 1, 2, 3, 4, 4);
test(func, input, expected, testNum, lowestTest, highestTest);