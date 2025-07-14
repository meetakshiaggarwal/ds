function getMaxSumOfSubarray(arr, k) {
    let maxSum = 0;
    for (let windowEnd = 0, windowStart = 0, windowSum = 0; windowEnd < arr.length; windowEnd++) {
        windowSum += arr[windowEnd];
        if (windowEnd >= k - 1) {
            if (windowSum > maxSum) {
                maxSum = windowSum;
            }
            windowSum -= arr[windowStart];
            windowStart++;
        }
    }
    return maxSum;
}