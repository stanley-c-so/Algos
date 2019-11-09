// SOURCE: LEETCODE (https://leetcode.com/problems/meeting-rooms-ii/)

// Given an array of meeting time intervals consisting of start and end times [[s1,e1],[s2,e2],...] (si < ei), find the minimum number of conference rooms required.

// Example 1:

// Input: [[0, 30],[5, 10],[15, 20]]
// Output: 2

// Example 2:

// Input: [[7,10],[2,4]]
// Output: 1

// SWITCHING BETWEEN SOLUTIONS:
const minMeetingRooms = solution_2;

function solution_1 (intervals) {

  // SOLUTION 1 [O(n + t) time (where n is the number of intervals, and t is the range between earliest and latest time - larger term dominates), O(n) space]:
  // first, create startTimes and endTimes objects and iterate through each interval, populating those objects. each key in the objects will correspond to a time when some interval
  // will either start or end, and the value will be the number of such intervals that start or end at that time. then, figure out the earliest time and the latest time. iterate
  // with a for loop from earliest time to latest time, and for each time, increment or decrement the number of rooms currently occupied. keep track of the highest that
  // roomsCurrentlyOccupied gets, and ultimately return it.

  // POPULATE OBJECTS OF START TIMES AND END TIMES (# of meetings that start and end at a given time)
  const startTimes = {};
  const endTimes = {};
  intervals.forEach(interval => {
    const [start, end] = interval;
    startTimes[start] = (startTimes[start] || 0) + 1;
    endTimes[end] = (endTimes[end] || 0) + 1;
  })
  
  // OTHER INITIALIZATIONS
  const earliestTime = Math.min(...Object.keys(startTimes).map(time => Number(time)));   // convert to number
  const latestTime = Math.max(...Object.keys(endTimes).map(time => Number(time)));       // convert to number
  let roomsCurrentlyOccupied = 0;
  let highestSoFar = 0;
  
  // ITERATE FROM EARLIEST TIME TO LATEST TIME, AND FOR EACH TIME, ADJUST roomsCurrentlyOccupied WHILE
  // TRACKING THE HIGHEST SEEN AT ANY GIVEN TIME
  for (let time = earliestTime; time <= latestTime; time++) {
    if (startTimes[time]) roomsCurrentlyOccupied += startTimes[time];
    if (endTimes[time]) roomsCurrentlyOccupied -= endTimes[time];
    highestSoFar = Math.max(highestSoFar, roomsCurrentlyOccupied);
  }
  
  return highestSoFar;
}

function solution_2 (intervals) {

  // SOLUTION 2 [O(n log n) time (to sort the intervals by start/end times), O(n) space]:
  // unlike with solution 1, which can be slow if there is a very large range, here we go directly from interval to interval (in sorted order by their start times) and in so doing
  // we skip over all other times. for each interval, if the start time is below the next end time, then all rooms are currently occupied, so we need to create a new room. otherwise,
  // if the start time were greater than or equal to the next end time, then the meeting that ended at the next end time has already vacated its room, so the current meeting can take
  // it over, and we move the endIdx pointer along. note that we do not need to keep track of which meeting is in which room. rather, the logic here only cares whether some room is
  // available. again, the key idea is that if the current meeting starts at a time at or after the next one to clear up, then it takes over that room and we do not need to increase
  // our total rooms.

  // CREATE SORTED ARRAYS OF (1) START TIMES AND (2) END TIMES
  const starts = intervals
    .map(interval => interval[0])
    .sort((a, b) => a - b);

  const ends = intervals
    .map(interval => interval[1])
    .sort((a, b) => a - b);

  // OTHER INITIALIZATIONS
  let room = 0;               // works like a "highest so far" record-type of variable
  let endIdx = 0;             // points to the next room that will clear up after being used

  // ITERATE THROUGH STARTS
  for (let startIdx = 0; startIdx < intervals.length; startIdx++) {
    if (starts[startIdx] < ends[endIdx]) {    // if the next interval to start will do so before the next interval to end will end, then we need one more room
      room++;
    } else {                                  // otherwise, at least one meeting has previously cleared up and that room can now be overtaken by the current one
      endIdx++;
    }
  }

  // room WORKS LIKE A "HIGHEST SO FAR" RECORD-TYPE OF VARIABLE, SO RETURN IT
  return room;
}

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = minMeetingRooms;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  intervals: [
    [15, 20],
    [5, 10],
    [0, 30],
  ],
};
expected = 2;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  intervals: [
    [10, 15],
    [5, 10],
    [0, 5]
  ],
};
expected = 1;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 3
input = {
  intervals: [
    [10, 20],
    [5, 30],
    [0, 40]
  ],
};
expected = 3;
test(func, input, expected, testNum, lowestTest, highestTest);