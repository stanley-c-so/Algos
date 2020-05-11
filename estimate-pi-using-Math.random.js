// SOURCE: I heard this from a friend

// Using Math.random() (i.e. a random number generator that generates a number between 0 and 1, with uniform probability), estimate the value of pi.

// SWITCHING BETWEEN SOLUTIONS:
const estimatePi = solution_1;

function solution_1 (simulations = 100000, maxErrorRate = 0.01) {

  // SOLUTION 1 [O(s) time, O(1) space]:
  // imagine a unit square. by calling Math.random() twice, the two numbers map to a point within the unit square. imagine a circle with radius 0.5 inside the unit
  // square. the area of that circle is pi/4, and therefore the probability that a random point will fall within the circle is (pi/4) / 1. run a large number of
  // simulations (by default, 100,000 simulations should fall comfortably within an error of at most 0.01) where for each simulation, we call Math.random() twice,
  // get a point, and add to a tally if that point falls within the circle. then simply multiply the fraction by 4, and that should be the estimate of pi.

  let insideCircle = 0;
  for (let i = 0; i < simulations; i++) {
    const x = Math.random();
    const y = Math.random();
    const distance = Math.sqrt((x - 0.5)**2 + (y - 0.5)**2);
    if (distance <= 0.5) insideCircle++;
  }

  const estimate = insideCircle / simulations * 4;
  const error = estimate - Math.PI;
  console.log(`ESTIMATE OF PI: ${estimate}, ERROR: ${error}`);
  return Math.abs(error) <= maxErrorRate;
}

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = estimatePi;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {};
expected = true;
test(func, input, expected, testNum, lowestTest, highestTest);