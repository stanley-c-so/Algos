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
const generateMatrix = solution_2;

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

function solution_2 (n) {

  // SOLUTION 2 [O(n^2) time, O(n) space (the new output alone will take up O(n^2) space; the additional seen mask is also O(n^2))]:
  // this is probably the cleanest code solution. note the syntax used to easily create a 2-d array without running into shallow copy issues. we start at the top left, as usual,
  // and we iterate for as many iterations as there are numbers in n^2. each time, we push the current value of i + 1 as into matrix. in terms of figuring out where to go next,
  // note the rowVector and colVector arrays - these hold the deltas for where to go next depending on the current direction, which corresponds to the index of those arrays. the
  // default direction is 0 (right). at the end of every iteration we simply calculate the temporary coordinates if we keep going in the current direction (by adding the vectors),
  // and then we check if the result is (i) in bounds, and (ii) a null value (indicating that it has not been visited yet). if all of those are true, update the current row and
  // col to the tempRow and tempCol. else, simply bump up to the next dir value, and go in that direction instead. there should be no weird edge cases using this method, other than
  // empty input :)

  // EDGE CASE - NO ROWS OR NO COLUMNS
  if (!n) return [];

  // INITIALIZATIONS
  const matrix = Array.from({ length: n }, () =>  // this creates an n^2 array filled with default value null
    Array.from({ length: n }, () => null)           // note syntax for making new array: Array.from({length: n}, () => <value>) makes a new n-sized array populated with <value>
  );
  const rowVector = [0, 1, 0, -1];                // dir 0 = right, 1 = down, 2 = left, 3 = up. these correspond to index values in these vector arrays
  const colVector = [1, 0, -1, 0];

  let row = 0;
  let col = 0;
  let dir = 0;                                    // default dir is 0 (right)
  for (let i = 0; i < n*n; i++) {                 // # of iterations = # of squares in matrix
    matrix[row][col] = i + 1;
    const tempRow = row + rowVector[dir];         // temp coordinates are new coordinates if you keep running in the current direction. we will check validity after this
    const tempCol = col + colVector[dir];
    if (tempRow >= 0 && tempRow < n && tempCol >= 0 && tempCol < n && !matrix[tempRow][tempCol]) {    // if temp coordinates are in bounds and unvisited...
      row = tempRow;                                                                                  // ...then go to them
      col = tempCol;
    } else {
      dir = (dir + 1) % 4;                                                                          // else, switch directions...
      row = row + rowVector[dir];                                                                     // ...and go in the new direction
      col = col + colVector[dir];
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