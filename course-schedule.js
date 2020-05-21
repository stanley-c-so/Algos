// SOURCE: LEETCODE (https://leetcode.com/problems/course-schedule/)

// There are a total of numCourses courses you have to take, labeled from 0 to numCourses-1.

// Some courses may have prerequisites, for example to take course 0 you have to first take course 1, which is expressed as a pair: [0,1]

// Given the total number of courses and a list of prerequisite pairs, is it possible for you to finish all courses?

// Example 1:

// Input: numCourses = 2, prerequisites = [[1,0]]
// Output: true
// Explanation: There are a total of 2 courses to take. 
// To take course 1 you should have finished course 0. So it is possible.

// Example 2:

// Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
// Output: false
// Explanation: There are a total of 2 courses to take. 
// To take course 1 you should have finished course 0, and to take course 0 you should
// also have finished course 1. So it is impossible.

// Constraints:

// The input prerequisites is a graph represented by a list of edges, not adjacency matrices. Read more about how a graph is represented.
// You may assume that there are no duplicate edges in the input prerequisites.
// 1 <= numCourses <= 10^5

// ----------

function solution_1 (numCourses, prerequisites) {

  // SOLUTION 1 [O(E + V) time (E is the number of dependencies, and V is the number of courses), O(E + V) space]:
  // first, create a reverse adjacency list based on the dependencies. this way, we can look in O(1) time to see which prerequisites a course will have. then do a DFS topological sort on the graph
  // represented by the adjacency list - for any node we visit, first we will recurse on its prerequisites. every time we visit a node, we first mark it "gray" in a `seen` object. while recursing up
  // a chain of prerequisites, we should not encounter a gray node - if we do, then we have found a cycle. once we find a node that has no prerequisites, we can mark it "black" in the `seen` object.
  // in order to do this DFS, we use a helper function whose purpose it is to visit a given node. this function also returns a boolean for whether there is an absence of a cycle (`false` means there is
  // a cycle, while `true` means there is not). first the helper checks if we have already seen this node - if so, and it's gray, then we return `false` (cycle detected), or else it's black and we 
  // return `true`. if it's not in the `seen` object, we mark it as gray, and then recurse through all of its prerequisites first. (if any of those come back `false`, we also return `false`.) once we
  // finish that process we are ready to mark this node as black and return `true`. in the main function, then, we simply iterate through all our courses and call `helper` on them. if at any point we
  // get a `false` result then a cycle was detected, so we ultimately return `false`. else, we ultimately return `true`.

  // INITIALIZATION: CREATE REVERSE ADJACENCY LIST `requires` (if course `n` has a prerequisite of course `x`, then `requires[n]` should be a set that contains `x`)
  const requires = Array.from({length: numCourses}, () => new Set());
  for (const prerequisite of prerequisites) {
    const [A, B] = prerequisite;
    requires[A].add(B);
  }

  // DFS TRAVERSAL: ITERATE THROUGH ALL COURSES (0 to `numCourses - 1`) AND INVOKE HELPER FUNCTION
  const seen = {};                                        // tracks graph nodes that have been encountered. `false` is a "gray" node (still has unvisited prerequisites); `true` is a "black" node
  function helper (course) {                              // helper will return `false` is there is a cycle (we encounter a gray node), or `true` if no cycle is detected so far (all visited nodes turned black)
    if (course in seen) return seen[course];              // of course, if we have already seen this node, then the boolean value that `helper` outputs matches the boolean value stored in `seen`
    seen[course] = false;                                 // otherwise, mark the course as a gray node
    for (const prerequisite of [...requires[course]]) {   // iterate through all incoming connections (these are prerequisites of this course) and visit them
      if (!helper(prerequisite)) return false;            // if we get a `false` result anywhere in the process, we also return `false` here
    }
    seen[course] = true;                                  // if we process all of the prerequisites this course depends on with no `false` results, we can set this course to black...
    return true;                                          // ...and return `true`
  }
  for (let i = 0; i < numCourses; ++i) {                  // iterate through all courses...
    if (!helper(i)) return false;                         // ...invoke `helper` on them. if `helper` ever returns `false`, then a cycle was detected, so we return `false`
  }
  return true;                                            // if no cycles are detected, then we can return `true`
}

// SWITCHING BETWEEN SOLUTIONS:
const canFinish = solution_1;

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = canFinish;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  numCourses: 2,
  prerequisites: [[1, 0]],
};
expected = true;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  numCourses: 2,
  prerequisites: [[1, 0], [0, 1]],
};
expected = false;
test(func, input, expected, testNum, lowestTest, highestTest);