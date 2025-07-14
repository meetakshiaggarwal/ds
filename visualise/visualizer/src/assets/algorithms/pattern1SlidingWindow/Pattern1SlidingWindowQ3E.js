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