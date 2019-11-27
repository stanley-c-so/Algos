// SOURCE: LEETCODE https://leetcode.com/problems/spiral-matrix-ii/

// Given a positive integer n, generate a square matrix filled with elements from 1 to n^2 in spiral order.

//   Example:

// Input: 3
// Output:
// [
//   [1, 2, 3],
//   [8, 9, 4],
//   [7, 6, 5]
// ]

// SWITCHING BETWEEN SOLUTIONS:
const generateMatrix = solution_1;

function solution_1 (n) {

  // SOLUTION 1 [O(n^2) time, O(n^2) space]:
  // first, construct n^2 matrix populated with null. then, initialize currentPos at [0, 0] and dir as 'R'. iterate through the matrix with a for loop with i
  // increasing from 1 to n^2. go through the matrix, replacing null values with i. head in the current dir, until reaching edge of matrix or an already
  // visited node (value !== null), and change directions.

  // CONSTRUCT MATRIX
  const row = new Array(n).fill(null);
  const matrix = row.map(_ => [...row]);

  // INITIALIZATIONS
  const currentPos = [0, 0];
  let dir = 'R';

  // ITERATE i FROM 1 to n^2, REASSIGNING CURRENT NODE TO i, AND FINDING NEXT POSITION BY MOVING IN CURRENT dir UNTIL REACHING EDGE OF MATRIX OR VISITED NODE
  for (let i = 1; i <= n * n; i++) {
    matrix[currentPos[0]][currentPos[1]] = i;
    switch (dir) {
      case 'R':
        if (currentPos[1] === n - 1 || matrix[currentPos[0]][currentPos[1] + 1] !== null) {
          dir = 'D';
          currentPos[0]++;
        } else {
          currentPos[1]++;
        }
        break;
      case 'D':
        if (currentPos[0] === n - 1 || matrix[currentPos[0] + 1][currentPos[1]] !== null) {
          dir = 'L';
          currentPos[1]--;
        } else {
          currentPos[0]++;
        }
        break;
      case 'L':
        if (currentPos[1] === 0 || matrix[currentPos[0]][currentPos[1] - 1] !== null) {
          dir = 'U';
          currentPos[0]--;
        } else {
          currentPos[1]--;
        }
        break;
      case 'U':
        if (currentPos[0] === 0 || matrix[currentPos[0] - 1][currentPos[1]] !== null) {
          dir = 'R';
          currentPos[1]++;
        } else {
          currentPos[0]--;
        }
        break;
    }
  }
  return matrix;
}

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = generateMatrix;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  n: 0,
};
expected = [];
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  n: 1,
};
expected = [
  [1],
];
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 3
input = {
  n: 2,
};
expected = [
  [1, 2],
  [4, 3],
];
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 4
input = {
  n: 5,
};
expected = [
  [1,  2,  3,  4,  5],
  [16, 17, 18, 19, 6],
  [15, 24, 25, 20, 7],
  [14, 23, 22, 21, 8],
  [13, 12, 11, 10, 9],
];
test(func, input, expected, testNum, lowestTest, highestTest);