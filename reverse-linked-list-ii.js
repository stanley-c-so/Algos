// SOURCE: LEETCODE (https://leetcode.com/explore/interview/card/bloomberg/69/linked-list/2927/)

// Reverse a linked list from position m to n. Do it in one-pass.

// Note: 1 ≤ m ≤ n ≤ length of list.

// Example:

// Input: 1 -> 2 -> 3 -> 4 -> 5 -> NULL, m = 2, n = 4
// Output: 1 -> 4 -> 3 -> 2 -> 5 -> NULL

// Note: I wrote the ListNode class for this exercise.

// SWITCHING BETWEEN SOLUTIONS:
const reverseBetween = solution_1;

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

function solution_1 (head, m, n) {

  // SOLUTION 1 [O(L) time, where L is the lengh of the input list, O(1) space]:
  // we will iterate through the linked list. as soon as we get to the mth node, we begin reversing the linked list in place. we stop this once
  // we get to n. the challenging aspect of this problem is handling all the various edge cases.

  // INITIALIZATIONS
  let output = head;                          // in general, we ultimately want to return `head`. but if `m === 1`, we need to return `n`th node.
  // if (m === n) return output;              // UNNECESSARY EDGE CASE HANDLING: if `m === n`, the second while loop wouldn't run anyway
  let index = 1;
  let prev = null;
  let node = head;

  // PHASE 1: ITERATE UP TO `m`th NODE
  while (index < m) {
    prev = node;                              // advance `prev`
    node = node.next;                         // advance `node`
    index++;                                  // increment `index`
  }

  // SAVE REFERENCES ONCE WE REACH `m`th NODE
  const nodeBeforeReverse = prev;             // we need `nodeBeforeReverse` to connect to `n`th node (once we find it)
  const nodeAtM = node;                       // this is `m`th node. we need this to connect it to `nodeAfterReverse`

  // PHASE 2: ITERATE UP TO `n`th NODE
  while (index < n) {
    const next = node.next;                   // we need to save a reference to `next` to advance current `node` at the end of this loop
    node.next = prev;                         // (on the first iteration, `nodeAtM` temporarily connects back to `prev`, but we fix this later)
    prev = node;                              // advance `prev`
    node = next;                              // advance `node`
    index++;                                  // increment `index`
  };

  // SAVE REFERENCES ONCE WE REACH `n`th NODE
  const nodeAfterReverse = node.next;
  node.next = prev;                           // fencepost problem: `n`th node also needs to connect back to `prev`

  if (m !== 1) {                              // if `m !== 1` then we need to connect `nodeBeforeReverse` to `n`th node
    nodeBeforeReverse.next = node;
  } else {                                    // else, we don't need to make that connection, but we do need `output` to be `n`th node
    output = node;
  }

  // FINAL STEPS
  nodeAtM.next = nodeAfterReverse;            // connect `m`th node to `nodeAfterReverse` (whether node or null)
  return output;                              // return `output`. this will either be `head` if `m !== 1`, or else `n`th node
}

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = reverseBetween;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  head: new ListNode(1, 2, 3, 4, 5),
  m: 2,
  n: 4,
};
expected = new ListNode(1, 4, 3, 2, 5);
test(func, input, expected, testNum, lowestTest, highestTest);