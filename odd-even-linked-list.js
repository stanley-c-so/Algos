// SOURCE: LEETCODE (https://leetcode.com/problems/odd-even-linked-list/)

// Given a singly linked list, group all odd nodes together followed by the even nodes. Please note here we are talking about the node number and not the value in the nodes.

// You should try to do it in place. The program should run in O(1) space complexity and O(nodes) time complexity.

// Example 1:

// Input: 1->2->3->4->5->NULL
// Output: 1->3->5->2->4->NULL

// Example 2:

// Input: 2->1->3->5->6->4->7->NULL
// Output: 2->3->6->7->1->5->4->NULL

// Note:

// The relative order inside both the even and odd groups should remain as it was in the input.
// The first node is considered odd, the second node even and so on ...

// Note: I wrote the following class code for SinglyLinkedList

class SinglyLinkedList {
  constructor(val) {
    this.val = val;
    this.next = null;
  }

  insert(val) {
    this.next = new SinglyLinkedList(val);
    return this;    // for chaining
  }
}

// SWITCHING BETWEEN SOLUTIONS:
const oddEvenList = solution_1;

function solution_1 (head) {

  // SOLUTION 1 [O(n) time, O(1) space]:
  // first, handle edge cases of empty or single node inputs. if the former, return null; if the latter, just return the head because it already follows the pattern required.
  // otherwise, we know we have at least two nodes. we will need permanent references to the first odd and the first even nodes; head will be the permanent reference to the
  // first odd node, while we need to define firstEvenNode using head.next. we also need to initialize oddPointer and evenPointer (we can use head and firstEvenNode). next up,
  // use a while loop and keep it running as long as there is anything after evenPointer (i.e. evenPointer.next is not null). the idea is to connect oddPointer to the node
  // that comes after evenPointer (i.e. evenPointer.next), and then moving the 'oddPointer' reference to that node. once this is done, we need to check whether anything exists
  // after the new oddPointer (if the entire linked list has an odd number of nodes, this is where that would eventually be detected). IF nothing exists after the oddPointer,
  // then that is the final node. moreover, evenPointer is now the final even node, so we have to sever evenPointer (setting its .next to null). ELSE, if there is still another
  // node after oddPointer, then we will repeat the same exercise but with odd/even reversed: connect evenPointer to oddPointer.next, and then move 'evenPointer' reference to
  // oddPointer.next. (we do not need to manually change evenPointer.next in this case, because if the linked list has an even number of nodes, the final even node is already
  // pointing at null.) now, end the while loop. after the loop exits, the odd nodes should be properly connected, and the even nodes should be properly connected. the final step
  // is to connect the final odd node (oddPointer) to the first even node (firstEvenNode), and then return the head.

  // EDGE CASES: 0- OR 1-NODE LIST
  if (!head) return null;
  if (!head.next) return head;
  
  // INITIALIZATIONS
  const firstEvenNode = head.next;
  let oddPointer = head;
  let evenPointer = firstEvenNode;
  
  // ITERATE WHILE ANYTHING EXISTS BEYOND THE CURRENT EVEN NODE
  while (evenPointer.next) {
    oddPointer.next = evenPointer.next;     // connect current odd node to the node after the current even node
    oddPointer = evenPointer.next;          // move the odd node pointer to the most recent odd node
    if (!oddPointer.next) {                 // if the list ends on an odd node...
      evenPointer.next = null;              // ...the final even node needs be disconnected from the final odd node
      break;                                // ...and we break
    }
    evenPointer.next = oddPointer.next;     // connect current even node to the node after the current odd node
    evenPointer = oddPointer.next;          // move the even node pointer to the most recent even node
  }
  
  // CONNECT ODDS TO EVENS
  oddPointer.next = firstEvenNode;            // connect most recent odd node to the first even node
  
  return head;
}


// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = oddEvenList;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  head: null,
};
expected = null;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  head: new SinglyLinkedList(1),
};
expected = new SinglyLinkedList(1);
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 3
input = {
  head: new SinglyLinkedList(1)
    .insert(2)
    .insert(3)
    .insert(4)
    .insert(5),
};
expected = new SinglyLinkedList(1)
  .insert(3)
  .insert(5)
  .insert(2)
  .insert(4);
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 4
input = {
  head: new SinglyLinkedList(1)
    .insert(2)
    .insert(3)
    .insert(4)
    .insert(5)
    .insert(6),
};
expected = new SinglyLinkedList(1)
  .insert(3)
  .insert(5)
  .insert(2)
  .insert(4)
  .insert(6);
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 5
input = {
  head: new SinglyLinkedList('A')
    .insert('B')
    .insert('C')
    .insert('D')
    .insert('E')
    .insert('F'),
};
expected = new SinglyLinkedList('A')
  .insert('C')
  .insert('E')
  .insert('B')
  .insert('D')
  .insert('F');
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 6
input = {
  head: new SinglyLinkedList(['A'])
    .insert(['B'])
    .insert(['C'])
    .insert(['D'])
    .insert(['E'])
    .insert(['F'])
    .insert(['G']),
};
expected = new SinglyLinkedList(['A'])
  .insert(['C'])
  .insert(['E'])
  .insert(['G'])
  .insert(['B'])
  .insert(['D'])
  .insert(['F']);
test(func, input, expected, testNum, lowestTest, highestTest);