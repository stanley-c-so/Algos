// SOURCE: LEETCODE (https://leetcode.com/problems/generate-parentheses/)

// Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

// For example, given n = 3, a solution set is:

// [
//   "((()))",
//   "(()())",
//   "(())()",
//   "()(())",
//   "()()()"
// ]

// ----------

function solution_1 (n) {

  // SOLUTION 1 [O(?) time (leetcode says this is the nth Catalan number, or 1/(n+1) * (2n c n), which is bounded asymptotically by 4^n / (n rt n)), O(?) space (leetcode says this is the same as time)]:
  // imagine we were to draw out each of the possible next moves based on the string so far, in the form of a tree. what this algorithm does, then, is that it performs a DFS based on that tree.
  // the base case is when we have filled out a string in its entirety. another situation is if `open === close` because then the next move to make must be '('. another situation is wif `open === n` because
  // the next move to make must be ')'. otherwise, either one is acceptable. notice that these cases are mutually exclusive.

  // INITIALIZATION: output array
  const output = [];

  // HELPER FUNCTION: takes in a possible value of `str` so far, along with the number of `open` and `close` parentheses it contains
  function helper (str = '', open = 0, close = 0) {
    if (str.length === n * 2) output.push(str);                   // base case: when the length of `str` is double the value of `n`, we are done - we can push to `output`
    else if (open === close) helper(str + '(', open + 1, close);  // if the number of `open` and `close` parentheses so far is equal, our only choice is to pick '(' next. recurse accordingly
    else if (open === n) helper(str + ')', open, close + 1);      // if the number of `open` parentheses so far is equal to `n`, our only choice going forward is to pick ')'. recurse accordingly
    else {                                                        // if none of the above apply, then we can go either way, so recurse with both options
      helper(str + '(', open + 1, close);
      helper(str + ')', open, close + 1);
    }
  }
  helper();                                                       // kick-start the recursive process by calling `helper` (since it has default values we don't have to provide any arguments!)
  return output;
}

function solution_2 (n) {

  // SOLUTION 2 [O(?) time (leetcode says this is the nth Catalan number, or 1/(n+1) * (2n c n), which is bounded asymptotically by 4^n / (n rt n)), O(?) space (leetcode says this is the same as time)]:
  // this works out to be the same as above, but rather than dealing with mutually exclusive cases, we simply ask when it would be acceptable for the next move to be '(' (and we recurse if this is possible),
  // and likewise for ')'. in situations where both are viable, then both of those statements will run.

  // INITIALIZATION: output array
  const output = [];

  // HELPER FUNCTION: takes in a possible value of `str` so far, along with the number of `open` and `close` parentheses it contains
  function helper (str = '', open = 0, close = 0) {
    if (str.length === n * 2) {                                   // base case (now with a return statement to break out of the `helper`)
      output.push(str);
      return;
    }
    if (open < n) helper(str + '(', open + 1, close);             // as long as we have fewer than `n` open parentheses, it is always possible to have an open parenthesis next
    if (close < open) helper(str + ')', open, close + 1);         // as long as we have fewer close than open parentheses, it is always possible to have a close parenthesis next
  }
  helper();                                                       // kick-start the recursive process by calling `helper` (since it has default values we don't have to provide any arguments!)
  return output;
}

// SWITCHING BETWEEN SOLUTIONS:
const generateParenthesis = solution_2;         // (yes, this is how they spell the name of the function on leetcode)

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = generateParenthesis;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  n: 3,
};
expected = [
  '((()))',
  '(()())',
  '(())()',
  '()(())',
  '()()()',
];
test(sortedFunc, input, expected.sort(), testNum, lowestTest, highestTest);