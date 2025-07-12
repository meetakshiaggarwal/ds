/**
 * Max ones after k allowed replacements
 * ----------------------------------------------------------------
 * 1. Loop the nums(0,1)
 * 2. maintain freqMap
 * 3. calculate freqMap till now
 * 4. if windowLen > freqMap + k, then these 0's cannot be replaced, so slide window by 1 num
 * 5. check maxLen = max maxLen, currWindowSize
 */

// Remove 'import fs from 'fs';'
export function maxOnesWithKReplacements(arr, k, logStep) {
    let maxLength = 0;
    let maxOnesCount = 0; // Count of 1s in the current window
    let windowStart = 0;

    for(let windowEnd = 0; windowEnd < arr.length; windowEnd++) {
        if(arr[windowEnd] === 1) {
            maxOnesCount++;
        }

        logStep({
            arr: [...arr],
            windowStart: windowStart,
            windowEnd: windowEnd,
            onesInWindow: maxOnesCount,
            zerosInWindow: (windowEnd - windowStart + 1) - maxOnesCount,
            k: k,
            maxLength: maxLength,
            mode: 'max-ones', // New mode
            action: 'Expanding window, adding ' + arr[windowEnd]
        });

        // If number of zeros in current window > k, shrink the window
        if((windowEnd - windowStart + 1) - maxOnesCount > k) {
            if(arr[windowStart] === 1) {
                maxOnesCount--;
            }
            windowStart++;

            logStep({
                arr: [...arr],
                windowStart: windowStart,
                windowEnd: windowEnd,
                onesInWindow: maxOnesCount,
                zerosInWindow: (windowEnd - windowStart + 1) - maxOnesCount,
                k: k,
                maxLength: maxLength,
                mode: 'max-ones',
                action: 'Shrinking window, removing ' + arr[windowStart - 1] + ' (too many zeros)'
            });
        }
        maxLength = Math.max(maxLength, windowEnd - windowStart + 1);

        logStep({
            arr: [...arr],
            windowStart: windowStart,
            windowEnd: windowEnd,
            onesInWindow: maxOnesCount,
            zerosInWindow: (windowEnd - windowStart + 1) - maxOnesCount,
            k: k,
            currentWindowLength: windowEnd - windowStart + 1,
            maxLength: maxLength, // Highlight update
            mode: 'max-ones',
            action: 'Updating maxLength'
        });
    }
    logStep({
        arr: [...arr],
        windowStart: windowStart, // Or -1
        windowEnd: arr.length - 1, // Or -1
        result: maxLength,
        mode: 'max-ones',
        action: 'Final Result'
    });
    return maxLength;
}

// Remove fs-related code
/*
const inputPath = process.argv[2];
const input = fs.readFileSync(inputPath, 'utf-8').trim().split('\n');
const arr = input[0].split(',').map(Number);
const k = Number(input[1]);
console.log(maxOnesWithKReplacements(arr,k));
*/