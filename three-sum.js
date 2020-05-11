// SOURCE: LEETCODE (https://leetcode.com/explore/interview/card/bloomberg/68/array-and-strings/2921/)

// Given an array nums of n integers, are there elements a, b, c in nums such that a + b + c = 0? Find all unique triplets in the array which gives the sum of zero.

// Note:

// The solution set must not contain duplicate triplets.

// Example:

// Given array nums = [-1, 0, 1, 2, -1, -4],

// A solution set is:
// [
//   [-1, 0, 1],
//   [-1, -1, 2]
// ]

// SWITCHING BETWEEN SOLUTIONS:
const threeSum = solution_1;

function solution_1 (nums) {

  // SOLUTION 1 [O(n^2) time, O(n) space]:
  // O(n^2) time is unavoidable for this problem based on the extra dimension, so it's actually worthwhile to sort this array (the O(n log n) sort time won't affect the overall time complexity).
  // my preferred approach, then, is to sort, and then run a for loop through all possible values for the first number of a set (i.e. excluding the last 2 numbers) and running the sorted 2 sum
  // algorithm on the remainder of the numbers. the trick, though, is to make sure we are only including unique solutions. since the numbers are sorted, repeats will be adjacent to one another.
  // this allows us to skip over repeats. (we need to check for repeats both in the outer loop, as well as among the inner 2 sum portion of the algorithm.)

  // INITIALIZATIONS
  const output = [];
  // if (nums.length < 3) return output;                    // UNNECESSARY EDGE CASE HANDLING: if `nums` had fewer than 3 chars, then the for loop wouldn't run, and we would return `[]`

  // SORT `nums`, BECAUSE ULTIMATELY OUR O(n^2) TIME MAKES THE SORT PROCESS ACCEPTABLE
  nums.sort((a,b) => a - b);

  // RUN A FOR LOOP THROUGH ALL POSSIBLE FIRST NUMBERS, AND APPLY 2 SUM ALGORITHM OVER THE SPREAD OF REMAINING NUMBERS
  for (let i = 0; i < nums.length - 2; ++i) {               // this iterates through all possible values of the first number in a triplet
    if (i && nums[i] === nums[i - 1]) continue;             // this skips already processed values for the first number: if current num is equal to the previous, then skip
    let left = i + 1;                                       // initialize `left` for 2 sum
    let right = nums.length - 1;                            // initialize `right` for 2 sum
    const target = -nums[i];                                // the target for `nums[left] + nums[right]` is the negative of the current num
    while (left < right) {
      if (nums[left] + nums[right] < target) {
        left++;
      } else if (nums[left] + nums[right] > target) {
        right--;
      } else {
        output.push([nums[i], nums[left], nums[right]]);                                      // push unique solution to `output`. next, we need to make sure we don't grab duplicates
        const leftAnchor = nums[left];                                                        // `leftAnchor` keeps a reference to original value of `nums[left]`
        const rightAnchor = nums[right];                                                      // `rightAnchor` keeps a reference to original value of `nums[right]`
        while (left < right && nums[left] === leftAnchor && nums[right] === rightAnchor) {    // keep moving indices closer if they're both pointing to values that match their anchors
          left++;
          right--;
        }
      }
    }
  }

  // RETURN OUTPUT
  return output;
}

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = threeSum;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  nums: [-1, 0, 1, 2, -1, -4],
};
expected = [
  [-1, 0, 1],
  [-1, -1, 2],
];
test(sortedFunc, input, expected.sort(), testNum, lowestTest, highestTest);