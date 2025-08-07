/**
 * Length of longest substring with k different characters
 * -----------------------------------------------------
 * Input: str,k
 * abcdrfescdcdc, 3
 * O/P - maxLength
 * 
 * Algo - Sliding Window
 * Maintain
 * - hashmap (freq of chars in str),
 * - maxLength
 * 
 * 1. Loop the str
 * 2. Add the char to map (increase freq if already exist)
 * 3. if k > map size,
 *  - decrease freq (if freq 0 - remove from map),
 *  - reduce window size
 * 4. if k == map size, update maxLength to max of (maxLength, currWindowSize)
 * 
 */

import fs from 'fs';

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

const inputPath = process.argv[2];
const input = fs.readFileSync(inputPath, 'utf-8').trim().split('\n');
const str = input[0];
const k = Number(input[1]);
console.log(longestSubstringLengthKDistinctChars(str, k));