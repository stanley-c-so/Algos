// SOURCE: LEETCODE https://leetcode.com/problems/find-the-duplicate-number/

// Given an array nums containing n + 1 integers where each integer is between 1 and n(inclusive), prove that at least one duplicate number must exist.Assume that there is only one duplicate number, find the duplicate one.

// Example 1:

// Input: [1, 3, 4, 2, 2]
// Output: 2

// Example 2:

// Input: [3, 1, 3, 4, 2]
// Output: 3

// Note:

// You must not modify the array(assume the array is read only).
// You must use only constant, O(1) extra space.
// Your runtime complexity should be less than O(n2).
// There is only one duplicate number in the array, but it could be repeated more than once.

// SWITCHING BETWEEN SOLUTIONS:
const findDuplicate = solution_1;

function solution_1 (nums) {

  // SOLUTION 1 [O(n) time, O(1) space]:
  // this is related to the algo for finding the entry point of a loop in a looped LL ("tortoise and hare")!
  // not only is that method useful for detecting whether a loop exists, but you can also use it to find the entry point of a loop!

  // the idea is to start with the first number in the array, and use its value to determine which index position to jump to next... this is how this array
  // simulates a LL. here, the fact that some number is duplicated means there must be a loop. (in fact, there could potentially be more than 1 loop. see
  // note below after the explanation of the answer. note that if there's only 1 loop you should be able to visit all nums, but this is not required by the
  // problem.)

  // explanation of answer: mimic a LL with a loop. have "hare" and "tortoise" start at the first number of the array. a "move" basically means to jump to
  // the index position given by the value at your current index position. with each "tick", hare moves twice for every time tortoise moves once. after you
  // find the collision point, tortoise is now the same distance from the loop entry point as the length of the tail. therefore, move the hare back to the
  // beginning (and now make it move at the same speed as the tortoise). iterate tortoise and hare until they collide - that's the entry point. the loop
  // entry point's value is the duplicate number, because by virtue of being the duplicate number, that means two different index values' numbers are
  // ultimately leading to that index.

  // but wait! what if you have a non-duplicated number that happens to occupy its own index position? e.g. [1, 3, 2, 3] - there, the 2 is in position 2.
  // well, then you'd never enter position 2 at all, because no other index position has a value of 2 to take you to index 2 in the first place.
  // but what if you have 0 in position 0? 0 is special since you have to start the algo at index 0, so wouldn't you get stuck in a loop right out of the
  // gate? nope! the problem says all nums are 1..n so you'd never have 0 anywhere in the array.

  // tortoise and hare start at the beginning
  let tortoise = nums[0];
  let hare = nums[0];

  // do-while because otherwise they "collide" right from the start
  do {
    // iterate tortoise 1x
    tortoise = nums[tortoise];
    // iterate hare 2x
    hare = nums[hare];
    hare = nums[hare];
  } while (hare !== tortoise);

  // when they collide, the distance from collision point to loop entry point is equal to the length of the tail!
  // therefore, reset hare to the beginning to prepare to get them to collide at loop entry point
  hare = nums[0];
  while (hare !== tortoise) {
    // iterate tortoise 1x
    tortoise = nums[tortoise];
    // this time, iterate hare 1x
    hare = nums[hare];
  }

  // when tortoise and hare collide, that's the loop entry point, whose value is the duplicate number. return either tortoise or hare.
  return hare;
}

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = findDuplicate;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  nums: [1, 3, 4, 2, 2],
};
expected = 2;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  nums: [3, 1, 3, 4, 2],
};
expected = 3;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 3
input = {
  nums: [9, 8, 5, 11, 13, 4, 16, 19, 6, 3, 14, 12, 17, 7, 2, 1, 15, 10, 4, 18, 20],
};
expected = 4;
test(func, input, expected, testNum, lowestTest, highestTest);