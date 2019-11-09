// SOURCE: A friend tells me that this problem was asked by Uber.

// Given an array of length n representing amounts of cash that each of n friends contributed toward a restaurant bill (and optionally also given the total amount of the bill as an argument - you can assume that this redundant information is accurate), determine who needs to pay back what amounts directly to whom such that (1) everyone ends up paying an equal amount and (2) earlier debtors in the list pay back earlier creditors in the list, etc. - you can choose how you want to represent the answer. For purposes of this exercise we will use an object literal. The object's keys should be the index values of people who need to pay (debtors), and the values should be further objects with keys that are the index values of people who need to collect (creditors), and the values should be the amounts transacted between the individual debtor and creditor.

// Example input:
// [12, 5, 9, 0, 3, 6, 4, 1, 2, 8]
//
// Example output:
// {
//   3: { 0: 5 },         debtor at position 3 pays $5 to creditor at position 0
//   4: { 0: 2 },         debtor at position 4 pays $2 to creditor at position 0
//   6: { 2: 1 },         debtor at position 6 pays $1 to creditor at position 2
//   7: { 2: 3, 5: 1 },   debtor at position 7 pays $3 to creditor at position 2 and $1 to creditor at position 5
//   8: { 9: 3 },         debtor at position 8 pays $3 to creditor at position 9
// };

// SWITCHING BETWEEN SOLUTIONS:
const splitBill = solution_1;

function solution_1 (payments, total) {

  // SOLUTION 1 [O(n) time, O(n) space]:
  // organize separate arrays of creditors and debtors such that each person who owes or is owed is represented as a tuple, with first element as index position,
  // and second element as how much money that person overpaid (and therefore is owed). for example, [0, 5] means the person at position 0 overpaid by $5. once
  // the creditor and debtor arrays have been created, make a blank object representing all the transactions that need to happen. take the first available debtor
  // and pay out the appropriate amount to the first available creditor. there are 3 possibilities: (1) debtor owes less than creditor is owed, in which case you
  // pay out to creditor and shift out that debtor; (2) debtor owes more than creditor is owed, in which case you deduct from debtor and shift out that creditor;
  // or (3) debtor owes exactly what creditor is owed, in which case you shift out both creditor and debtor. in all cases, the transaction is recorded in the
  // transactions object. after processing the entire debtor list, you are done, and you return the transactions object.

  // EDGE CASE: EMPTY PAYMENTS INPUT
  if (!payments.length) return {};

  // CALCULATE TOTAL IF NOT PROVIDED IN INPUT
  total = total || payments.reduce((sum, payment) => sum + payment);

  // INITIALIZATIONS
  const average = total / payments.length;
  const debts = payments.map((payment, i) => [i, payment - average]);
  const creditors = debts.filter(person => person[1] > 0);
  const debtors = debts.filter(person => person[1] < 0);
  const transactions = {};

  // ITERATE THROUGH DEBTORS AND CREDITORS, IN THE ORDER THAT THEY APPEAR IN THE payments ARRAY
  while (debtors.length) {
    // create object for current debtor if one does not already exist
    transactions[debtors[0][0]] = transactions[debtors[0][0]] || {};
    // current debtor
    transactions[debtors[0][0]][creditors[0][0]] = Math.min(-debtors[0][1], creditors[0][1]);
    if (creditors[0][1] + debtors[0][1] > 0) {
      creditors[0][1] += debtors[0][1];
      debtors.shift();
    } else if (creditors[0][1] + debtors[0][1] < 0) {
      debtors[0][1] += creditors[0][1];
      creditors.shift();
    } else {
      debtors.shift();
      creditors.shift();
    }
  }
  return transactions;
}

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = splitBill;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  payments: [12, 5, 9, 0, 3, 6, 4, 1, 2, 8],
};
expected = {
  3: { 0: 5 },
  4: { 0: 2 },
  6: { 2: 1 },
  7: { 2: 3, 5: 1 },
  8: { 9: 3 },
};
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  payments: [26, 31, 18, 16, 9],
};
expected = {
  2: { 0: 2 },
  3: { 0: 4 },
  4: { 1: 11 },
};
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 3
input = {
  payments: [37, 0, 6, 12, 4, 12, 1, 8],
};
expected = {
  1: { 0: 10 },
  2: { 0: 4 },
  4: { 0: 6 },
  6: { 0: 7, 3: 2 },
  7: { 5: 2 },
};
test(func, input, expected, testNum, lowestTest, highestTest);