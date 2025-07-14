function longestSubstringWithSameLetterWithKReplacements(str,k) {
    let maxLength = -1
    for(let windowEnd=0,windowStart=0, charFreqMap = {}, maxFreq=0; windowEnd<str.length; windowEnd++) {
        let endChar=str[windowEnd]
        charFreqMap[endChar] = (charFreqMap[endChar] || 0)+1
        maxFreq = Math.max(maxFreq, charFreqMap[endChar])
        if(windowEnd-windowStart+1 > maxFreq+k) {
            let startChar = str[windowStart]
            charFreqMap[startChar]--
            windowStart++
        }
        maxLength = Math.max(maxLength, windowEnd-windowStart+1)
    }
    return maxLength
}