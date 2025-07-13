/**
 * Length of longest substring with k different characters
 * -----------------------------------------------------
 * Input:   str,k
 *          abcdrfescdcdc, 3
 * O/P:     maxLength
 * Algo:    Sliding Window
 * Maintain
 * - hashmap (freq of chars in str),
 * - maxLength
 * 1. Loop the str
 * 2. Add the char to map (increase freq if already exist)
 * 3. if k > map size,
 *  - decrease freq (if freq 0 - remove from map),
 *  - reduce window size
 * 4. if k == map size, update maxLength to max of (maxLength, currWindowSize)
 * 
 */
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