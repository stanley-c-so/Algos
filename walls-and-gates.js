// SOURCE: LEETCODE (https://leetcode.com/problems/walls-and-gates/)

// You are given a m x n 2D grid initialized with these three possible values.

// -1 - A wall or an obstacle.
// 0 - A gate.
// INF - Infinity means an empty room. We use the value 2^31 - 1 = 2147483647 to represent INF as you may assume that the distance to a gate is less than 2147483647.
// Fill each empty room with the distance to its nearest gate. If it is impossible to reach a gate, it should be filled with INF.

// Example: 

// Given the 2D grid:

// INF  -1  0  INF
// INF INF INF  -1
// INF  -1 INF  -1
//   0  -1 INF INF

// After running your function, the 2D grid should be:

//   3  -1   0   1
//   2   2   1  -1
//   1  -1   2  -1
//   0  -1   3   4

// SWITCHING BETWEEN SOLUTIONS:
const wallsAndGates = solution_1;

function solution_1 (rooms) {

  // SOLUTION 1 [O(m * n) time, O(m * m) space (from the stack)]:
  // we perform a DFS of the input. at the outermost level, we use a nested for loop to iterate through the matrix. when we see a `0` (a gate), we run our helper `go` function.
  // this initializes a stack with the coordinates of the gate, along with the distance (`d`) traveled from the origin gate to get to that location (0, obviously). while the stack
  // has length, we pop the latest location from the stack, and reassign its numeric value to whatever is the distance we previously calculated. then we check if we can go up/down/
  // left/right. for each of these directions, we have to check not only if the destination is in bounds, but also whether the number already at that destination is greater than
  // `d + 1` - if so, then we can improve the value at that location, so we add that coordinate to the stack. note, we do not have to return anything since we are modifying data in
  // place.

  // INTIALIZATIONS
  const h = rooms.length;
  if (!h) return;                                                                   // EDGE CASE: empty input
  const w = rooms[0].length;

  // HELPER - initialized whenever a new gate is found. performs a DFS from that gate, traveling as far as it can as long as it is improving the distances in the squares it touches
  function go (row, col) {
    const stack = [[row, col, 0]];                                                  // begin the stack with the gate location and a distance of 0
    while (stack.length) {
      const [r, c, d] = stack.pop();
      rooms[r][c] = d;                                                              // overwrite the number at this location with the precalculated `d` value
      if (r > 0 && rooms[r - 1][c] > d + 1) stack.push([r - 1, c, d + 1]);          // check up: if destination is in bounds AND holds a number greater than `d + 1` (so not a gate or wall), push
      if (r < h - 1 && rooms[r + 1][c] > d + 1) stack.push([r + 1, c, d + 1]);      // check down
      if (c > 0 && rooms[r][c - 1] > d + 1) stack.push([r, c - 1, d + 1]);          // check left
      if (c < w - 1 && rooms[r][c + 1] > d + 1) stack.push([r, c + 1, d + 1]);      // check right
    }
  }

  // MAIN TRAVERSAL - iterate through the matrix, and call the helper on any gate that is found
  for (let row = 0; row < h; ++row) {
    for (let col = 0; col < w; ++col) {
      if (!rooms[row][col]) go(row, col);
    }
  }

  // no return, as `rooms` input is modified in place
}

const specialTest = (...args) => {
  wallsAndGates(...args);             // since our function won't return anything, we will use `specialTest` to call the function on the input...
  return args[0];                     // ...and then return `rooms` (the first argument) from the input, which was modified by the function call
};

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = wallsAndGates;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  rooms: [
    [2147483647, -1, 0, 2147483647],
    [2147483647, 2147483647, 2147483647, -1],
    [2147483647, -1, 2147483647, -1],
    [0, -1, 2147483647, 2147483647],
  ],
};
expected = [
  [3, -1, 0, 1],
  [2, 2, 1, -1],
  [1, -1, 2, -1],
  [0, -1, 3, 4],
];
test(specialTest, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  rooms: [],
};
expected = [];
test(specialTest, input, expected, testNum, lowestTest, highestTest);