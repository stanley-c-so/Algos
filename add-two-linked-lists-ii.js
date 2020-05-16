// SOURCE: LEETCODE (https://leetcode.com/problems/add-two-numbers-ii/)

// You are given two non-empty linked lists representing two non-negative integers. The most significant digit comes first and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

// You may assume the two numbers do not contain any leading zero, except the number 0 itself.

// Follow up:
// What if you cannot modify the input lists? In other words, reversing the lists is not allowed.

// Example:

// Input: (7 -> 2 -> 4 -> 3) + (5 -> 6 -> 4)
// Output: 7 -> 8 -> 0 -> 7

// Note: The singly-linked list node class with constructor is already provided. The code for this comes from LeetCode. I added the insert method.

// ----------

function solution_1 (l1, l2) {

  // SOLUTION 1 [O(L) time (where L is the length of the longest number), O(L) space (occupied by the new linked list)]:
  // description

  // CONVERT BOTH INPUT LISTS INTO A STRING FORM REPRESENTING THEIR NUMBER
  let num1 = '';
  let node1 = l1;
  while (node1) {
    num1 += node1.val;
    node1 = node1.next;
  }
  let num2 = '';
  let node2 = l2;
  while (node2) {
    num2 += node2.val;
    node2 = node2.next;
  }
  
  // ADD THE TWO NUMBERS INTO A SUM, ALSO REPRESENTED BY A NUMBER (cannot convert to numbers and directly add, as the numbers may be too long)
  let carry = 0;                                                                  // `carry` fluctuates between 0 and 1, as needed
  let sum = '';
  for (let i = 0; i < Math.max(num1.length, num2.length); ++i) {
    const digit1 = num1.length - 1 - i >= 0 ? num1[num1.length - 1 - i] : 0;      // go from right to left. if digit is out of bounds, use 0
    const digit2 = num2.length - 1 - i >= 0 ? num2[num2.length - 1 - i] : 0;      // go from right to left. if digit is out of bounds, use 0
    const total = Number(digit1) + Number(digit2) + carry;                        // add the number version of both digits, along with `carry`
    const ones = total % 10;                                                      // treat the `ones` and `carry` values separately
    carry = total > 9 ? 1 : 0;
    sum = ones + sum;                                                             // add on only the `ones` value to the left of the `sum` so far
  }
  if (carry) sum = 1 + sum;                                                       // don't forget to include the final `carry`, if necessary
  
  // BUILD OUT THE RESULTING LINKED LIST, BASED ON THE CALCULATED RESULT
  let next = null;
  for (let i = sum.length - 1; i >= 0; --i) {                                     // create nodes from right to left, so that we can link current node to previously made node
    const node = new ListNode(Number(sum[i]));
    node.next = next;
    next = node;
  }

  // RETURN
  return next;
}

// SWITCHING BETWEEN SOLUTIONS:
const addTwoNumbers = solution_1;

class ListNode {
  constructor (val, ...extraVals) {
    this.val = val;
    this.next = null;
    if (extraVals.length) this.insert(...extraVals);
  }
  insert (...vals) {
    let currentNode = this;
    for (const val of vals) {
      const nextNode = new ListNode(val);
      currentNode.next = nextNode;
      currentNode = nextNode;
    }
    return this;
  }
}

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = addTwoNumbers;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  l1: new ListNode(7, 2, 4, 3),
  l2: new ListNode(5, 6, 4), 
};
expected = new ListNode(7, 8, 0, 7);
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  l1: new ListNode(0),
  l2: new ListNode(0), 
};
expected = new ListNode(0);
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 3
input = {
  l1: new ListNode(2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,9),
  l2: new ListNode(5,6,4,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,9,9,9,9), 
};
expected = new ListNode(8,0,7,4,8,6,4,8,6,4,8,6,4,8,6,4,8,6,4,8,6,4,8,6,4,8,6,4,8,6,4,8,6,4,8,6,4,8,6,4,8,6,4,8,6,4,8,6,4,8,6,4,8,6,4,8,7,2,4,3,8);
test(func, input, expected, testNum, lowestTest, highestTest);