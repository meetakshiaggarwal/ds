/**
 * Minimum window sort - shortest-subarray-to-be-removed-to-make-array-sorted
 * Algo - keep skipCount for backspace and remove chars and compare
*/

import fs from 'fs'

/**
 * O(n)
 */
let shortestSubArrayRemoveForSortedArr = function (arr) {
    let len = arr.length
    let left = 0;
    while(left < len - 1 && arr[left] <= arr[left + 1]) {
        left++
    }

    if(left == len - 1) {
        return 0
    }

    let right = len - 1
    while(right > 0 && arr[right] >= arr[right - 1]) {
        right--
    }

    let res = Math.min(len-left-1, right)

    let i = 0, j = right
    while(i <= left && j <= len-1) {
        if(arr[i] <= arr[j]) {
            res = Math.min(res, j-i-1)
            i++
        } else {
            j++
        }
    }
    return res
}

const inputPath = process.argv[2]
const input = fs.readFileSync(inputPath, 'utf-8').trim().split('\n')
const arr = input[0].split(',').map(Number)
console.log(shortestSubArrayRemoveForSortedArr(arr))