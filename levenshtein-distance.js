// SOURCE: AlgoExpert

// Write a function that takes in two strings and returns the minimum number of edit operations that need to be performed on the first string to obtain the second string. There are three edit operations: insertion of a character, deletion of a character, and substitution of a character for another.

// Sample input: "abc", "yabd"
// Sample output: 2 (insert "y"; substitute "c" for "d")

// SWITCHING BETWEEN SOLUTIONS:
const levenshteinDistance = solution_1;

function solution_1 (str1, str2) {

  // SOLUTION 1 [O(n*m) time, O(min(n, m)) space]:
  
  // create a levenshtein table such that the rows correspond to a slice of str1 up to the next marginal letter (starting with ''), and likewise
  // the columns correspond to a slice of str2 up to the next marginal letter (starting with ''). the table contains numbers at (row, col) which
  // represents the levenshtein edit distance between the current str1 and str2 slices.
  
  // the entire '' row will be 0, 1, 2, ... up to the length of str2, while the entire '' column will be 0, 1, 2, ... up to the length of str1.
  
  // the rest of the table is dynamically populated according to this rule: if the current marginal letter in the column matches that of the row,
  // go up 1 and left 1 in the table and grab that number. else, take the min of the 3 neighboring numbers (up left, up, and left) and add 1.

  // the final number of the final row (bottom right of the table) is the answer to be returned.

  // for full optimization, rather than saving the entire table, you only need to save two rows at a time. call these previousRow and currentRow.
  // to take up less space, make sure the SHORTER string goes across the top (corresponding to the columns). initialize previousRow with 0, 1, 2,
  // ... up to the length of str2. initialize the first value of currentRow. then use the algo above to populate the rest of currentRow. then sub
  // currentRow into previousRow and keep going until the table is finished.

  // EDGE CASE - the two input strings are the same (primarily this catches '' and '')
  if (str1 === str2) return 0;

  // INITIALIZATIONS

  // determine which string is longer and which is shorter
  let longerStr = (str1.length > str2.length) ? str1 : str2;
  let shorterStr = (str1.length > str2.length) ? str2 : str1;

  // initialize two arrays to hold current and previous rows of levenshtein table
  let previousRow = [];
  let currentRow = [];

  // initialize previousRow based on ''
  for (let i = 0; i <= shorterStr.length; i++) {
    previousRow.push(i);
  }

  // iterate through longerStr, starting with its first letter
  for (let i = 0; i < longerStr.length; i++) {
    currentRow = [i + 1];                             // first value of each row is always 1 greater than that of previous row - this is also i + 1
    for (let j = 0; j < shorterStr.length; j++) {
      currentRow.push(
        longerStr[i] === shorterStr[j]                // note that i/j is shifted for the strings vs the rows of nums
          ? previousRow[j]                            // num to the top left
          : Math.min(
              previousRow[j],                         // num to the top left
              previousRow[j + 1],                     // num above
              currentRow[j]                           // num to the left
            ) + 1
      );
    }
    previousRow = currentRow;                         // sub currentRow into previousRow
  }

  return currentRow[currentRow.length - 1];           // return last element of currentRow
}

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = levenshteinDistance;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  str1: '',
  str2: '',
};
expected = 0;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  str1: '',
  str2: 'abc',
};
expected = 3;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 3
input = {
  str1: 'abc',
  str2: 'abc',
};
expected = 0;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 4
input = {
  str1: 'abc',
  str2: 'abx',
};
expected = 1;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 5
input = {
  str1: 'abc',
  str2: 'abcx',
};
expected = 1;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 6
input = {
  str1: 'abc',
  str2: 'yabcx',
};
expected = 2;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 7
input = {
  str1: 'algoexpert',
  str2: 'algozexpert',
};
expected = 1;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 8
input = {
  str1: 'abcdefghij',
  str2: '1234567890',
};
expected = 10;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 9
input = {
  str1: 'abcdefghij',
  str2: 'a234567890',
};
expected = 9;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 10
input = {
  str1: 'biting',
  str2: 'mitten',
};
expected = 4;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 11
input = {
  str1: 'cereal',
  str2: 'saturday',
};
expected = 6;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 12
input = {
  str1: 'cereal',
  str2: 'saturdzz',
};
expected = 7;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 13
input = {
  str1: 'abbbbbbbbb',
  str2: 'bbbbbbbbba',
};
expected = 2;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 14
input = {
  str1: 'abc',
  str2: 'yabd',
};
expected = 2;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 15
input = {
  str1: 'xabc',
  str2: 'abcx',
};
expected = 2;
test(func, input, expected, testNum, lowestTest, highestTest);