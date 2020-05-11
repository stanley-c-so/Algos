// SOURCE: LEETCODE (https://leetcode.com/explore/interview/card/bloomberg/68/array-and-strings/402/)

// Given an array of characters, compress it in-place.
// The length after compression must always be smaller than or equal to the original array.
// Every element of the array should be a character (not int) of length 1.
// After you are done modifying the input array in-place, return the new length of the array.

// Follow up:
// Could you solve it using only O(1) extra space?
 
// Example 1:

// Input:
// ["a","a","b","b","c","c","c"]

// Output:
// Return 6, and the first 6 characters of the input array should be: ["a","2","b","2","c","3"]

// Explanation:
// "aa" is replaced by "a2". "bb" is replaced by "b2". "ccc" is replaced by "c3".
 
// Example 2:

// Input:
// ["a"]

// Output:
// Return 1, and the first 1 characters of the input array should be: ["a"]

// Explanation:
// Nothing is replaced.
 
// Example 3:

// Input:
// ["a","b","b","b","b","b","b","b","b","b","b","b","b"]

// Output:
// Return 4, and the first 4 characters of the input array should be: ["a","b","1","2"].

// Explanation:
// Since the character "a" does not repeat, it is not compressed. "bbbbbbbbbbbb" is replaced by "b12".
// Notice each digit has it's own entry in the array.
 
// Note:
// All characters have an ASCII value in [35, 126].
// 1 <= len(chars) <= 1000.

// SWITCHING BETWEEN SOLUTIONS:
const compress = solution_1;

function solution_1 (chars) {

  // SOLUTION 1 [O(n) time, O(1) space]:
  // we have to analyze the string in terms of blocks of common letters. use `anchor` and `write` variables initialized at 0, and run a for loop with `read` as the index through the `chars` array.
  // the purpose of `anchor` is to always be at the beginning of the current letter block. `read` runs all the way to the end of a letter block. when it gets to the end (because either it's at the
  // final index position, or the next letter does not match the current one), we grab the current letter and write it, and increment `write`. then, we check if `read` is ahead of `anchor` (i.e.
  // whether the current letter block was more than just 1 letter long) and if so we know we have to continue with writing the length of the block. so we calculate that distance and convert it to
  // a string. then we iterate through the length of that string and continue the write process. at the end of this, we set `anchor` to 1 ahead of `read`, since in the next iteration, `read` is
  // just about to increment and therefore `anchor` and `read` will begin the next letter block at the same position.

  let anchor = 0;
  let write = 0;
  for (let read = 0; read < chars.length; ++read) {
    if (read === chars.length - 1 || chars[read + 1] !== chars[read]) { // if `read` is at final value, OR the next char does not match current, then you're at the end of a letter block
      chars[write] = chars[anchor];                                     // `anchor` was previously set to the start of this letter block, so `write` grabs the letter of this letter block
      write++;                                                          // `write` needs to advance, and possibly write a number (in string form) next
      if (read > anchor) {                                              // if `read > anchor` then this letter block has length greater than 1
        const distance = String(read - anchor + 1);                     // convert the length of the letter block into string form
        for (const digit of distance) {                                 // write the distance into the subsequent positions
          chars[write] = digit;
          write++;
        }
      }
      anchor = read + 1;                                                // bring `anchor` to 1 index ahead of `read` (in the next iteration, `read` goes up, so they will both be at start of a block)
    }
  }
  return write;                                                         // the index of `write` will be the length of the new array, because it always ends 1 position after its final write.
}

const specialTest = chars => {
  return {
    output: compress(chars),                                            // here, we grab the output returned by our function
    input: chars,                                                      // and we also inspect the state of the original input
  }
};

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = specialTest;                                               // we are using `specialTest` because we have to test both the input array as well as the return value
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  chars: ["a","a","b","b","c","c","c"],
};
expected = {
  output: 6,
  input: ["a","2","b","2","c","3","c"],                             // i.e. first 6 chars of input are ["a","2","b","2","c","3"]
};
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  chars: ["a"],
};
expected = {
  output: 1,
  input: ["a"],                                                     // i.e. first 1 char of input is ["a"]
};
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 3
input = {
  chars: ["a","b","b","b","b","b","b","b","b","b","b","b","b"],
};
expected = {
  output: 4,
  input: ["a","b","1","2","b","b","b","b","b","b","b","b","b"],     // i.e. first 4 chars of input are ["a","b","1","2"]
};
test(func, input, expected, testNum, lowestTest, highestTest);