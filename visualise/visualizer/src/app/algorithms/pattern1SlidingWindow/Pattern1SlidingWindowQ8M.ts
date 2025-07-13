/**
 * Length of longest Substring with same letter after k allowed replacements
 * ----------------------------------------------------------------
 * 1. Loop the str
 * 2. maintain freqCharMap
 * 3. calculate maxFreqChar till now
 * 4. if windowLen > maxFreqChar + k, then these chars cannot be replaced, so slide window by 1 char
 * 5. check maxSubstrLen = max substrlen, currWindowSize
 */

// Remove 'import fs from 'fs';'
export function longestSubstringWithSameLetterWithKReplacements(str, k, logStep) {
    let maxLength = 0;
    let charFreqMap = {};
    let maxFreq = 0; // Max frequency of any character in current window
    let windowStart = 0;

    for(let windowEnd = 0; windowEnd < str.length; windowEnd++) {
        let endChar = str[windowEnd];
        charFreqMap[endChar] = (charFreqMap[endChar] || 0) + 1;
        maxFreq = Math.max(maxFreq, charFreqMap[endChar]);

        logStep({
            arr: [...str],
            windowStart: windowStart,
            windowEnd: windowEnd,
            charFreqMap: { ...charFreqMap },
            maxFreqInWindow: maxFreq,
            k: k,
            maxLength: maxLength,
            mode: 'replacement', // New mode
            action: 'Expanding window, adding ' + endChar
        });

        // Current window length minus max frequency char gives count of non-repeating chars
        // If this count is greater than k, we need to shrink the window
        if((windowEnd - windowStart + 1) - maxFreq > k) {
            let startChar = str[windowStart];
            charFreqMap[startChar]--;
            // No need to update maxFreq if the char going out was the max,
            // as new max will be determined by subsequent additions or a full re-calc
            // (which is too expensive per step for visualization, so we'll rely on maxFreq only increasing)
            windowStart++;

            logStep({
                arr: [...str],
                windowStart: windowStart,
                windowEnd: windowEnd,
                charFreqMap: { ...charFreqMap },
                maxFreqInWindow: maxFreq, // MaxFreq remains based on the *old* window for this check
                k: k,
                maxLength: maxLength,
                mode: 'replacement',
                action: 'Shrinking window, removing ' + startChar + ' (too many replacements needed)'
            });
        }
        maxLength = Math.max(maxLength, windowEnd - windowStart + 1);

        logStep({
            arr: [...str],
            windowStart: windowStart,
            windowEnd: windowEnd,
            charFreqMap: { ...charFreqMap },
            maxFreqInWindow: maxFreq,
            k: k,
            currentWindowLength: windowEnd - windowStart + 1,
            maxLength: maxLength, // Highlight update
            mode: 'replacement',
            action: 'Updating maxLength'
        });
    }
    logStep({
        arr: [...str],
        windowStart: windowStart, // Or -1
        windowEnd: str.length - 1, // Or -1
        result: maxLength,
        mode: 'replacement',
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
console.log(longestSubstringWithSameLetterWithKReplacements(str,k));
*/