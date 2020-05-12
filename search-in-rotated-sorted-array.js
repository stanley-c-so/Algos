// SOURCE: LEETCODE (https://leetcode.com/explore/interview/card/bloomberg/72/sorting-and-searching/405/)

// Suppose an array sorted in ascending order is rotated at some pivot unknown to you beforehand.

// (i.e., [0,1,2,4,5,6,7] might become [4,5,6,7,0,1,2]).

// You are given a target value to search. If found in the array return its index, otherwise return -1.

// You may assume no duplicate exists in the array.

// Your algorithm's runtime complexity must be in the order of O(log n).

// Example 1:

// Input: nums = [4,5,6,7,0,1,2], target = 0
// Output: 4

// Example 2:

// Input: nums = [4,5,6,7,0,1,2], target = 3
// Output: -1

// SWITCHING BETWEEN SOLUTIONS:
const search = solution_1;

function solution_1 (nums, target) {

  // SOLUTION 1 [O(log n) time, O(1) space]:
  // the range between `left` and `right`, inclusive, will indicate the possible values where `target` might be found in our array. thus, `left` starts at 0, and `right` starts at `nums.length - 1`.
  // we will continue inside of a while loop as long as `left <= right`, i.e. the range of possible values spans at least one number. we will always begin by calculating `middle` (we'll round down,
  // but it doesn't matter). the control flow will be as follows: (1) if `nums[middle]` is our `target`, we have our answer. if `target` exists anywhere in our array, we will eventually find it with
  // this line of code. otherwise, the logic splits depending on WHETHER THE LEFTMOST NUMBER EXCEEDS THE MIDDLE NUMBER. why? because from this, we can ascertain which half must not contain the break,
  // and we can ask whether `target` falls within range of the unbroken half (and if so, we search it, and if not, we have no choice but to search the other half that most likely IS broken). thus,
  // (2) if the leftmost number does not exceed the middle number, we know that the break cannot be in the left half. if `target` is in range there, search it, else, search the right half. likewise,
  // (3) if the leftmost number DOES exceed the middle number, we know that the break cannot be in the right half. again, if `target` is in range there, search it, else, search the left half.

  // INITIALIZATIONS
  let left = 0;                                               // `left` is the leftmost index where we might find `target` - it starts at 0
  let right = nums.length - 1;                                // `right` is the rightmost index where we might find `target` - it starts at `nums.length - 1`

  // LOOP WHILE THE WINDOW OF POSSIBLE VALUES SPANS AT LEAST ONE NUMBER
  while (left <= right) {
    const middle = Math.floor((right - left) / 2) + left;     // (we write it this way so there is no integer overflow)
    if (nums[middle] === target) return middle;               // FIRST, we check for a match - in the end, if `target` exists, this will be the line that returns it
    if (nums[left] <= nums[middle]) {                         // as long as leftmost number is not bigger than the middle, the break can't be in the left half
      if (target < nums[middle] && target >= nums[left]) {    // if `target` is within the range of numbers represented in the left half, we need to search the left half
        right = middle - 1;
      } else {                                                // otherwise, `target` is not within the range of numbers represented in the left half, so we need to search the right half
        left = middle + 1;
      }
    } else {                                                  // if the leftmost number is bigger than the middle, the break can't be in the right half
      if (target > nums[middle] && target <= nums[right]) {   // if `target` is within the range of numbers represented in the right half, we need to search the right half
        left = middle + 1;
      } else {
        right = middle - 1;                                   // otherwise, `target` is not within the range of numbers represented in the right half, so we need to search the left half
      }
    }
  }
  return -1;                                                  // if the window of possible values closes without finding `target`, then it must not exist in the array, so return -1
}

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = search;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  nums: [4, 5, 6, 7, 0, 1, 2],
  target: 0,
};
expected = 4;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  nums: [4, 5, 6, 7, 0, 1, 2],
  target: 3,
};
expected = -1;
test(func, input, expected, testNum, lowestTest, highestTest);