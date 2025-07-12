/**
 * Length of longest substring with k different characters
 * -----------------------------------------------------
 * Input: str,k
 * abcdrfescdcdc, 3
 * O/P - maxLength
 * * Algo - Sliding Window
 * Maintain
 * - hashmap (freq of chars in str),
 * - maxLength
 * * 1. Loop the str
 * 2. Add the char to map (increase freq if already exist)
 * 3. if k > map size,
 * - decrease freq (if freq 0 - remove from map),
 * - reduce window size
 * 4. if k == map size, update maxLength to max of (maxLength, currWindowSize)
 * */

// Remove 'import fs from 'fs';'
export function longestSubstringLengthKDistinctChars(str, k, logStep) {
    let maxLength = 0; // Initialize to 0 for strings
    let charFreqMap = {};
    let windowStart = 0;

    for(let windowEnd = 0; windowEnd < str.length; windowEnd++) {
        let endChar = str[windowEnd];
        charFreqMap[endChar] = (charFreqMap[endChar] || 0) + 1;

        logStep({
            arr: [...str], // Treat string as char array for visualizer
            windowStart: windowStart,
            windowEnd: windowEnd,
            charFreqMap: { ...charFreqMap }, // Copy of map for visualization
            distinctCharsInWindow: Object.keys(charFreqMap).length,
            k: k,
            maxLength: maxLength,
            mode: 'distinct',
            action: 'Expanding window, adding ' + endChar
        });

        while(Object.keys(charFreqMap).length > k) {
            let startChar = str[windowStart];
            charFreqMap[startChar]--;
            if(charFreqMap[startChar] === 0) {
                delete charFreqMap[startChar];
            }
            windowStart++;

            logStep({
                arr: [...str],
                windowStart: windowStart,
                windowEnd: windowEnd,
                charFreqMap: { ...charFreqMap },
                distinctCharsInWindow: Object.keys(charFreqMap).length,
                k: k,
                maxLength: maxLength,
                mode: 'distinct',
                action: 'Shrinking window, removing ' + startChar + ' (too many distinct chars)'
            });
        }
        maxLength = Math.max(maxLength, windowEnd - windowStart + 1);

        logStep({
            arr: [...str],
            windowStart: windowStart,
            windowEnd: windowEnd,
            charFreqMap: { ...charFreqMap },
            distinctCharsInWindow: Object.keys(charFreqMap).length,
            k: k,
            currentWindowLength: windowEnd - windowStart + 1,
            maxLength: maxLength, // Highlight update if changed
            mode: 'distinct',
            action: 'Updating maxLength'
        });
    }
    logStep({
        arr: [...str],
        windowStart: windowStart, // Or -1
        windowEnd: str.length - 1, // Or -1
        result: maxLength,
        mode: 'distinct',
        action: 'Final Result'
    });
    return maxLength;
}

// Remove fs-related code
/*
const inputPath = process.argv[2];
const input = fs.readFileSync(inputPath, 'utf-8').trim().split('\n');
const str = input[0];
const k = Number(input[1]);
console.log(longestSubstringLengthKDistinctChars(str, k));
*/