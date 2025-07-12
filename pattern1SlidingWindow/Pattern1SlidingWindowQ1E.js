/**
 * Find average of subarrays
 * --------------------------
 * Input: arr,k
 * [2,3,6,1,5,3,6,7], 3
 * O/P - array of subarraysAvgs
 * 
 * Algo - Sliding Window
 * 
 */
import fs from 'fs';
(() => {

    /** 
     * 
     *  v0 => O(n)
    function findAvgSubArrays(arr, k) {
        let subArrAvgs=[], sum=0, subIndex=0;
        for(let i=0; i<k; i++) {
            sum+= arr[i];
        }
        subArrAvgs[subIndex++] = formatAvg(sum/k);
        for(let i=1; i<arr.length-k; i++) {
            sum -= arr[i-1];
            sum += arr[i+k-1]; 
            subArrAvgs[subIndex++] = formatAvg(sum/k);
        }
        return subArrAvgs;
    }
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

    /**
     * formatAvg => roundTo2DigitAndReturnNumber
     */
    function formatAvg(avg) {
        return Number((avg).toFixed(2));
    }

    const inputPath = process.argv[2];
    const input = fs.readFileSync(inputPath, 'utf-8').trim().split('\n');
    const arr = input[0].split(',').map(Number);
    let k = Number(input[1]);

    console.log(findAvgSubArrays(arr, k));

})();

