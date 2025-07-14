export function findPermutation(str, pattern, logStep) {
    let windowStart = 0; // Line 1
    let matched = 0; // Line 2
    let patternCharFreq = {}; // Line 3

    // Populate pattern character frequency map
    for (let i = 0; i < pattern.length; i++) { // Line 4
        const char = pattern[i]; // Line 5
        patternCharFreq[char] = (patternCharFreq[char] || 0) + 1; // Line 6
    }
    logStep({
        arr: [...str],
        pattern: pattern,
        patternCharFreq: { ...patternCharFreq },
        windowStart: 0,
        windowEnd: -1,
        matched: matched,
        mode: 'permutation',
        action: `Initializing pattern frequency map: ${JSON.stringify(patternCharFreq)}.`,
        codeLines: [1, 2, 3, 4, 5, 6]
    });

    for (let windowEnd = 0; windowEnd < str.length; windowEnd++) { // Line 7
        let rightChar = str[windowEnd]; // Line 8
        logStep({
            arr: [...str],
            pattern: pattern,
            patternCharFreq: { ...patternCharFreq },
            windowStart: windowStart,
            windowEnd: windowEnd,
            rightChar: rightChar,
            matched: matched,
            mode: 'permutation',
            action: `Processing '${rightChar}'.`,
            codeLines: [7, 8]
        });

        if (rightChar in patternCharFreq) { // Line 9
            patternCharFreq[rightChar]--; // Line 10
            if (patternCharFreq[rightChar] >= 0) { // Line 11
                matched++; // Line 12
            }
            logStep({
                arr: [...str],
                pattern: pattern,
                patternCharFreq: { ...patternCharFreq },
                windowStart: windowStart,
                windowEnd: windowEnd,
                rightChar: rightChar,
                matched: matched,
                mode: 'permutation',
                action: `'${rightChar}' is in pattern. Decremented freq. Matched count: ${matched}.`,
                codeLines: [9, 10, 11, 12]
            });
        }

        if (matched === pattern.length) { // Line 13
            logStep({
                arr: [...str],
                pattern: pattern,
                result: true,
                windowStart: windowStart,
                windowEnd: windowEnd,
                matched: matched,
                mode: 'permutation',
                action: `Matched all characters! Permutation found.`,
                codeLines: [13, 14]
            });
            return true; // Line 14
        }

        if (windowEnd >= pattern.length - 1) { // Line 15 (Shrink window if size matches pattern length)
            let leftChar = str[windowStart]; // Line 16
            windowStart++; // Line 17
            logStep({
                arr: [...str],
                pattern: pattern,
                patternCharFreq: { ...patternCharFreq },
                windowStart: windowStart, // Updated windowStart
                windowEnd: windowEnd,
                leftChar: leftChar,
                matched: matched,
                mode: 'permutation',
                action: `Window reached pattern length. Shrinking window, removed '${leftChar}'.`,
                codeLines: [15, 16, 17]
            });

            if (leftChar in patternCharFreq) { // Line 18
                if (patternCharFreq[leftChar] >= 0) { // Line 19
                    matched--; // Line 20
                }
                patternCharFreq[leftChar]++; // Line 21
                logStep({
                    arr: [...str],
                    pattern: pattern,
                    patternCharFreq: { ...patternCharFreq },
                    windowStart: windowStart,
                    windowEnd: windowEnd,
                    leftChar: leftChar,
                    matched: matched,
                    mode: 'permutation',
                    action: `'${leftChar}' was in pattern. Incremented freq. Matched count: ${matched}.`,
                    codeLines: [18, 19, 20, 21]
                });
            }
        }
    }
    // Final step if loop finishes without finding permutation
    logStep({
        arr: [...str],
        pattern: pattern,
        result: false,
        mode: 'permutation',
        action: `Algorithm finished. No permutation found.`,
        codeLines: [22] // Highlight return
    });
    return false; // Line 22
}