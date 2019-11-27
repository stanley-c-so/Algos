// SOURCE: Daily Coding Problem email (edited)

// This problem was asked by Snapchat.

// Given a list of possibly overlapping intervals, return a new list of intervals where all overlapping intervals have been merged.

// The input list is not necessarily ordered in any way.

// For example, given [[1, 3], [5, 8], [4, 10], [20, 25]], you should return [[1, 3], [4, 10], [20, 25]].

// SWITCHING BETWEEN SOLUTIONS:
const mergeOverlappingIntervals = solution_2;

function solution_1 (intervals) {

  // SOLUTION 1 [O(n log n) time, O(n) space]:
  // The biggest time sink comes from the fact that we want to sort the intervals by their first number, so we can "snowball" through them.
  // First, sort the intervals by their first number. Then, run through the sorted intervals, and maintain a current "group" called
  // currentMergedInterval since the next one may potentially merge into it. (The first interval is pre-loaded.) (1) If the next interval's
  // (i.e. currentInterval) first number is not greater than the current group's last number, then it should be merged into the group.
  // When merging, compare the second number of the current group with that of currentInterval, and pick whichever is greater - that is now
  // the endpoint of currentMergedInterval. (2) If currentInterval's first number is greater than the current group's last number, then there
  // is no merge. Push currentMergedInterval into the output array, and start a new currentMergedInterval pre-loaded with the next interval.
  // In any event, at the very end of the for loop, do one last push of currentMergedInterval into the output array, and return.

  // SORT ALL INPUT INTERVALS BY THEIR FIRST NUMBER
  const sortedIntervals = intervals.sort((intervalA, intervalB) => intervalA[0] - intervalB[0]);

  // INITIALIZATIONS
  const output = [];
  let currentMergedInterval = sortedIntervals[0];   // start with first sorted interval as currentMergedInterval

  // ITERATE THROUGH ALL INPUT INTERVALS (EXCEPT THE FIRST ONE), MERGING AS REQUIRED
  for (let i = 1; i < sortedIntervals.length; i++) {
    const currentInterval = sortedIntervals[i];
    if (currentInterval[0] <= currentMergedInterval[1]) {   // overlap detected
      currentMergedInterval[1] = Math.max(currentMergedInterval[1], currentInterval[1]);  // merge by grabbing larger second number
    } else {
      output.push(currentMergedInterval);       // process currentMergedInterval by pushing into output
      currentMergedInterval = currentInterval;  // initialize next currentMergedInterval as currentInterval
    }
  }

  // PROCESS THE FINAL currentInterval
  output.push(currentMergedInterval);

  return output;
}

function solution_2(intervals) {

  // SOLUTION 2 [O(n log n) time, O(n) space]:
  // ???

  // SORT ALL INPUT INTERVALS BY THEIR FIRST NUMBER
  intervals.sort((intervalA, intervalB) => intervalA[0] - intervalB[0]);

  // REDUCE THE ARRAY OF INTERVALS - START WITH EMPTY ARRAY CALLED output. (1) IF IT IS NOT EMPTY, AND currentInterval's FIRST NUMBER
  // IS LESS THAN OR EQUAL TO THE LAST NUMBER OF THE MOST RECENT MERGED INTERVAL IN output, THEN SET THE LAST NUMBER OF SAID MOST
  // RECENT MERGED INTERVAL TO THE GREATER OF EITHER ITSELF OR THE LAST NUMBER OF currentInterval. (2) OTHERWISE, EITHER output IS
  // EMPTY, OR currentInterval DOES NOT OVERLAP WITH MOST RECENT MERGED INTERVAL - SO PUSH currentInterval INTO output.
  return intervals.reduce((output, currentInterval) => {
    if (output.length && currentInterval[0] <= output[output.length - 1][1]) {
      output[output.length - 1][1] = Math.max(output[output.length - 1][1], currentInterval[1]);
    } else {
      output.push(currentInterval);
    }
    return output;
  }, []);

}

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = mergeOverlappingIntervals;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  intervals: [
    [1, 3],
    [5, 8],
    [4, 10],
    [20, 25],
  ],
};
expected = [
  [1, 3],
  [4, 10],
  [20, 25],
];
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  intervals: [
    [7, 9],
    [4, 7],
    [14, 15],
    [1, 5],
    [10, 12],
  ],
};
expected = [
  [1, 9],
  [10, 12],
  [14, 15],
];
test(func, input, expected, testNum, lowestTest, highestTest);