export function longestSubstringLengthKDistinctChars(str, k, logStep) {// Line 1
    let maxLength = 0;let charFreqMap = new Map();let windowStart = 0; // Line 2

    // Initial step
    logStep({
        arr: [...str],
        k: k,
        maxLength: maxLength,
        charFreqMap: Object.fromEntries(charFreqMap),
        windowStart: windowStart,
        mode: 'distinct',
        action: 'Initializing variables.',
        codeLines: [1, 2]
    });

    for(let windowEnd = 0; windowEnd < str.length; windowEnd++) { // Line 3
        let endChar = str[windowEnd]; // Line 4
        charFreqMap.set(endChar, (charFreqMap.get(endChar)||0) + 1); // Line 5

        logStep({
            arr: [...str],
            k: k,
            maxLength: maxLength,
            charFreqMap: Object.fromEntries(charFreqMap),
            distinctCharsInWindow: charFreqMap.size,
            windowStart: windowStart,
            windowEnd: windowEnd,
            endChar: endChar,
            mode: 'distinct',
            action: `Adding '${endChar}' to window. Freq map: ${JSON.stringify(charFreqMap)}.`,
            alwaysHighlightedKeys: ['distinctCharsInWindow'],
            codeLines: [3, 4, 5]
        });

        while(charFreqMap.size > k) { // Line 6
            let startChar = str[windowStart]; // Line 7
            charFreqMap.set(startChar, charFreqMap.get(startChar)-1); // Line 8
            windowStart++; // Line 9
            if(charFreqMap.get(startChar) == 0) { // Line 10
                charFreqMap.delete(startChar); // Line 11
            }
            logStep({
                arr: [...str],
                k: k,
                maxLength: maxLength,
                charFreqMap: Object.fromEntries(charFreqMap),
                distinctCharsInWindow: charFreqMap.size,
                windowStart: windowStart, // Updated windowStart
                windowEnd: windowEnd,
                endChar: endChar,
                startChar: startChar,
                mode: 'distinct',
                action: `Distinct chars (${charFreqMap.size}) > k (${k}). Shrinking window, removed '${startChar}'.`,
                alwaysHighlightedKeys: ['distinctCharsInWindow'],
                codeLines: [6, 7, 8, 9, 10, 11]
            });// Line 12
        }// Line 13
        maxLength = Math.max(maxLength, windowEnd - windowStart + 1); // Line 14
        logStep({
            arr: [...str],
            k: k,
            maxLength: maxLength,
            charFreqMap: Object.fromEntries(charFreqMap),
            currentWindowLength: windowEnd - windowStart + 1,
            distinctCharsInWindow: charFreqMap.size,
            windowStart: windowStart,
            windowEnd: windowEnd,
            endChar: endChar,
            mode: 'distinct',
            action: `Updating maxLength. Current window length: ${windowEnd - windowStart + 1}. Max length: ${maxLength}.`,
            alwaysHighlightedKeys: ['currentWindowLength','distinctCharsInWindow'],
            codeLines: [14]
        });
    }
    // Final step
    logStep({
        arr: [...str],
        k: k,
        result: maxLength,
        mode: 'distinct',
        action: `Algorithm finished. Final longest substring length: ${maxLength}.`,
        codeLines: [16] // Highlight return
    });
    return maxLength; // Line 16
}