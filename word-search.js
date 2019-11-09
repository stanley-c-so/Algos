// SOURCE: LEETCODE (https://leetcode.com/problems/word-search/)

// Given a 2D board and a word, find if the word exists in the grid.

// The word can be constructed from letters of sequentially adjacent cell, where "adjacent" cells are those horizontally or vertically neighboring. The same letter cell may not be used more than once.

// Example:

// board =
// [
//   ['A','B','C','E'],
//   ['S','F','C','S'],
//   ['A','D','E','E']
// ]

// Given word = "ABCCED", return true.
// Given word = "SEE", return true.
// Given word = "ABCB", return false.

// SWITCHING BETWEEN SOLUTIONS:
const exist = solution_2;

function solution_1 (board, word) {

  // SOLUTION 1 [O(mn * l^4) time (where l is length of word), O(mn + l) space]:
  // we iterate through the grid, running a 'go' helper function at each position. the go function ultimately returns true or false (starting from a given position in the board,
  // and having already traversed k characters along the word, whether or not a valid solution is possible). if any initial call of go (with k === 0) ever returns true, then a
  // solution has been found, so we return true. if we iterate through the entire board and no solution is found, we return false. the go function works by first immediately
  // checking if the letter at the current position matches the corresponding letter within word - if not, return false. if, on the other hand, k has reached the final letter,
  // then the entire word has been spelled out, so return true (this is the base case). otherwise, in all other cases, since the current position matches the current letter, we
  // mark it by changing it to '*' (if the original data cannot be mutated then we can clone the board first). after marking, check the four neighbors by recursing the go function,
  // but increment k this time so we are farther along the word. if any of the four directions ultimately returns true, then here we return true. if, however, recursing on all
  // four neighbors returns false, then we also return false here - but not before restoring the letter at the current position back to its original letter.

  // EDGE CASE
  if (!board.length || !board[0].length) return false;

  // INITIALIZATIONS
  const h = board.length;
  const w = board[0].length;

  // RECURSIVE FUNCTION - TAKES CURRENT POSITION ON BOARD AND CURRENT PROGRESS ALONG THE WORD, RETURNS TRUE/FALSE IF A SOLUTION IS POSSIBLE
  const go = (row, col, k) => {
    if (row < 0 || row === h || col < 0 || col === w) return false;   // if out of bounds, return false
    if (board[row][col] !== word[k]) return false;                    // if letter at current board position doesn't match corresponding letter within word, return false
    if (k === word.length - 1) return true;                           // if this is the final letter, and neither of the above got triggered, return true

    board[row][col] = '*';                                            // 'mark' this position as visited with a *
    if (
      go(row + 1, col, k + 1)                                         // check in all four directions, with k having been incremented
      || go(row - 1, col, k + 1)
      || go(row, col + 1, k + 1)
      || go(row, col - 1, k + 1)
    ) {
      return true;                                                    // if any of the next steps ultimately results in true, then return true
    } else {
      board[row][col] = word[k];                                      // you have reached a dead end; reset current position to original letter (unvisited)...
      return false;                                                   // ...and return false
    }
  };

  // ITERATE THROUGH ENTIRE BOARD, RUNNING THE go FUNCTION AT EACH POSITION. AS SOON AS A SOLUTION IS FOUND, RETURN TRUE
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (go(i, j, 0)) return true;
    }
  }
  
  return false;
}

function solution_2 (board, word) {

  // SOLUTION 2 [O(mn * l^4) time (where l is length of word), O(mn + l) space]:
  // this is largely the same as above, except i wanted to try out a new way of easily checking all four neighbors - the key is to have an array of length 4, with each element
  // being a tuple of the deltas. to check all four directions, iterate through the dirs array with a for loop (using destructuring to get dy and dx) and recurse based on
  // row + dy and col + dx. note that in this solution, i put a condition that checks if the neighbor is in bounds before recursing, as opposed to checking if a position is in
  // bounds immediately after recursion - this will be a lighter burden on the call stack.

  // EDGE CASE
  if (!board.length || !board[0].length) return false;

  // INITIALIZATIONS
  const h = board.length;
  const w = board[0].length;
  const dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]];                    // for an easy way to check all four neighbors

  // RECURSIVE FUNCTION - TAKES CURRENT POSITION ON BOARD AND CURRENT PROGRESS ALONG THE WORD, RETURNS TRUE/FALSE IF A SOLUTION IS POSSIBLE
  const go = (row, col, k) => {
    if (board[row][col] !== word[k]) return false;                    // if letter at current board position doesn't match corresponding letter within word, return false
    if (k === word.length - 1) return true;                           // if this is the final letter, and neither of the above got triggered, return true

    board[row][col] = '*';                                            // 'mark' this position as visited with a *
    for (const [dy, dx] of dirs) {                                    // check in all four directions
      const i = row + dy;
      const j = col + dx;
      if (i >= 0 && i < h && j >= 0 && j < w) {                       // only recurse if in bounds
        if (go(i, j, k + 1)) return true;                             // if any of the next steps ultimately results in true, then return true
      }
    }
    board[row][col] = word[k];                                        // you have reached a dead end; reset current position to original letter (unvisited)...
    return false;                                                     // ...and return false
  };

  // ITERATE THROUGH ENTIRE BOARD, RUNNING THE go FUNCTION AT EACH POSITION. AS SOON AS A SOLUTION IS FOUND, RETURN TRUE
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (go(i, j, 0)) return true;
    }
  }
  
  return false;
};

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = exist;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  board: [
    ['A', 'B', 'C', 'E'],
    ['S', 'F', 'C', 'S'],
    ['A', 'D', 'E', 'E'],
  ],
  word: 'ABCCED',
};
expected = true;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  board: [
    ['A', 'B', 'C', 'E'],
    ['S', 'F', 'C', 'S'],
    ['A', 'D', 'E', 'E'],
  ],
  word: 'SEE',
};
expected = true;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 3
input = {
  board: [
    ['A', 'B', 'C', 'E'],
    ['S', 'F', 'C', 'S'],
    ['A', 'D', 'E', 'E'],
  ],
  word: 'ABCB',
};
expected = false;
test(func, input, expected, testNum, lowestTest, highestTest);