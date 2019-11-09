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

// i found a good reference table of n vs. number of solutions at the bottom of: http://www.ic-net.or.jp/home/takaken/e/queen/

// SWITCHING BETWEEN SOLUTIONS:
const solveNQueens = solution_1;

function solution_1 (n) {

  // SOLUTION 1 [O(n!) time, O(n!) space]:
  // first, a few initial remarks: the solution uses 4 sets for quickly checking for queen conflicts. every time a valid position is found for a queen to be placed on the board,
  // we set its rank and file to be occupied. moreover, we set its 2 diagonals to be occupied - note that every position along a given "forward" diagonal has the same (rank - file),
  // while every position along a given "backward" diagonal has the same (rank + file), so we can use these values in our sets to check if a particular diagonal is occupied. next,
  // the solution uses certain utility functions to stay DRY: _setValueAt, _addQueenAt, and _removeQueenFrom, which directly manipulate our board object, and make the necessary
  // additions/removals from our 4 aforementioned sets.
  //
  // quick note: for my sanity, i have decided to count ranks and files from 1..n instead of 0..n-1. therefore, all references to ranks and files (including the sets and for loops)
  // will be in this form. the only exception is within the _setValueAt method which directly interfaces with the board object (and its component strings), and therefore references
  // therein will be offset by 1.
  //
  // the main function merely iterates through all possible ranks along file 1, since any solution must have exactly one queen in each rank, file, and diagonal. the recursive helper
  // function, `analyze`, will take care of iteration along further files until it gets to the end. note that we need only invoke the analyze helper, because it will not return
  // anything - a design choice based on the fact that the output needs to contain all solutions, so we can push valid solutions into the output array when one is found, or do nothing
  // if we reach a dead end - and in either case, simply return. in other words, the helper function does not need to evaluate into anything - we don't need a `true` or `false`.
  //
  // the function builds out the board from left to right, top to bottom. the helper function attempts to analyze solutions that begin with placing a queen at a given position, and
  // attempting to place further queens to the right, all the way to the end; if a dead end is found at the current position, attempt the next position below (the next rank, along the
  // same file). a more detailed description: first we look at the "base case negative". for the given position, if the given rank, file, forward diagonal, or backward diagonal is
  // already occupied, then we cannot place a queen here, so return (we don't even need to set the queen down). otherwise, the position IS valid, so now we place the queen (by using
  // our handy _addQueenAt function). now, we check if we have reached a "base case positive" (if the queen we just set down is the final one - in other words, if we are at the final
  // file). if so, a solution has been found, so we make a shallow copy of the board state, and push it into the output array, before also removing the queen via _removeQueenFrom to
  // undo the last move (as we still have to look for more solutions). if we are NOT at the final file, then we are in the recursive case. having found a valid queen position, we
  // now need to recurse along the next file, for all ranks. to do this, we run a for loop (for nextRank from 1..n), and inside, we recurse for (nextRank, file + 1). finally, after
  // the for loop, we have now reached a dead end (this happens when during the "unraveling" process as we backtrack). therefore, we need to remove the current queen via _removeQueenFrom.

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
      output.push([...board]);                            // IMPORTANT: push a SHALLOW COPY of the board state into the output array
      _removeQueenFrom(rank, file);                       // don't forget to remove the final queen to undo most last move
      return;
    };
    
    // RECURSIVE CASE: ANALYZE NEXT FILE
    for (let nextRank = 1; nextRank <= n; nextRank++) {
      if (Math.abs(nextRank - rank) > 1) {                // micro-optimization: no need to check same or adjacent ranks in the next file
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
test(sortedFunc, input, expected.sort(), testNum, lowestTest, highestTest);   // note: uses sortedFunc instead of func

// Test case 2
input = {
  n: 1,
};
expected = [['Q']];
test(sortedFunc, input, expected.sort(), testNum, lowestTest, highestTest);   // note: uses sortedFunc instead of func

// Test case 3
input = {
  n: 2
};
expected = [];
test(sortedFunc, input, expected.sort(), testNum, lowestTest, highestTest);   // note: uses sortedFunc instead of func

// Test case 4
input = {
  n: 3
};
expected = [];
test(sortedFunc, input, expected.sort(), testNum, lowestTest, highestTest);   // note: uses sortedFunc instead of func

// Test case 5
input = {
  n: 4,
};
expected = [
  [
    '..Q.',
    'Q...',
    '...Q',
    '.Q..',
  ],
  [
    '.Q..',
    '...Q',
    'Q...',
    '..Q.',
  ],
];
test(sortedFunc, input, expected.sort(), testNum, lowestTest, highestTest);   // note: uses sortedFunc instead of func

// Test case 6
input = {
  n: 6,
};
expected = [
  [
    '...Q..',
    'Q.....',
    '....Q.',
    '.Q....',
    '.....Q',
    '..Q...',
  ],
  [
    '....Q.',
    '..Q...',
    'Q.....',
    '.....Q',
    '...Q..',
    '.Q....',
  ],
  [
    '.Q....',
    '...Q..',
    '.....Q',
    'Q.....',
    '..Q...',
    '....Q.',
  ],
  [
    '..Q...',
    '.....Q',
    '.Q....',
    '....Q.',
    'Q.....',
    '...Q..',
  ],
];
test(sortedFunc, input, expected.sort(), testNum, lowestTest, highestTest);   // note: uses sortedFunc instead of func