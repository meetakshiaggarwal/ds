/**
 * Find max sum of subarrays of size k
 * ------------------------------------
 * Input: arr,k
 * [2,3,6,1,5,3,6,7], 3
 * O/P - maxSum
 * 
 * Algo - Sliding Window
 * 
 */
import fs from 'fs';
(() => {

    function getMaxSumOfSubarray(arr, k) {
        let maxSum = 0;
        for(let windowEnd=0, windowStart=0, windowSum=0; windowEnd<arr.length; windowEnd++) {
            windowSum += arr[windowEnd];
            if(windowEnd >= k-1) {
                if(windowSum > maxSum) {
                    maxSum = windowSum;
                }
                windowSum -= arr[windowStart];
                windowStart++;
            }
        }
        return maxSum;
    }

    const inputPath = process.argv[2];
    const input = fs.readFileSync(inputPath, 'utf-8').trim().split('\n');
    const arr = input[0].split(',').map(Number);
    const k = Number(input[1]);

    console.log(getMaxSumOfSubarray(arr,k));
})();
