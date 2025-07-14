function longestSubstring(str) {
    longestSubstringLengthKDistinctChars(str,2)
}

function longestSubstringLengthKDistinctChars(str, k) {
    let maxLength = -1, charFreqMap = {};
    for(let windowEnd=0, windowStart=0; windowEnd<str.length; windowEnd++) {
        let endChar = str[windowEnd];
        charFreqMap[endChar] = endChar in charFreqMap ? charFreqMap[endChar] + 1 : 1;
        while(Object.keys(charFreqMap).length > k) {//Algo complx - depends on the value of k - calculating the size of the map
            let startChar = str[windowStart];
            charFreqMap[startChar]--;
            windowStart++;
            if(charFreqMap[startChar] == 0) {
                delete charFreqMap[startChar];
            }
        }
        maxLength = Math.max(maxLength, windowEnd - windowStart + 1);
    }
    return maxLength;
}