/**
 * Squares of sorted arr,
Input: nums = [-11,-10,-2,-1,1,2,2,3,2,4,8,9,12]
Output: [,,,,,4,8,9,10,11,12]

Algo -> use inplace replace
*/

import fs from 'fs'

function squaresOfSortedArr(arr) {
    let len = arr.length, squared = new Array(len)
    for (let start = 0, end = len - 1, k = len - 1; k >= 0;) {
        if (Math.abs(arr[start]) < Math.abs(arr[end])) {
            squared[k--] = arr[end]*arr[end]
            end--
        } else {
            squared[k--] = arr[start]*arr[start]
            start++
        }
    }
    return squared
}

const inputPath = process.argv[2]
const input = fs.readFileSync(inputPath, 'utf-8').trim().split('\n')
const arr = input[0].split(',').map(Number)
console.log(squaresOfSortedArr(arr))