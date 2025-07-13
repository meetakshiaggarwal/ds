/**
 * Length of longest Substring without repeating characters - No repeat Substring
 * ---------------------------------------------------------------------
 * 1. Loop the str
 * 2. maintain map(with position) - of chars traversed in window
 *     if endChar not in map - add
 *     if exist - slide window to +1 pos of char (since the char can already be there in the map - legacy val - but start is updated before)
 * 3. update maxLen
 */
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