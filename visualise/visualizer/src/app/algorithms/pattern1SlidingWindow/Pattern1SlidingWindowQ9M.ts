export function maxOnesWithKReplacements(arr, k, logStep) {
    let maxLength = 0; // Line 1 (changed from -1 to 0 for array lengths)
    let maxOnesCount = 0; // Line 2
    let windowStart = 0; // Line 3

    // Initial step
    logStep({
        arr: [...arr],
        k: k,
        maxLength: maxLength,
        maxOnesCount: maxOnesCount,
        windowStart: 0,
        windowEnd: -1,
        mode: 'max-ones',
        action: 'Initializing variables.',
        codeLines: [1, 2, 3]
    });

    for(let windowEnd = 0; windowEnd < arr.length; windowEnd++) { // Line 4
        if(arr[windowEnd] === 1) maxOnesCount++; // Line 5
        logStep({
            arr: [...arr],
            k: k,
            maxLength: maxLength,
            maxOnesCount: maxOnesCount,
            windowStart: windowStart,
            windowEnd: windowEnd,
            currentElement: arr[windowEnd],
            mode: 'max-ones',
            action: `Processing ${arr[windowEnd]}. Ones count: ${maxOnesCount}.`,
            codeLines: [4, 5]
        });

        // Current window length - count of ones > k replacements
        // This means we have more zeros to replace than allowed, so shrink window
        if((windowEnd - windowStart + 1) - maxOnesCount > k) { // Line 6
            if(arr[windowStart] === 1) maxOnesCount--; // Line 7
            windowStart++; // Line 8
            logStep({
                arr: [...arr],
                k: k,
                maxLength: maxLength,
                maxOnesCount: maxOnesCount,
                windowStart: windowStart, // Updated windowStart
                windowEnd: windowEnd,
                mode: 'max-ones',
                action: `Zeros to replace > k. Shrinking window, removed ${arr[windowStart - 1]}.`,
                codeLines: [6, 7, 8]
            });
        }
        maxLength = Math.max(maxLength, windowEnd - windowStart + 1); // Line 9
        logStep({
            arr: [...arr],
            k: k,
            maxLength: maxLength,
            maxOnesCount: maxOnesCount,
            currentWindowLength: windowEnd - windowStart + 1,
            windowStart: windowStart,
            windowEnd: windowEnd,
            mode: 'max-ones',
            action: `Updating maxLength. Current window length: ${windowEnd - windowStart + 1}. Max length: ${maxLength}.`,
            codeLines: [9]
        });
    }
    // Final step
    logStep({
        arr: [...arr],
        k: k,
        result: maxLength,
        mode: 'max-ones',
        action: `Algorithm finished. Final max ones length: ${maxLength}.`,
        codeLines: [10] // Highlight return
    });
    return maxLength; // Line 10
}