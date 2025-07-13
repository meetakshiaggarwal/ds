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
        for (let winEnd = 0, winStart = 0, winSum = 0; winEnd < arr.length; winEnd++) {
            winSum += arr[winEnd];
            if (winEnd >= k - 1) {
                if (winSum > maxSum) {
                    maxSum = winSum;
                }
                winSum -= arr[winStart];
                winStart++;
            }
        }
        return maxSum;
    }

    const inputPath = process.argv[2];
    const input = fs.readFileSync(inputPath, 'utf-8').trim().split('\n');
    const arr = input[0].split(',').map(Number);
    const k = Number(input[1]);

    console.log(getMaxSumOfSubarray(arr, k));
})();
