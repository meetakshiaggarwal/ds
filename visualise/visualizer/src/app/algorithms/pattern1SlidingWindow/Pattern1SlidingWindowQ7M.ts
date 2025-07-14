export function longestSubstringWithoutRepeatingChars(str, logStep) {
    let maxLength = 0; // Line 1
    let charPositionMap = {}; // Line 2
    let windowStart = 0; // Line 3

    // Initial step
    logStep({
        arr: [...str],
        maxLength: maxLength,
        charPositionMap: { ...charPositionMap },
        windowStart: 0,
        windowEnd: -1,
        mode: 'norepeat',
        action: 'Initializing variables.',
        codeLines: [1, 2, 3]
    });

    for(let windowEnd = 0; windowEnd < str.length; windowEnd++) { // Line 4
        let endChar = str[windowEnd]; // Line 5
        logStep({
            arr: [...str],
            maxLength: maxLength,
            charPositionMap: { ...charPositionMap },
            windowStart: windowStart,
            windowEnd: windowEnd,
            endChar: endChar,
            mode: 'norepeat',
            action: `Processing char '${endChar}'.`,
            codeLines: [4, 5]
        });

        if(endChar in charPositionMap) { // Line 6
            // If character is already in map, move windowStart to the right of its last occurrence
            windowStart = Math.max(windowStart, charPositionMap[endChar] + 1); // Line 7
            logStep({
                arr: [...str],
                maxLength: maxLength,
                charPositionMap: { ...charPositionMap },
                windowStart: windowStart, // Updated windowStart
                windowEnd: windowEnd,
                endChar: endChar,
                mode: 'norepeat',
                action: `'${endChar}' found in window. Moving windowStart to ${windowStart}.`,
                codeLines: [6, 7]
            });
        }
        charPositionMap[endChar] = windowEnd; // Line 8
        maxLength = Math.max(maxLength, windowEnd - windowStart + 1); // Line 9
        logStep({
            arr: [...str],
            maxLength: maxLength,
            charPositionMap: { ...charPositionMap },
            currentWindowLength: windowEnd - windowStart + 1,
            windowStart: windowStart,
            windowEnd: windowEnd,
            endChar: endChar,
            mode: 'norepeat',
            action: `Updating char position for '${endChar}'. Current length: ${windowEnd - windowStart + 1}. Max length: ${maxLength}.`,
            codeLines: [8, 9]
        });
    }
    // Final step
    logStep({
        arr: [...str],
        result: maxLength,
        mode: 'norepeat',
        action: `Algorithm finished. Final longest substring length: ${maxLength}.`,
        codeLines: [10] // Highlight return
    });
    return maxLength; // Line 10
}