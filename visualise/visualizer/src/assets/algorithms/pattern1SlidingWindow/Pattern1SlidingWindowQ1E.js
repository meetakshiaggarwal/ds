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
    for(let winEnd=0, winStart=0, winSum=0; winEnd<arr.length; winEnd++) {
        winSum += arr[winEnd];
        if(winEnd >= k-1) {
            subArrAvgs[winStart] = formatAvg(winSum/k);
            winSum -= arr[winStart++];
        }
    }
    return subArrAvgs;
}

function formatAvg(avg) {
    return Number((avg).toFixed(2));
}