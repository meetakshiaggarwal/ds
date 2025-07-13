/**
 * Permutations in a string
 * ------------------------------------------------
 * Input: str, pattern
 * Output: boolean (does str contain any permutation of pattern)
 * Algo - Sliding Window with HashMap
 * 1. Build char frequency map for the pattern.
 * 2. Iterate through the string with a sliding window.
 * 3. Expand window: add char to window map. If it matches a pattern char, decrement `matched` count.
 * 4. If `matched` == pattern map size, a permutation is found.
 * 5. Shrink window: remove char from window map. If it was a pattern char, increment `matched` count.
 */
export function findPermutation(str, pattern) {
    let windowStart = 0;
    let matched = 0;
    let patternCharFreq = {};
    for (let i = 0; i < pattern.length; i++) {
        const char = pattern[i];
        patternCharFreq[char] = (patternCharFreq[char] || 0) + 1;
    }
    for (let windowEnd = 0; windowEnd < str.length; windowEnd++) {
        let rightChar = str[windowEnd];
        if (rightChar in patternCharFreq) {
            patternCharFreq[rightChar]--;
            if (patternCharFreq[rightChar] >= 0) {
                matched++;
            }
        }
        if (matched === pattern.length) {
            return true;
        }
        if (windowEnd >= pattern.length - 1) {
            let leftChar = str[windowStart];
            windowStart++;
            if (leftChar in patternCharFreq) {
                if (patternCharFreq[leftChar] >= 0) {
                    matched--;
                }
                patternCharFreq[leftChar]++;
            }
        }
    }
    return false;
}