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
  // to save space (and not have to create a new array), the key to doing this problem is to write from the "end" (i.e. index `m + n - 1` of 
  // `nums1`) where there is already empty space. we can initialize a `write` pointer at this index. we also initialize read pointers called
  // `pointer1` and `pointer2` which will iterate through the data portions of `nums1` and `nums2` from back to front. each time we pick the
  // smaller number and write that into `nums1` from the back.

  // INITIALIZATIONS
  let write = m + n - 1;      // the key is to set these all at the back
  let pointer1 = m - 1;
  let pointer2 = n - 1;

  // ITERATE `write` POINTER THROUGH `m + n` POSITIONS OF `nums1`, FORM BACK TO FRONT
  while (write >= 0) {
    if (
      pointer2 < 0 ||                                       // choose from `nums1` if `pointer2` is done, OR,
      pointer1 >= 0 && nums1[pointer1] > nums2[pointer2]    // `pointer1` is NOT done, AND its number is smaller than that of `pointer2`
    ) {
      nums1[write] = nums1[pointer1];                       // always write into `nums1`
      pointer1--;                                           // decrement `pointer1`
    } else {
      nums1[write] = nums2[pointer2];                       // always write into `nums1`
      pointer2--;                                           // decrement `pointer2`
    }
    write--;                                                // always decrement `write`
  }

  // NO RETURN. WE ARE ONLY MODIFYING `nums1` IN PLACE
}

const specialTest = (...args) => {
  merge(...args);                     // since our function won't return anything, we will use `specialTest` to call the function on the input...
  return args[0];                     // ...and then return `nums1` (the first argument) from the input, which was modified by the function call
};

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = merge;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
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
test(specialTest, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  nums1: [2, 0],
  m: 1,
  nums2: [1],
  n: 1,
};
expected = [1, 2];
test(specialTest, input, expected, testNum, lowestTest, highestTest);

// Test case 3
input = {
  nums1: [1],
  m: 1,
  nums2: [],
  n: 0,
};
expected = [1];
test(specialTest, input, expected, testNum, lowestTest, highestTest);

// Test case 4
input = {
  nums1: [1, 1, 1, 0, 0, 0],
  m: 3,
  nums2: [2, 2, 2],
  n: 3,
};
expected = [1, 1, 1, 2, 2, 2];
test(specialTest, input, expected, testNum, lowestTest, highestTest);