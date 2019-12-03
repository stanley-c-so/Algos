// SOURCE: LEETCODE https://leetcode.com/problems/spiral-matrix/

// Given a matrix of m x n elements(m rows, n columns), return all elements of the matrix in spiral order.

// Example 1:

// Input:
// [
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9]
// ]
// Output: [1, 2, 3, 6, 9, 8, 7, 4, 5]

// Example 2:

// Input:
// [
//   [1, 2, 3, 4],
//   [5, 6, 7, 8],
//   [9, 10, 11, 12]
// ]
// Output: [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]

// SWITCHING BETWEEN SOLUTIONS:
const spiralOrder = solution_4;

function solution_1 (matrix, dir, TL, TR, BR, BL) {

  // SOLUTION 1 [O(n*m) time (n and m are the dimensions of the matrix), O(n) space (the new output alone will take up O(n) space)]:
  // the variables TL, TR, BR, and BL mark the coordinates of the area of the matrix currently being considered, and the variable dir represents the direction.
  // starting values put TL, TR, BR, and BL at the outer corners of the matrix, and dir as 'R'. based on the direction, run along the corresponding edge of the
  // matrix, gathering up all values along the way. then, strip off the edge that was just processed, and start at the new corner, and change directions. note
  // that when the area is stripped down to 1 x n (where n > 1), this code will essentially skip that edge of 1 and move to the next direction. edge cases include
  // an empty input array, or an input of a 1 x 1 matrix - both can easily be handled up front.

  // EDGE CASE: EMPTY OR 1x1 MATRIX INPUT
  if (!matrix.length) return [];
  if (matrix.length === 1 && matrix[0].length === 1) return matrix[0];

  // OPTIONAL ARGUMENT DEFAULT VALUES
  dir = dir || 'R';
  TL = TL || [0, 0];
  TR = TR || [0, matrix[0].length - 1];
  BR = BR || [matrix.length - 1, matrix[0].length - 1];
  BL = BL || [matrix.length - 1, 0];

  // BASE CASE: COMPLETED THE MATRIX
  if (TL[0] > BR[0] || TL[1] > BR[1]) return [];

  // INITIALIZATIONS
  const nextDir = { R: 'D', D: 'L', L: 'U', U: 'R' };
  const currentEdge = [];

  // PROCESS CURRENT EDGE BASED ON CURRENT DIRECTION
  switch (dir) {
    case 'R':
      if (TL[1] !== TR[1]) {                      // skip this edge if start and end corners are the same
        for (let i = TL[1]; i <= TR[1]; i++) {    // navigate from start corner to end corner, collecting all elements along the way
          currentEdge.push(matrix[TL[0]][i]);
        }
        TL[0]++;                                  // strip off the edge that was just processed by moving the two relevant corners
        TR[0]++;
      }
      break;
    case 'D':
      if (TR[0] !== BR[0]) {
        for (let i = TR[0]; i <= BR[0]; i++) {
          currentEdge.push(matrix[i][TR[1]]);
        }
        TR[1]--;
        BR[1]--;
      }
      break;
    case 'L':
      if (BR[1] !== BL[1]) {
        for (let i = BR[1]; i >= BL[1]; i--) {
          currentEdge.push(matrix[BR[0]][i]);
        }
        BL[0]--;
        BR[0]--;
      }
      break;
    case 'U':
      if (BL[0] !== TL[0]) {
        for (let i = BL[0]; i >= TL[0]; i--) {
          currentEdge.push(matrix[i][BL[1]]);
        }
        BL[1]++;
        TL[1]++;
      }
      break;
  }
  return currentEdge.concat(spiralOrder(matrix, nextDir[dir], TL, TR, BR, BL));   // concat currentEdge to result of further calls. pass in nextDir and current corners.
}

