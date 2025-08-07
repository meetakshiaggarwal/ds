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