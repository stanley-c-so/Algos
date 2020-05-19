// SOURCE: LEETCODE (https://leetcode.com/problems/design-underground-system/)

// Implement the class UndergroundSystem that supports three methods:

// 1. checkIn(int id, string stationName, int t)
// A customer with id card equal to id, gets in the station stationName at time t.
// A customer can only be checked into one place at a time.

// 2. checkOut(int id, string stationName, int t)
// A customer with id card equal to id, gets out from the station stationName at time t.

// 3. getAverageTime(string startStation, string endStation) 
// Returns the average time to travel between the startStation and the endStation.
// The average time is computed from all the previous traveling from startStation to endStation that happened directly.

// Call to getAverageTime is always valid.
// You can assume all calls to checkIn and checkOut methods are consistent. That is, if a customer gets in at time t1 at some station, then it gets out at time t2 with t2 > t1. All events happen in chronological order.

// Example 1:

// Input
// ["UndergroundSystem","checkIn","checkIn","checkIn","checkOut","checkOut","checkOut","getAverageTime","getAverageTime","checkIn","getAverageTime","checkOut","getAverageTime"]
// [[],[45,"Leyton",3],[32,"Paradise",8],[27,"Leyton",10],[45,"Waterloo",15],[27,"Waterloo",20],[32,"Cambridge",22],["Paradise","Cambridge"],["Leyton","Waterloo"],[10,"Leyton",24],["Leyton","Waterloo"],[10,"Waterloo",38],["Leyton","Waterloo"]]

// Output
// [null,null,null,null,null,null,null,14.00000,11.00000,null,11.00000,null,12.00000]

// Explanation
// UndergroundSystem undergroundSystem = new UndergroundSystem();
// undergroundSystem.checkIn(45, "Leyton", 3);
// undergroundSystem.checkIn(32, "Paradise", 8);
// undergroundSystem.checkIn(27, "Leyton", 10);
// undergroundSystem.checkOut(45, "Waterloo", 15);
// undergroundSystem.checkOut(27, "Waterloo", 20);
// undergroundSystem.checkOut(32, "Cambridge", 22);
// undergroundSystem.getAverageTime("Paradise", "Cambridge");       // return 14.00000. There was only one travel from "Paradise" (at time 8) to "Cambridge" (at time 22)
// undergroundSystem.getAverageTime("Leyton", "Waterloo");          // return 11.00000. There were two travels from "Leyton" to "Waterloo", a customer with id=45 from time=3 to time=15 and a customer with id=27 from time=10 to time=20. So the average time is ( (15-3) + (20-10) ) / 2 = 11.00000
// undergroundSystem.checkIn(10, "Leyton", 24);
// undergroundSystem.getAverageTime("Leyton", "Waterloo");          // return 11.00000
// undergroundSystem.checkOut(10, "Waterloo", 38);
// undergroundSystem.getAverageTime("Leyton", "Waterloo");          // return 12.00000

// Example 2:

// Input
// ["UndergroundSystem","checkIn","checkOut","getAverageTime","checkIn","checkOut","getAverageTime","checkIn","checkOut","getAverageTime"]
// [[],[10,"Leyton",3],[10,"Paradise",8],["Leyton","Paradise"],[5,"Leyton",10],[5,"Paradise",16],["Leyton","Paradise"],[2,"Leyton",21],[2,"Paradise",30],["Leyton","Paradise"]]

// Output
// [null,null,null,5.00000,null,null,5.50000,null,null,6.66667]

// Explanation
// UndergroundSystem undergroundSystem = new UndergroundSystem();
// undergroundSystem.checkIn(10, "Leyton", 3);
// undergroundSystem.checkOut(10, "Paradise", 8);
// undergroundSystem.getAverageTime("Leyton", "Paradise"); // return 5.00000
// undergroundSystem.checkIn(5, "Leyton", 10);
// undergroundSystem.checkOut(5, "Paradise", 16);
// undergroundSystem.getAverageTime("Leyton", "Paradise"); // return 5.50000
// undergroundSystem.checkIn(2, "Leyton", 21);
// undergroundSystem.checkOut(2, "Paradise", 30);
// undergroundSystem.getAverageTime("Leyton", "Paradise"); // return 6.66667

