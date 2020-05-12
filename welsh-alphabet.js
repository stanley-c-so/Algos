// SOURCE: A friend tells me she was asked this by Bloomberg.

// Given the welsh alphabet: `a b c ch d dd e f ff g ng h i j l ll m n o p ph r rh s t th u w y` and a list of strings, how would you sort the strings according to that alphabet?
// (Rules are that double letter character preceeds single letter character, e.g. if a word contains "ng", it corresponds to the character "ng", not to "n" and "g").

// Example 1:
// Input: ['yellow', 'apple', 'llama', 'loom', 'apple']
// Output: ['apple', 'apple', 'loom', 'llama', 'yellow']
// Explanation: Although 'l' comes before 'o', 'llama' should come AFTER 'look' because 'll' comes after 'l'

// Example 2:
// Input: ['yellow', 'rim', 'boy', 'yellow', 'ring']
// Output: ['boy', 'ring', 'rim', 'yellow', 'yellow']
// Explanation: Although 'm' comes before 'n', 'rim' should come AFTER 'ring' because 'm' comes after 'ng'

// SWITCHING BETWEEN SOLUTIONS:
const welshAlphabet = solution_1;

function solution_1 (words) {

  // SOLUTION 1 [O(l * n log n) time, where l is the length of the longest word, because each comparison takes l time, O(1) space (`dictionary` takes constant space)]:
  // first, build out a dictionary of index values based on the welsh alphabet - we use these index values as a basis of determining alphabetical order. then all we have to do is sort the input
  // array based on a custom sorting function. given two words, `a` and `b`, the first thing we should check is if the words are the same - if they are we can return 0 immediately. otherwise,
  // initialize a `pointer` at 0. run an indefinite loop (`while (true)` is good enough) which will iterate through the two words, letter by letter, and return a negative or positive based on the
  // first point at which the two words deviate. the first thing we should check is whether `pointer` is out of bounds for one of these two words - if `a` is done, return -1; if `b` is done, return
  // 1 (it is impossible for both cases to be true). otherwise, `pointer` is still in bounds for both words, so next we have to see what the current letter is for each word. for each word, if
  // `pointer` is not pointing at the final letter, AND the current letter combined with the following letter is one of our `doubleLetters`, then that's the letter. otherwise, it is a single letter.
  // once the letters have been determined, we simple check if there's a mismatch. if so, compare the difference of their dictionary index values and return. if they match, however, then `pointer`
  // must advance - by 1 for a single letter, or 2 for a double letter.

  // INTIALIZATIONS
  const dictionary = 'a b c ch d dd e f ff g ng h i j l ll m n o p ph r rh s t th u w y'
    .split(' ')
    .reduce((dict, letter, i) => {
      dict[letter] = i;
      return dict;
    }, {});

  // SORT FUNCTION
  return words.sort((a, b) => {
    if (a === b) return 0;                                                                        // if the two words being compared are the same, return 0
    let pointer = 0;                                                                              // initialize `pointer`
    while (true) {                                                                                // run a loop indefinitely
      if (pointer === a.length) return -1;                                                        // if `pointer` is out of bounds for word `a`, then word `a` comes first
      if (pointer === b.length) return 1;                                                         // (likewise for `b` - note, it's impossible for both words to end at the same time before a mismatch)
      const letterA = pointer < a.length - 1 && a.slice(pointer, pointer + 2) in dictionary       // find current letter for `a`...
        ? a.slice(pointer, pointer + 2)                                                             // ...if it can be a double letter, then that's what it is
        : a[pointer];                                                                               // ...otherwise, it's just the single letter
      const letterB = pointer < b.length - 1 && b.slice(pointer, pointer + 2) in dictionary       // (likewise for `b`)
        ? b.slice(pointer, pointer + 2)
        : b[pointer];
      if (letterA === letterB) {
        pointer += letterA.length;                                                                // if the letters are the same, `pointer` needs to advance (1 for single letter, 2 for double)
      } else {
        return dictionary[letterA] - dictionary[letterB];                                         // else, a mismatch has been found, so compare index values to figure out which word goes first
      }
    }
  });
}

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = welshAlphabet;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  words: ['yellow', 'apple', 'llama', 'loom', 'apple'],
};
expected = ['apple', 'apple', 'loom', 'llama', 'yellow'];
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  words: ['yellow', 'rim', 'boy', 'yellow', 'ring'],
};
expected = ['boy', 'ring', 'rim', 'yellow', 'yellow'];
test(func, input, expected, testNum, lowestTest, highestTest);