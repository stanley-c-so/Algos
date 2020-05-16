// SOURCE: LEETCODE (https://leetcode.com/problems/all-paths-from-source-to-target/)

// Given a directed, acyclic graph of N nodes.  Find all possible paths from node 0 to node N-1, and return them in any order.

// The graph is given as follows:  the nodes are 0, 1, ..., graph.length - 1.  graph[i] is a list of all nodes j for which the edge (i, j) exists.

// Example:
// Input: [[1,2], [3], [3], []] 
// Output: [[0,1,3],[0,2,3]] 
// Explanation: The graph looks like this:
// 0--->1
// |    |
// v    v
// 2--->3
// There are two paths: 0 -> 1 -> 3 and 0 -> 2 -> 3.

// ----------

function solution_1 (graph) {

  // SOLUTION 1 [O(e) time (where e is the number of edges), O(e?) space (not sure how big the stack will get, along with the path sizes)]:
  // initialize `output` depending on whether a direct connection from source to target exists. initialize a stack. perform DFS, where for each node you add its neighbors to the stack, along with
  // the ever increasing path associated with traveling to that neighbor

  const target = graph.length - 1;
  const output = graph[0].includes(target) ? [[0, target]] : [];            // EDGE CASE: if a direct connection from source to target exists, preload that into `output`
  const stack = graph[0].filter(n => n !== target).map(n => [n, [0, n]]);   // excluding any direct connections from source to target, initialize `stack` with those nodes and paths
  while (stack.length) {
    const [node, path] = stack.pop();
    for (const neighbor of graph[node]) {                                   // iterate through all the `neighbor`s of `node`...
      if (neighbor === target) {
        output.push([...path, neighbor]);                                   // ...if the `neighbor` is the `target`, push to `output`...
      } else {
        stack.push([neighbor, [...path, neighbor]]);                        // ...otherwise, format the `neighbor` and push to `stack`
      }
    }
  }
  return output;
}

function solution_2 (graph) {

  // SOLUTION 2 [O(e) time (where e is the number of edges), O(e?) space (not sure how big the call stack will get, along with the path sizes)]:
  // same idea, but using recursion. the helper function takes in a `node` - if that `node` already is `target`, we return `[[target]]` which is basically a direct path to itself.
  // otherwise, `node` is NOT `target`, so we will go through all the `neighbor`s of `node`, recurse on them, and since the result of recursing may produce multiple paths per neighbor,
  // we need to iterate through each of those paths and prepend `node` to each of them. in the main function, just kickstart the helper with 0 and return.

  const target = graph.length - 1;

  function helper (node) {
    if (node === target) {
      return [[target]];
    };
    const output = [];
    for (const neighbor of graph[node]) {
      for (const path of helper(neighbor)) {
        output.push([node, ...path]);
      }
    }
    return output;
  }
  return helper(0);
}

// SWITCHING BETWEEN SOLUTIONS:
const allPathsSourceTarget = solution_2;

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = allPathsSourceTarget;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  graph: [ [1, 2], [3], [3], [] ],
};
expected = [ [0, 1, 3], [0, 2, 3] ];
test(sortedFunc, input, expected.sort(), testNum, lowestTest, highestTest);