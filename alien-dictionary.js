// SOURCE: LEETCODE (https://leetcode.com/problems/alien-dictionary/)

// There is a new alien language which uses the latin alphabet. However, the order among letters are unknown to you. You receive a list of non-empty words from the dictionary, where words are sorted lexicographically by the rules of this new language. Derive the order of letters in this language.

// Example 1:

// Input:
// [
//   "wrt",
//   "wrf",
//   "er",
//   "ett",
//   "rftt"
// ]

// Output: "wertf"

// Example 2:

// Input:
// [
//   "z",
//   "x"
// ]

// Output: "zx"

// Example 3:

// Input:
// [
//   "z",
//   "x",
//   "z"
// ] 

// Output: "" 

// Explanation: The order is invalid, so return "".

// Note:

// You may assume all letters are in lowercase.
// You may assume that if a is a prefix of b, then a must appear before b in the given dictionary.
// If the order is invalid, return an empty string.
// There may be multiple valid order of letters, return any one of them is fine.

// SWITCHING BETWEEN SOLUTIONS:
const alienOrder = solution_1;

function solution_1 (words) {

  // SOLUTION 1 [
  //   O(nl time (n is # of words, l is longest length. the first few steps of the algo are n time, but the biggest time sink is the queue. if each of your n words has l letters, then
  //   your queue will go through l "major cycles" (such that each major cycle adds up to n or fewer iterations) since 1 letter gets removed each time. thus, n*l),
  //   O(nl) space (prereqs object is arguably constant because at most 26 letters, 25 prereqs each. similarly, all sets/arrays such as lettersSeen or noPrereqs will have no more
  //   than 26 elements. however, the queue matters. n is # of words, l is longest length. the first element in queue takes up n*l characters in total. those words will be distributed 
  //   in some way into potentially 26 buckets, but it will still be at most n words, each of which will be at most (l - 1) length. whenever anything is added to the queue, the amount
  //   added will always be less than amount recently shifted out, so the space occupied by the queue should not exceed the initial nl)
  // ]:
  // in this solution we create a prereqs object where every unique letter found inside the alien dictionary will eventually be a key in prereqs, and the values will be sets containing
  // any letter that must go before the corresponding key. to build this, we will use a queue, where every element in the queue will be a subarray of words that have an equal basis of
  // comparison prior to its first letter. thus, the initial input will be the first element in the queue. (thereafter, all words beginning with the same letter will go into their own
  // subarrays and be added to the queue.)
  // (1) when analyzing a particular subarray of words, the first order of business is to make sure that the words within are properly grouped by first
  // letter. in other words, you shouldn't have something like ['axx', 'ayy', 'bxxx', 'azz'] because the a...b...a is invalid (a cannot be both before and after b).
  // if a violation is found we can immediately return '' because the entire alien dictionary is invalid.
  // (2) next, we iterate through the subarray of words. since we know the words are properly grouped by their first letters, we just need to iterate through the words, and every time
  // we encounter a new first letter, we will add all previously seen first letters to the prerequisite of the current first letter. additionally, we should start creating new
  // subarrays for each new first letter to enter the queue, and we should push in each word.slice(1) into that subarray, for future processing. for example, if the current block is
  // ['axx', 'byy', 'bzz'] we want to push in ['xx'] (for the a) followed by ['yy', 'zz'] (for the b).
  // after doing all of that, the prereqs object has now been properly constructed. this is now effectively a graph! the final step is to start building the output string. while the
  // output string has a length less than the total number of unique letters in the dictionary, we keep going. for every iteration, we search the prereqs object for letters that have no
  // prerequisites (set size is 0). we add these letters to a list of processedLetters, we delete the entries for those letters from the prereqs object, and we add that letter to the end
  // of output. if we find that no letters had zero prerequisites (i.e. the list of processedLetters is empty) then there must be a cycle in the graph, because every letter depends on
  // something else, and so the alien dictionary is invalid - return ''. otherwise, we simply run through the prereqs object a second time, removing all processedLetters from the sets
  // of all remaining letters.
  // eventually, if and when the while loop exits, then the alien dictionary is valid and the output string has been built out, so we return the output string as required.

  // INITIALIZE prereqs GRAPH
  const prereqs = {};                     // keys are letters, and values are a set of prerequisite letters that must go before the given letter
  
  // CONFIGURE prereqs OBJECT. EACH SET OF ENTRIES FROM THE QUEUE HAS EQUAL BASIS OF COMPARISON PRIOR TO ITS FIRST LETTER
  const queue = [words];                  // initialize with all words
  while (queue.length) {
    // shift out currentWords from queue
    const currentWords = queue.shift();
    
    // identical first letters must be adjacent. check for something like a...b...a which would invalidate the entire dictionary
    const lettersSeen = new Set();
    for (let i = 0; i < currentWords.length; i++) {
      if (i && currentWords[i][0] === currentWords[i - 1][0]) continue;   // same letter as previous? skip
      if (lettersSeen.has(currentWords[i][0])) return '';                 // else, it's a new letter. make sure you haven't seen it yet
      lettersSeen.add(currentWords[i][0]);                                // add this letter to the list of letters seen
    }
    
    // update the prerequisites
    lettersSeen.clear();                                                  // this now represents all letters seen so far for each new block
    for (let i = 0; i < currentWords.length; i++) {
      const char = currentWords[i][0];
      if (!i || char !== currentWords[i - 1][0]) {                        // if new letter...
        if (!(char in prereqs)) prereqs[char] = new Set();                  // (initialize prereqs entry if necessary)
        prereqs[char] = new Set([...prereqs[char], ...lettersSeen]);        // add all letters seen so far in this block to the prereqs for this char
        lettersSeen.add(char);                                              // add this char to letters seen so far in this block
        queue.push([]);                                                   // set up new subarray (new queue entry) for this letter. it's possible this will be empty, but that's fine
      }
      if (currentWords[i].length > 1) {                                   // whether or not new letter, if and only if there are letters after current char
        queue[queue.length - 1].push(currentWords[i].slice(1));             // then push those remaining letters into the latest queue entry (there will always be something)
      }
    }
  }
  
  // BUILD output STRING BASED ON prereqs OBJECT
  let output = '';
  const totalLetters = Object.keys(prereqs).length;         // this is simply the number of unique letters found anywhere in the dictionary. each letter should have a prereqs entry
  while (output.length < totalLetters) {
    const noPrereqs = [];                                   // this holds letters with no prerequisites, which can therefore be added to output
    for (const letter in prereqs) {                         // pass 1: find and process all letters with no prereqs
      if (!prereqs[letter].size) {                          // if a letter has no prereqs, then process it
        noPrereqs.push(letter);
        output += letter;
        delete prereqs[letter];
      }
    }
    if (!noPrereqs.length) return '';                       // if you didn't find any prereqs, then you have a cycle in the graph - invalid!
    for (const letter in prereqs) {                         // pass 2: delete all processed letters from the prereqs of all remaining letters
      for (const processedLetter of noPrereqs) {
        prereqs[letter].delete(processedLetter);
      }
    }
  }

  return output;
}

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = alienOrder;
const sortedFunc = (...args) => func(...args).split('').sort();         // used when the order of the output does not matter (NOTE: SLIGHTLY TWEAKED HERE)
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  words: [],
};
expected = '';
test(sortedFunc, input, expected.split('').sort(), testNum, lowestTest, highestTest);

// Test case 2
input = {
  words: ['wrt', 'wrf', 'er', 'ett', 'rftt'],
};
expected = 'wertf';
test(sortedFunc, input, expected.split('').sort(), testNum, lowestTest, highestTest);

// Test case 3
input = {
  words: ['z', 'x'],
};
expected = 'zx';
test(sortedFunc, input, expected.split('').sort(), testNum, lowestTest, highestTest);

// Test case 4
input = {
  words: ['z', 'x', 'z'],
};
expected = '';
test(sortedFunc, input, expected.split('').sort(), testNum, lowestTest, highestTest);

// Test case 5
input = {
  words: ['aa', 'abb', 'aba'],
};
expected = '';
test(sortedFunc, input, expected.split('').sort(), testNum, lowestTest, highestTest);