/*
Given the head of a singly linked list, reverse the list, and return the reversed list.

Example 1:
    1 -> 2 -> 3 -> 4 -> 5
              |
              v
    5 -> 4 -> 3 -> 2 -> 1

Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]

Example 2:
    1 -> 2
      |
      v
    2 -> 1

Input: head = [1,2]
Output: [2,1]

Example 3:
Input: head = []
Output: []

Constraints:
    * The number of nodes in the list is the range [0, 5000].
    * -5000 <= Node.val <= 5000
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * Time complexity: O(n)
 * Space complexity: O(1)
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {

    if(!head)
        return null;

    if(!head.next)
        return head;

    // initialize empty queue
    let queue = [];

    // loop through linked list and get all values into our queue
    let last = head;
    while (last !== null){
        // add node value to queue
        queue.push(last.val);
        last = last.next;
    }

    // initialize new head to last element of queue
    let reversedHead = new ListNode(queue.pop());

    // track last node by resetting last node's value to our new reversed head
    last = reversedHead;

    // while queue is not empty
    while(queue.length > 0){

        // pop element from queue and set it as next element
        last.next = new ListNode(queue.pop());

        // set last node as the next value
        last = last.next;
    }


    // return head
    return reversedHead;

};

/**
 * Time complexity = O(n)
 * Space complexity = O(1)
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseListV2 = function(head) {

    if(!head)
        return null;

    let prev = null;
    let curr = head;
    let nextTemp;

    while(curr != null){
        // remember next node
        nextTemp = curr.next;

        // reverse it. Null, first time around
        curr.next = prev;

        // used in next iteration
        prev = curr;

        // move to the next node
        curr = nextTemp;
    }

    return prev;

};