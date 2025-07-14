/**
 * Find average of subarrays
 * --------------------------
 * Input:   arr,k
 *          [2,3,6,1,5,3,6,7], 3
 * O/P:     array of subarraysAvgs
 * Algo:    Sliding Window
 * 
 */
function findAvgSubArrays(arr, k) {
    let subArrAvgs = [];
    for(let windowEnd=0, windowStart=0, windowSum=0; windowEnd<arr.length; windowEnd++) {
        windowSum += arr[windowEnd];
        if(windowEnd >= k-1) {
            subArrAvgs[windowStart] = formatAvg(windowSum/k);
            windowSum -= arr[windowStart++];
        }
    }
    return subArrAvgs;
}

function formatAvg(avg) {
    return Number((avg).toFixed(2));
}