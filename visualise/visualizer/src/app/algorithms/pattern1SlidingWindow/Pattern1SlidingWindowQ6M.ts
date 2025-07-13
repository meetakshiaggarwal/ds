/**
 * Longest Substring length with at most 2 distinct characters
 * -----------------------------------------------------
 * Same as Q4 (but with k=2 implicitly)
 */

// Remove 'import fs from 'fs';'
import { longestSubstringLengthKDistinctChars } from './Pattern1SlidingWindowQ4M'; // Import Q4's function

export function longestSubstring(str, logStep) {
    // This problem is a special case of Q4 with k=2
    // We can call Q4's function and pass through the logStep
    return longestSubstringLengthKDistinctChars(str, 2, logStep);
}

// Remove fs-related code
/*
const inputPath = process.argv[2];
const input = fs.readFileSync(inputPath, 'utf-8').trim().split('\n');
const str = input[0];
console.log(longestSubstring(str));
*/