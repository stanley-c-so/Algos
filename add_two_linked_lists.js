// SOURCE: LEETCODE https://leetcode.com/problems/add-two-numbers/

// You are given two non-empty linked lists representing two non-negative integers.The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

// You may assume the two numbers do not contain any leading zero, except the number 0 itself.

// Example:

// Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
// Output: 7 -> 0 -> 8
// Explanation: 342 + 465 = 807.

// Note: The singly-linked list node class with constructor is already provided. The code for this comes from LeetCode. I added the insert method.

// SWITCHING BETWEEN SOLUTIONS:
const addTwoLinkedLists = solution_2;

class ListNode {
  constructor (val) {
    this.val = val;
    this.next = null;
  }
  insert (val) {
    this.next = new ListNode(val);
    return this.next;
  }
}

function solution_1 (l1, l2, carry = 0) {

  // SOLUTION 1 [O(n + m) time, O(Math.max(n, m)) space]:
  // grab values of l1 and l2, if they exist, or else set them to 0. calculate the sum at this iteration,
  // remembering to include the carry value (default 0). after calculating the sum, derive the ones and
  // tens digits. next, create a new ListNode, "result", based on the ones digit. this ListNode will
  // ultimately be returned by the function. however, before we can return it, we need to recurse if any of
  // the following conditions are true: (1) l1 has more to go, (2) l2 has more to go, and/or (3) the tens
  // digit is not 0. in that case, set result.next to a recursed call of this function, with the new
  // arguments as l1.next and l2.next (or 0, if l1 or l2 are falsy), and the value of tens as the carry.

  // INITIALIZATIONS
  const sum = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + carry;
  const ones = sum % 10;
  const tens = sum >= 10 ? 1 : 0;     // tens digit will only ever be 0 or 1

  // CREATE THE "result" ListNode BASED ON THE ones VALUE
  const result = new ListNode(ones);

  // IF l1's NEXT IS NOT NULL, OR l2's NEXT IS NOT NULL, OR TENS IS 1, THEN result.next EQUALS THE RECURSED CALL
  if ((l1 && l1.next !== null) || (l2 && l2.next !== null) || tens)
    result.next = addTwoLinkedLists(
      l1 ? l1.next : 0,
      l2 ? l2.next : 0,
      tens
    );

  return result;

}

function solution_2 (l1, l2, carry = 0) {

  // SOLUTION 2 [O(n + m) time, O(Math.max(n, m)) space]:
  // slight tweak on solution 1 - we don't need to ask whether we need to recurse. instead, create a base
  // case where if l1, l2, and carry are ALL falsy, then return null (so that the second-last result keeps
  // its .next value as null). in all other cases, before returning the result, we continue to set its .next
  // to the recursed call of this function, with the new arguments as l1.next and l2.next (or 0, if l1 or l2
  // are falsy), and the value of tens as the carry.

  // BASE CASE
  if (!l1 && !l2 && !carry) return null;

  // RECURSIVE CASE
  const sum = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + carry;
  const ones = sum % 10;
  const tens = sum >= 10 ? 1 : 0;     // tens digit will only ever be 0 or 1
  const result = new ListNode(ones);
  result.next = addTwoLinkedLists(
    l1 ? l1.next : 0,
    l2 ? l2.next : 0,
    tens
  );
  return result;

}

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = addTwoLinkedLists;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  l1: new ListNode(2)
    .insert(4)
    .insert(3),
  l2: new ListNode(5)
    .insert(6)
    .insert(4),
};
expected = new ListNode(7).insert(0).insert(8);
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  l1: new ListNode(5),
  l2: new ListNode(5),
};
expected = new ListNode(0).insert(1);
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 3
input = {
  l1: new ListNode(0),
  l2: new ListNode(0),
};
expected = new ListNode(0);
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 4
input = {
  l1: new ListNode(1),
  l2: new ListNode(9)
    .insert(9)
    .insert(9),
};
expected = new ListNode(0).insert(0).insert(0).insert(1);
test(func, input, expected, testNum, lowestTest, highestTest);