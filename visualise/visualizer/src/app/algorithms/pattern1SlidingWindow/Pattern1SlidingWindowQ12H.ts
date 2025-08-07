export function minWindow(str: string, t: string, logStep: Function) {
    let tFreqMap = new Map<string, number>(); // Line 2
    for (let i = 0; i < t.length; i++) { // Line 3
        tFreqMap.set(t[i], (tFreqMap.get(t[i]) || 0) + 1); // Line 4
    }
    logStep({
        arr: [...str],
        t: t,
        tFreqMap: new Map(tFreqMap), // Clone map for state
        winFreqMap: new Map(),
        winMatchesWithFreq: 0,
        tCharCount: tFreqMap.size,
        minLen: Infinity,
        minStart: 0,
        windowStart: 0,
        windowEnd: -1,
        mode: 'min-window',
        action: `Initializing target frequency map 'tFreqMap': ${JSON.stringify(Object.fromEntries(tFreqMap))}. Total unique chars in t: ${tFreqMap.size}.`,
        codeLines: [2, 3, 4]
    });

    let minLen=Infinity, minStart=0  // Line 7
    let winFreqMap = new Map<string, number>(); // Line 7
    let winMatchesWithFreq = 0; // Line 7
    let tCharCount = tFreqMap.size; // Line 7

    logStep({
        arr: [...str],
        t: t,
        tFreqMap: new Map(tFreqMap),
        winFreqMap: new Map(winFreqMap),
        winMatchesWithFreq: winMatchesWithFreq,
        tCharCount: tCharCount,
        minLen: minLen,
        minStart: minStart,
        windowStart: 0,
        windowEnd: -1,
        mode: 'min-window',
        action: `Initializing window variables. minLen: Infinity, minStart: 0, winMatchesWithFreq: 0.`,
        codeLines: [7]
    });


    for (let e = 0, s = 0; e < str.length; e++) { // Line 8
        let charE = str[e]; // Current character at windowEnd

        winFreqMap.set(charE, (winFreqMap.get(charE) || 0) + 1); // Line 9
        logStep({
            arr: [...str],
            t: t,
            tFreqMap: new Map(tFreqMap),
            winFreqMap: new Map(winFreqMap),
            winMatchesWithFreq: winMatchesWithFreq,
            tCharCount: tCharCount,
            minLen: minLen,
            minStart: minStart,
            windowStart: s,
            windowEnd: e,
            charE: charE,
            action: `Expanding window: Added '${charE}' at index ${e}. Updated winFreqMap: ${JSON.stringify(Object.fromEntries(winFreqMap))}.`,
            codeLines: [8, 9]
        });

        if (tFreqMap.has(charE) && tFreqMap.get(charE) === winFreqMap.get(charE)) { // Line 10
            winMatchesWithFreq++; // Line 11
            logStep({
                arr: [...str],
                t: t,
                tFreqMap: new Map(tFreqMap),
                winFreqMap: new Map(winFreqMap),
                winMatchesWithFreq: winMatchesWithFreq,
                tCharCount: tCharCount,
                minLen: minLen,
                minStart: minStart,
                windowStart: s,
                windowEnd: e,
                charE: charE,
                action: `'${charE}' count in window now matches its required count in 't'. winMatchesWithFreq: ${winMatchesWithFreq}/${tCharCount}.`,
                codeLines: [10]
            });
        }

        while (winMatchesWithFreq === tCharCount) { // Line 11 (Window is valid, try to shrink)
            let currentWindowLen = e - s + 1;
            logStep({
                arr: [...str],
                t: t,
                tFreqMap: new Map(tFreqMap),
                winFreqMap: new Map(winFreqMap),
                winMatchesWithFreq: winMatchesWithFreq,
                tCharCount: tCharCount,
                minLen: minLen,
                minStart: minStart,
                windowStart: s,
                windowEnd: e,
                currentWindowLen: currentWindowLen,
                action: `All unique characters from 't' matched. Current window length: ${currentWindowLen}.`,
                codeLines: [11]
            });

            if (currentWindowLen < minLen) { // Line 12
                minLen = currentWindowLen; // Line 13
                minStart = s; // Line 14
                logStep({
                    arr: [...str],
                    t: t,
                    tFreqMap: new Map(tFreqMap),
                    winFreqMap: new Map(winFreqMap),
                    winMatchesWithFreq: winMatchesWithFreq,
                    tCharCount: tCharCount,
                    minLen: minLen,
                    minStart: minStart,
                    windowStart: s,
                    windowEnd: e,
                    currentWindowLen: currentWindowLen,
                    action: `Found new minimum window! Length: ${minLen}, starts at index ${minStart}.`,
                    codeLines: [12, 13, 14]
                });
            }

            let charS = str[s]; // Character at windowStart, about to be removed

            winFreqMap.set(charS, winFreqMap.get(charS)! - 1); // Line 16
            logStep({
                arr: [...str],
                t: t,
                tFreqMap: new Map(tFreqMap),
                winFreqMap: new Map(winFreqMap),
                winMatchesWithFreq: winMatchesWithFreq,
                tCharCount: tCharCount,
                minLen: minLen,
                minStart: minStart,
                windowStart: s,
                windowEnd: e,
                charS: charS,
                action: `Shrinking window: Removed '${charS}' from index ${s}. Updated winFreqMap: ${JSON.stringify(Object.fromEntries(winFreqMap))}.`,
                codeLines: [16]
            });

            if (tFreqMap.has(charS) && winFreqMap.get(charS)! < tFreqMap.get(charS)!) { // Line 17
                winMatchesWithFreq--; // Line 17
                logStep({
                    arr: [...str],
                    t: t,
                    tFreqMap: new Map(tFreqMap),
                    winFreqMap: new Map(winFreqMap),
                    winMatchesWithFreq: winMatchesWithFreq,
                    tCharCount: tCharCount,
                    minLen: minLen,
                    minStart: minStart,
                    windowStart: s,
                    windowEnd: e,
                    charS: charS,
                    action: `'${charS}' count in window now below target. Decremented winMatchesWithFreq: ${winMatchesWithFreq}/${tCharCount}.`,
                    codeLines: [17]
                });
            }
            s++; // Line 18
            logStep({
                arr: [...str],
                t: t,
                tFreqMap: new Map(tFreqMap),
                winFreqMap: new Map(winFreqMap),
                winMatchesWithFreq: winMatchesWithFreq,
                tCharCount: tCharCount,
                minLen: minLen,
                minStart: minStart,
                windowStart: s, // s has moved
                windowEnd: e,
                charS: charS,
                action: `Moved windowStart to ${s}.`,
                codeLines: [18]
            });
        }
    }

    const finalResult = minLen === Infinity ? "" : str.substring(minStart, minStart + minLen); // Line 22
    logStep({
        arr: [...str],
        t: t,
        tFreqMap: new Map(tFreqMap),
        winFreqMap: new Map(winFreqMap),
        winMatchesWithFreq: winMatchesWithFreq,
        tCharCount: tCharCount,
        minLen: minLen,
        minStart: minStart,
        windowStart: minStart,
        windowEnd: minLen === Infinity ? -1 : minStart + minLen - 1,
        finalResult: finalResult,
        mode: 'min-window',
        action: `Algorithm complete. Final minimum window: "${finalResult}" (Length: ${minLen === Infinity ? "Not Found" : minLen}).`,
        codeLines: [22]
    });

    return minLen === Infinity ? "" : str.substring(minStart, minStart + minLen); // Line 22
}
