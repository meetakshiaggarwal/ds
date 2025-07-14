// This file contains two functions. The `longestSubstring` function calls `longestSubstringLengthKDistinctChars`
// with k=2. We will add logSteps to the `longestSubstringLengthKDistinctChars` function.

export function longestSubstring(str, logStep) { // Line 1
    // Initial call to the main logic, k is fixed at 2 for this problem
    logStep({
        arr: [...str],
        k: 2,
        action: 'Calling longestSubstringLengthKDistinctChars with k=2.',
        mode: 'two_distinct_chars',
        codeLines: [2] // Highlight the call to the helper function
    });
    return longestSubstringLengthKDistinctChars(str, 2, logStep); // Line 2
}

// The core logic is in this function, adapted from Q4M
export function longestSubstringLengthKDistinctChars(str, k, logStep) {
    let maxLength = 0; // Line 5 (relative to this function's start)
    let charFreqMap = {}; // Line 6
    let windowStart = 0; // Line 7

    // Initial step
    logStep({
        arr: [...str],
        k: k,
        maxLength: maxLength,
        charFreqMap: { ...charFreqMap },
        distinctCharsInWindow: 0,
        windowStart: 0,
        windowEnd: -1,
        mode: 'two_distinct_chars',
        action: 'Initializing variables for k=2 distinct characters.',
        codeLines: [5, 6, 7]
    });

    for(let windowEnd = 0; windowEnd < str.length; windowEnd++) { // Line 8
        let endChar = str[windowEnd]; // Line 9
        charFreqMap[endChar] = (charFreqMap[endChar] || 0) + 1; // Line 10

        logStep({
            arr: [...str],
            k: k,
            maxLength: maxLength,
            charFreqMap: { ...charFreqMap },
            distinctCharsInWindow: Object.keys(charFreqMap).length,
            windowStart: windowStart,
            windowEnd: windowEnd,
            mode: 'two_distinct_chars',
            action: `Adding '${endChar}' to window. Freq map: ${JSON.stringify(charFreqMap)}.`,
            codeLines: [8, 9, 10]
        });

        while(Object.keys(charFreqMap).length > k) { // Line 11
            let startChar = str[windowStart]; // Line 12
            charFreqMap[startChar]--; // Line 13
            if(charFreqMap[startChar] == 0) { // Line 14
                delete charFreqMap[startChar]; // Line 15
            }
            windowStart++; // Line 16
            logStep({
                arr: [...str],
                k: k,
                maxLength: maxLength,
                charFreqMap: { ...charFreqMap },
                distinctCharsInWindow: Object.keys(charFreqMap).length,
                windowStart: windowStart, // Updated windowStart
                windowEnd: windowEnd,
                mode: 'two_distinct_chars',
                action: `Distinct chars (${Object.keys(charFreqMap).length}) > k (${k}). Shrinking window, removed '${startChar}'.`,
                codeLines: [11, 12, 13, 14, 15, 16]
            });
        }
        maxLength = Math.max(maxLength, windowEnd - windowStart + 1); // Line 17
        logStep({
            arr: [...str],
            k: k,
            maxLength: maxLength,
            charFreqMap: { ...charFreqMap },
            distinctCharsInWindow: Object.keys(charFreqMap).length,
            currentWindowLength: windowEnd - windowStart + 1,
            windowStart: windowStart,
            windowEnd: windowEnd,
            mode: 'two_distinct_chars',
            action: `Updating maxLength. Current window length: ${windowEnd - windowStart + 1}. Max length: ${maxLength}.`,
            codeLines: [17]
        });
    }
    // Final step
    logStep({
        arr: [...str],
        k: k,
        result: maxLength,
        mode: 'two_distinct_chars',
        action: `Algorithm finished. Final longest substring length: ${maxLength}.`,
        codeLines: [18] // Highlight return
    });
    return maxLength; // Line 18
}