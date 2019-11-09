// SOURCE: LEETCODE (https://leetcode.com/problems/network-delay-time/)

// There are N network nodes, labelled 1 to N.

// Given times, a list of travel times as directed edges times[i] = (u, v, w), where u is the source node, v is the target node, and w is the time it takes for a signal to travel from source to target.

// Now, we send a signal from a certain node K. How long will it take for all nodes to receive the signal? If it is impossible, return -1.

// Example 1:

//        1
// (1) <------ (2) (this is K, the origin)
//              |
//              |  1
//              |
//             \|/
// (4) <------ (3)
//        1

// Input: times = [[2, 1, 1], [2, 3, 1], [3, 4, 1]], N = 4, K = 2
// Output: 2 (the highest 'distance' among all the nodes)

// SWITCHING BETWEEN SOLUTIONS:
const networkDelayTime = solution_1;

function solution_1 (times, N, K) {

  // SOLUTION 1 [O(n^2) time, O(n^2) space]:
  // ** NOTE: THIS SOLUTION ASSUMES THAT EDGES BETWEEN NODES HAVE THE SAME VALUE REGARDLESS OF DIRECTION!!! **
  // however, at least some of the test cases in leetcode's test specs have different edge lengths depending
  // on direction. if i have time i'll think of how to tweak this solution...

  // the array nodeValues will store the shortest distance from the start node to the node labeled i (since
  // the nodes go from 1 .. N, then nodeValues[0] is extraneous and is temporarily set to null). the idea is
  // to instantiate currentNode at the start node, and calculate the distance required to go to each neighbor
  // from currentNode. added to the nodeValues value at currentNode, this will tell you the distance required
  // to go from the start node to that neighbor. if that value is less than the current value of
  // nodeValues[neighborIndex], then update nodeValues at that index. insert each unvisited neighboring node
  // to a priority queue. (the reason we want it to be a MinHeap PQ is because we will want to keep grabbing
  // the node from the PQ that currently has the lowest known nodeValues value.) mark currentNode as visited
  // (in this implementation, we do that by setting its value to negative), and then minpop the next value at
  // the top of the MinHeap PQ, and repeat the process for its unvisited neighboring nodes. (note - it is
  // possible that this next node will be one that you have already visited! so do another check, and if it has
  // been visited, just skip this iteration.) eventually, all reachable nodes in the network will be processed
  // and the PQ will run out. any unvisited nodes will still have a default value of Infinity. for purposes of
  // this question, if any nodes are unreachable, return -1, so we just check if nodeValues includes Infinity.
  // otherwise, we .shift off the extraneous null at index 0, convert all remaining elements to positive, and
  // find the Math.max() to see how far the farthest node is.

  // INITIALIZATIONS
  const nodeValues = [null];                  // node with label i will have value (distance) of nodeValues[i]. position 0 will be null.
  for (let i = 1; i <= N; i++) {
    nodeValues[i] = i === K ? 0 : Infinity;
  }
  const PQ = new MinHeap()                    // holds nodes yet to be visited - makes use of a min heap data structure based on distance
    .insert(K, 0);                            // starts with K, with distance of 0

  // ITERATE AS LONG AS PQ.queue IS NOT EMPTY
  while (PQ.queue.length) {
    const currentNode = PQ.popMin();          // pop out and grab the minimum node from PQ
    if (nodeValues[currentNode.value] < 0) {  // check if currentNode has already been visited (value is negative)
      continue;                               // this is needed in case multiple nodes throw the same unvisited neighbor into the queue...
    }                                         // ...multiple times! 
    times.filter(neighbor => neighbor[0] === currentNode.value && nodeValues[neighbor[1]] > 0)  // look for unvisited neighbors of currentNode
      .forEach(neighbor => {
        if (nodeValues[currentNode.value] + neighbor[2] < nodeValues[neighbor[1]])  // check if we can decrease nodeValue by traveling through...
          nodeValues[neighbor[1]] = nodeValues[currentNode.value] + neighbor[2];    // ...currentNode, and if so, update its nodeValues value.
        PQ.insert(neighbor[1], nodeValues[neighbor[1]]);                            // and in any event, add that unvisited neighbor to the PQ
      });
    nodeValues[currentNode.value] = -nodeValues[currentNode.value];                 // make currentNode negative to mark it as visited
  }
  
  // RETURN - CHECK FOR UNREACHED NODES
  if (nodeValues.includes(Infinity)) return -1;               // if nodeValues contains Infinity then at least one node was unreachable
  nodeValues.shift();                                         // get rid of the null at index 0
  return Math.max(...(nodeValues.map(ele => Math.abs(ele)))); // otherwise, return the highest value (after converting negatives back to positive)
}