function solution_2 (matrix) {

  // SOLUTION 2 [O(n*m) time (n and m are the dimensions of the matrix), O(n) space (the new output alone will take up O(n) space)]:
  // start at the top left of the matrix, running to the right, and track your current coordinates. maintain a while loop as long as the output array has fewer than
  // n * m elements. push the current coordinates into the output array, and reassign the value to null. keep running in the current direction until you either run
  // up against the edge of the matrix, or you run into a visited element (i.e. it is null). the advantage of this approach is that it is a little easier to code
  // out and does not use recursion, but the disadvantage is that the data gets lost (unless you clone it first).

  // EDGE CASE: EMPTY INPUT
  if (!matrix.length) return [];

  // INTIALIZATIONS
  const output = [];
  const currentPos = [0, 0];
  let dir = 'R';

  // RUN LOOP WHILE OUTPUT CONTAINS FEWER THAN n * m ELEMENTS
  while (output.length < matrix.length * matrix[0].length) {
    // PUSH ELEMENT AT currentPos INTO output
    output.push(matrix[currentPos[0]][currentPos[1]]);
    // REASSIGN ELEMENT AT currentPos TO null
    matrix[currentPos[0]][currentPos[1]] = null;
    // DETERMINE THE NEXT POSITION BASED ON currentDir (PROCEED IN SAME DIRECTION UNLESS YOU RUN INTO EDGE OF MATRIX OR INTO VISITED ELEMENT)
    switch (dir) {
      case 'R':
        if (currentPos[1] === matrix[0].length - 1 || matrix[currentPos[0]][currentPos[1] + 1] === null) {
          dir = 'D';
          currentPos[0]++;
        } else {
          currentPos[1]++;
        }
        break;
      case 'D':
        if (currentPos[0] === matrix.length - 1 || matrix[currentPos[0] + 1][currentPos[1]] === null) {
          dir = 'L';
          currentPos[1]--;
        } else {
          currentPos[0]++;
        }
        break;
      case 'L':
        if (currentPos[1] === 0 || matrix[currentPos[0]][currentPos[1] - 1] === null) {
          dir = 'U';
          currentPos[0]--;
        } else {
          currentPos[1]--;
        }
        break;
      case 'U':
        if (currentPos[0] === 0 || matrix[currentPos[0] - 1][currentPos[1]] === null) {
          dir = 'R';
          currentPos[1]++;
        } else {
          currentPos[0]--;
        }
        break;
    }
  }
  return output;
}

function solution_3 (matrix) {

  // SOLUTION 3 [O(n*m) time (n and m are the dimensions of the matrix), O(n) space (the new output alone will take up O(n) space)]:
  // start at the top left of the matrix, running to the right, and track your current coordinates. maintain a while loop as long as the output array has fewer than
  // n * m elements. push the current coordinates into the output array, and reassign the value to null. keep running in the current direction until you either run
  // up against the edge of the matrix, or you run into a visited element (i.e. it is null). the advantage of this approach is that it is a little easier to code
  // out and does not use recursion, but the disadvantage is that the data gets lost (unless you clone it first).

  // EDGE CASE - NO ROWS OR NO COLUMNS
  if (!matrix.length || !matrix[0].length) return [];
    
  // INITIALIZATIONS
  const topLeft = [0, 0];
  const topRight = [0, matrix[0].length - 1];
  const botLeft = [matrix.length - 1, 0];
  const botRight = [matrix.length - 1, matrix[0].length - 1];
  const output = [];
    
  // ITERATE WHILE CORNERS CAPTURE SOME AREA
  while (topLeft[1] <= topRight[1] && topLeft[0] <= botLeft[0]) {
    
    // SHORT CIRCUIT IF ONLY ONE ROW OR ONE COLUMN REMAINS (compare topLeft to topRight and botLeft)
    if (topLeft[0] === botLeft[0]) {                                // one row
      return output.concat(
        matrix[topLeft[0]].slice(topLeft[1], topRight[1] + 1)       // slice out the unprocessed part from the remaining row
      );
    }
    if (topLeft[1] === topRight[1]) {                               // one column
      return output.concat(                                         // avoid slicing the entire rows; instead, grab the range of rows and map indices to unprocessed matrix values
        [...Array(botLeft[0] - topLeft[0] + 1).keys()].map(i =>     // hacky 'range' function using [...Array(n).keys()] for referencing appropriate indices
          matrix[i + topLeft[0]][topLeft[1]])                       // (shift 0..n range upward by topLeft[0] to get correct indices)
      );
    }
        
    // OTHERWISE, CORNERS ARE ALL DISTINCT, SO NAVIGATE THROUGH ONE SPIRAL
    for (let i = topLeft[1]; i <= topRight[1]; i++) output.push(matrix[topLeft[0]][i]);
    for (let i = topRight[0] + 1; i <= botRight[0]; i++) output.push(matrix[i][topRight[1]]);
    for (let i = botRight[1] - 1; i >= botLeft[1]; i--) output.push(matrix[botRight[0]][i]);
    for (let i = botLeft[0] - 1; i > topLeft[0]; i--) output.push(matrix[i][botLeft[1]]);
        
    // MOVE CORNERS IN
    topLeft[0]++;
    topLeft[1]++;
        
    topRight[0]++;
    topRight[1]--;
        
    botLeft[0]--;
    botLeft[1]++;
        
    botRight[0]--;
    botRight[1]--;
  }

  return output;  
}

