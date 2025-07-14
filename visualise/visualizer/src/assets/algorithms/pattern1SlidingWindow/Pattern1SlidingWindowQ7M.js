function longestSubstringWithoutRepeatingChars(str) {
    let maxLength=0, charPositionMap={}
    for(let windowEnd=0,windowStart=0; windowEnd<str.length; windowEnd++) {
        let endChar=str[windowEnd]
        if(endChar in charPositionMap) {
            windowStart=Max(windowStart,charPositionMap[endChar]+1)
        }
        charPositionMap[endChar]=windowEnd;
        maxLength=Math.max(maxLength,windowEnd-windowStart+1)
    }
    return maxLength
}