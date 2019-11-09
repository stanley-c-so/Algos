// SOURCE: Daily Coding Problem email

// This problem was asked by Google.

// On our special chessboard, two bishops attack each other if they share the same diagonal. This includes bishops that have another bishop located between them, i.e. bishops can attack through pieces.

// You are given N bishops, represented as (row, column) tuples on a M by M chessboard. Write a function to count the number of pairs of bishops that attack each other. The ordering of the pair doesn't matter: (1, 2) is considered the same as (2, 1).

// For example, given M = 5 and the list of bishops:

//   (0, 0)
//   (1, 2)
//   (2, 2)
//   (4, 0)

// The board would look like this:

// [b 0 0 0 0]
// [0 0 b 0 0]
// [0 0 b 0 0]
// [0 0 0 0 0]
// [b 0 0 0 0]

// You should return 2, since bishops 1 and 3 attack each other, as well as bishops 3 and 4.

// SWITCHING BETWEEN SOLUTIONS:
const xrayBishops = solution_2;

function solution_1 (boardSize, bishopTuples) {
  
  // SOLUTION 1 [O(boardSize^2) time, O(boardSize^2) space]:
  // iterate through every diagonal (and therefore iterating through 2 * boardSize^2 - 4 squares), counting bishops as you go, and for each
  // diagonal, use formula k(k - 1)/2 for k bishops on the same diagonal. note the use of a matrix that takes up O(boardSize^2) space.

  // INITIALIZATIONS

  // numOfBishopPairs will ultimately be returned
  let numOfBishopPairs = 0;

  // these are arrays of starting points of diagonals - take up O(boardSize) space
  const diagonalURstartingPoints = [];  // "starting points" are the bottom-most square of a particular diagonal along the board.
  const diagonalULstartingPoints = [];  // "UR" are diagonals that go up and right; "UL" are those that go up and left
  for (let row = 1; row < boardSize - 1; row++) {     // travel down the two sides of the board, collecting starting points (skip all corners)
    diagonalURstartingPoints.push([row, 0]);
    diagonalULstartingPoints.push([row, boardSize - 1]);
  }
  for (let col = 0; col < boardSize - 1; col++) {     // travel across the bottom of the board, collecting starting points (include bottom corners)
    diagonalURstartingPoints.push([boardSize - 1, col]);
    diagonalULstartingPoints.push([boardSize - 1, boardSize - 1 - col]);
  }

  // this is a board containing bishop positions - take up O(boardSize^2) space
  const bishopMatrix = new Array(boardSize).fill(null).map(_ => new Array(boardSize).fill(0));
  bishopTuples.forEach(tuple => bishopMatrix[tuple[0]][tuple[1]] = 1);

  // ITERATE THROUGH UP-RIGHT DIAGONALS
  for (let [startingRow, startingCol] of diagonalURstartingPoints) {
    let numOfBishops = 0;
    let currentRow = startingRow;
    let currentCol = startingCol;
    while (currentRow >= 0) {
      if (bishopMatrix[currentRow][currentCol] === 1) numOfBishops++;
      currentRow--;
      currentCol++;
    }
    numOfBishopPairs += numOfBishops * (numOfBishops - 1) / 2;
  }

  // ITERATE THROUGH UP-LEFT DIAGONALS
  for (let [startingRow, startingCol] of diagonalULstartingPoints) {
    let numOfBishops = 0;
    let currentRow = startingRow;
    let currentCol = startingCol;
    while (currentRow >= 0) {
      if (bishopMatrix[currentRow][currentCol] === 1) numOfBishops++;
      currentRow--;
      currentCol--;
    }
    numOfBishopPairs += numOfBishops * (numOfBishops - 1) / 2;
  }

  return numOfBishopPairs;
}

function solution_2 (boardSize, bishopTuples) {

  // SOLUTION 2 [O(numOfBishops) time, O(numOfBishops) space]:
  // iterate through bishop list and determine which UR diagonals they are on (based on sum of coords) and which UL diagonals they are on
  // (based on difference of coords), and then use formula k(k - 1)/2 for k bishops on the same diagonal. note the use of 2 dictionaries that
  // take up O(bishopTuples.length) space each

  // INITIALIZATIONS
  let numOfBishopPairs = 0;  // numOfBishopPairs will ultimately be returned

  const diagonalURsums = {};    // bishops on same diagonal will have coordinates that add up to the same number
  const diagonalULdiffs = {};   // bishops on same diagonal will have coordinates that have the same difference

  // ITERATE THROUGH EACH BISHOP AND TALLY UP WHICH TWO DIAGONALS (UR AND UL) EACH BISHOP IS ON
  bishopTuples.forEach(tuple => {
    const sum = tuple[0] + tuple[1];
    const diff = tuple[0] - tuple[1];
    diagonalURsums[sum] = diagonalURsums[sum] ? diagonalURsums[sum] + 1 : 1;
    diagonalULdiffs[diff] = diagonalULdiffs[diff] ? diagonalULdiffs[diff] + 1 : 1;
  })

  // ITERATE THROUGH UR AND UL DIAGONALS AND INCREASE numOfBishopPairs ACCORDING TO FORMULA k * (k - 1) / 2
  Object.values(diagonalURsums).forEach(numOfBishops => numOfBishopPairs += numOfBishops * (numOfBishops - 1) / 2);
  Object.values(diagonalULdiffs).forEach(numOfBishops => numOfBishopPairs += numOfBishops * (numOfBishops - 1) / 2);

  return numOfBishopPairs;
}

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = xrayBishops;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  boardSize: 5,
  bishopTuples: [
    [0, 0],
    [1, 2],
    [2, 2],
    [4, 0],
  ],
};
expected = 2;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  boardSize: 8,
  bishopTuples: [
    [0, 5],
    [1, 6],
    [1, 7],
    [2, 1],
    [3, 4],
    [4, 3],
    [6, 1],
    [6, 7],
    [7, 6],
  ],
};
expected = 12;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 3
input = {
  boardSize: 3,
  bishopTuples: [
    [0, 0],
    [0, 1],
    [0, 2],
    [1, 0],
    [1, 1],
    [1, 2],
    [2, 0],
    [2, 1],
    [2, 2],
  ],
};
expected = 10;
test(func, input, expected, testNum, lowestTest, highestTest);