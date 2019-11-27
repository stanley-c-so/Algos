// SOURCE: ALGOEXPERT

// Given a non-empty array of integers, write a function that returns an array of length 2. The first element in the output array should be an
// integer value representing the greatest sum that can be generated from a strictly-increasing subsequence in the array. The second element
// should be an array of the numbers in that subsequence. A subsequence is defined as a set of numbers that are not necessarily adjacent but
// that are in the same order as they appear in the array. Assume that there will be only be one increasing subsequence with the greatest sum.

// SWITCHING BETWEEN SOLUTIONS:
const maxSumIncreasingSubsequence = solution_2;

function solution_2 (array) {

  // SOLUTION 1 [O(2^n) time, O(2^n) space]:
  // as you iterate through nums in the array, find all subsequences that could possibly end with num. thus you need to handle 2 possibilities: (1) num stands alone, or (2) num is tacked on
  // to the end of an existing subsequence. for (1), update highestSoFar if num breaks the record, and in every case, add subsequence [num] to the key of num if no subsequence already exists.
  // for (2), look at all existing "origin" keys in the memo, and for each one, if and only if the final number in the "origin" subsequence is less than num, you are permitted to concatenate
  // num to the end of the subsequence - calculate the newTotal (and update highestSoFar if newTotal breaks the record), and set the new subsequence at the new key if no subsequence already
  // exists there. (note that in both cases, the memo is only updated if no entry already exists - this is necessary because there is a chance that in calculating newTotal you could reach an
  // existing key which can already be reached without num, so if you replace it with a subsequence ending in num, you eliminate the chance of adding num to the end of the new subsequence.)

  // INITIALIZATIONS
  const memo = {};
  let highestSoFar = -Infinity;

  // ITERATE THROUGH ARRAY
  for (let num of array) {

    // FIRST, CONSIDER THE POSSIBILITY THAT num STANDS ALONE
    if (num > highestSoFar) highestSoFar = num;   // num itself is a potential record holder
    memo[num] = memo[num] || [num];               // [num] is always a subsequence, but DO NOT update memo if an entry already exists at num. we may wish to add num to that subsequence!

    // SECOND, CYCLE THROUGH EXISTING KEYS TO CHECK FOR SUBSEQUENCES WHERE num COULD BE ADDED ON TO THE END...
    for (let key in memo) {
      const subsequence = memo[key];
      if (subsequence[subsequence.length - 1] < num) {                // IMPORTANT: num could only be added on to a subsequence with a final number less than num
        const newTotal = Number(key) + num;
        if (newTotal > highestSoFar) highestSoFar = newTotal;         // newTotal is a potential record holder
        memo[newTotal] = memo[newTotal] || subsequence.concat(num);   // DO NOT update memo if an entry already exists at newTotal. we may wish to add num to that subsequence!
      }
    }
  }

  return [highestSoFar, memo[highestSoFar]];      // return record holder, and the subsequence associated with the record holder
}

function solution_2 (array) {

  // SOLUTION 2 [O(n^2) time, O(n) space]:
  // iterate through the array, and determine the highest total that could be reached for a subsequence ending at this number. to do so, look at same for all previous numbers in the array (hence O(n^2)),
  // and grab whichever total is highest, such that that number is still less than the current number. this is now a possibility. however, the other possibility is that you should simply begin and end
  // with the current number (because, for example, the prior highest total is negative). whichever case is better, save that to a memo array. additionally, if it was determined that the best result
  // involves tacking on to an earlier subsequence, have a second memo array to track previous indices (such that the number in the array is the index value of the previous number to tack on to, or
  // is null if the number at that position is the first in the subsequence). after iterating through the entire array, it should be clear what the highest possible sum is. moreover, based on the array of
  // previous indices, you should be able to trace backward and figure out which numbers are represented in that subsequence. navigate through that and build up an array representing that subsequence, and
  // then return.

  const highestSumEndingHere = [];
  const arrayOfPreviousIndex = Array(array.length).fill(null);
  let highestSum = -Infinity;
  let highestSumIndex;

  for (let i = 0; i < array.length; i++) {
    
    // FIRST, CONSIDER IF BEST RESULT ENDING AT CURRENT NUM REQUIRES TACKING ON CURRENT NUM TO THE END OF AN EXISTING SUBSEQUENCE...
    let highestSumBeforeThisIndex = -Infinity;
    for (let j = 0; j < i; j++) {                                                         // examine all previous nums
      if (array[j] < array[i] && highestSumEndingHere[j] > highestSumBeforeThisIndex) {   // IMPORTANT: only if current num is greater than num being examined
        highestSumBeforeThisIndex = highestSumEndingHere[j];
        arrayOfPreviousIndex[i] = j;
      }
    }
    highestSumEndingHere[i] = array[i] + (highestSumBeforeThisIndex === -Infinity ? 0 : highestSumBeforeThisIndex);   // if highestSumBeforeThisIndex === -Infinity then no updates were made

    // SECOND, CONSIDER IF BEST RESULT ENDING AT CURRENT NUM IS ACTUALLY JUST STARTING AT CURRENT NUM...
    if (array[i] > highestSumEndingHere[i]) {
      highestSumEndingHere[i] = array[i];         // overwrite highestSumEndingHere[i] to simply array[i]
      arrayOfPreviousIndex[i] = null;             // overwrite arrayOfPreviousIndex[i] to null since there will be no previous index anymore
    }

    // FINALLY, UPDATE THE OVERALL RECORD TRACKERS, highestSum AND highestSumIndex
    if (highestSumEndingHere[i] > highestSum) {
      highestSum = highestSumEndingHere[i];
      highestSumIndex = i;
    }
  }

  // AT THIS POINT, YOU KNOW THE HIGHEST SUM. NOW, GENERATE THE HIGHEST SUBSEQUENCE THAT PRODUCES IT BY LEVERAGING arrayOfPreviousIndex
  const highestSubsequence = [array[highestSumIndex]];      // initialize highestSubsequence with the final number in the subsequence
  let currentIndex = highestSumIndex;                       // initialize currentIndex
  while (arrayOfPreviousIndex[currentIndex] !== null) {     // now, trace backward in the chain by leveraging arrayOfPreviousIndex, stopping when previous index is null
    currentIndex = arrayOfPreviousIndex[currentIndex];      // first, update currentIndex to go backward in the chain...
    highestSubsequence.unshift(array[currentIndex]);        // ...then, unshift that number into highestSubsequence
  }
  
  return [highestSum, highestSubsequence];
}

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = maxSumIncreasingSubsequence;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  array: [1],
};
expected = [1, [1]];
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  array: [-1],
};
expected = [-1, [-1]];
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 3
input = {
  array: [-1, 1],
};
expected = [1, [1]];
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 4
input = {
  array: [5, 4, 3, 2, 1],
};
expected = [5, [5]];
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 5
input = {
  array: [1, 2, 3, 4, 5],
};
expected = [15, [1, 2, 3, 4, 5]];
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 6
input = {
  array: [-5, -4, -3, -2, -1],
};
expected = [-1, [-1]];
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 7
input = {
  array: [10, 70, 20, 30, 50, 11, 30],
};
expected = [110, [10, 20, 30, 50]];
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 8
input = {
  array: [8, 12, 2, 3, 15, 5, 7],
};
expected = [35, [8, 12, 15]];
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 9
input = {
  array: [10, 15, 4, 5, 11, 14, 31, 25, 31, 23, 25, 31, 50],
};
expected = [164, [10, 11, 14, 23, 25, 31, 50]];
test(func, input, expected, testNum, lowestTest, highestTest);