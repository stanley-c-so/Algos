// SOURCE: LEETCODE https://leetcode.com/problems/first-missing-positive/

// Given an unsorted integer array, find the smallest missing positive integer.

// Example 1:
// Input: [1, 2, 0]
// Output: 3

// Example 2:
// Input: [3, 4, -1, 1]
// Output: 2

// Example 3:
// Input: [7, 8, 9, 11, 12]
// Output: 1

// Note:
// Your algorithm should run in O(n) time and uses constant extra space.

// SWITCHING BETWEEN SOLUTIONS:
const firstMissingPositive = solution_1;

function solution_1 (nums) {

  // SOLUTION 1 [O(n) time, O(1) space]:
  // this uses a similar to trick to the problem of finding the sole unrepresented number in an array that otherwise
  // contains numbers from 1 to some n (with all other numbers being represented any number of times). there, the trick
  // is to iterate through the array, and for each element, search that index value, and turn the corresponding element
  // negative (whether or not it is already negative). after all that is done, start at index 1, and stop at the first
  // element that is NOT negative - that index value is the unrepresented number, because negatives mark indices as
  // visited. this works in linear time and constant space (but modifies the input array in place).

  // how do we leverage that technique here? just like before, when you come across a given element, you want to go to
  // that index value and turn the corresponding element negative to mark it as visited. however, this problem allows for
  // 0s and negative numbers. obviously, -0 is the same as 0, and numbers that start off as negative are not necessarily
  // visited. so how can we distinguish between visited/unvisited 0s and negatives? we can do the following:

  // pass #1: 'sanitize' the array by turning all 0s and negatives to null;
  // pass #2: now, process the array using the trick described above. if we come across a null, turn it into any negative
  // number (i use -Infinity for dramatic effect). notice that unvisited nulls remain null.
  // pass #3: now, grab the index of the first number (starting at i === 1) that is either positive or null.

  // it is possible that you will exit the final for loop after pass #3 with no result. this indicates that all numbers
  // from 1 ... n (where n is array length) are represented, but we still don't know whether n itself has been represented
  // in the array! therefore, we should set a boolean isNRepresented to false at the start, and then in pass #2, we should
  // separately check if n is ever found, and if so, set it to true. ultimately, if the final for loop is exited, then we
  // return n + 1 if n was represented, and n if not.

  // EDGE CASES - input has length of 0:
  if (!nums.length) return 1;

  // EDGE CASE TRACKER: IF INDICES 1 ... n IN FINAL ARRAY ARE NEGATIVE, NEED TO SEE IF
  // n WAS EVER REPRESENTED IN THE ARRAY (WHERE n === nums.length)
  let isNRepresented = false;

  // MAKE EVERY NON-POSITIVE NUMBER IN ARRAY null (0 AND NEGATIVES MUST BE DISTINGUISHED FROM VISITED POSITIVES)
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] <= 0) nums[i] = null;
  }

  // ITERATE THROUGH ARRAY, TURNING NEGATIVE THOSE NUMS AT THE INDICES OF REPRESENTED NUMS
  for (let i = 0; i < nums.length; i++) {
    if (Math.abs(nums[i]) === nums.length) isNRepresented = true;   // update isNRepresented tracker
    if (Math.abs(nums[i]) < nums.length) {
      nums[Math.abs(nums[i])] = nums[Math.abs(nums[i])] === null
        ? -Infinity   // if nums[i] was originally an unvisited 0 or negative, -Infinity now marks it as visited
        : -Math.abs(nums[Math.abs(nums[i])]);
    }
  }

  // FIND THE MISSING NUM BY GRABBING INDEX OF FIRST POSITIVE (OR null) NUM, STARTING AT i === 1 (THE LOWEST POSSIBLE ANSWER)
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === null || nums[i] > 0) return i;
  }

  // IF THE FINAL FOR LOOP EXITS, WE ONLY NEED TO SEE IF n WAS REPRESENTED. IF NOT, THAT'S THE ANSWER. IF SO, ADD 1
  return isNRepresented ? nums.length + 1 : nums.length;
}

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = firstMissingPositive;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  nums: [1, 2, 0],
};
expected = 3;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  nums: [3, 4, -1, 1],
};
expected = 2;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 3
input = {
  nums: [7, 8, 9, 11, 12],
};
expected = 1;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 4
input = {
  nums: [2, 1],
};
expected = 3;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 5
input = {
  nums: [1, 1000],
};
expected = 2;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 6
input = {
  nums: [1, 2, 3],
};
expected = 4;
test(func, input, expected, testNum, lowestTest, highestTest);
// Test case 7
input = {
  nums: [1, 0, 3, 3, 0, 2],
};
expected = 4;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 8
input = {
  nums: [0, -1, 3, 1],
};
expected = 2;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 9
input = {
  nums: [],
};
expected = 1;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 10
input = {
  nums: [1],
};
expected = 2;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 11
input = {
  nums: [2],
};
expected = 1;
test(func, input, expected, testNum, lowestTest, highestTest);