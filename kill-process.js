// SOURCE: LEETCODE (https://leetcode.com/problems/kill-process/)

// Given n processes, each process has a unique PID (process id) and its PPID (parent process id).

// Each process only has one parent process, but may have one or more children processes. This is just like a tree structure. Only one process has PPID that is 0, which means this process has no parent process. All the PIDs will be distinct positive integers.

// We use two list of integers to represent a list of processes, where the first list contains PID for each process and the second list contains the corresponding PPID.

// Now given the two lists, and a PID representing a process you want to kill, return a list of PIDs of processes that will be killed in the end. You should assume that when a process is killed, all its children processes will be killed. No order is required for the final answer.

// Example 1:
// Input: 
// pid =  [1, 3, 10, 5]
// ppid = [3, 0, 5, 3]
// kill = 5
// Output: [5,10]

// Explanation: 
//            3
//          /   \
//         1     5
//              /
//             10
// Kill 5 will also kill 10.

// Note:
// The given kill id is guaranteed to be one of the given PIDs.
// n >= 1.

// ----------

function solution_1 (pid, ppid, kill) {

  // SOLUTION 1 [O(n) time, O(n) space]:
  // start by creating a dictionary (hashmap) of parent IDs as keys, and an array of child IDs as values. using this, we can find in O(1) time which process IDs are
  // children of which parent IDs. then, since our processes relate to one another as a tree, we can use DFS (stack) starting at the process to be killed to navigate
  // through all nodes below. while the stack has a length, pop out the last node, add it to the list of processes that get killed, and add any children to the stack.

  // INITIALIZATIONS
  const parentObj = ppid.reduce((dict, parentId, i) => {            // create an object where keys are parent IDs, and values are an array of that parent's children
    if (!(parentId in dict)) dict[parentId] = [];                   // (for every new parent, initialize an empty children array)
    dict[parentId].push(pid[i]);                                    // push process ID at corresponding index position in `pid` array into this children array
    return dict;
  }, {});
  const output = [];                                                // this `output` will store all killed processes

  // DFS STARTING AT PROCESS TO BE KILLED                           // why DFS? because order doesn't matter
  const stack = [kill]                                              // this stack begins with the process to be killed
  while (stack.length) {
    const process = stack.pop();                                    // `process` is the process to be killed
    output.push(process);                                           // include this `process` in the `output`, since it must be killed
    if (process in parentObj) stack.push(...parentObj[process]);    // include any children of this `process` in the stack
  }

  return output;
}

// SWITCHING BETWEEN SOLUTIONS:
const killProcess = solution_1;

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = killProcess;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  pid: [1, 3, 10, 5],
  ppid: [3, 0, 5, 3],
  kill: 5,
};
expected = [5, 10];
test(sortedFunc, input, expected.sort(), testNum, lowestTest, highestTest);