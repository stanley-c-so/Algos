// SOURCE: LEETCODE (https://leetcode.com/explore/interview/card/bloomberg/68/array-and-strings/2920/)

// Given a string, find the length of the longest substring without repeating characters.

// Example 1:
// Input: "abcabcbb"
// Output: 3 
// Explanation: The answer is "abc", with the length of 3. 

// Example 2:
// Input: "bbbbb"
// Output: 1
// Explanation: The answer is "b", with the length of 1.

// Example 3:
// Input: "pwwkew"
// Output: 3
// Explanation: The answer is "wke", with the length of 3. 

// Note that the answer must be a substring, "pwke" is a subsequence and not a substring.

// SWITCHING BETWEEN SOLUTIONS:
const lengthOfLongestSubstring = solution_1;

function solution_1 (s) {

  // SOLUTION 1 [O(n) time, O(n) space]:
  // keep a `set` that tracks all the unique characters in your current substring. initialize `left` at position 0. initialize `longest` at 0 (this automatically handles the edge case of an empty
  // string input). run a for loop through the input string with `right` tracking the index. the current `char` is the letter at `s[right]`. either this is a new letter, or else it's already in
  // the set. if it's a new letter, then add it to the set, and update `longest` (`right - left + 1`, if that exceeds the current value of `longest`) - note that the only time a record can be
  // broken is when you're adding a new letter to the set like this! otherwise, if it's not a new letter, then you need to move `left` up until you move just past the first occurrence of the letter.
  // along the way, make sure you evict every letter you come across from the `set`, since you are now excluding those from your current string.

  // INITIALIATIONS: `set`, `longest`, `left`
  const set = new Set();
  let longest = 0;
  let left = 0;

  // RUN `right` THROUGH THE INPUT STRING
  for (let right = 0; right < s.length; ++right) {
    const char = s[right];
    if (!set.has(char)) {                                 // if `char` is a new letter, great! add it to the `set` and update `longest` if necessary
      set.add(char);
      longest = Math.max(longest, right - left + 1);
    } else {
      while (s[left] !== char) {                          // if `char` is a repeat letter, you have to increment `left` until you move past the first occurrence of that letter
        set.delete(s[left]);                              // make sure that along the way you evict all letters `left` comes across from the set
        left++;
      }
      left++;                                             // fencepost problem - after reaching the letter, increment `left` one more time. (you don't have to remove the letter from the set)
    }
  }
  return longest;
}

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = lengthOfLongestSubstring;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  s: 'abcabcbb',
};
expected = 3;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  s: 'bbbbb',
};
expected = 1;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 3
input = {
  s: 'pwwkew',
};
expected = 3;
test(func, input, expected, testNum, lowestTest, highestTest);