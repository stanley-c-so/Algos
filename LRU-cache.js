// SOURCE: LEETCODE (https://leetcode.com/problems/lru-cache/)

// Design and implement a data structure for Least Recently Used (LRU) cache. It should support the following operations: get and put.

// get(key) - Get the value (will always be positive) of the key if the key exists in the cache, otherwise return -1.
// put(key, value) - Set or insert the value if the key is not already present. When the cache reached its capacity, it should invalidate the least recently used item before inserting a new item.

// The cache is initialized with a positive capacity.

// Follow up:
// Could you do both operations in O(1) time complexity?

// Example:

// LRUCache cache = new LRUCache( 2 /* capacity */ );

// cache.put(1, 1);
// cache.put(2, 2);
// cache.get(1);       // returns 1
// cache.put(3, 3);    // evicts key 2
// cache.get(2);       // returns -1 (not found)
// cache.put(4, 4);    // evicts key 1
// cache.get(1);       // returns -1 (not found)
// cache.get(3);       // returns 3
// cache.get(4);       // returns 4

// ----------

// SOLUTION 1 [O(1) time (per operation), O(capacity) space]:
// the idea is to use a combination of a hash map and a doubly linked list. with a hash map, we can access the list node for a particular `key` in constant time - the list node
// would ultimately contain the information being sought from a `get` call. calls to either `set` or `get` should, in turn, move/create a list node for that `key`, and move it
// to the head of the doubly linked list. if the list is over capacity, the tail should be evicted. here, i define two custom classes inside my LRU constructor: `Node` and
// `DoublyLinkedList`.
class solution_1 {
  constructor (capacity) {
    class Node {
      constructor (key, val) {
        this.key = key;
        this.val = val;
        this.next = null;
        this.prev = null;
      }
    }
    class DoublyLinkedList {
      constructor (capacity) {
        this.head = null;
        this.tail = null;
        this.length = 0;
        this.capacity = capacity;
      }
      enqueue (key, val) {
        if (this.length === this.capacity) this.dequeue();
        const node = new Node(key, val);
        if (!this.length) {
          this.head = node;
        } else {
          this.tail.next = node;
          node.prev = this.tail;
        }
        this.tail = node;
        this.length++;
        return node;
      }
      dequeue () {
        if (!this.length) return;
        const node = this.head;
        if (this.length === 1) {
          this.head = null;
          this.tail = null;
        } else {
          this.head = this.head.next;
          this.head.prev = null;
          node.next = null;
        }
        this.length--;
        return node;
      }
      disconnect (node) {
        if (node === this.head && node === this.tail) return;
        if (node === this.head) this.head = node.next;
        if (node === this.tail) this.tail = node.prev;
        if (node.prev) node.prev.next = node.next;
        if (node.next) node.next.prev = node.prev;
        node.next = null;
        node.prev = null;
      }
      moveToTail (node) {
        if (node === this.tail) return;
        this.disconnect(node);
        this.tail.next = node;
        node.prev = this.tail;
        this.tail = node;
      }
    }
    this.cache = {};
    this.queue = new DoublyLinkedList(capacity);
  }
  get (key) {
    if (!(key in this.cache)) return -1;
    const node = this.cache[key];
    this.queue.moveToTail(node);
    return node.val;
  }
  put (key, value) {
    const val = value;                                      // in leetcode, the signature is prepopulated with `value`, but i wanted to use `val`
    if (key in this.cache) {
      this.cache[key].val = val;
      this.queue.moveToTail(this.cache[key]);
    } else {
      if (this.queue.length === this.queue.capacity) {
        const evictedNode = this.queue.dequeue();
        delete this.cache[evictedNode.key];
      }
      this.cache[key] = this.queue.enqueue(key, val);
    }
  }
}

