/**
 * Permutations in a string
 * ------------------------------------------------
 * Input: str, pattern
 * Output: boolean (does str contain any permutation of pattern)
 * * Algo - Sliding Window with HashMap
 * 1. Build char frequency map for the pattern.
 * 2. Iterate through the string with a sliding window.
 * 3. Expand window: add char to window map. If it matches a pattern char, decrement `matched` count.
 * 4. If `matched` == pattern map size, a permutation is found.
 * 5. Shrink window: remove char from window map. If it was a pattern char, increment `matched` count.
 */

// Remove 'import fs from 'fs';'
export function findPermutation(str, pattern, logStep) {
    let windowStart = 0;
    let matched = 0; // Number of characters matched from the pattern
    let patternCharFreq = {};

    for (let i = 0; i < pattern.length; i++) {
        const char = pattern[i];
        patternCharFreq[char] = (patternCharFreq[char] || 0) + 1;
    }

    logStep({
        arr: [...str],
        windowStart: windowStart,
        windowEnd: -1, // No window yet
        pattern: pattern,
        patternCharFreq: { ...patternCharFreq },
        matchedChars: matched,
        mode: 'permutation', // New mode
        action: 'Initializing pattern frequency map'
    });

    for (let windowEnd = 0; windowEnd < str.length; windowEnd++) {
        let rightChar = str[windowEnd];

        logStep({
            arr: [...str],
            windowStart: windowStart,
            windowEnd: windowEnd,
            pattern: pattern,
            patternCharFreq: { ...patternCharFreq },
            currentWindow: str.substring(windowStart, windowEnd + 1),
            matchedChars: matched,
            mode: 'permutation',
            action: 'Expanding window, adding ' + rightChar
        });

        if (rightChar in patternCharFreq) {
            patternCharFreq[rightChar]--;
            if (patternCharFreq[rightChar] >= 0) { // Character matched, not overused
                matched++;
            }
        }

        if (matched === pattern.length) {
            logStep({
                arr: [...str],
                windowStart: windowStart,
                windowEnd: windowEnd,
                pattern: pattern,
                patternCharFreq: { ...patternCharFreq },
                currentWindow: str.substring(windowStart, windowEnd + 1),
                matchedChars: matched,
                result: true, // Found permutation!
                mode: 'permutation',
                action: 'PERMUTATION FOUND! ' + str.substring(windowStart, windowEnd + 1)
            });
            return true; // Found a permutation
        }

        // Shrink the sliding window
        if (windowEnd >= pattern.length - 1) {
            let leftChar = str[windowStart];
            windowStart++;

            if (leftChar in patternCharFreq) {
                if (patternCharFreq[leftChar] >= 0) { // Character was matched
                    matched--;
                }
                patternCharFreq[leftChar]++;
            }

            logStep({
                arr: [...str],
                windowStart: windowStart, // Updated windowStart
                windowEnd: windowEnd,
                pattern: pattern,
                patternCharFreq: { ...patternCharFreq },
                currentWindow: str.substring(windowStart, windowEnd + 1),
                matchedChars: matched,
                mode: 'permutation',
                action: 'Shrinking window, removing ' + leftChar
            });
        }
    }
    logStep({
        arr: [...str],
        windowStart: windowStart, // Or -1
        windowEnd: str.length - 1, // Or -1
        pattern: pattern,
        result: false, // No permutation found
        mode: 'permutation',
        action: 'Final Result: No permutation found'
    });
    return false; // No permutation found
}

// Remove fs-related code
/*
const inputPath = process.argv[2];
const input = fs.readFileSync(inputPath, 'utf-8').trim().split('\n');
const str = input[0];
const pattern = input[1];
console.log(findPermutation(str, pattern));
*/