// SOURCE: LEETCODE (https://leetcode.com/problems/search-in-rotated-sorted-array-ii/)

// Suppose an array sorted in ascending order is rotated at some pivot unknown to you beforehand.

// (i.e., [0,0,1,2,2,5,6] might become [2,5,6,0,0,1,2]).

// You are given a target value to search. If found in the array return true, otherwise return false.

// Example 1:

// Input: nums = [2,5,6,0,0,1,2], target = 0
// Output: true

// Example 2:

// Input: nums = [2,5,6,0,0,1,2], target = 3
// Output: false

// Follow up:

// This is a follow up problem to Search in Rotated Sorted Array, where nums may contain duplicates.
// Would this affect the run-time complexity? How and why?

// SWITCHING BETWEEN SOLUTIONS:
const search = solution_1;

function solution_1 (nums, target) {

  // SOLUTION 1 [O(log n) time, O(log n) space (call stack, which will go at most log n stacks high at a time)]:
  // similar solution to the regular search-in-rotated-sorted-array problem, but what if your middle number is the same as both left and right? then you have no information to go on, and
  // you cannot determine whether the break exists in the left half or the right, and you cannot eliminate either half. so you have no choice but to search both. as such, i decided to go
  // with a recursive helper function, and in the event that the above situation arises, i just recurse on both halves.

  // RECURSIVE HELPER FUNCTION: RETURNS `true` OR `false` FOR WHETHER `target` CAN BE FOUND WITHIN THE GIVEN RANGE
  function helper (left, right) {
    while (left <= right) {
      const middle = Math.floor((right - left) / 2) + left;
      if (nums[middle] === target) return true;
      else if (nums[left] < nums[middle]) {
        if (nums[left] <= target && target < nums[middle]) {
          right = middle - 1;
        } else {
          left = middle + 1;
        }
      } else if (nums[left] > nums[middle]) {
        if (nums[middle] < target && target <= nums[right]) {
          left = middle + 1;
        } else {
          right = middle - 1;
        }
      } else {
        return helper(left, middle - 1) || helper(middle + 1, right);     // we only need to recurse if we have the situation where `nums[left] === nums[middle]`
      }
    }
    return false;
  }
  return helper(0, nums.length - 1);                                      // kick start the search by feeding in 0 for `left` and `nums.length - 1` for `right`
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
  nums: [2, 5, 6, 0, 0, 1, 2],
  target: 0,
};
expected = true;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  nums: [2, 5, 6, 0, 0, 1, 2],
  target: 3,
};
expected = false;
test(func, input, expected, testNum, lowestTest, highestTest);