// ----------

class solution_1 {

  // SOLUTION 1 [O(1) time (per operation), O(n + p) space (where n is the number of customers who have checked in but have not since checked out, and p is the number of uni-directional station pairs - you can also say this is s^2, if s is the number of stations, since potentially there would be s*(s - 1) pairs)]:
  // description

  constructor () {
    this.customers = {};      // e.g. each key-value pair may look like: `1234: { startStation: stationA, time: t }`
    this.routes = {};         // e.g. each key-value pair may look like: `stationA*stationB: { totalTime: 100, trips: 4 }`
  }

  checkIn (id, stationName, t) {
    this.customers[id] = { startStation: stationName, time: t };
  }

  checkOut (id, stationName, t) {
    const { startStation, time } = this.customers[id];
    delete this.customers[id];
    const route = `${startStation}*${stationName}`;   // i chose '*' as a character not likely to appear in a station name
    if (!(route in this.routes)) this.routes[route] = { totalTime: 0, trips: 0 };
    this.routes[route].totalTime += t - time;
    this.routes[route].trips++;
  }

  getAverageTime (startStation, endStation) {
    const { totalTime, trips } = this.routes[`${startStation}*${endStation}`];
    return totalTime / trips;
  }
}

const specialTest = (commands, inputs) => {
  const undergroundSystem = new UndergroundSystem();
  const ref = {                                         // this object holds references to the UndergroundSystem methods...
    checkIn: undergroundSystem.checkIn,
    checkOut: undergroundSystem.checkOut,
    getAverageTime: undergroundSystem.getAverageTime,
  };
  const output = [];
  for (let i = 0; i < commands.length; i++) {
    output.push(
      ref[commands[i]].bind(undergroundSystem)(...inputs[i])        // ...but each method still needs to be given `undergroundSystem` as its `this` context
    )
  }
  return output;
};

// SWITCHING BETWEEN SOLUTIONS:
const UndergroundSystem = solution_1;

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = specialTest;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  commands: ['checkIn', 'checkIn', 'checkIn', 'checkOut', 'checkOut', 'checkOut', 'getAverageTime', 'getAverageTime', 'checkIn', 'getAverageTime', 'checkOut', 'getAverageTime'],
  inputs: [
    [45, 'Leyton', 3],
    [32, 'Paradise', 8],
    [27, 'Leyton', 10],
    [45, 'Waterloo', 15],
    [27, 'Waterloo', 20],
    [32, 'Cambridge', 22],
    ['Paradise', 'Cambridge'],
    ['Leyton', 'Waterloo'],
    [10, 'Leyton', 24],
    ['Leyton', 'Waterloo'],
    [10, 'Waterloo', 38],
    ['Leyton', 'Waterloo'],
  ],
};
expected = [undefined, undefined, undefined, undefined, undefined, undefined, 14/1, 22/2, undefined, 22/2, undefined, 36/3];
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  commands: ['checkIn', 'checkOut', 'getAverageTime', 'checkIn', 'checkOut', 'getAverageTime', 'checkIn', 'checkOut', 'getAverageTime'],
  inputs: [
    [10, 'Leyton', 3],
    [10, 'Paradise', 8],
    ['Leyton', 'Paradise'],
    [5, 'Leyton', 10],
    [5, 'Paradise', 16],
    ['Leyton', 'Paradise'],
    [2, 'Leyton', 21],
    [2, 'Paradise', 30],
    ['Leyton', 'Paradise'],
  ],
};
expected = [undefined, undefined, 5/1, undefined, undefined, 11/2, undefined, undefined, 20/3];
test(func, input, expected, testNum, lowestTest, highestTest);