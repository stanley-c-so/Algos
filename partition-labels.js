// SOURCE: LEETCODE (https://leetcode.com/problems/partition-labels/submissions/)

// A string S of lowercase letters is given. We want to partition this string into as many parts as possible so that each letter appears in at most one part, and return a list of integers representing the size of these parts.

// Example 1:

// Input: S = "ababcbacadefegdehijhklij"
// Output: [9,7,8]

// Explanation:
// The partition is "ababcbaca", "defegde", "hijhklij".
// This is a partition so that each letter appears in at most one part.
// A partition like "ababcbacadefegde", "hijhklij" is incorrect, because it splits S into less parts.

// Note:

// S will have length in range [1, 500].
// S will consist of lowercase letters ('a' to 'z') only.

// SWITCHING BETWEEN SOLUTIONS:
const partitionLabels = solution_3;

function solution_1 (S, start = 0, letterTerminals) {

  // SOLUTION 1 [O(n^2) time, O(n) space]:
  // this solution takes in the input string, and proceeds to chop up the first possible partition from the left, and returns an array of the length of that partition,
  // concatenated with a recursive call on the remainder of the string. in the base case, if the cut index reaches S.length, then we have reached the end of the string,
  // so we return an array of the length of the current string segment. the way the logic works for finding the partition is as follows: first, we populate a memo called
  // letterTerminals that iterates through every letter of the string and tracks the indices of their first and last appearance. then, we iterate through every possible
  // index where a partition can be made (starting at 1) and evaluates whether that index is either less than or equal to the first appearance OR greater than the last
  // appearance for EVERY letter in the memo - if so, then this is a valid partition, because for each letter, every occurrence of that letter either appears before or
  // after that cut. whenever a valid cut is found, we slice from the beginning of the string to the cut position, and concatenate it with a recursed call of this function
  // on the remainder of the string. in the base case, we simply return the entire (sub)string in array form. thus, eventually, the original call of our function should
  // return a single array of partitioned strings. notice that all the cut positions will be found from left to right, but every candidate cut position needs to be evaluated
  // against the terminal positions of every letter - hence the quadratic time.

  // STEP 1: IF ORIGINAL CALL OF THIS FUNCTION, POPULATE letterTerminals
  if (!letterTerminals) {
    letterTerminals = {};
    for (let i = 0; i < S.length; i++) {
      if (!(S[i] in letterTerminals)) {
        letterTerminals[S[i]] = {first: i, last: i};
      } else {
        letterTerminals[S[i]].last = i;
      }
    }
  }

  // STEP 2: ITERATE THROUGH STRING - WHENEVER A VALID PARTITION IS FOUND, FIND ITS LENGTH
  for (let i = start + 1; i < S.length; i++) {
    if (Object.keys(letterTerminals).every(letter =>
      i <= letterTerminals[letter].first || i > letterTerminals[letter].last  // valid partition if for every letter, every occurrence of the letter is before or after cut
    )) {
      return [i - start].concat(partitionLabels(S, i, letterTerminals));      // recursive case - slice from beginning up to the cut, and recurse on the remainder of (sub)string
    }
  }

  return [S.length - start];      // base case - no more cuts can be made on this (sub)string - return entire (sub)string in array form
}

function solution_2 (S) {

  // SOLUTION 2 [O(n^2) time, O(n) space]:
  // same as above, but in iterative form instead of recursive, thus eliminating the call stack.

  // POPULATE letterTerminals
  const letterTerminals = {};
  for (let i = 0; i < S.length; i++) {
    if (!(S[i] in letterTerminals)) {
      letterTerminals[S[i]] = {first: i, last: i};
    } else {
      letterTerminals[S[i]].last = i;
    }
  }

  // OTHER INITIALIZATIONS
  const output = [];
  let start = 0;        // start index of current segment

  // ITERATE THROUGH STRING - WHENEVER A VALID PARTITION IS FOUND, FIND ITS LENGTH
  for (let i = 1; i <= S.length; i++) {
    if (i === S.length || Object.keys(letterTerminals).every(letter =>        // note that if i === S.length we have reached the end so we can short circuit this condition
      i <= letterTerminals[letter].first || i > letterTerminals[letter].last  // valid partition if for every letter, every occurrence of the letter is before or after cut
    )) {
      output.push(i - start);                                                 // the length of the valid segment is i (current index) - start (start index of the segment)
      start = i;                                                              // reset start index for next segment
    }
  }

  return output;
}

function solution_3 (S) {

  // SOLUTION 3 [O(n) time, O(n) space]:
  // similar to above, we are greedily going from left to right and finding each valid cut position as they come. however, here, we have a more efficient way of checking if a candidate
  // cut position is valid. instead of checking it against the terminals of each letter, instead we can apply the following logic: if our leftmost partition includes the first letter,
  // then there is no way we can end the partition until after the final occurrence of the first letter. (assume that this is somewhere in the middle of the string.) so, we must include
  // the next letter in the partition. but that may be a different letter, which may have an even later terminal. the idea, then, is to keep incrementing i along the string, updating
  // the highestTerminal with each iteration as appropriate. eventually when we reach a point when i === highestTerminal, we know that we have found a valid cut position. we will
  // add what we have so far into an output array, then set up to find the next partition, until we cover the entire string. this requires only one pass through the string. note that
  // the memo only needs the last occurrence for each letter - the first occurrence is irrelevant. also, note that we do not even have to store the string partitions, since ultimately
  // we only care aobut their lengths - so instead of pushing the substrings into the output array, just push their lengths.

  // STEP 1: FIND LETTER TERMINALS
  const letterTerminals = {};
  for (let i = 0; i < S.length; i++) {
    letterTerminals[S[i]] = i;
  }
  
  // STEP 2: GREEDILY FIND SMALLEST POSSIBLE LEFT PARTITION, AND REPEAT UNTIL WHOLE STRING IS PROCESSED
  const output = [];                                  // stores the string partitions as we find them
  let partitionStart = 0;                             // initial values
  let highestTerminal = letterTerminals[S[0]];        // initial values
  for (let i = 0; i < S.length; i++) {
    highestTerminal = Math.max(highestTerminal, letterTerminals[S[i]]);   // update highestTerminal?
    if (i === highestTerminal) {                                          // if i hits highestTerminal then that's a partition
      output.push(highestTerminal - partitionStart + 1);
      if (i < S.length - 1) {                                             // only update if not last letter, else crash
        partitionStart = highestTerminal + 1;
        highestTerminal = letterTerminals[S[partitionStart]];
      }
    }
  }
  
  return output;
}

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = partitionLabels;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  S: 'abccaddbeffe',
};
expected = [8, 4];
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  S: 'ababcbacadefegdehijhklij',
};
expected = [9, 7, 8];
test(func, input, expected, testNum, lowestTest, highestTest);

// // Test case 3
// input = {
//   S: 'INPUT_HERE',
// };
// expected = 'EXPECTED_HERE';
// test(func, input, expected, testNum, lowestTest, highestTest);