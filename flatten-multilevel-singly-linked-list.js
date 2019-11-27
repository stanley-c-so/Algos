// SOURCE: LEETCODE (https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/)
// NOTE: unlike the source problem, this problem will involve a SINGLY linked list instead of doubly. however, i will include notes to show how doubly would be solved.

// You are given a SINGLY linked list which in addition to the next pointer, it could have a child pointer, which may or may not point to a separate SINGLY linked list. These child lists may have one or more children of their own, and so on, to produce a multilevel data structure, as shown in the example below.

// Flatten the list so that all the nodes appear in a single-level, SINGLY linked list. You are given the head of the first level of the list.

// Example:

// Input:
//  1---2---3---4---5---6--NULL
//          |
//          7---8---9---10--NULL
//              |
//              11--12--NULL

// Output:
// 1-2-3-7-8-11-12-9-10-4-5-6-NULL

// Note: I wrote the ListNode class for this exercise.

// SWITCHING BETWEEN SOLUTIONS:
const flatten = solution_2;

class ListNode {
  constructor (val, ...extraVals) {
    this.val = val;
    this.next = null;
    if (extraVals.length) this.insert(...extraVals);
    this.child = null;                                // needed for this problem
  }
  insert (...vals) {
    let currentNode = this;
    for (const val of vals) {
      const nextNode = new ListNode(val);
      currentNode.next = nextNode;
      currentNode = nextNode;
    }
    return this;
  }
  insertChildAt (k, child) {                          // needed for this problem
    let currentNode = this;
    while (k !== 1) {
      currentNode = currentNode.next;
      k--;
    }
    currentNode.child = child;
    return this;
  }
}

function solution_1 (head) {

  // SOLUTION 1 [O(n^2) time (if the entire list is just a vertical line of children, then every time you recurse you have to rerun through current node's descendants), O(1) space]:
  // this is basically just a simple traversal problem. first, set up the edge case for a null input. otherwise, initialize currentNode to head, and run a loop while currentNode
  // is not null. at each currentNode, save a reference to whatever is its .next. then, check if a child exists. if it does, recurse to flatten that child, and set currentNode.next
  // to the flattened child. then, keep traversing next until you hit the final node before null (note that even if the child itself had children, because you flattened it recursively,
  // at this stage the former child is now itself flat!) when you reach the final node, reconnect that with originalNext. then, regardless of whether there was a child or not (i.e.
  // outside of the if statement), move currentNode forward by one.
  // NOTE: IF THE PROBLEM WAS FOR DOUBLY LINKED LISTS, INCLUDE THE COMMENTED OUT CODE MARKED WITH ***. notice that i have marked out two lines with [OPTION A] and one block with
  // [OPTION B]. you would choose one or the other. [OPTION A] makes the necessary .prev connections as you go, requiring only one pass through the linked list. [OPTION B], on the
  // other hand, is easier to figure out - basically, you don't care about .prev connections until you configure the whole thing in the forward direction, and then you make a second
  // pass through the list to reconfigure the .prev connections.

  // EDGE CASE: NO NODE
  if (!head) return null;

  // INITIALIZATION
  let currentNode = head;
  
  // WHILE LOOP (AS LONG AS currentNode IS A NODE)
  while (currentNode) {
    const originalNext = currentNode.next;                        // for reference, in case there is a child
    if (currentNode.child) {                                      // IF THERE IS A CHILD...
      currentNode.next = flatten(currentNode.child);                // flatten child, then connect currentNode to former child head
      currentNode.child = null;                                     // disconnect child property
      while (currentNode.next) {                                    // run to the end of former child
        //currentNode.next.prev = currentNode;                        // *** [OPTION A] connect next node's .prev back to currentNode
        currentNode = currentNode.next;
      }
      currentNode.next = originalNext;                            // after reaching the end, connect to the next at the original level
    }
    //if (currentNode.next) currentNode.next.prev = currentNode;    // *** [OPTION A] connect next node's .prev back to currentNode
    currentNode = currentNode.next;                               // traverse to the next node, whether or not there was a child
  }

  // // *** [OPTION B] NOW THE LINKED LIST IS VALID IN ONE DIRECTION. RUN THROUGH IT AGAIN AND UNTANGLE THE .prev
  // currentNode = head;
  // let prevNode = null;
  // while (currentNode) {
  //     currentNode.prev = prevNode;
  //     prevNode = currentNode;
  //     currentNode = currentNode.next;
  // }
  
  // RETURN head
  return head;
}

function solution_2 (head) {

  // SOLUTION 2 [O(n) time, O(1) space]:
  // to avoid the O(n^2) problem in the above solution, we need to use a helper function that returns both the head as well as the finalNode (this is either the final sibling node
  // of the head, OR if the final sibling had any children, then whatever is the final node at that level). the main function, then, only needs to invoke the helper with the original
  // head and return the 0 index.
  // NOTE: I DID NOT BOTHER TO MAKE THIS SOLUTION SUPPORT DOUBLY LINKED LISTS. BUT IF YOU WANTED TO, YOU COULD JUST IMPLEMENT [OPTION B] FROM ABOVE TO DO IT SIMPLY

  // EDGE CASE: NO NODE
  if (!head) return null;

  // RECURSIVE HELPER FUNCTION
  const helper = head => {

    // INITIALIZATIONS
    let finalNode;                                                      // final sibling node of the current head, or if that final sibling had any children, the final node at that level
    let currentNode = head;

    // ITERATE THROUGH THE LINKED LIST
    while (currentNode) {
      const originalNext = currentNode.next;                            // save a reference to the next node (or null), in case there is a child at this node
      if (currentNode.child) {                                          // if there is a child at this node...
        const [originalChild, childTail] = helper(currentNode.child);     // ...recurse helper on the child to flatten it
        currentNode.child = null;                                         // don't forget to set the .child property to null
        currentNode.next = originalChild;                                 // connect current node to originalChild
        childTail.next = originalNext;                                    // connect childTail to originalNext (THIS IS THE WHOLE POINT OF THE HELPER - don't need to run through children)
        if (!originalNext) finalNode = childTail;                         // IMPORTANT: if originalNext was null, then set finalNode to childTail
      } else {
        finalNode = currentNode;                                        // if no child at this node, set finalNode to currentNode (this will surely catch final sibling if childless).
      }
      currentNode = originalNext;                                       // advance currentNode to originalNext
    }
    return [head, finalNode];                                           // at the end of the while loop, return both the head and the finalNode (finalNode helps connect children back up)
  };

  return helper(head)[0];                                               // return only the original head, so invoke the helper and return index 0
}

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = flatten;
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
  head: new ListNode(1, 2, 3)
    .insertChildAt(3,
      new ListNode(4).insert(5, 6)
    ),
};
expected = new ListNode(1, 2, 3, 4, 5, 6);
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 3
input = {
  head: new ListNode(1)
  .insert(2, 3, 4, 5, 6)
  .insertChildAt(3,
    new ListNode(7, 8, 9, 10)
      .insertChildAt(2,
        new ListNode(11, 12)
      )
  ),
};
expected = new ListNode(1).insert(2, 3, 7, 8, 11, 12, 9, 10, 4, 5, 6);
test(func, input, expected, testNum, lowestTest, highestTest);