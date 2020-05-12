// SOURCE: LEETCODE (https://leetcode.com/problems/sliding-window-maximum/)

// Given an array nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position. Return the max sliding window.

// Example:

// Input: nums = [1,3,-1,-3,5,3,6,7], and k = 3
// Output: [3,3,5,5,6,7] 
// Explanation: 

// Window position                Max
// ---------------               -----
// [1  3  -1] -3  5  3  6  7       3
//  1 [3  -1  -3] 5  3  6  7       3
//  1  3 [-1  -3  5] 3  6  7       5
//  1  3  -1 [-3  5  3] 6  7       5
//  1  3  -1  -3 [5  3  6] 7       6
//  1  3  -1  -3  5 [3  6  7]      7

// Note:
// You may assume k is always valid, 1 ≤ k ≤ input array's size for non-empty array.

// Follow up:
// Could you solve it in linear time?

// SWITCHING BETWEEN SOLUTIONS:
const maxSlidingWindow = solution_1;

function solution_1 (nums, k) {

  // SOLUTION 1 [O(n) time, O(n) space]:
  // this is a good use case for a stack. the stack will contain potential max values for present or future window slices. the invariant will be that the numbers stored in this stack
  // will always be loosely decreasing (i.e. never increasing). in the for loop below i have numbered the steps as 1, 2a, 2b, and 3. before we reach index k - 1 (the full size of the
  // window), only steps 2a and 2b will do anything. here, the key insight is that every new number should be pushed to the stack, as it MAY be a potential maximum of some window in
  // the future (step 2b). however, any time we push things to the stack, we must first make sure to shift out anything from the right end that is less than the incoming number (step
  // 2a), thus ensuring that the numbers inside the stack are always loosely decreasing. this makes sense: let's say the most recent number is 1 greater than the previous number. then
  // that previous number can no longer ever be a window maximum, because it would always be beaten by the incoming number. once we finally reach the full window, at the very end of
  // our iteration (order is important), we do step 3, which is to push the current max (represented by the leftmost element in maxStack) into the output. on all following iterations,
  // we need to start evicting elements from the left end of our window; this is step 1: if the number being evicted is the current leftmost element in maxStack, shift maxStack.

  // INITIALIZATIONS
  const output = [];
  const maxStack = [];
  
  // ITERATE THROUGH nums
  for (let i = 0; i < nums.length; i++) {

    // STEP 1: (i >= k) IF NUMBER TO BE SHIFTED OUT OF WINDOW IS CURRENTLY FIRST IN maxStack, SHIFT IT OUT OF maxStack
    if (i >= k && nums[i - k] === maxStack[0]) {
      maxStack.shift();
    }
    
    // STEP 2a: (always) POP FROM maxStack UNTIL THE LATEST ELEMENT IS NOT SOMETHING LESS THAN CURRENT NUM
    while (maxStack.length && maxStack[maxStack.length - 1] < nums[i]) {
      maxStack.pop();
    }
    
    // STEP 2b: (always) PUSH CURRENT NUM INTO maxStack
    maxStack.push(nums[i]);

    // STEP 3: (i >= k - 1) ONCE THE FULL WINDOW HAS ENTERED THE ARRAY, PUSH THE CURRENT BIGGEST NUMBER INTO output
    if (i >= k - 1) output.push(maxStack[0]);
  }
  
  return output;  
}

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = maxSlidingWindow;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  nums: [],
  k: 0,
};
expected = [];
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  nums: [1, 3, -1, -3, 5, 3, 6, 7],
  k: 3,
};
expected = [3, 3, 5, 5, 6, 7];
test(func, input, expected, testNum, lowestTest, highestTest);