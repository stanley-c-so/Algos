// SOURCE: A friend tells me that this problem was asked by Simon Data.

// Given the root node of a binary tree and a target value, write a function that returns an array of the path that leads to the target value.

// For example:

//             A
//           /   \
//          B      C
//         / \    / \
//        D   E  F   G
//       /
//      H

// If target value is 'A', return ['A']
// If target value is 'H', return ['A', 'B', 'D', 'H']
// If target value is 'Z', return []

// NOTE: I developed the following BinaryTree and Batch classes for easy creation of binary trees with arbitrary values.

class BinaryTree {
  constructor (value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
  insert (left, right, firstInsert = false) {
    if (left !== null) this.left = new BinaryTree(left);
    if (right !== null) this.right = new BinaryTree(right);
    return firstInsert ? new Batch(this, [this.left, this.right]) : [this.left, this.right];
  }

  // SWITCHING BETWEEN SOLUTIONS:
  findPathToTarget (target) { return this.solution_2(target); }

  solution_1 (target) {

    // SOLUTION 1 [O(n) time (n is the number of nodes in the tree), O(d^2) space (d is the depth of the tree) because with each iteration you hold longer and longer clones of the path]:
    // this solution uses DFS. the heavy lifting is done by a helper function which takes a current node, and a record of the current path up to that point. the helper function returns
    // a tuple that contains a boolean of whether a valid path exists through this node, and an array indicating that path if true, or empty array if false. the main function invokes
    // the helper with initial values of 'this' (the root) as the current node, and an empty array is the path so far. the helper function first checks to see if the current node exists.
    // if not, return [false, []]. otherwise, clone the old path and add the current node value to the end of newPath. then, attempt to recurse to the left - if the goLeft[0] is true,
    // then a path was found, so return [true, goLeft[1]] to 'bubble up' the boolean as well as the full path. otherwise, attempt the same by recursing to the right. if still no path,
    // then this node is a dead end, so we return [false, []] to 'bubble up' that information. in the main function, after helper is invoked, we ultimately grab the path contained in
    // array index 1, which is either going to be the correct path bubbled up, or if no path, then an empty array bubbled up.

    const helper = (node, currentPath) => {
      if (!node) return [false, []];                      // base case false: if no more nodes on this path
      const newPath = [...currentPath, node.value];       // try this path by pushing the current node into the path
      if (node.value === target) return [true, newPath];  // base case true: if current node is your target
      const goLeft = go(node.left, newPath);
      if (goLeft[0]) return [true, goLeft[1]];            // recursive case true: if continuing to your left ultimately finds the target
      const goRight = go(node.right, newPath);
      if (goRight[0]) return [true, goRight[1]];          // recursive case true: if continuing to your right ultimately finds the target
      return [false, []]                                  // recursive case false: going any further would be a dead end
    }

    return helper(this, [])[1];                           // the correct path at [1] (or empty path) has been bubbled up from base case through the recursive cases
  }

  solution_2 (target) {

    // SOLUTION 2 [O(n) time (n is the number of nodes in the tree), O(d) space (d is the depth of the tree)]:
    // this solution uses DFS backtracking. we start with an initial output 'path' of []. we write a recursive 'go' function that returns a boolean whether a valid path exists, given
    // the current path described in output. if the current node does not exist, return false. otherwise, add the current node's value to the output path. if the current node's value
    // is the target, return true. otherwise, recurse on node.left and node.right. if either are those ultimately result in true, then return true (which 'bubbles up' the truthy
    // result). if, on the other hand, all of those fail, then we have reached a dead end, so we pop the current value from the output path and return false. since at every step we
    // direclty modify the output 'path' object, all we have to do is invoke go() at the start, and then we can ultimately simply return the output object.

    const output = [];

    const go = (node = this) => {   // if writing this out as a separate function, use "root" instead of "this"
      if (!node) return false;      // base case false: if no more nodes on this path
      output.push(node.value);      // try this path by pushing the current node into the path
      if (
        node.value === target       // base case true: if current node is your target
        || go(node.left)            // recursive case true: if continuing to your left ultimately finds the target
        || go(node.right)           // recursive case true: if continuing to your right ultimately finds the target
      ) return true;                // 'bubble up' the truthy value for recursion
      output.pop();                 // recursive case false: going any further would be a dead end, so pop out the current node from the path
      return false;                 // 'bubble up' the falsy value for recursion
    }

    go();                           // simply invoke to start the process. we don't care what it returns - we just want it to produce the necessary side effects on the output object
    return output;                  // after invoking go(), we just need to return the output object
  }

}

class Batch {
  constructor (root, nodes) {
    this.root = root;
    this.batch = nodes;
  }
  insert (lastInsert, ...values) {
    const nextBatch = [];
    for (let i = 0; i < this.batch.length; i++) {
      if (this.batch[i] !== null) {
        nextBatch.push(...(this.batch[i].insert(values[2 * i] || null, values[2 * i + 1] || null)));
      }
    }
    return lastInsert ? this.root : new Batch (this.root, nextBatch);
  }
}

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = (new BinaryTree).findPathToTarget;
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  root: new BinaryTree('A')
    .insert('B', 'C', true)               // first .insert must END with 'true' argument
    .insert(false, 'D', 'E', 'F', 'G')    // subsequent .inserts must START with 'false' argument...
    .insert(true, 'H'),                   // ...except the last .insert which must START with 'true' argument
  target: 'A',
};
expected = ['A'];
test(func.bind(input.root), {target: input.target}, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  root: new BinaryTree('A')
    .insert('B', 'C', true)               // first .insert must END with 'true' argument
    .insert(false, 'D', 'E', 'F', 'G')    // subsequent .inserts must START with 'false' argument...
    .insert(true, 'H'),                   // ...except the last .insert which must START with 'true' argument
  target: 'H',
};
expected = ['A', 'B', 'D', 'H'];
test(func.bind(input.root), {target: input.target}, expected, testNum, lowestTest, highestTest);

// Test case 3
input = {
  root: new BinaryTree('A')
    .insert('B', 'C', true)               // first .insert must END with 'true' argument
    .insert(false, 'D', 'E', 'F', 'G')    // subsequent .inserts must START with 'false' argument...
    .insert(true, 'H'),                   // ...except the last .insert which must START with 'true' argument
  target: 'Z',
};
expected = [];
test(func.bind(input.root), {target: input.target}, expected, testNum, lowestTest, highestTest);

// Test case 4
input = {
  root: new BinaryTree('A')
    .insert('B', 'C', true)               // first .insert must END with 'true' argument
    .insert(false, 'D', 'E', 'F', 'G')    // subsequent .inserts must START with 'false' argument...
    .insert(true, 'H'),                   // ...except the last .insert which must START with 'true' argument
  target: 'G',
};
expected = ['A', 'C', 'G'];
test(func.bind(input.root), {target: input.target}, expected, testNum, lowestTest, highestTest);