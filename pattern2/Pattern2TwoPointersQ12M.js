/**
 * String with backspace compare
 * Algo - keep skipCount for backspace and remove chars and compare
*/

import fs from 'fs'

/**
 * O(n+m)
 */
let stringWithBackspaceCompare = function (s, t) {
    let ptrS = s.length-1, ptrT = t.length-1
    while(ptrS >= 0 && ptrT >= 0) {
        ptrS = getNextPtr(s, ptrS)
        ptrT = getNextPtr(t, ptrT)
        if(ptrS < 0 && ptrT < 0) {
            return true
        }
        if(ptrS < 0 || ptrT < 0) {  
            return false
        }
        if(s[ptrS] != t[ptrT]) {
            return false;
        }
        ptrS--, ptrT--
    }
    return true
}

let getNextPtr = function(str, ptr) {
    let backspaceCount = 0
    while(ptr >= 0) {
        if(str[ptr] == '#') {
            backspaceCount++
        } else if (backspaceCount > 0) {
            backspaceCount--
        } else {
            break
        }
        ptr--
    }
    return ptr
}

const inputPath = process.argv[2]
const input = fs.readFileSync(inputPath, 'utf-8').trim().split('\n')
const s = input[0]
const t = input[1]
console.log(stringWithBackspaceCompare(s, t))