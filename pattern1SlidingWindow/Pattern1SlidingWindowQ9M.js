/**
 * Max ones after k allowed replacements
 * ----------------------------------------------------------------
 * 1. Loop the nums(0,1)
 * 2. maintain freqMap
 * 3. calculate freqMap till now
 * 4. if windowLen > freqMap + k, then these 0's cannot be replaced, so slide window by 1 num
 * 5. check maxLen = max maxLen, currWindowSize
 */

import fs from 'fs'

function maxOnesWithKReplacements(arr,k) {
    let maxLength = -1
    for(let windowEnd=0,windowStart=0, maxOnesCount=0; windowEnd<arr.length; windowEnd++) {
        if(arr[windowEnd] === 1) maxOnesCount++;
        if(windowEnd-windowStart+1 > maxOnesCount+k) {
            if(arr[windowStart] === 1) maxOnesCount--;
            windowStart++
        }
        maxLength = Math.max(maxLength, windowEnd-windowStart+1)
    }
    return maxLength
}

const inputPath = process.argv[2]
const input = fs.readFileSync(inputPath, 'utf-8').trim().split('\n')
const arr = input[0].split(',')
const k = Number(input[1])
console.log(maxOnesWithKReplacements(arr,k))