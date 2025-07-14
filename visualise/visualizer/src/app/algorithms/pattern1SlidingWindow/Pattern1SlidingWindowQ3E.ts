export function smallestSubArray(arr, targetSum, logStep) {
    let minLength = Infinity; // Line 1
    let windowSum = 0; // Line 2
    let windowStart = 0; // Line 3

    // Initial step
    logStep({
        arr: [...arr],
        targetSum: targetSum,
        minLength: minLength === Infinity ? 'Infinity' : minLength,
        windowSum: 0,
        windowStart: 0,
        windowEnd: -1,
        mode: 'min',
        action: 'Initializing variables.',
        codeLines: [1, 2, 3]
    });

    for(let windowEnd = 0; windowEnd < arr.length; windowEnd++) { // Line 4
        windowSum += arr[windowEnd]; // Line 5
        logStep({
            arr: [...arr],
            targetSum: targetSum,
            minLength: minLength === Infinity ? 'Infinity' : minLength,
            windowSum: windowSum,
            windowStart: windowStart,
            windowEnd: windowEnd,
            mode: 'min',
            action: `Adding ${arr[windowEnd]} to windowSum. Current sum: ${windowSum}.`,
            codeLines: [4, 5]
        });

        while(windowSum >= targetSum) { // Line 6
            minLength = Math.min(minLength, windowEnd - windowStart + 1); // Line 7
            logStep({
                arr: [...arr],
                targetSum: targetSum,
                minLength: minLength,
                windowSum: windowSum,
                windowStart: windowStart,
                windowEnd: windowEnd,
                mode: 'min',
                action: `Window sum (${windowSum}) >= target (${targetSum}). Updating minLength to ${minLength}.`,
                codeLines: [6, 7]
            });

            windowSum -= arr[windowStart]; // Line 8
            windowStart++; // Line 9
            logStep({
                arr: [...arr],
                targetSum: targetSum,
                minLength: minLength,
                windowSum: windowSum, // Updated sum after subtraction
                windowStart: windowStart, // Updated windowStart
                windowEnd: windowEnd,
                mode: 'min',
                action: `Shrinking window. Removing ${arr[windowStart - 1]}. New sum: ${windowSum}.`,
                codeLines: [8, 9]
            });
        }
    }
    // Final step
    logStep({
        arr: [...arr],
        targetSum: targetSum,
        result: minLength === Infinity ? 0 : minLength,
        mode: 'min',
        action: `Algorithm finished. Final minLength: ${minLength === Infinity ? 0 : minLength}.`,
        codeLines: [10, 11, 12] // Highlight the return block
    });

    if(minLength == Infinity) { // Line 10
        return 0; // Line 11
    }
    return minLength; // Line 12
}