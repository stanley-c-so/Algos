// SOURCE: SOURCE_HERE

// DESCRIPTION_HERE

// ----------

function solution_1 (INPUT_HERE) {

  // SOLUTION 1 [O(?) time, O(?) space]:
  // description

}

// SWITCHING BETWEEN SOLUTIONS:
const NAME_OF_ALGO_HERE = solution_1;

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = FUNCTION_NAME_HERE;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  ARG_1: 'INPUT_HERE',
};
expected = 'EXPECTED_HERE';
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  ARG_1: 'INPUT_HERE',
};
expected = 'EXPECTED_HERE';
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 3
input = {
  ARG_1: 'INPUT_HERE',
};
expected = 'EXPECTED_HERE';
test(func, input, expected, testNum, lowestTest, highestTest);