// SOURCE: LEETCODE (https://leetcode.com/explore/interview/card/bloomberg/68/array-and-strings/2922/)

// Given a non - negative integer numRows, generate the first numRows of Pascal's triangle.

// In Pascal's triangle, each number is the sum of the two numbers directly above it.

// Example:

// Input: 5
// Output:
// [
//   [1],
//   [1, 1],
//   [1, 2, 1],
//   [1, 3, 3, 1],
//   [1, 4, 6, 4, 1]
// ]

// SWITCHING BETWEEN SOLUTIONS:
const generate = solution_1;

function solution_1 (numRows) {

  // SOLUTION 1 [O(n^2) time, O(n^2) space]:
  // because we need to calculate and fill out a triangular "area" (which is half the area of the square of the number of rows), O(n^2) time and
  // space are unavoidable here. we only need to code for the edge case of an input of 0 - return `[]`. otherwise, we can begin our output with
  // `[[1]]` and for subsequent rows after the first, we derive the next row from the previous one. always begin a new row with 1, then calculate
  // sums for the numbers in between, and end with 1. to do this, we can .map from the previous row (if final index, just map to 1).

  const output = numRows ? [[1]] : [];                    // EDGE CASE: if `numRows` is 0, `output` needs to be `[]` (while loop gets skipped)
  while (numRows > 1) {                                   // while loop only runs if `numRows` is higher than 1. else, output is already `[[1]]`
    const previousRow = output[output.length - 1];        // grab previous row
    const newRow = [1, ...previousRow.map((n, i, a) =>    // create `newRow`: it starts with 1, and then the rest is derived from `previousRow`
      i === a.length - 1 ? 1 : n + a[i + 1]               // if final element, map to 1. else, map to sum of 2 nums based on `previousRow`
    )];
    output.push(newRow);                                  // push `newRow` into `output`
    numRows--;                                            // decrement `numRows` so that eventually it is not greater than 1
  }
  return output;
}

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = generate;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  numRows: 5,
};
expected = [
  [1],
  [1, 1],
  [1, 2, 1],
  [1, 3, 3, 1],
  [1, 4, 6, 4, 1],
];
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  numRows: 0,
};
expected = [];
test(func, input, expected, testNum, lowestTest, highestTest);