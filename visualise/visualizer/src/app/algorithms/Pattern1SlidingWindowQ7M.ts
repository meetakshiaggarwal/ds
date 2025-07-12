/**
 * Length of longest Substring without repeating characters - No repeat Substring
 * ---------------------------------------------------------------------\
 * 1. Loop the str
 * 2. maintain map(with position) - of chars traversed in window
 * if endChar not in map - add
 * if exist - slide window to +1 pos of char (since the char can already be there in the map - legacy val - but start is updated before)
 * 3. update maxLen
 */

// Remove 'import fs from 'fs';'
export function longestSubstringWithoutRepeatingChars(str, logStep) {
    let maxLength = 0;
    let charPositionMap = {}; // Stores last seen index of char
    let windowStart = 0;

    for(let windowEnd = 0; windowEnd < str.length; windowEnd++) {
        let endChar = str[windowEnd];

        if(endChar in charPositionMap) {
            // If char is already in the window, slide windowStart past its last occurrence
            windowStart = Math.max(windowStart, charPositionMap[endChar] + 1);
            logStep({
                arr: [...str],
                windowStart: windowStart, // Updated windowStart
                windowEnd: windowEnd,
                charPositionMap: { ...charPositionMap },
                currentWindowLength: windowEnd - windowStart + 1,
                maxLength: maxLength,
                mode: 'norepeat',
                action: 'Found repeating char ' + endChar + ', sliding windowStart'
            });
        }
        charPositionMap[endChar] = windowEnd; // Update last seen index of char

        maxLength = Math.max(maxLength, windowEnd - windowStart + 1);

        logStep({
            arr: [...str],
            windowStart: windowStart,
            windowEnd: windowEnd,
            charPositionMap: { ...charPositionMap },
            currentWindowLength: windowEnd - windowStart + 1,
            maxLength: maxLength, // Highlight update if changed
            mode: 'norepeat',
            action: 'Adding ' + endChar + ', updating maxLength'
        });
    }
    logStep({
        arr: [...str],
        windowStart: windowStart, // Or -1
        windowEnd: str.length - 1, // Or -1
        result: maxLength,
        mode: 'norepeat',
        action: 'Final Result'
    });
    return maxLength;
}

// Remove fs-related code
/*
const inputPath = process.argv[2];
const input = fs.readFileSync(inputPath, 'utf-8').trim().split('\n');
const str = input[0];
console.log(longestSubstringWithoutRepeatingChars(str));
*/