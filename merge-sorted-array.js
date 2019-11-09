// SOURCE: LEETCODE (https://leetcode.com/problems/merge-sorted-array/)

// Given two sorted integer arrays nums1 and nums2, merge nums2 into nums1 as one sorted array.

// (IMPORTANT: the problem says not to return anything, but to modify nums1 in place. for purposes of this repo, i will make the function invoke a helper, then return nums1.)

// Note:

// The number of elements initialized in nums1 and nums2 are m and n respectively.
// You may assume that nums1 has enough space (size that is greater or equal to m + n) to hold additional elements from nums2.

// Example:

// Input:
// nums1 = [1,2,3,0,0,0], m = 3
// nums2 = [2,5,6],       n = 3

// Output: [1,2,2,3,5,6]

// SWITCHING BETWEEN SOLUTIONS:
const merge = solution_1;

function solution_1 (nums1, m, nums2, n) {

  // SOLUTION 1 [O(m + n) time, O(1) space]:
  // we start by moving the m elements in nums1 to the end of nums1 (like right-justifying it). it is important to do this from right to left, or else we can potentially overwrite
  // data if nums1 is long and nums2 is short. once that is done, we use 3 pointers: (1) at the beginning of the right-justified data in nums1, (2) at the beginning of nums2, and
  // (3) at the beginning of nums1 (for writing). we do a for loop with m + n iterations. with each one, we compare the number at the nums1 'read' pointer with the nums2 pointer (or
  // if one pointer has already gone past the end, then we default to the other one) and we write the appropriate number into nums1 'write' pointer.

  const actual_solution = () => {

    // STEP 1: SHIFT EVERYTHING IN nums1 TO THE END, STARTING FROM THE mth POSITION AND GOING RIGHT TO LEFT (TO PREVENT OVERWRITING DATA)
    for (let i = 0; i < m; i++) {
      nums1[nums1.length - 1 - i] = nums1[m - 1 - i];
    }

    // STEP 2: SET POINTERS FOR nums1 (read), nums1 (write), AND nums2 (read), ITERATE THROUGH WRITE INDICES AND GRAB NEXT NUMBER FROM EITHER pointer1 OR pointer2
    let pointer1 = nums1.length - m;
    let pointer2 = 0;
    let outputPointer = 0;
    for (let i = 0; i < m + n; i++) {
      if (pointer2 === nums2.length || nums1[pointer1] <= nums2[pointer2]) {      // if pointer2 has reached the end OR if pointer1 is pointing at a lower number
        nums1[outputPointer] = nums1[pointer1];
        pointer1++;
      } else {                                                                    // note: if pointer1 has reached the end, then the above if condition will spit out false
        nums1[outputPointer] = nums2[pointer2];
        pointer2++;
      }
      outputPointer++;
    }
  };
  actual_solution();      // the actual solution should not return anything, but modify nums1 in place. here, we wrap the actual solution with a main function that invokes and returns
  return nums1;
}

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = merge;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  nums1: [1, 2, 3, 0, 0, 0],
  m: 3,
  nums2: [2, 5, 6],
  n: 3,
};
expected = [1, 2, 2, 3, 5, 6];
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  nums1: [2, 0],
  m: 1,
  nums2: [1],
  n: 1,
};
expected = [1, 2];
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 3
input = {
  nums1: [1],
  m: 1,
  nums2: [],
  n: 0,
};
expected = [1];
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 3
input = {
  nums1: [1, 1, 1, 0, 0, 0],
  m: 3,
  nums2: [2, 2, 2],
  n: 3,
};
expected = [1, 1, 1, 2, 2, 2];
test(func, input, expected, testNum, lowestTest, highestTest);