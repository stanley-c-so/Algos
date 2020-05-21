// SOURCE: A friend tells me that this problem was asked by Bloomberg.

// Given a string, reduce the string by removing 3 or more consecutive identical characters. (If removing consecutive characters results in another block of 3 or more characters, remove that too - keep removing until you can no longer remove.) You should greedily remove characters from left to right.

function solution_1 (str) {

  // SOLUTION 1 [O(n^2) time (the number of recursions is possibly proportional to n, and each time we recurse, we have to run through the string again), O(n) space (call stack)]:
  // iterate through the string, starting at i = 2, and look for any 3 in a row. as soon as one is found, we greedily excise it from the input string (in case the current block
  // is more than only 3 in a row, we use a second pointer to run all the way through the block) and then recurse with our new string. the base case will come after the for loop:
  // if the for loop terminates without ever hitting a 3 in a row (or if str.length <= 2 and so the for loop never enters) then we simply return str as is.

  // ITERATE THROUGH str STARTING FROM i = 2
  for (let i = 2; i < str.length; i++) {
    if (str[i] === str[i - 1] && str[i] === str[i - 2]) {     // RECURSIVE CASE: if 3+ in a row is found...
      let j = i;                                                // initialize j at i...
      while (str[j] === str[i]) j++;                            // ...then increment j until it does not point to the same letter
      return candyCrush(str.slice(0, i - 2) + str.slice(j));    // recurse the candyCrush function on a version of str excluding the current 3+ in a row block
    }
  }

  // BASE CASE
  return str;                                                 // if str.length <= 2 or str has no 3+ in a row, return str as is
}

function solution_2 (str) {

  // SOLUTION 2 [O(n) time, O(n) space]:
  // use a stack to store every letter that will make up the ultimate output string. iterate through every letter with a for loop, always pushing each letter into the stack.
  // then, check if adding the current letter resulted in 3 in a row by comparing it against the second and third items in the stack. if so, pop out the 3 letters, and then
  // keep iterating i to skip over any more of the same letter (thus skipping those iterations of the for loop). at the very end, join and return.

  // INITIALIZE STACK
  const stack = [];

  // ITERATE THROUGH EVERY CHARACTER
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    stack.push(char);                       // always push in current character
    if (                                    // check for 3 in a row
      stack.length >= 3
      && char === stack[stack.length - 3]
      && char === stack[stack.length - 2]
    ) {
      stack.pop();                          // pop out the 3...
      stack.pop();
      stack.pop();
      while (str[i + 1] === char) i++;      // ...and skip past any more of the same letter by directly incrementing i
    }
  }

  return stack.join('');
}

function solution_3 (str) {

  // SOLUTION 3 [O(n) time, O(n) space]:
  // similar to solution 1, except without directly manipulating i. instead, we use a `skip` boolean. whenever a 3 in a row is detected, set skip to true. the very first thing
  // we check at each iteration is if skip is true and if the current letter is the same as the previous letter - if so, we don't process it. otherwise, any time a new letter is
  // encountered, we set skip to false.

  // INITIALIZE STACK AND skip BOOLEAN
  const stack = [];
  let skip = false;

  // ITERATE THROUGH EVERY CHARACTER
  for (let i = 0; i < str.length; i++) {
    if (skip && str[i] === str[i - 1]) continue;    // if `skip` is set to true AND current letter is the same as previous, skip this iteration
    skip = false;                                   // otherwise, reset `skip` to false
    if (                                            // otherwise, always check if the current letter creates a 3 in a row
      stack.length >= 2
      && str[i] === stack[stack.length - 1]
      && str[i] === stack[stack.length - 2]
    ) {
      stack.pop();                                  // if 3 in a row, pop out the 2, and set `skip` to true (in case we have to skip any subsequent letters)
      stack.pop();
      skip = true;                                  // any time you find 3 in a row, set `skip` to true
    } else {                                        // if no 3 in a row, push current character into the stack
      stack.push(str[i]);
    }
  }

  return stack.join('');
}

// SWITCHING BETWEEN SOLUTIONS:
const candyCrush = solution_3;

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = candyCrush;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  str: '',
};
expected = '';
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  str: 'abc',
};
expected = 'abc';
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 3
input = {
  str: 'aaaaaaab',
};
expected = 'b';
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 4
input = {
  str: 'aabbbcc',
};
expected = 'aacc';
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 5
input = {
  str: 'aaaaaaaaabbbccddddddee',
};
expected = 'ccee';
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 6
input = {
  str: 'aabbbbbac',
};
expected = 'c';
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 7
input = {
  str: 'aabbaabbcccbabad',
};
expected = 'd';
test(func, input, expected, testNum, lowestTest, highestTest);