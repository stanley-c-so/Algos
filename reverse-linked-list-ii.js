// SOURCE: LEETCODE (https://leetcode.com/explore/interview/card/bloomberg/69/linked-list/2927/)

// Reverse a linked list from position m to n. Do it in one-pass.

// Note: 1 ≤ m ≤ n ≤ length of list.

// Example:

// Input: 1 -> 2 -> 3 -> 4 -> 5 -> NULL, m = 2, n = 4
// Output: 1 -> 4 -> 3 -> 2 -> 5 -> NULL

// Note: I wrote the ListNode class for this exercise.

// SWITCHING BETWEEN SOLUTIONS:
const reverseBetween = solution_2;

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

function solution_2 (head, m, n) {

  // SOLUTION 2 [O(L) time, where L is the lengh of the input list, O(1) space]:
  // this is the same as solution 1, but it abstracts away the part where we reverse the segment that needs to be reversed. we use a helper
  // `reverse` function that will do this for us once we reach the `m`th node. this is basically like the general solution for reversing
  // a singly linked list, except (1) it has access to `m`, `n`, and `index` from the main function, and (2) instead of just returning the new
  // head, this will return three things: (1) `nodeAtM` (which is `head`), (2) `nodeAtN` (which is `prev`), and (3) `nodeAfterReverse` (which
  // is `node`). these references will help us to set up those final connections after we invoke this helper function.

  function reverse (head) {                   // helper function to reverse a singly linked list, with a twist: it returns several things
    let prev = null;
    let node = head;
    while (index <= n) {                      // we will keep going until `index` surpasses `n` (references come from main function)
      const next = node.next;
      node.next = prev;
      prev = node;
      node = next;
      index++;
    }
    return [head, prev, node];                // returns references to (1) nodeAtM, (2) nodeAtN, (3) nodeAfterReverse (may be null)
  }
  let output = head;
  let index = 1;                              // we will use `index` to know when we have reached the `m`th node
  let prev = null;
  let node = head;
  while (index < m) {                         // just iterate through the linked list until we reach the `m`th node
    prev = node;
    node = node.next;
    index++;
  }
  const nodeBeforeReverse = prev;             // save a reference to the node before the `m`th node (may be null)
  const [nodeAtM, nodeAtN, nodeAfterReverse] = reverse(node);   // reverse the portion that needs to be reversed, and grab references
  if (m !== 1) {
    nodeBeforeReverse.next = nodeAtN;         // as long as `m` is not 1, there will be a `nodeBeforeReverse`, so connect it to `n`th node
  } else {
    output = nodeAtN;                         // else, `m` was first node, so we don't need to make a connection, but `output` changes to `n`th node
  }
  nodeAtM.next = nodeAfterReverse;            // connect `m`th node to `nodeAfterReverse`
  return output;                              // return `output` (either original `head`, or `n`th node if `m === 1`)
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