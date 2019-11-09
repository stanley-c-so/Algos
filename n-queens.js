// SOURCE: LEETCODE (https://leetcode.com/problems/n-queens/)

// The n-queens puzzle is the problem of placing n queens on an n×n chessboard such that no two queens attack each other.

// Given an integer n, return all distinct solutions to the n-queens puzzle.

// Each solution contains a distinct board configuration of the n-queens' placement, where 'Q' and '.' both indicate a queen and an empty space respectively.

// Example:

// Input: 4
// Output: [
//  [".Q..",  // Solution 1
//   "...Q",
//   "Q...",
//   "..Q."],

//  ["..Q.",  // Solution 2
//   "Q...",
//   "...Q",
//   ".Q.."]
// ]

// Explanation: There exist two distinct solutions to the 4-queens puzzle as shown above.

// SWITCHING BETWEEN SOLUTIONS:
const solveNQueens = solution_1;

function solution_1 (n) {

  // SOLUTION 1 [O(?) time, O(?) space]:
  // description

  // INITIALIZE SETS FOR QUICKLY CHECKING FOR QUEEN CONFLICTS
  const occupiedRanks = new Set();
  const occupiedFiles = new Set();
  const occupiedForwardDiagonals = new Set();     // marked by rank - file (spans from (n-1) to (1-n))
  const occupiedBackwardDiagonals = new Set();    // marked by rank + file (spans from 2x1 to 2n)

  // OTHER INITIALIZATIONS
  output = [];                                    // stores final array of solutions
  const board = Array(n).fill('.'.repeat(n));     // this board object will be repeatedly modified throughout
  
  // UTILITY FUNCTIONS: ADD AND REMOVE QUEEN
  const _setValueAt = (rank, file, value) => {
    board[rank - 1] = board[rank - 1].slice(0, file - 1) + value + board[rank - 1].slice(file);
  }
  
  const _addQueenAt = (rank, file) => {
    _setValueAt(rank, file, 'Q');
    occupiedRanks.add(rank);
    occupiedFiles.add(file);
    occupiedForwardDiagonals.add(rank - file);
    occupiedBackwardDiagonals.add(rank + file);
  }
  
  const _removeQueenFrom = (rank, file) => {
    _setValueAt(rank, file, '.');
    occupiedRanks.delete(rank);
    occupiedFiles.delete(file);
    occupiedForwardDiagonals.delete(rank - file);
    occupiedBackwardDiagonals.delete(rank + file);
  }
  
  // RECURSIVE HELPER FUNCTION
  const analyze = (rank, file) => {
  
    // BASE CASE NEGATIVE: DON'T BOTHER ADDING THE QUEEN
    if (
      occupiedRanks.has(rank)
      || occupiedFiles.has(file)
      || occupiedForwardDiagonals.has(rank - file)
      || occupiedBackwardDiagonals.has(rank + file)
    ) {
      return;
    }
    
    // VALID SPOT (SO FAR): ONLY THEN DO WE ADD THE QUEEN
    _addQueenAt(rank, file);
    
    // BASE CASE POSITIVE
    if (file === n) {
      output.push([...board]);
      _removeQueenFrom(rank, file);            // don't forget to remove the final queen to undo most last move
      return;
    };
    
    // RECURSIVE CASE: ANALYZE NEXT FILE
    for (let nextRank = 1; nextRank <= n; nextRank++) {
      if (Math.abs(nextRank - rank) > 1) {    // micro-optimization: no need to check same or adjacent ranks in the next file
        analyze(nextRank, file + 1);
      }
    }

    // RECURSIVE CASE: DEAD END
    _removeQueenFrom(rank, file);
  };
  
  // MAIN FUNCTION: FOR EACH RANK WITHIN FILE 1, TRY TO PUT A QUEEN THERE TO KICK OFF A SOLUTION
  for (let rank = 1; rank <= n; rank++) {
    analyze(rank, 1);
  }
  
  return output;
}

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = solveNQueens;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  n: 0
};
expected = [];
test(sortedFunc, input, expected, testNum, lowestTest, highestTest);    // note: uses sortedFunc instead of func

// Test case 2
input = {
  n: 1,
};
expected = [['Q']];
test(sortedFunc, input, expected, testNum, lowestTest, highestTest);    // note: uses sortedFunc instead of func

// Test case 3
input = {
  n: 4,
};
expected = [
  [
    '..Q.',
    'Q...',
    '...Q',
    '.Q..'
  ],
  [
    '.Q..',
    '...Q',
    'Q...',
    '..Q.'
  ],
];
test(sortedFunc, input, expected, testNum, lowestTest, highestTest);    // note: uses sortedFunc instead of func