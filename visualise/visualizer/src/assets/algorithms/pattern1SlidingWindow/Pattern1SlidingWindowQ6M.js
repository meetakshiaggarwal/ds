/**
 * Longest Substring length with at most 2 distinct characters
 * -----------------------------------------------------
 * Same as Q4
 */

import fs from 'fs'

function longestSubstring(str) {
    longestSubstringLengthKDistinctChars(str,2)
}

const inputPath = process.argv[2]
const input = fs.readFileSync(inputPath, 'utf-8').trim().split('\n')
const str = input[0]
console.log(longestSubstring(str))