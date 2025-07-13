/**
 * Find smallest subarray with a given sum (+ve nums)
 * --------------------------------------------------
 * (>=given sum)
 * Input:   arr,k
 *          [2,3,6,4,5,3,6,7], 10
 * O/P:     minLength => 2
 * Algo:    Sliding Window
 */
function smallestSubArray(arr, targetSum) {
    let minLength = Infinity;
    for(let windowEnd=0, windowSum=0, windowStart=0; windowEnd<arr.length; windowEnd++) {
        windowSum += arr[windowEnd];
        while(windowSum >= targetSum) {
            windowSum -= arr[windowStart];
            minLength = Math.min(minLength, windowEnd - windowStart + 1);
            windowStart++;
        }
    }
    if(minLength==Infinity) {
        return 0;
    }
    return minLength;
}