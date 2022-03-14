/*================ QUICK SORT ALGORITHM */
/**
 * Quick sort algorithm
 * @param nums
 * @param low
 * @param high
 * @return {*}
 */
const quickSort = function (nums, low, high) {

    // Make sure to always have the low and high indexes for the array we're going to sort
    if (low === undefined || high === undefined) {
        low = 0;
        high = nums.length - 1;
    }

    // proceed if till we've checked all indexes between low and high
    if (low < high) {

        // get our partition index by swapping the values at low and high if low is greater than high index
        let p = partition(nums, low, high);

        // quick sort the left side of the array
        quickSort(nums, low, p - 1);

        // quick sort the right side of the array
        quickSort(nums, p + 1, high);
    }

    return nums;
};

const partition = function (nums, lo, hi) {
    let pivot = nums[hi];
    let i = lo;

    for (let j = lo; j < hi; j++) {
        if (nums[j] < pivot) {
            swap(nums, i, j);
            i++;
        }
    }

    swap(nums, i, hi);
    return i;
};

/**
 * Helper function to swap values at specified indexes
 * @param nums
 * @param i
 * @param j
 */
const swap = function (nums, i, j) {
    if (i >= 0 && i < nums.length && j >= 0 && j < nums.length) {
        let temp = nums[j];
        nums[j] = nums[i];
        nums[i] = temp;
    }
};


/*================ MERGE SORT ALGORITHM */
/**
 * Performs merge sort algorithm
 * @param nums
 * @return {*[]|*}
 */
const mergeSort = function (nums) {
    if (nums.length <= 1)
        return nums;

    let mid = Math.floor(nums.length / 2);
    let left = nums.slice(0, mid);
    let right = nums.slice(mid);

    return merge(
        mergeSort(left),
        mergeSort(right)
    );
}

/**
 * Merge two arrays and in correct order
 * @param left
 * @param right
 * @return {*[]}
 */
const merge = function (left, right) {
    let leftIndex = 0;
    let rightIndex = 0;
    let result = [];

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    return result.concat(left.slice(leftIndex))
        .concat(right.slice(rightIndex));
};

let nums = [20, 1, 3, 50, 21, 12, 0];
console.log(quickSort(nums));

let nums = [20, 1, 3, 50, 21, 12, 0];
console.log(mergeSort(nums));