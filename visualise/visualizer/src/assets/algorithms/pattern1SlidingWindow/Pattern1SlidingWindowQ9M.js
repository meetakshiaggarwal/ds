function maxOnesWithKReplacements(arr,k) {
    let maxLength = -1
    for(let windowEnd=0,windowStart=0, maxOnesCount=0; windowEnd<arr.length; windowEnd++) {
        if(arr[windowEnd] === 1) maxOnesCount++;
        if(windowEnd-windowStart+1 > maxOnesCount+k) {
            if(arr[windowStart] === 1) maxOnesCount--;
            windowStart++
        }
        maxLength = Math.max(maxLength, windowEnd-windowStart+1)
    }
    return maxLength
}