// SOURCE: LEETCODE (https://leetcode.com/problems/integer-to-english-words/)

// Convert a non-negative integer to its English words representation. Given input is guaranteed to be less than 2^31 - 1.

// Example 1:

// Input: 123
// Output: "One Hundred Twenty Three"

// Example 2:

// Input: 12345
// Output: "Twelve Thousand Three Hundred Forty Five"

// Example 3:

// Input: 1234567
// Output: "One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven"

// Example 4:

// Input: 1234567891
// Output: "One Billion Two Hundred Thirty Four Million Five Hundred Sixty Seven Thousand Eight Hundred Ninety One"

// SWITCHING BETWEEN SOLUTIONS:
const numberToWords = solution_1;

function solution_1 (num) {

  // SOLUTION 1 [O(?) time, O(?) space]:
  // description

  if (!num) return 'Zero';
  numStr = num.toString();
  const numArr = [];
  let chunk = '';
  for (let i = 0; i < numStr.length; i++) {
      chunk = numStr[numStr.length - 1 - i] + chunk;
      if ((i + 1) % 3 === 0 || i === numStr.length - 1) {
          numArr.unshift(chunk);
          chunk = '';
      }
  }
  return numArr.map((chunk, i) => {
      const category = [null, 'Thousand', 'Million', 'Billion', 'Trillion'];
      let output = chunkToWords(chunk);
      if (i !== numArr.length - 1 && !!output) {
          output += (' ' + category[numArr.length - 1 - i])
      }
      return output;
  }).filter(chunk => !!chunk).join(' ');

  function chunkToWords (chunk) {
    const singleDigits = {
        '0': '',
        '1': 'One',
        '2': 'Two',
        '3': 'Three',
        '4': 'Four',
        '5': 'Five',
        '6': 'Six',
        '7': 'Seven',
        '8': 'Eight',
        '9': 'Nine',
    }
    const teens = {
        '10': 'Ten',
        '11': 'Eleven',
        '12': 'Twelve',
        '13': 'Thirteen',
        '14': 'Fourteen',
        '15': 'Fifteen',
        '16': 'Sixteen',
        '17': 'Seventeen',
        '18': 'Eighteen',
        '19': 'Nineteen',
    }
    const secondDigit = {
        '2': 'Twenty',
        '3': 'Thirty',
        '4': 'Forty',
        '5': 'Fifty',
        '6': 'Sixty',
        '7': 'Seventy',
        '8': 'Eighty',
        '9': 'Ninety',
    }
    if (chunk === '000') return '';                     // if this is in the middle of a number
    if (chunk.length === 1) return singleDigits[chunk]; // in case original number is only 1 digit 
    if (chunk.length === 2) chunk = '0' + chunk;        // in case original number is only 2 digits
    const output = [];
    if (chunk[0] !== '0') output.push(singleDigits[chunk[0]] + ' Hundred');
    if (chunk[1] === '1') {
        output.push(teens[chunk.slice(1)]);
    } else {
        if (chunk[1] !== '0') output.push(secondDigit[chunk[1]]);
        if (chunk[2] !== '0') output.push(singleDigits[chunk[2]]);
    }
    
    return output.join(' ');
  }

}

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = numberToWords;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  num: 123,
};
expected = 'One Hundred Twenty Three';
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  num: 12345,
};
expected = 'Twelve Thousand Three Hundred Forty Five';
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 3
input = {
  num: 1234567,
};
expected = 'One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven';
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 4
input = {
  num: 1234567891,
};
expected = 'One Billion Two Hundred Thirty Four Million Five Hundred Sixty Seven Thousand Eight Hundred Ninety One';
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 5
input = {
  num: 100,
};
expected = 'One Hundred';
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 6
input = {
  num: 1000,
};
expected = 'One Thousand';
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 7
input = {
  num: 1000000,
};
expected = 'One Million';
test(func, input, expected, testNum, lowestTest, highestTest);