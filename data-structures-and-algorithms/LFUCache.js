/*
Design and implement a data structure for a Least Frequently Used (LFU) cache.

Implement the LFUCache class:
    - LFUCache(int capacity) Initializes the object with the capacity of the data structure.
    - int get(int key) Gets the value of the key if the key exists in the cache. Otherwise, returns -1.
    - void put(int key, int value) Update the value of the key if present, or inserts the key if not already present. When the cache reaches its capacity, it should invalidate and remove the least frequently used key before inserting a new item. For this problem, when there is a tie (i.e., two or more keys with the same frequency), the least recently used key would be invalidated.

To determine the least frequently used key, a use counter is maintained for each key in the cache. The key with the smallest use counter is the least frequently used key.

When a key is first inserted into the cache, its use counter is set to 1 (due to the put operation). The use counter for a key in the cache is incremented either a get or put operation is called on it.

The functions get and put must each run in O(1) average time complexity.

Example 1:
    Input
    ["LFUCache", "put", "put", "get", "put", "get", "get", "put", "get", "get", "get"]
    [[2], [1, 1], [2, 2], [1], [3, 3], [2], [3], [4, 4], [1], [3], [4]]
    Output
    [null, null, null, 1, null, -1, 3, null, -1, 3, 4]

    Explanation
    // cnt(x) = the use counter for key x
    // cache=[] will show the last used order for tiebreakers (leftmost element is  most recent)
    LFUCache lfu = new LFUCache(2);
    lfu.put(1, 1);   // cache=[1,_], cnt(1)=1
    lfu.put(2, 2);   // cache=[2,1], cnt(2)=1, cnt(1)=1
    lfu.get(1);      // return 1
                     // cache=[1,2], cnt(2)=1, cnt(1)=2
    lfu.put(3, 3);   // 2 is the LFU key because cnt(2)=1 is the smallest, invalidate 2.
                     // cache=[3,1], cnt(3)=1, cnt(1)=2
    lfu.get(2);      // return -1 (not found)
    lfu.get(3);      // return 3
                     // cache=[3,1], cnt(3)=2, cnt(1)=2
    lfu.put(4, 4);   // Both 1 and 3 have the same cnt, but 1 is LRU, invalidate 1.
                     // cache=[4,3], cnt(4)=1, cnt(3)=2
    lfu.get(1);      // return -1 (not found)
    lfu.get(3);      // return 3
                     // cache=[3,4], cnt(4)=1, cnt(3)=3
    lfu.get(4);      // return 4
                     // cache=[3,4], cnt(4)=2, cnt(3)=3


Constraints:
    - 0 <= capacity <= 104
    - 0 <= key <= 105
    - 0 <= value <= 109
    - At most 2 * 105 calls will be made to get and put.
 */
/**
 *
 * @param capacity
 * @constructor
 */
const LFUCache = function(capacity) {

    // Stores "key: {key, value, frequency}" data.
    this.store = new Map();

    // Stores "[frequencyNumber]: new Set()" data. Where set contains records keys with that frequency.
    this.frequencies = {};
    this.leastFrequent = null;

    this.capacity = capacity;
};

/**
 * Size of cache
 * @returns {number}
 */
LFUCache.prototype.size = function(){
  return this.store.size;
};

/**
 * @param {number} key
 * @return {void}
 */
LFUCache.prototype.deleteRecord = function(key) {

    // Deletes record from "this.store" along with it`s key from "this.frequencies".
    const record = this.store.get(key);
    this.frequencies[record.frequency].delete(key);
    this.store.delete(key);
};

/**
 * @param {number} key
 * @param {number} value
 * @param {number} frequency
 * @return {void}
 */
LFUCache.prototype.addRecord = function(key, value, frequency = 0) {
    const nextValue = {
        key: key,
        value: value,
        frequency: frequency
    };
    this.store.set(key, nextValue);

    // Check if it is required to update "this.leastFrequent" with the smaller frequency.
    if (this.leastFrequent === null || frequency < this.leastFrequent) {
        this.leastFrequent = frequency;
    }

    // check to see if we have data in current frequency, if not we'll create a new set to hold keys of values to that
    // frequency
    if (!this.frequencies[frequency]) {
        this.frequencies[frequency] = new Set();
    }

    // add the key to the frequencies set
    this.frequencies[frequency].add(key);
};

/**
 * @param {number} key
 * @param {number} value
 * @return {object} { value: number, key: number, frequency: number }
 */
LFUCache.prototype.updateRecord = function(key, value) {
    const record = this.store.get(key);

    // Delete record from both "this.store" and "this.frequency" to insert it with bigger frequency counter.
    this.deleteRecord(key);

    // get next frequency by incrementing the record's frequency
    const nextFrequency = record.frequency + 1;

    // Additional check to sure that deleted record was the last one from that frequency set and increment "this.leastFrequent" if it was the last of that kind.
    if (this.frequencies[record.frequency].size === 0) {
        if (record.frequency === this.leastFrequent) this.leastFrequent = nextFrequency;
        delete this.frequencies[record.frequency];
    }

    // This value overwrite required for the case when record key will be the same, but value will be updated with next "put()" call.
    this.addRecord(key, value || record.value, nextFrequency);

    return record;
};

/**
 * @param {number} key
 * @return {number}
 */
LFUCache.prototype.get = function(key) {
    if (!this.store.has(key)) {
        return -1;
    }

    // Updates record frequency .
    const updatedRecord = this.updateRecord(key);

    return updatedRecord.value;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LFUCache.prototype.put = function(key, value) {
    if (this.capacity <= 0) return;

    // Updates value for the record with the already presented key.
    if (this.store.has(key)) {
        this.updateRecord(key, value);
    } else {
        if (this.size() === this.capacity) {
            // Deletes LRU of LFU elements in the "this.store" and "this.frequencies".
            // "this.frequencies[this.leastFrequent].values().next().value" - returns the first key in order of insertion.
            const deleteKey = this.frequencies[this.leastFrequent].values().next().value;
            this.frequencies[this.leastFrequent].delete(deleteKey);
            this.deleteRecord(deleteKey);
        }
        this.addRecord(key, value, 0);
    }
};