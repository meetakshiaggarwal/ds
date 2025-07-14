export function longestSubstringLengthKDistinctChars(str, k, logStep) {
    let maxLength = 0; // Line 1 (changed from -1 to 0 for string lengths)
    let charFreqMap = {}; // Line 2
    let windowStart = 0; // Line 3

    // Initial step
    logStep({
        arr: [...str],
        k: k,
        maxLength: maxLength,
        charFreqMap: { ...charFreqMap },
        distinctCharsInWindow: 0,
        windowStart: 0,
        windowEnd: -1,
        mode: 'distinct',
        action: 'Initializing variables.',
        codeLines: [1, 2, 3]
    });

    for(let windowEnd = 0; windowEnd < str.length; windowEnd++) { // Line 4
        let endChar = str[windowEnd]; // Line 5
        charFreqMap[endChar] = (charFreqMap[endChar] || 0) + 1; // Line 6

        logStep({
            arr: [...str],
            k: k,
            maxLength: maxLength,
            charFreqMap: { ...charFreqMap },
            distinctCharsInWindow: Object.keys(charFreqMap).length,
            windowStart: windowStart,
            windowEnd: windowEnd,
            mode: 'distinct',
            action: `Adding '${endChar}' to window. Freq map: ${JSON.stringify(charFreqMap)}.`,
            codeLines: [4, 5, 6]
        });

        while(Object.keys(charFreqMap).length > k) { // Line 7
            let startChar = str[windowStart]; // Line 8
            charFreqMap[startChar]--; // Line 9
            if(charFreqMap[startChar] == 0) { // Line 10
                delete charFreqMap[startChar]; // Line 11
            }
            windowStart++; // Line 12
            logStep({
                arr: [...str],
                k: k,
                maxLength: maxLength,
                charFreqMap: { ...charFreqMap },
                distinctCharsInWindow: Object.keys(charFreqMap).length,
                windowStart: windowStart, // Updated windowStart
                windowEnd: windowEnd,
                mode: 'distinct',
                action: `Distinct chars (${Object.keys(charFreqMap).length}) > k (${k}). Shrinking window, removed '${startChar}'.`,
                codeLines: [7, 8, 9, 10, 11, 12]
            });
        }
        maxLength = Math.max(maxLength, windowEnd - windowStart + 1); // Line 13
        logStep({
            arr: [...str],
            k: k,
            maxLength: maxLength,
            charFreqMap: { ...charFreqMap },
            distinctCharsInWindow: Object.keys(charFreqMap).length,
            currentWindowLength: windowEnd - windowStart + 1,
            windowStart: windowStart,
            windowEnd: windowEnd,
            mode: 'distinct',
            action: `Updating maxLength. Current window length: ${windowEnd - windowStart + 1}. Max length: ${maxLength}.`,
            codeLines: [13]
        });
    }
    // Final step
    logStep({
        arr: [...str],
        k: k,
        result: maxLength,
        mode: 'distinct',
        action: `Algorithm finished. Final longest substring length: ${maxLength}.`,
        codeLines: [14] // Highlight return
    });
    return maxLength; // Line 14
}