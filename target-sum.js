// SOURCE: LEETCODE https://leetcode.com/problems/target-sum/

// You are given a list of non-negative integers, a1, a2, ..., an, and a target, S. Now you have 2 symbols + and -. For each integer, you should choose one from + and - as its new symbol.

// Find out how many ways to assign symbols to make sum of integers equal to target S.

// Example 1:
// Input: nums is [1, 1, 1, 1, 1], S is 3. 
// Output: 5
// Explanation: 

// -1+1+1+1+1 = 3
// +1-1+1+1+1 = 3
// +1+1-1+1+1 = 3
// +1+1+1-1+1 = 3
// +1+1+1+1-1 = 3

// There are 5 ways to assign symbols to make the sum of nums be target 3.

// Note:
// The length of the given array is positive and will not exceed 20.
// The sum of elements in the given array will not exceed 1000.
// Your output answer is guaranteed to be fitted in a 32-bit integer.

// SWITCHING BETWEEN SOLUTIONS:
const findTargetSumWays = solution_2;

function solution_1 (nums, S) {

  // SOLUTION 1 [O(2^n) time, O(2^n) space - BUT THE PROBLEM STIPULATES THAT SUMS WILL NEVER EXCEED 1000, SO IT'S THE SMALLER OF 2^n AND 2000]:
  // instantiate a memo whose keys will be all possible totals you can reach as you iterate through the nums array. for each number in the array,
  // you will then look at all existing 'origin key'/value pairs, and increment the origin key by num, and also decrement the origin key by num -
  // in both cases the key at that new number should have its value increased by the value of the origin key. (the reason why this work needs to be
  // done in a separate memo is to avoid cross-contamination between old and new data which can result in double counting.) for the first num in
  // the nums array, the memo should have a key for +num and -num, with both values at 1 (or if num is 0 then it should have a key for 0 and a value
  // of 2). for all subsequent nums, make a new temporary memo to document all of the new reachable totals. then, reassign memo to newTotals. note
  // that some of the formerly reachable totals may no longer be reachable! in the end, return the value saved in the memo at key S (the target sum).

  // INITIALIZATIONS
  let memo = {};        // declared with 'let' because of reassigning

  // ITERATE THROUGH nums
  for (let num of nums) {
    if (!Object.keys(memo).length) {  // if memo is empty, process the first num and add to memo
      memo = num === 0
        ? {0: 2}                      // if num is 0, have to count it twice (because it could be +0 or -0)
        : {[num]: 1, [-num]: 1};
    } else {                          // in most cases (memo not empty), process the num into newTotals, then convert that into memo
      const newTotals = {};
      for (let key in memo) {
        newTotals[Number(key) + num] = (newTotals[Number(key) + num] || 0) + memo[Number(key)];   // add all the ways to go up (+num) from an old total to the new total
        newTotals[Number(key) - num] = (newTotals[Number(key) - num] || 0) + memo[Number(key)];   // add all the ways to go down (-num) from an old total to the new total
      }
      memo = newTotals;               // convert newTotals into memo
    }
  }

  return memo[S] || 0;    // note that the || 0 is necessary in case the target is unreachable (and therefore has no value in the memo)
}

function solution_2(nums, S) {

  // SOLUTION 2 [O(2^n) time, O(2^n) space - BUT THE PROBLEM STIPULATES THAT SUMS WILL NEVER EXCEED 1000, SO IT'S THE SMALLER OF 2^n AND 2000]:
  // this is very similar to above. imagine that the problem did not require +/- for each num, but simply required that each num is either "in"
  // (added to the total) or "out" (not added). algebra shows that the solution at key (total + S)/2 to this problem is identical to the solution
  // at key S of the original problem. here, just like above, the memo is instantiated with memo[0] === 1 (if firstNum is "out") and
  // memo[firstNum] === 1 (if firstNum is "in") (unless firstNum is 0, in which case memo[0] === 2, because the total is 0 whether firstNum is "in"
  // or "out"). for all subsequent nums, the new temporary memo, 'changes', stores all possible new totals ONLY IF THAT num IS "in", BECAUSE IF IT
  // IS "out" THEN THE OLD TOTALS DO NOT NEED TO CHANGE! if the new num is "in" then we grab the value at the "origin key", add num to the
  // "origin key", and increment by the "origin value". just like before, this work must be handled separately to avoid cross-contamination between
  // old and new data. then, rather than having the 'changes' memo replace the old memo, we simply add the new values in 'changes' to the original
  // memo (and no reassignment is necessary).

  // NOTE THAT THIS APPEARS TO RUN FASTER THAN THE SOLUTION ABOVE - PROBABLY BECAUSE LESS WORK IS BEING DONE FOR EACH num!

  const total = nums.reduce((t, n) => n + t);
  const memo = {};
  for (let num of nums) {
    if (!Object.keys(memo).length) {
      memo[0] = 1;
      memo[num] = (memo[num] || 0) + 1;
    } else {
      const changes = {};
      for (let key in memo) {
        changes[Number(key) + num] = (changes[Number(key) + num] || 0) + memo[key];
      }
      for (let key in changes) {
        memo[key] = (memo[key] || 0) + changes[key];
      }
    }
  }
  return memo[(total + S) / 2] || 0;  // note that the || 0 is necessary in case the target is unreachable (and therefore has no value in the memo)
}

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = findTargetSumWays;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  nums: [1, 1, 1, 1, 1],
  S: 3,
};
expected = 5;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  nums: [0, 0, 0, 0, 0, 0, 0, 0, 1],
  S: 1,
};
expected = 256;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 3
input = {
  nums: [9, 7, 0, 3, 9, 8, 6, 5, 7, 6],
  S: 2,
};
expected = 40;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 4
input = {
  nums: [1, 0, 2],
  S: 1,
};
expected = 2;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 5
input = {
  nums: [1, 2, 1, 2, 0],
  S: 0,
};
expected = 8;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 6
input = {
  nums: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  S: 0,
};
expected = 1048576;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 6
input = {
  nums: [1],
  S: 2,
};
expected = 0;
test(func, input, expected, testNum, lowestTest, highestTest);