// CREATE A MinHeap CLASS TO HANDLE THE ORDERING OF THE NODES IN ORDER OF LOWEST TO HIGHEST DISTANCE
class MinHeap {
  constructor () {
    this.queue = [];      // elements will be in the form of {value: someValue, priority: somePriority}
  }
  
  // UTILITY METHODS
  _swap (idxA, idxB) {
    [this.queue[idxA], this.queue[idxB]] = [this.queue[idxB], this.queue[idxA]];
  }
  _parentIdx (childIdx) {
    return Math.floor((childIdx - 1) / 2);
  }
  _childrenIndices (parentIdx) {
    return [2 * parentIdx + 1, 2 * parentIdx + 2];
  }

  // PQ METHODS
  peek () {
    return this.queue[0];
  }
  insert (value, priority = value) {
    // FIRST, ADD THE NEW ELEMENT TO THE END OF QUEUE
    this.queue.push({value, priority});
    // NEXT, 'HEAPIFY UP' ('bubble up' the first element in queue until heap is proper)
    let currentNodeIdx = this.queue.length - 1;
    while (currentNodeIdx !== 0 && this.queue[currentNodeIdx].priority < this.queue[this._parentIdx(currentNodeIdx)].priority) {
      this._swap(currentNodeIdx, this._parentIdx(currentNodeIdx));
      currentNodeIdx = this._parentIdx(currentNodeIdx);
    }
    return this;    // for chaining
  }
  popMin () {
    // FIRST, SHIFT OFF THE TOP ELEMENT AND SAVE IT, AND THEN REPLACE WITH LAST ELEMENT
    const poppedMin = this.queue.shift();                             // can't simply peek and then reassign this.queue[0] = this.queue.pop()...
    const lastElement = this.queue.pop();                             // ...if this.queue only has one element (it will never get popped off)
    if (lastElement !== undefined) this.queue.unshift(lastElement);
    // NEXT, 'HEAPIFY DOWN' ('push down' the first element in queue until heap is proper)
    let currentNodeIdx = 0;
    let [left, right] = this._childrenIndices(currentNodeIdx);
    while (left < this.queue.length) {
      let smallestChildIdx = right < this.queue.length && this.queue[right].priority < this.queue[left].priority
        ? right
        : left;
      if (this.queue[smallestChildIdx].priority < this.queue[currentNodeIdx].priority) {
        this._swap(currentNodeIdx, smallestChildIdx);
        currentNodeIdx = smallestChildIdx;
        [left, right] = this._childrenIndices(currentNodeIdx);
      } else {
        break;
      }
    }
    return poppedMin;
  }
}

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = networkDelayTime;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  times: [
    [2, 1, 1],
    [2, 3, 1],
    [3, 4, 1],
  ],
  N: 4,
  K: 2,
};
expected = 2;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  times: [
    [1, 2, 0],
    [1, 3, 0],
    [1, 4, 16],
    [1, 5, 15],
    [2, 3, 59],
    [2, 4, 23],
    [2, 5, 4],
    [3, 4, 22],
    [3, 5, 78],
    [4, 5, 31],
    [2, 1, 0],
    [3, 1, 0],
    [4, 1, 16],
    [5, 1, 15],
    [3, 2, 59],
    [4, 2, 23],
    [5, 2, 4],
    [4, 3, 22],
    [5, 3, 78],
    [5, 4, 31],
  ],
  N: 5,
  K: 5,
};
expected = 20;
test(func, input, expected, testNum, lowestTest, highestTest);

// // Test case 3
input = {
  times: [
    [1, 2, 4],
    [2, 1, 4],
    [1, 3, 3],
    [3, 1, 3],
    [1, 5, 7],
    [5, 1, 7],
    [2, 4, 5],
    [4, 2, 5],
    [2, 3, 6],
    [3, 2, 6],
    [3, 4, 11],
    [4, 3, 11],
    [3, 5, 8],
    [5, 3, 8],
    [4, 5, 2],
    [5, 4, 2],
    [4, 6, 2],
    [6, 4, 2],
    [4, 7, 10],
    [7, 4, 10],
    [5, 7, 5],
    [7, 5, 5],
    [6, 7, 3],
    [7, 6, 3],
  ],
  N: 7,
  K: 1,
};
expected = 12;
test(func, input, expected, testNum, lowestTest, highestTest);