export function longestSubstringWithSameLetterWithKReplacements(str, k, logStep) {
    let maxLength = 0; // Line 1 (changed from -1 to 0 for string lengths)
    let charFreqMap = {}; // Line 2
    let maxFreq = 0; // Line 3
    let windowStart = 0; // Line 4

    // Initial step
    logStep({
        arr: [...str],
        k: k,
        maxLength: maxLength,
        charFreqMap: { ...charFreqMap },
        maxFreq: maxFreq,
        windowStart: 0,
        windowEnd: -1,
        mode: 'replacement',
        action: 'Initializing variables.',
        codeLines: [1, 2, 3, 4]
    });

    for(let windowEnd = 0; windowEnd < str.length; windowEnd++) { // Line 5
        let endChar = str[windowEnd]; // Line 6
        charFreqMap[endChar] = (charFreqMap[endChar] || 0) + 1; // Line 7
        maxFreq = Math.max(maxFreq, charFreqMap[endChar]); // Line 8

        logStep({
            arr: [...str],
            k: k,
            maxLength: maxLength,
            charFreqMap: { ...charFreqMap },
            maxFreq: maxFreq,
            windowStart: windowStart,
            windowEnd: windowEnd,
            endChar: endChar,
            mode: 'replacement',
            action: `Adding '${endChar}'. Max freq: ${maxFreq}.`,
            codeLines: [5, 6, 7, 8]
        });

        // Current window length - count of most frequent char > k replacements
        // This means we have more characters to replace than allowed, so shrink window
        if((windowEnd - windowStart + 1) - maxFreq > k) { // Line 9
            let startChar = str[windowStart]; // Line 10
            charFreqMap[startChar]--; // Line 11
            windowStart++; // Line 12
            logStep({
                arr: [...str],
                k: k,
                maxLength: maxLength,
                charFreqMap: { ...charFreqMap },
                maxFreq: maxFreq,
                windowStart: windowStart, // Updated windowStart
                windowEnd: windowEnd,
                mode: 'replacement',
                action: `Replacements needed > k. Shrinking window, removed '${startChar}'.`,
                codeLines: [9, 10, 11, 12]
            });
        }
        maxLength = Math.max(maxLength, windowEnd - windowStart + 1); // Line 13
        logStep({
            arr: [...str],
            k: k,
            maxLength: maxLength,
            charFreqMap: { ...charFreqMap },
            maxFreq: maxFreq,
            currentWindowLength: windowEnd - windowStart + 1,
            windowStart: windowStart,
            windowEnd: windowEnd,
            mode: 'replacement',
            action: `Updating maxLength. Current window length: ${windowEnd - windowStart + 1}. Max length: ${maxLength}.`,
            codeLines: [13]
        });
    }
    // Final step
    logStep({
        arr: [...str],
        k: k,
        result: maxLength,
        mode: 'replacement',
        action: `Algorithm finished. Final longest substring length: ${maxLength}.`,
        codeLines: [14] // Highlight return
    });
    return maxLength; // Line 14
}