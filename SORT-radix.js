// SOURCE: UDEMY's JAVASCRIPT ALGORITHMS AND DATA STRUCTURES MASTERCLASS (BY COLT STEELE)

// Finally, you're ready to implement Radix Sort! Write a function called `radixSort` which accepts an array of numbers and sorts them in ascending order.

// You'll need to make use of the helper functions from the previous exercises here. Good luck!

// SWITCHING BETWEEN SOLUTIONS:
const radixSort = solution_1;

function solution_1 (nums) {

  // SOLUTION 1 [O(nk) time (where n is the length of the array, and k is the max 'word length' among the numbers), O(n + k) space]:
  // we initialize a `storage` array which will at most have 10 subarray 'buckets' representing the digits from 0 to 9. for our sort process, if the num with the most digits has k
  // digits, we will make a total of k iterations, starting with the ones digits, then the tens digits, etc. each time, we treat both the original input array, nums, and the storage
  // array like queues (as it is important to preserve order) - we move (using .shift) the nums from the nums array to storage, except we sort them in the appropriate bucket based
  // on the current digit place of interest (ones, tens, etc...). so if a number has 5 in the digit place of interest, we push it into the bucket at index 5 of the storage array.
  // once all nums have been processed, push the contents of the various buckets (we must go in order from 0 to 9) back into the nums array. after we have done k iterations and pushed
  // all nums back into the nums array as before, it will be sorted.
  // note the use of the helper function, getDigit, which allows us to see the ith digit (counting from right to left) of a given num (or return 0 if no digit, e.g. the '3rd' digit of
  // 2 is 0).
  // NOTE: DOES NOT PROPERLY HANDLE NEGATIVE NUMBERS!

  // INITIALIZATIONS
  const storage = [];                                                     // will have 10 'buckets' (subarrays) for labeled 0-9 at those indices
  const numOfIterations = nums.reduce(
    (longest, num) => Math.max(longest, num.toString().length), 0
  );

  // HELPER FUNCTION
  function getDigit(num, i) {
    const numStr = num.toString();
    return i < numStr.length ? parseInt(numStr[numStr.length - 1 - i]) : 0;
  }

  // FOR EACH DIGIT PLACE...
  for (let digitPlace = 0; digitPlace < numOfIterations; digitPlace++) {  // digitPlace represents the digit (starting from rightmost being 0, going left)
      while(nums.length) {                                                // treat the input nums array itself as a queue, and process all nums in order
          const num = nums.shift();
          const digit = getDigit(num, digitPlace);                        // grab digit from the right using helper function
          storage[digit] = storage[digit] || [];                          // instantiate an empty bucket at that digit, if necessary
          storage[digit].push(num);                                       // push the entire num into the appropriate bucket
      }
      storage.forEach((store, label) => {                                 // note: will only iterate through non-empty buckets, in ascending order
          nums.push(...store);                                            // push contents of each bucket back into nums array - ready for next iteration
          delete storage[label];                                          // clear the bucket
      })
  }

  // nums ARRAY IS SORTED AND READY TO BE RETURNED
  return nums;
}

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = radixSort;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  nums: [8, 6, 1, 12],
};
expected = [1, 6, 8, 12];
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  nums: [10, 100, 1, 1000, 10000000],
};
expected = [1, 10, 100, 1000, 10000000];
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 3
input = {
  nums: [902, 4, 7, 408, 29, 9637, 1556, 3556, 8157, 4386, 86, 593],
};
expected = [4, 7, 29, 86, 408, 593, 902, 1556, 3556, 4386, 8157, 9637];
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 4
input = {
  nums: [1, 0, 1, 0],
};
expected = [0, 0, 1, 1];
test(func, input, expected, testNum, lowestTest, highestTest);