// SOLUTION 2 [O(1) time (per operation), O(capacity) space]:
// same ideas as above, but trying to clean up the code a bit. i got rid of custom classes altogether. list functionality is inherently handled by the LRUCache class. i also just
// made the `put` method create a vanilla JS object representing the doubly linked list node. we can write a few extra methods into our class that `get` and `put` can call, to make
// life easier. note that our constructor now needs to track size, head, and tail, alongside cache.
class solution_2 {
  constructor (capacity) {
    this.capacity = capacity;                           // to enforce size limit
    this.size = 0;
    this.head = null;                                   // for DLL management
    this.tail = null;                                   // for DLL management
    this.cache = {};
  }
  get (key) {
    if (!(key in this.cache)) return -1;                // if `key` is not in the cache, return -1 only
    const node = this.cache[key];
    this.remove(node);                                  // else, we have to remove the node from wherever it is in the doubly linked list...
    this.insertAsHead(node);                            // ...and reinsert it into the head position...
    return node.val;                                    // ...before returning its value
  }
  put (key, value) {
    const val = value;                                  // in leetcode, the signature is prepopulated with `value`, but i wanted to use `val`
    if (!(key in this.cache)) {
      if (this.size === this.capacity) {                // see if the cache is currently at capacity
        delete this.cache[this.tail.key];               // if so, delete tail's key from the cache...
        this.remove(this.tail);                         // ...and remove the tail
      }
      this.cache[key] = {                               // create new cache entry...
        key,
        val,
        next: null,
        prev: null,
      };
    } else {
      this.cache[key].val = val;                        // overwrite existing cache entry
      this.remove(this.cache[key]);                     // ...and remove node from wherever it is in the doubly linked list
    }
    this.insertAsHead(this.cache[key]);                 // (re)insert the new node into head
  }
  remove (node) {                                       // THIS SHOULD ONLY BE CALLED ON NODES THAT ACTUALLY EXIST IN THE DOUBLY LINKED LIST
    if (node.prev) node.prev.next = node.next;          // (if applicable) connect prev to next
    if (node.next) node.next.prev = node.prev;          // (if applicable) connect next to prev
    if (node === this.head) this.head = node.next;      // (if applicable) set new head
    if (node === this.tail) this.tail = node.prev;      // (if applicable) set new tail
    node.prev = null;                                   // disconnect `node` from prev (note: we don't have to disconnect from next, since a removed node will always be a tail, OR inserted into head)
    this.size--;
  }
  insertAsHead (node) {
    node.next = this.head;
    if (this.head) this.head.prev = node;
    this.head = node;
    if (!this.tail) this.tail = node;
    this.size++;
  }
}

const specialTest = (capacity, commands, inputs) => {
  const cache = new LRUCache(capacity);
  const ref = {                                         // this object holds references to the LRUCache methods...
    get: cache.get,
    put: cache.put,
  };
  const output = [];
  for (let i = 0; i < commands.length; i++) {
    output.push(
      ref[commands[i]].bind(cache)(...inputs[i])        // ...but each method still needs to be given `cache` as its `this` context
    )
  }
  return output;
};

// SWITCHING BETWEEN SOLUTIONS:
const LRUCache = solution_2;

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = specialTest;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 2 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  capacity: 2,
  commands: ['put', 'put', 'get', 'put', 'get', 'put', 'get', 'get', 'get'],
  inputs: [
    [1, 1],
    [2, 2],
    [1],
    [3, 3],
    [2],
    [4, 4],
    [1],
    [3],
    [4],
  ],
};
expected = [undefined, undefined, 1, undefined, -1, undefined, -1, 3, 4];
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  capacity: 2,
  commands: ['put', 'put', 'get', 'get', 'put', 'get', 'get', 'get'],
  inputs: [
    [2, 1],
    [3, 2],
    [3],
    [2],
    [4, 3],
    [2],
    [3],
    [4],
  ],
};
expected = [undefined, undefined, 2, 1, undefined, 1, -1, 3];
test(func, input, expected, testNum, lowestTest, highestTest);