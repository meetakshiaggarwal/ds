function longestSubstringLengthKDistinctChars(str, k) {
    let maxLength = 0, charFreqMap = new Map();
    for(let windowEnd=0, windowStart=0; windowEnd<str.length; windowEnd++) {
        let endChar = str[windowEnd];
        charFreqMap.set(endChar, (charFreqMap.get(endChar)||0) + 1);
        while(charFreqMap.size > k) {
            let startChar = str[windowStart];
            charFreqMap.set(startChar, charFreqMap.get(startChar)-1)
            windowStart++;
            if(charFreqMap.get(startChar) == 0) {
                charFreqMap.delete(startChar);
            }
        }
        maxLength = Math.max(maxLength, windowEnd - windowStart + 1);
    }
    return maxLength;
}