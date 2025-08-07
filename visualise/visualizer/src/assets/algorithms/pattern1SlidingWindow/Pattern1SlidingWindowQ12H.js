export function minWindow(str, t) {
    let tFreqMap = new Map()
    for(let i=0;i<t.length;i++) {
        tFreqMap.set(t[i], (tFreqMap.get(t[i]) || 0)+1)
    }

    let minLen=Infinity, minStart=0
    for(let e=0,s=0,winFreqMap = new Map(), winMatchesWithFreq=0, tCharCount=tFreqMap.size; e<str.length;e++) {
        winFreqMap.set(str[e],(winFreqMap.get(str[e]) || 0)+1);
        if(tFreqMap.has(str[e]) && tFreqMap.get(str[e]) == winFreqMap.get(str[e])) { winMatchesWithFreq++ }
        while(winMatchesWithFreq == tCharCount) {
            if(e-s+1 < minLen) {
                minLen = e-s+1
                minStart = s
            }
            winFreqMap.set(str[s],winFreqMap.get(str[s])-1)
            if(tFreqMap.has(str[s]) && winFreqMap.get(str[s]) < tFreqMap.get(str[s])) { winMatchesWithFreq-- }
            s++
        }
    }

    return minLen==Infinity ? "" : str.substring(minStart,minStart+minLen)
};