// SOURCE: LEETCODE (https://leetcode.com/problems/keys-and-rooms/)

// There are N rooms and you start in room 0.  Each room has a distinct number in 0, 1, 2, ..., N-1, and each room may have some keys to access the next room. 

// Formally, each room i has a list of keys rooms[i], and each key rooms[i][j] is an integer in [0, 1, ..., N-1] where N = rooms.length.  A key rooms[i][j] = v opens the room with number v.

// Initially, all the rooms start locked (except for room 0). 

// You can walk back and forth between rooms freely.

// Return true if and only if you can enter every room.

// Example 1:

// Input: [[1],[2],[3],[]]
// Output: true
// Explanation:  
// We start in room 0, and pick up key 1.
// We then go to room 1, and pick up key 2.
// We then go to room 2, and pick up key 3.
// We then go to room 3.  Since we were able to go to every room, we return true.

// Example 2:

// Input: [[1,3],[3,0,1],[2],[0]]
// Output: false
// Explanation: We can't enter the room with number 2.
// Note:

// 1 <= rooms.length <= 1000
// 0 <= rooms[i].length <= 1000
// The number of keys in all rooms combined is at most 3000.

// SWITCHING BETWEEN SOLUTIONS:
const canVisitAllRooms = solution_1;

function solution_1 (rooms) {

  // SOLUTION 1 [O(n) time (barring duplicate keys), O(n) space]:
  // this problem is a good use case for a stack (and not a queue, because order does not matter, and .pop is O(1) rather than .shift) as well as a set. the set will keep track of
  // the rooms we have visited, and the stack will keep track of keys we have acquired (which directly map to rooms we need to visit). the visited set obviously starts off empty.
  // the key stack starts off with 0 because the problem says you need to start in room 0. while the stack is not empty, pop out the next room to visit. (1) if we have already been
  // to that room, skip it. else, visit it, and look at the input to see what keys are there. (2) go through those keys, and add to the stack only those that unlock rooms we have
  // not been to yet. NOTE: having both (1) and (2) is redundant; either one alone works here. however, there are some edge cases in which having both will make this run better,
  // such as in situations where you go to multiple rooms that contain a key to some new room you have not been to yet. (1) is for avoiding infinite loop, (2) is for reducing stack
  // size. at the very end when the stack is exhausted, check if the number of rooms you have visited is equal to the total number of rooms.

  // INITIALIZATIONS
  const visited = new Set();
  const stack = [0];                          // start with key 0. a stack is better than a queue here because order doesn't matter, and with a stack you have O(1) .pop

  // ITERATE THROUGH CURRENT STACK OF KEYS AND VISIT THOSE ROOMS TO GET MORE KEYS
  while (stack.length) {
    const currentRoom = stack.pop();
    if (visited.has(currentRoom)) continue;   // if you have already been to this room, skip it
    visited.add(currentRoom);                 // new room? mark room as visited
    rooms[currentRoom].forEach(key => {       // add newly acquired keys to our stack (only for unvisited rooms)
      if (!visited.has(key)) stack.push(key);
    });
  }

  // ONCE THE STACK OF KEYS IS EXHAUSTED, WE HAVE NO NEW ROOMS TO GO TO. SIMPLY RETURN WHETHER WE HAVE VISITED ALL THE ROOMS
  return visited.size === rooms.length;
}

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = canVisitAllRooms;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  rooms: [[1], [2], [3], []],
};
expected = true;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  rooms: [[1, 3], [3, 0, 1], [2], [0]],
};
expected = false;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 3
input = {
  rooms: [[1], [], [0,3], [1]],
};
expected = false;
test(func, input, expected, testNum, lowestTest, highestTest);