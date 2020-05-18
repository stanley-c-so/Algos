// SOURCE: LEETCODE (https://leetcode.com/problems/copy-list-with-random-pointer/)

// A linked list is given such that each node contains an additional random pointer which could point to any node in the list or null.

// Return a deep copy of the list.

// The Linked List is represented in the input/output as a list of n nodes. Each node is represented as a pair of [val, random_index] where:

// val: an integer representing Node.val
// random_index: the index of the node (range from 0 to n-1) where random pointer points to, or null if it does not point to any node.

// Example 1:
// Input: head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
// Output: [[7,null],[13,0],[11,4],[10,2],[1,0]]

// Example 2:
// Input: head = [[1,1],[2,1]]
// Output: [[1,1],[2,1]]

// Example 3:
// Input: head = [[3,null],[3,0],[3,null]]
// Output: [[3,null],[3,0],[3,null]]

// Example 4:
// Input: head = []
// Output: []
// Explanation: Given linked list is empty (null pointer), so return null.

// Note: I wrote the following class code for SinglyLinkedList

class Node {
  constructor (val, ...extraVals) {
    this.val = val;
    this.next = null;
    if (extraVals.length) this.insert(...extraVals);
  }
  insert (...vals) {
    let currentNode = this;
    for (const val of vals) {
      const nextNode = new Node(val);
      currentNode.next = nextNode;
      currentNode = nextNode;
    }
    return this;
  }
}

// ----------

function solution_1 (head) {

  // SOLUTION 1 [O(n) time, O(n) space]:
  // one way to do this is to insert clones of each node in between the original node and the node after. however, in leetcode, the answer fails if we modify the node's `.next` pointer.
  // so, instead, we will create `.clone` pointers and connect each original node to its clone. (on the first pass, the clones themselves are not connected). then we go back to the start,
  // and on the second pass, we connect each clone's `.next` to the original node's next node's clone, and we also connect each clone's `.random` to the original node's random node's clone.
  // a third pass would be completely optional - to iterate through the original linked list and delete all `.clone` pointers. however, this is not required by leetcode.

  // EDGE CASE: EMPTY INPUT
  if (!head) return null;

  // PASS 1: CREATE A CLONE FOR EACH ORIGINAL NODE
  let node = head;
  while (node) {
    node.clone = new Node(node.val, null, null);                      // the extra `null` is so this can match both leetcode's Node constructor (values for .next and .random) and my test suite
    node = node.next;
  }

  // PASS 2: CONNECT CLONE NODES TO ONE ANOTHER, AND ALSO CONNECT THEIR RANDOM POINTERS
  node = head;
  while (node) {
    node.clone.next = node.next ? node.next.clone : null;
    node.clone.random = node.random ? node.random.clone : null;
    node = node.next;
  }

  // // OPTIONAL PASS 3 (NOT REQUIRED BY SPECS): DELETE CLONE POINTERS FROM ORIGINAL LIST. YOU CAN COMMENT THIS PART IN OR OUT
  // const output = head.clone;        // a reference to the final output since we will be deleting `.clone` pointers
  // node = head;
  // while (node) {
  //   delete node.clone;
  //   node = node.next;
  // }

  return head.clone || output;        // IF WE DECIDE TO DO PASS 3, THEN `head.clone` WON'T EXIST, SO WE WILL HAVE TO RETURN `output` INSTEAD
}

// SWITCHING BETWEEN SOLUTIONS:
const copyRandomList = solution_1;

const specialTest = head => {
  const input = head;
  const output = copyRandomList(head);
  const inputNodeValues = [];
  const inputRandomValues = [];
  let inputNode = input;
  while (inputNode) {
    inputNodeValues.push(inputNode.val);
    inputRandomValues.push(inputNode.random ? inputNode.random.val : null);
    inputNode = inputNode.next;
  }
  const outputNodeValues = [];
  const outputRandomValues = [];
  let outputNode = output;
  while (outputNode) {
    outputNodeValues.push(outputNode.val);
    outputRandomValues.push(outputNode.random ? outputNode.random.val : null);
    outputNode = outputNode.next;
  }
  const equals = require('./_equality-checker');
  return equals(inputNodeValues, outputNodeValues) && equals(inputRandomValues, outputRandomValues);
};

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = copyRandomList;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
const test1 = new Node(7, 13, 11, 10, 1);
const test1Nodes = [];
let test1Node = test1;
while (test1Node) {
  test1Nodes.push(test1Node);
  test1Node = test1Node.next;
}
test1Nodes[0].random = null;
test1Nodes[1].random = test1Nodes[0];
test1Nodes[2].random = test1Nodes[4];
test1Nodes[3].random = test1Nodes[2];
test1Nodes[4].random = test1Nodes[0];
input = {
  head: test1,
};
expected = true;                                                        // the result of `specialTest` should always be `true` if passing
test(specialTest, input, expected, testNum, lowestTest, highestTest);

// Test case 2
const test2 = new Node(1, 2);
const test2Nodes = [];
let test2Node = test2;
while (test2Node) {
  test2Nodes.push(test2Node);
  test2Node = test2Node.next;
}
test2Nodes[0].random = test2Nodes[1];
test2Nodes[1].random = test2Nodes[1];
input = {
  head: test2,
};
expected = true;                                                        // the result of `specialTest` should always be `true` if passing
test(specialTest, input, expected, testNum, lowestTest, highestTest);

// Test case 3
const test3 = new Node(3, 3, 3);
const test3Nodes = [];
let test3Node = test3;
while (test3Node) {
  test3Nodes.push(test3Node);
  test3Node = test3Node.next;
}
test3Nodes[0].random = null;
test3Nodes[1].random = test3Nodes[0];
test3Nodes[2].random = null;
input = {
  head: test3,
};
expected = true;                                                        // the result of `specialTest` should always be `true` if passing
test(specialTest, input, expected, testNum, lowestTest, highestTest);

// Test case 4
input = {
  head: null,
};
expected = true;                                                        // the result of `specialTest` should always be `true` if passing
test(specialTest, input, expected, testNum, lowestTest, highestTest);