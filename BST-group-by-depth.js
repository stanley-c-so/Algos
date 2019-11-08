// SOURCE: A friend was telling me verbally about a question he was asked by Bloomberg. I misinterpreted the question and thought he meant the following. I later learned that he meant something else, which is documented in this repo as BST-group-by-height.js.

// Given a Binary Search Tree, implement a method called groupByDepth that returns an array of all the nodes organized into "groups", where a "group" is itself an array of all the node values in the BST at a given depth. The groups should appear in the order starting with the deepest nodes, and ending with a group containing only the root.

// For example, given the following BST:

//      50
//     /  \
//   40    60
//  / \    / \
// 35 45  55  65

// Return [ [35, 45, 55, 65], [40, 60], [50] ].

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
  groupByDepth () { return this.solution_1(...arguments); }

  solution_1 () {

    // INITIALIZATIONS
    const output = [];              // the final array to be returned
    let currentGroup = [];          // an array of all nodes at a given depth
    let currentNode, currentDepth;  // tracker variables
    let previousDepth = 0;          // tracker variable; used to detect change in depth. initialize at 0
    const queue = [[this, 0]];      // initialize queue with root node. all elements in queue are in this form: [node, depth]

    // WHILE LOOP TO HANDLE QUEUE
    while (queue.length) {

      // UPDATE TRACKER VARIABLES AND QUEUE
      [currentNode, currentDepth] = queue.shift();

      // HANDLE END OF GROUP
      if (currentDepth !== previousDepth) {
        previousDepth = currentDepth;
        output.unshift(currentGroup);
        currentGroup = [];
      }

      // ADD CHILDREN TO QUEUE, IF ANY
      if (currentNode.left !== null) queue.push([currentNode.left, currentDepth + 1]);
      if (currentNode.right !== null) queue.push([currentNode.right, currentDepth + 1]);

      // PROCESS CURRENT NODE
      currentGroup.push(currentNode.value);
    }

    // PROCESS FINAL GROUP
    output.unshift(currentGroup);
    return output;
  }

}

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = (new BST).groupByDepth;
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  BST: new BST(40)
    .insert(20)
    .insert(15)
    .insert(10)
    .insert(5)
    .insert(30)
    .insert(25)
    .insert(35)
    .insert(45),
};
expected = [
  [5],
  [10, 25, 35],
  [15, 30],
  [20, 45],
  [40],
];
test(func.bind(input.BST), {arg: null}, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  BST: new BST(50)
  .insert(40)
  .insert(60)
  .insert(35)
  .insert(45)
  .insert(100)
  .insert(0)
  .insert(70)
  .insert(33)
  .insert(80)
  .insert(20)
  .insert(34)
  .insert(90),
};
expected = [
  [20, 34, 90],
  [33, 80],
  [0, 70],
  [35, 45, 100],
  [40, 60],
  [50],
];
test(func.bind(input.BST), {arg: null}, expected, testNum, lowestTest, highestTest);