// SOURCE: ALGOEXPERT

// You are given an array of arrays. Each subarray in this array holds two integer values and represents an item; the first integer is the item's value, and the second integer is the item's weight. You are also given an integer representing the maximum capacity of a knapsack that you have. Your goal is to fit items in your knapsack, all the while maximizing their combined value. Note that the sum of the weights of the items that you pick cannot exceed the knapsack's capacity. Write a function that returns the maximized combined value of the items that you should pick, as well as an array of the indices of each item picked. Assume that there will only be one combination of items that maximizes the total value in the knapsack.

// Sample input: [ [1,2] , [4,3] , [5,6] , [6,7] ], 10
// Sample output: [ 10, [1,3] ]

// SWITCHING BETWEEN SOLUTIONS:
const knapsackProblem = solution_1;

function solution_1 (items, capacity) {

  // SOLUTION 1 [O(n*c) time, O(n*c) space (even though the 'table' is c wide, each configuration may hold up to n items)]:
	// you only need one row in your 'table' (call it maxValuesAndIndices). the table should have columns from 0
	// to capacity. each row should represent the introduction of a new item you can choose from. the table should
	// be initialized with each value as [ 0, [] ] which means a value of 0, and an empty array of indices (no item
	// has been selected). at the outer level, iterate through all of the items. for each one, iterate through the
	// table FROM RIGHT TO LEFT (the process will look leftward in the table for older values, so if you go from
	// left to right, you may be trying to add the current item to a configuration that already includes the
	// current item). for each position in the table, look backward by itemWeight (the weight of the current item)
	// and see if the value there + itemValue would be greater than whatever the value is now. if so, then simply
	// add the current item to that configuration (update the value and the array of indices stored there).

  // INITIALIZATIONS - create and populate the 'table' of maxValuesAndIndices
  const maxValuesAndIndices = [];
  for (let i = 0; i <= capacity; i++) maxValuesAndIndices[i] = [0, []];

  // ITERATE THROUGH ALL ITEMS, DYNAMICALLY UPDATING THE maxValuesAndIndices ARRAY
  for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {

    // intialize item component references
    const [itemValue, itemWeight] = items[itemIndex];

    // iterate RIGHT TO LEFT through maxValuesAndIndices (from end, to weight === itemWeight), dynamically making updates
    for (let weight = capacity; weight >= itemWeight; weight--) {
      // if adding current item to the configuration looking backward by itemWeight yields higher value, use that configuration
      if (maxValuesAndIndices[weight - itemWeight][0] + itemValue > maxValuesAndIndices[weight][0]) {
        maxValuesAndIndices[weight][0] = maxValuesAndIndices[weight - itemWeight][0] + itemValue;
        maxValuesAndIndices[weight][1] = maxValuesAndIndices[weight - itemWeight][1].concat(itemIndex);
      }
    }
  }

  return maxValuesAndIndices[capacity];
}

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = knapsackProblem;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  items: [
    [1, 2],
    [4, 3],
    [5, 6],
    [6, 7],
  ],
  capacity: 10,
};
expected = [10, [1,3]];
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  items: [
    [465, 100],
    [400, 85],
    [255, 55],
    [350, 45],
    [650, 130],
    [1000, 190],
    [455, 100],
    [100, 25],
    [1200, 190],
    [320, 65],
    [750, 100],
    [50, 45],
    [550, 65],
    [100, 50],
    [600, 70],
    [240, 40],
  ],
  capacity: 200,
};
expected = [1500, [3, 12, 14]];
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 3
input = {
  items: [
    [465, 100],
    [400, 85],
    [255, 55],
    [350, 45],
    [650, 130],
    [1000, 190],
    [455, 100],
    [100, 25],
    [1200, 190],
    [320, 65],
    [750, 100],
    [50, 45],
    [550, 65],
    [100, 50],
    [600, 70],
    [255, 40],
  ],
  capacity: 200,
};
expected = [1505, [7, 12, 14, 15]];
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 4
input = {
  items: [
    [2, 1],
    [70, 70],
    [30, 30],
    [69, 69],
    [100, 100],
  ],
  capacity: 100,
};
expected = [101, [0, 2, 3]];
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 5
input = {
  items: [
    [1, 2],
    [70, 70],
    [30, 30],
    [69, 69],
    [100, 100],
  ],
  capacity: 100,
};
expected = [100, [1, 2]];
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 6
input = {
  items: [
    [1, 2],
    [70, 70],
    [30, 30],
    [69, 69],
    [100, 100],
  ],
  capacity: 0,
};
expected = [0, []];
test(func, input, expected, testNum, lowestTest, highestTest);