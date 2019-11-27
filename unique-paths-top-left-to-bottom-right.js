// SOURCE: LEETCODE (https://leetcode.com/problems/unique-paths/)

// A robot is located at the top-left corner of a m x n grid. The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid.

// How many possible unique paths are there?

// Note: m and n will be at most 100.

// Example 1:

// Input: m = 3, n = 2
// Output: 3

// Explanation:
// From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:
// 1. Right -> Right -> Down
// 2. Right -> Down -> Right
// 3. Down -> Right -> Right

// Example 2:

// Input: m = 7, n = 3
// Output: 28

// SWITCHING BETWEEN SOLUTIONS:
const uniquePaths = solution_1;

function solution_1 (m, n) {

  // SOLUTION 1 [O(L) time (where L is the larger of m and n, since we need to calculate the factorial of L), O(1) space]:
  // the easiest (cheesiest) way to do this problem without taking up any space (by using a dynamic programming matrix) is to treat it as a pure combinatorics problem. if the
  // grid is m units wide and n units high, then the robot must make (m - 1) moves to the right, and (n - 1) moves down, and the problem just becomes figuring out the number of
  // unique sequences of these moves. using combinatorics, the answer is simply (m + n - 2)! / (m - 1)! / (n - 1)!.
  // given the constraints that m and n can be as large as 100, the problem becomes that calculating large factorials will result in an integer overflow. one thing we can do, then,
  // is to simplify the answer by first figuring out whether m or n is bigger, and whichever one is bigger, we can remove that term from the denominator. in other words, the answer
  // is: ((big + small - 2)! / (big - 1)!) / (small - 1)! = (product of all numbers from big to (big + small - 2)) / (small - 1)! we can separate these components and call them
  // `top` and `bottom`, calculate those separately, and just return top / bottom.

  // ASSIGN big AND small BASED ON RELATIVE VALUES OF m AND n
  const [big, small] = m >= n ? [m, n] : [n, m];

  // TOP = (big + small - 2)! / (big - 1)! = product of all numbers from big to (big + small - 2)
  let top = 1;
  for (let i = big; i <= big + small - 2; i++) top *= i;
  
  // BOTTOM = (small - 1)!
  let bottom = 1;
  for (let i = 1; i < small; i++) bottom *= i;

  return top / bottom;
}

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = uniquePaths;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  m: 0,
  n: 0,
};
expected = 1;
test(modFunc, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  m: 1,
  n: 1,
};
expected = 1;
test(modFunc, input, expected, testNum, lowestTest, highestTest);

// Test case 3
input = {
  m: 1,
  n: 5,
};
expected = 1;
test(modFunc, input, expected, testNum, lowestTest, highestTest);

// Test case 4
input = {
  m: 5,
  n: 1,
};
expected = 1;
test(modFunc, input, expected, testNum, lowestTest, highestTest);

// Test case 5
input = {
  m: 3,
  n: 2,
};
expected = 3;
test(modFunc, input, expected, testNum, lowestTest, highestTest);

// Test case 6
input = {
  m: 2,
  n: 3,
};
expected = 3;
test(modFunc, input, expected, testNum, lowestTest, highestTest);

// Test case 7
input = {
  m: 100,
  n: 100,
};
expected = 938158943;
test(modFunc, input, expected, testNum, lowestTest, highestTest);