function solution_4 (matrix) {

  // SOLUTION 4 [O(n*m) time (n and m are the dimensions of the matrix), O(n*m) space (the new output alone will take up O(n*m) space; the additional seen mask is also O(n*m))]:
  // this is probably the cleanest code solution. note the use of a `seen` mask with default values of false that get set to true when a position is visited. we start at the
  // top left, as usual, and we iterate for as many iterations as there are numbers in the matrix. each time, we push the current position into the output and mark that position
  // as "seen" in the seen matrix. in terms of figuring out where to go next, note the rowVector and colVector arrays - these hold the deltas for where to go next depending on
  // the current direction, which corresponds to the index of those arrays. the default direction is 0 (right). at the end of every iteration we simply calculate the temporary
  // coordinates if we keep going in the current direction (by adding the vectors), and then we check if the result is (i) in bounds, and (ii) a place we have not visited yet.
  // if all of those are true, update the current row and col to the tempRow and tempCol. else, simply bump up to the next dir value, and go in that direction instead. there
  // should be no weird edge cases using this method, other than empty input :)

  // EDGE CASE - NO ROWS OR NO COLUMNS
  if (!matrix.length || !matrix[0].length) return [];

  // INITIALIZATIONS
  const h = matrix.length;
  const w = matrix[0].length;
  const output = [];
  const seen = Array.from({ length: h }, () =>    // this creates an n*m array filled with default value false
    Array.from({ length: w }, () => false)          // note syntax for making new array: Array.from({length: n}, () => <value>) makes a new n-sized array populated with <value>
  );
  const rowVector = [0, 1, 0, -1];                // dir 0 = right, 1 = down, 2 = left, 3 = up. these correspond to index values in these vector arrays
  const colVector = [1, 0, -1, 0];

  let row = 0;
  let col = 0;
  let dir = 0;                                    // default dir is 0 (right)
  for (let i = 0; i < h * w; i++) {               // # of iterations = # of squares in matrix
    output.push(matrix[row][col]);
    seen[row][col] = true;
    const tempRow = row + rowVector[dir];         // temp coordinates are new coordinates if you keep running in the current direction. we will check validity after this
    const tempCol = col + colVector[dir];
    if (tempRow >= 0 && tempRow < h && tempCol >= 0 && tempCol < w && !seen[tempRow][tempCol]) {    // if temp coordinates are in bounds and unvisited...
      row = tempRow;                                                                                  // ...then go to them
      col = tempCol;
    } else {
      dir = (dir + 1) % 4;                                                                          // else, switch directions...
      row = row + rowVector[dir];                                                                     // ...and go in the new direction
      col = col + colVector[dir];
    }
  }

  return output;  
}

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = spiralOrder;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  matrix: [],
};
expected = [];
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  matrix: [
    [1]
  ],
};
expected = [1];
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 3
input = {
  matrix: [
    [1, 2, 3, 4, 5],
  ],
};
expected = [1, 2, 3, 4, 5];
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 4
input = {
  matrix: [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ],
};
expected = [1, 2, 3, 6, 9, 8, 7, 4, 5];
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 5
input = {
  matrix: [
    [2, 5],
    [8, 4],
    [0, -1]
  ],
};
expected = [2, 5, 4, -1, 0, 8];
test(func, input, expected, testNum, lowestTest, highestTest);