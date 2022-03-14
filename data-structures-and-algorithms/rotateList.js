/*
Given the head of a linked list, rotate the list to the right by k places.

Example 1:
Input: head = [1,2,3,4,5], k = 2
Output: [4,5,1,2,3]

Example 2:
Input: head = [0,1,2], k = 4
Output: [2,0,1]

Constraints:
    The number of nodes in the list is in the range [0, 500].
    -100 <= Node.val <= 100
    0 <= k <= 2 * 109

 */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function(head, k) {

    if(k === 0 || !head || !head.next){
        return head;
    }

    // get values of head into list
    const listValues = [];
    let curNode = head;

    // loop through our linked list and capture all the values in a list
    while(curNode){
        listValues.push(curNode.val);
        curNode = curNode.next;
    }

    // If k is larger than size of our list, let's figure out how many times we can rotate to the same position.
    // This is going to be the floor(k / n) * n. By knowing how many times we can return to the same position we can
    // use that to find out the remainder = k - floor(k / n) * n. That the new optimized number of turns we need to use.
    const n = listValues.length;
    const samePositionRotations =  Math.floor(k / n) * n;

    // if same positions rotations match k, lets return the head
    if(samePositionRotations === k){
        return head;
    }

    const turnTimes = k > n ? k - samePositionRotations : k;

    // for k times
    for(let i = 0; i < turnTimes; i++){
        // pop array and shift values into the beginning of list
        listValues.unshift(listValues.pop());

    }

    // build the new linked list
    const newHead = new ListNode(listValues.shift());
    curNode = newHead;
    while(listValues.length > 0){
        curNode.next = new ListNode(listValues.shift());
        curNode = curNode.next;
    }

    // return new list's head
    return newHead;
};