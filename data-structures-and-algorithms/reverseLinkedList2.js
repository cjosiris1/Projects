/*
Given the head of a singly linked list and two integers left and right where left <= right, reverse the nodes of the list from position left to position right, and return the reversed list.


Example 1:
    1 -> 2 -> 3 -> 4 -> 5
              |
              v
    1 -> 4 -> 3 -> 2 -> 5

Input: head = [1,2,3,4,5], left = 2, right = 4
Output: [1,4,3,2,5]

Example 2:
Input: head = [5], left = 1, right = 1
Output: [5]


Constraints:
The number of nodes in the list is n.
    * 1 <= n <= 500
    * -500 <= Node.val <= 500
    * 1 <= left <= right <= n

Follow up: Could you do it in one pass?
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * Time complexity = O(n)
 * Space complexity = O(1)
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function(head, left, right) {

    // check for null node
    if(!head){
        return head;
    }

    // initialize empty queue that will store all our values
    let queue = [];

    // initialize temp var that will track the nodes we're traversing
    let last = head;

    // traverse through nodes till we hit the last node while adding all our values to queue
    while(last != null){
        queue.push(last.val);
        last = last.next;
    }

    // begin building our new/final queue. Setup the beginning, middle and end
    let beginning = queue.slice(0, left - 1);
    let middle = queue.slice(left - 1, right);
    let end = queue.slice(right);

    // begin building our final queue which will have the beginning un-reversed values
    let resultQueue = [...beginning];

    // add the middle values in reverse order
    for(let i = middle.length - 1; i >= 0; i--){
        resultQueue.push(middle[i]);
    }

    // concatenate the end
    resultQueue = resultQueue.concat(end);

    // construct our new head node
    let newHead = new ListNode(resultQueue.shift());

    // set our new head to last
    last = newHead;

    // while the queue is not empty, pop the last element and set it as the value of the next node
    while(resultQueue.length > 0){
        last.next = new ListNode(resultQueue.shift());
        last = last.next;
    }

    // return new head
    return newHead;

};