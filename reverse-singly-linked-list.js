// SOURCE: LEETCODE (https://leetcode.com/problems/reverse-linked-list/)

// Reverse a singly linked list.

// Example:

// Input: 1->2->3->4->5->NULL
// Output: 5->4->3->2->1->NULL

// Follow up:

// A linked list can be reversed either iteratively or recursively. Could you implement both?

// Note: I wrote the ListNode class for this exercise.

// SWITCHING BETWEEN SOLUTIONS:
const reverseList = solution_1;

class ListNode {
  constructor (val, ...extraVals) {
    this.val = val;
    this.next = null;
    if (extraVals.length) this.insert(...extraVals);
  }
  insert (...vals) {
    let currentNode = this;
    for (const val of vals) {
      const nextNode = new ListNode(val);
      currentNode.next = nextNode;
      currentNode = nextNode;
    }
    return this;
  }
}

function solution_1 (head) {

  // SOLUTION 1 [O(n) time, O(1) space]:
  // ITERATIVE SOLUTION. set prev to null by default, and current to head by default. then iterate through the list (while current) and basically reverse the connections as you go.
  // to do so, first declare next as current.next. then, connect current to prev, move prev up to current, and move current up to next. at the end of the while loop, return prev
  // (which should be pointing to what was originally the final node but is now the new head).

  // EDGE CASE: NULL INPUT
  if (!head) return null;

  let prev = null;
  let current = head;
  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
}

function solution_2 (head) {

  // SOLUTION 2 [O(n) time, O(n) space (call stack)]:
  // RECURSIVE SOLUTION. use a helper function that takes the list starting from current node's next, reverses it, connects the new tail's next to the current node, and then sets the
  // current node's next to null, all before returning an array of the current node as well as the original final node. (in the base case, when the original final node is fed into the
  // helper function, the function returns that final node in both positions of the output array.)

  // EDGE CASE: NULL INPUT
  if (!head) return null;

  // RECURSIVE HELPER FUNCTION
  const helper = head => {
      if (!head.next) return [head, head];                      // BASE CASE
      const [originalNext, originalTail] = helper(head.next);   // RECURSIVE CASE: destructure the result of recursing on the next node
      originalNext.next = head;                                 // the next node should connect to the current node
      head.next = null;                                         // the current node should connect to null (in case this is the original head)
      return [head, originalTail];                              // return current node and original tail
  };

  return helper(head)[1];   // run head through the helper function. then, ultimately, you only care for the original tail, so return index 1
}

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = reverseList;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  head: null,
};
expected = null;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  head: new ListNode(1),
};
expected = new ListNode(1);
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 3
input = {
  head: new ListNode(1, 2, 3, 4, 5),
};
expected = new ListNode(5, 4, 3, 2, 1);
test(func, input, expected, testNum, lowestTest, highestTest);