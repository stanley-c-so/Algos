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

function solution_2 (words) {

  // SOLUTION 2 [
  //   O(C) time, where C is the total length of all words in the input list added together, N is the number of words in the input list, and U is the number of unique characters in the alphabet.
  //   - in worst case, it takes O(C) to initialize the adjacency list (as you may have to scan through nearly every character of each word)
  //   - DFS is O(V + E) where V is vertices and E is edges. there is only one vertex per unique letter, so V = U. for U characters, any pair has at most 1 edge, so E = U^2. however, we can also
  //     note that it is impossible for there to be more than N-1 edges, since we only generate edges between adjacent words and there are N words. so, upper bound for E is min(U^2, N)
  //   - combining the above, we get O(C + U + min(U^2, N)). but U is insignificant compared to C because U < C (you can't have more unique characters than total characters), so drop the U
  //   - now we have O(C + min(U^2, N)). but we don't know whether U^2 is smaller, or N.
  //   - if U^2 is smaller than N, and we know N < C (each word must be at least 1 character long), then C dominates
  //   - if N is smaller than U^2, then min(U^2, N) is N, and again, N < C (same reason as above), and C dominates
  //   - so, either way, we simplify to O(C)
  //   O(1) or (U + min(U^2, N)) space, because the list uses O(V + E) memory, and if you substitute with the analysis above, you get O(U + min(U^2, N)) for the general case. for the latin alphabet,
  //   we have U = 26, so O(26 + min(26^2, N)) = O(1).
  // ]:
  // edge case aside, in this solution we start by creating an adjacency list called `dependsOn`. what we do is we iterate through the input `words`, and for each ADJACENT pair, we compare the two strings
  // and find their first point of difference. this will help generate a "rule" that the letter in `word` goes before the letter in `word2`. (by the way, if `word2` runs out first before deviating, then
  // this is impossible, so we return ''. if `word1` runs out first before deviating, we have gained no information.) when a new "rule" is found, we update our adjacency list to reflect that the letter
  // in `word2` depends on the letter in `word1`.
  // after we have our completed adjacency list, we DFS through our graph. we keep a `seen` object that marks nodes we have already seen. the corresponding value is `false` if it is "gray" (i.e. we previously
  // encountered it, but never finished processing it) or `true` if it is "black" (we previously finished processing it). the key insight here is that if we ever run into a "gray" node, then there is a cycle
  // in the graph and the whole thing is impossible. we create a helper function called `visit` that, when fed a node, will visit that node. the helper function also itself returns a boolean representing
  // whether there is in absence of cycles by visiting that node (i.e. `false` means there is a cycle, `true` means there is not). the way visiting works is this: if the node is currently in the `seen` object
  // we simply return its corresponding value. (after all, if it is gray, then its value is `false`, and we have found a cycle, so our helper should return `false` for the absence of a cycle, and vice versa.)
  // otherwise, we are encountering the node for the first time. so, we mark it gray, and then we iterate through any nodes that this node depends on, recursing with helper. if ANY of those recursive calls
  // returns false, then we also return false immediately. otherwise, if we make it through the entire helper function, we mark this node black, add it to the output, and return true. outside of the helper
  // function, we call the helper on every node in the adjacency list. if at any time the helper comes back false, we have an impossible dictionary. otherwise, our `output` should have been compiled, so we
  // simply join it together.

  // EDGE CASE: INPUT 1 (input will be non-empty so there is no input 0)
  if (words.length === 1) {                           // leetcode does some kind of weird parsing, so you could just return `words[0]`. even if input is `['aab']` it thinks your output is 'ab'
    const letters = new Set();
    for (const c of words[0]) letters.add(c);
    return [...letters].join('');                     // if we just returned `words[0]`, what if there are repeat characters? do it this way to avoid repeat characters
  }
    
  // CREATE `dependsOn` ADJACENCY LIST: every unique char gets an empty set
  const dependsOn = words.reduce((list, word) => {
    for (const c of word) list[c] = new Set();
    return list;
  }, {});
    
  // FOR EVERY ADJACENT PAIR OF WORDS, FIND THE POINT OF DEVIATION AND SAVE THE RELATION IN LIST
  for (let i = 1; i < words.length; ++i) {
    const word1 = words[i - 1];
    const word2 = words[i];
    if (word1 === word2) continue;
    for (let j = 0; j < Math.max(word1.length, word2.length); ++j) {
      if (j === word2.length) return '';              // impossible for `word2` to be prefix of `word1`
      if (j === word1.length) break;                  // if `word1` is prefix of `word2`, no information
      if (word1[j] !== word2[j]) {
        dependsOn[word2[j]].add(word1[j]);
        break;
      }
    }
  }

  // DFS: USE A HELPER TO VISIT NODES. ITERATE THROUGH ALL NODES IN ADJACENCY LIST AND CALL `visit` ON THAT NODE. THE HELPER RETURNS A BOOLEAN INDICATING THE ABSENCE OF A CYCLE.
  const seen = {};                                    // when you visit a node, set its value to false ("gray"); when you finish processing it, set to true ("black")
  const output = [];                                  // this stores a valid order of letters as you find them. in the end we will join this together
  
  function visit (node) {                             // recursive `visit` returns `false` if cycle detected, or `true` otherwise
    if (node in seen) return seen[node];              // if node is "gray" (`seen[node]` is `false`) then there is a cycle, so we return `false`. else if it's "black" we return `true`
    seen[node] = false;                               // mark node as "gray"

    for (const incoming of [...dependsOn[node]]) {    // iterate through all nodes this node depends on, if any
      if (!visit(incoming)) return false;             // recurse on that node. if it comes back `false`, a cycle was detected, so we immediately return `false` to "bubble up" the detection of that cycle
    }
      
    seen[node] = true;                                // mark node as "black"
    output.push(node);                                // this letter can safely go next into the `output`!
    return true;                                      // we also return `true` because no cycle was found thus far
  }
    
  for (const node in dependsOn) {
    if (!visit(node)) return '';                      // if a cycle is detected anywhere, the dictionary is impossible, so return ''
  }
  
  return output.join('');                             // if entire adjacency list is processed, we should now have a complete `output`, so join it and return
}

// SWITCHING BETWEEN SOLUTIONS:
const alienOrder = solution_2;

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