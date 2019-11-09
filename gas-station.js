// SOURCE: LEETCODE https://leetcode.com/problems/gas-station/

// There are N gas stations along a circular route, where the amount of gas at station i is gas[i].

// You have a car with an unlimited gas tank and it costs cost[i] of gas to travel from station i to its next station(i + 1).You begin the journey with an empty tank at one of the gas stations.

// Return the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return -1.

// Note:

// If there exists a solution, it is guaranteed to be unique.
// Both input arrays are non - empty and have the same length.
// Each element in the input arrays is a non - negative integer.

// Example 1:

// Input:
// gas = [1, 2, 3, 4, 5]
// cost = [3, 4, 5, 1, 2]

// Output: 3

// Explanation:
// Start at station 3(index 3) and fill up with 4 unit of gas. Your tank = 0 + 4 = 4
// Travel to station 4. Your tank = 4 - 1 + 5 = 8
// Travel to station 0. Your tank = 8 - 2 + 1 = 7
// Travel to station 1. Your tank = 7 - 3 + 2 = 6
// Travel to station 2. Your tank = 6 - 4 + 3 = 5
// Travel to station 3. The cost is 5. Your gas is just enough to travel back to station 3.
// Therefore, return 3 as the starting index.

// Example 2:

// Input:
// gas = [2, 3, 4]
// cost = [3, 4, 3]

// Output: -1

// Explanation:
// You can't start at station 0 or 1, as there is not enough gas to travel to the next station.
// Let's start at station 2 and fill up with 4 unit of gas. Your tank = 0 + 4 = 4
// Travel to station 0. Your tank = 4 - 3 + 2 = 3
// Travel to station 1. Your tank = 3 - 3 + 3 = 3
// You cannot travel back to station 2, as it requires 4 unit of gas but you only have 3.
// Therefore, you can't travel around the circuit once no matter where you start.

// SWITCHING BETWEEN SOLUTIONS:
const canCompleteCircuit = solution_2;

function solution_1 (gas, cost) {

  // SOLUTION 1 [O(n log n) time, O(n) space]:
  // description

  let net = [];
  for (let i = 0; i < gas.length; i++) {
    net[i] = [gas[i] - cost[i], i];
  }

  console.log('INITIAL NET:', net);

  while (net.length > 1) {
    net = consolidate(net);
    net = rotate(net);
    net = sum(net);
  }

  return net[0][0] >= 0 ? net[0][1] : -1;
}

// SOLUTION 1 HELPER FUNCTIONS

const consolidate = net => net.reduce((arr, currentInterval) => {
  if (!arr.length || (arr[arr.length - 1][0] >= 0) !== (currentInterval[0] >= 0)) {
    arr.push(currentInterval);
  } else {
    arr[arr.length - 1][0] += currentInterval[0];
  }
  return arr;
}, []);

const rotate = net => {
  if (net[0][0] < 0) {
    net.push(net.shift());
  }
  return net;
};

const sum = net => net.reduce((acc, currentInterval, i, arr) => {
  if (i % 2 !== 0) {
    acc.push([currentInterval[0] + arr[i - 1][0], arr[i - 1][1]]);
  }
  if (i & 2 === 0 && i === arr.length - 1) acc.push(currentInterval);
  return acc;
}, []);

function solution_2 (gas, cost) {

  // SOLUTION 2 [O(n) time, O(1) space]:
  // this method is inspired by kadane's algorithm.

  // INITIALIZATIONS
  let runningTotal = 0;   // we can also check if the sum of net values is negative - but this requires 2 passes. for 1 pass, track running total as you go
  let candidateIdx = -1;  // while candidateIdx is -1, we have not found a valid positive net value to start from
  let runningTotalFromI;  // while candidateIdx is not -1, this tracks the running total of all net values from i onward

  // ITERATE THROUGH i = 0 ... gas.length, CHECKING FOR CANDIDATE INDEX VALUES FROM WHICH TO BEGIN OUR JOURNEY
  for (let i = 0; i < gas.length; i++) {
    const currentNet = gas[i] - cost[i];                          // by deriving currentNet directly from gas[i] - cost[i] we don't need extra space for a net array
    
    if (candidateIdx === -1 && currentNet >= 0) {                 // if not currently tracking a candidate, the first i with a non-negative net becomes a candidate
      candidateIdx = i;
      runningTotalFromI = 0;                                      // runningTotalFromI should be reset to 0 when a new candidate is found
    }
    
    // NOTE: THE NEXT 2 LINES ONLY MATTER IF CURRENTLY TRACKING A candidateIdx. HOWEVER, EVEN IF candidateIdx === -1, THIS CODE WON'T BREAK THE ALGO.
    runningTotalFromI += currentNet;                              // add current net value to runningTotalFromI
    if (runningTotalFromI < 0) candidateIdx = -1;                 // check if runningTotalFromI has dipped below 0. if so, reset candidateIdx to -1
    
    runningTotal += currentNet;                                   // increase runningTotal
  }

  // IF SUM OF ALL NET VALUES IS NEGATIVE, RETURN -1. ELSE, RETURN candidateIdx (WHICH IS EITHER -1 IF NO SOLUTION, OR A VALID CANDIDATE)
  return runningTotal < 0 ? -1 : candidateIdx;
}

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = canCompleteCircuit;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  gas: [1, 2, 3, 4, 5],
  cost: [3, 4, 5, 1, 2],
};
expected = 3;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  gas: [2, 3, 4],
  cost: [3, 4, 3],
};
expected = -1;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 3
input = {
  gas: [4, 5, 2, 6, 5, 3],
  cost: [3, 2, 7, 3, 2, 9],
};
expected = -1;
test(func, input, expected, testNum, lowestTest, highestTest);