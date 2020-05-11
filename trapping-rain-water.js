// SOURCE: LEETCODE (https://leetcode.com/problems/trapping-rain-water/)

// Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it is able to trap after raining.

//                      ___
//          ___            ___   ___
//    ___      _w_ w _w_      _w_   ___
// ___   _w_      _w_
//        1     1  2  1        1          <--- amount of water trapped (total is 6)

// The above elevation map is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water are being trapped.

// Example:

// Input: [0,1,0,2,1,0,1,3,2,1,2,1]
// Output: 6

// SWITCHING BETWEEN SOLUTIONS:
const trap = solution_2;

function solution_1 (height) {

  // SOLUTION 1 [O(n) time, O(n) space]:
  // we can do this in two passes in linear time and space. the key is to realize that the potential water level at any position, i, is the lower of (1) the highest elevation
  // to the left and (2) the highest elevation to the right. if the height at i is lower than the potential water level, then the amount of water that will be trapped at that
  // location is the difference of the potential water level and the height. (if the height is equal to or greater than the potential water level, no water is trapped.) to solve
  // this problem, then, we can spend our first for loop recording the highest elevation to the right/left for each position (you are essentially combining a left-to-right pass
  // and a right-to-left pass into a single for loop), and then on the second for loop we can calculate the difference between water level and height at that position, adding to
  // the total if and only if the difference is positive. (another way to restructure this is to spend the first pass going, say, right-to-left, and then on the second pass we can
  // simultaneously analyze from left-to-right and calculate the water level difference at the same time - see solution_2.)

  // INITIALIZATIONS
  const highestToR = Array(height.length);
  const highestToL = Array(height.length);

  // STEP 1: ITERATE THROUGH THE INPUT ARRAY TO GATHER DATA ON HEIGHEST HEIGHTS TO THE RIGHT/LEFT
  let highestR = 0;                                                 // default value for first iteration
  let highestL = 0;                                                 // default value for first iteration
  for (let i = 0; i < height.length; i++) {
    highestToR[height.length - 1 - i] = highestR;                   // set to current record
    highestR = Math.max(highestR, height[height.length - 1 - i]);   // update current record in case current position beats record
    highestToL[i] = highestL;
    highestL = Math.max(highestL, height[i]);
  }

  // STEP 2: DETERMINE THE POTENTIAL WATER LEVELS AND CALCULATE THE DIFFERENCE BETWEEN WATER LEVEL AND HEIGHT
  let total = 0;
  for (let i = 0; i < height.length; i++) {
    const waterLevel = Math.min(highestToR[i], highestToL[i]);      // potential water level is the lower of highest to right vs. highest to left
    if (waterLevel > height[i]) total += waterLevel - height[i];    // only trap water if potential water level is higher than height at position
  }

  return total;
}

function solution_2 (height) {

  // SOLUTION 2 [O(n) time, O(n) space]:
  // this is the exact same thing as solution_1 except that we combine the passes differently. then there is less math around i so it is arguably more readable. also
  // because we do not need to store the highestToL data, it uses less space!

  // STEP 1: ITERATE RIGHT TO LEFT THROUGH INPUT ARRAY TO GATHER DATA ON HEIGHEST HEIGHTS TO RIGHT
  const highestToR = Array(height.length);
  let highestR = 0;                                                 // default value for first iteration
  for (let i = height.length - 1; i >= 0; i--) {
    highestToR[i] = highestR;                                       // set to current record
    highestR = Math.max(highestR, height[i]);                       // update current record of highestR in case current position beats record
  }

  // STEP 2: ITERATE LEFT TO RIGHT THROUGH INPUT ARRAY TO GATHER DATA ON HEIGHEST HEIGHTS TO LEFT, AND ALSO CALCULATE AMOUNT OF WATER TRAPPED
  let highestL = 0;                                                 // default value for first iteration
  let total = 0;
  for (let i = 0; i < height.length; i++) {
    const waterLevel = Math.min(highestToR[i], highestL);           // we don't need to store highestToL. we can calculate it directly - it is just current value of highestL
    if (waterLevel > height[i]) total += waterLevel - height[i];    // after finding the potential water level, we can immediately calculate the amount of water trapped here
    highestL = Math.max(highestL, height[i]);                       // don't forget to update current record of highestL in case current position beats record
  }

  return total;
}

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = trap;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  height: [],
};
expected = 0;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  height: [1, 1, 1, 1, 1],
};
expected = 0;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 3
input = {
  height: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
};
expected = 6;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 4
input = {
  height: [0, 1, 2, 3, 4, 5, 4, 3, 2, 2, 2],
};
expected = 0;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 5
input = {
  height: [1, 0, 2, 0, 2, 0, 1, 0, 5, 0, 6],
};
expected = 13;
test(func, input, expected, testNum, lowestTest, highestTest);