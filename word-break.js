// SOURCE: LEETCODE (https://leetcode.com/problems/word-break/)

// Given a non-empty string s and a dictionary wordDict containing a list of non-empty words, determine if s can be segmented into a space-separated sequence of one or more dictionary words.

// Note:

// The same word in the dictionary may be reused multiple times in the segmentation.
// You may assume the dictionary does not contain duplicate words.

// Example 1:

// Input: s = "leetcode", wordDict = ["leet", "code"]
// Output: true
// Explanation: Return true because "leetcode" can be segmented as "leet code".

// Example 2:

// Input: s = "applepenapple", wordDict = ["apple", "pen"]
// Output: true
// Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
// Note that you are allowed to reuse a dictionary word.

// Example 3:

// Input: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
// Output: false

// SWITCHING BETWEEN SOLUTIONS:
const wordBreak = solution_1;

function solution_1 (s, wordDict) {

  // SOLUTION 1 [O(n^2) time, O(n) space]:
  // we use a DP approach here. the key is to consider the input string starting with only its first letter, and determine true/false whether it can be built up with our dictionary.
  // then, include the second letter, and repeat. keep including mroe and more letters until you get to the end, and you should have your ultimate answer for the entire string. of
  // course, the analysis is assisted by the true/false data from previous strings. as we consider a new string (after a new letter is added), all we need to do is check that there
  // was some earlier string that was true, and that the rest of the string after that point up to the current ending is also a word in our dictionary. if and only if this is true,
  // then this string can also be made up with our dictionary words. the way this plays out in the code is to make a memo array 1 longer than the length of the string. index 0 of
  // the array will correspond to the empty string '' (and will be set to true, because an empty string can always be made regardless of the dictionary), while the rest should be
  // initialized to false. we do a nested for loop as we iterate through the rest of the string. the outer for loop represents the end (inclusive) of the current string we are
  // considering, and goes from 1 to end <= s.length (memo is 1 longer than string). the inner for loop represents the start, and goes from 0 to start < end. if memo[start] is true
  // (meaning that the substring from beginning up to start position can be made with our dictionary) AND the substring from start to end is also inside our dictionary, then this
  // entire string being considered should be marked true, so memo[end] is set to true (and we break to end analysis for this end position). ultimately, we just return the final
  // value in our memo array. note that i immediately decide to use 'betterDict' which is a set based on wordDict which allows for faster lookup - it takes O(d) to build the set
  // once, but then O(1) lookup thereafter, instead of O(d) lookup each time.

  // EDGE CASES (ALTHOUGH THERE IS NO NEED, GIVEN THAT THE PROBLEM STATES THAT s AND wordDict WILL ALWAYS BE NON-EMPTY)
  if (!s) return true;                  // empty string --> true, regardless of the state of the dictionary
  if (!wordDict.length) return false;   // empty dictionary --> false, unless string is also empty (but that would have been captured above)

  // INITIALIZATIONS
  const betterDict = new Set(wordDict);             // for faster dictionary lookup - not strictly necessary because you could always use wordDict.includes(...)

  const memo = Array(s.length + 1).fill(false);     // position 0 corresponds to '', 1 to first letter, etc. T/F is whether the string up to and including that point can be formed.
  memo[0] = true;                                   // empty string can always be made by not choosing any of the dictionary words

  // ITERATE THROUGH SUBSTRINGS. THE OUTER LOOP WILL BE THE END OF THE SUBSTRING (1 to s.length - 1) AND THE INNER LOOP WILL BE THE START (0 to end - 1)
  // NOTE: end AND start INDICES WILL BE RELATIVE TO THE MEMO, NOT THE STRING
  for (let end = 1; end <= s.length; end++) {                     // begin at 1 because memo[0] is already true. end <= s.length (not <) because memo is 1 longer than string
    for (let start = 0; start < end; start++) {                   // begin at 0. increment start up to but excluding end.
      if (memo[start] && betterDict.has(s.slice(start, end))) {   // don't need to shift start and end, because the same indices are already shifted between memo and string
        memo[end] = true;                                         // position end is true if at any point before it there is another true, and the substring b/w that and end is a word
        break;                                                    // this break is not strictly necessary but no further analysis of this end position is needed if we mark it true
      }
    }
  }

  // RETURN TRUTH STATE CORRESPONDING TO FINAL POSITION IN MEMO WHICH REPRESENTS THE FULL STRING
  return memo[s.length];
}

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = wordBreak;
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  s: 'leetcode',
  wordDict: ['leet', 'code'],
};
expected = true;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  s: 'applepenapple',
  wordDict: ['apple', 'pen'],
};
expected = true;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 3
input = {
  s: 'catsandog',
  wordDict: ['cats', 'dog', 'sand', 'and', 'cat'],
};
expected = false;
test(func, input, expected, testNum, lowestTest, highestTest);

"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab"
["a","aa","aaa","aaaa","aaaaa","aaaaaa","aaaaaaa","aaaaaaaa","aaaaaaaaa","aaaaaaaaaa"]

// Test case 4
input = {
  s: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab',
  wordDict: ['a', 'aa', 'aaa', 'aaaa', 'aaaaa', 'aaaaaa', 'aaaaaaa', 'aaaaaaaa', 'aaaaaaaaa', 'aaaaaaaaaa'],
};
expected = false;
test(func, input, expected, testNum, lowestTest, highestTest);