/**
 * Two Sum - sorted array
Input: nums = [2,7,11,15], target = 9
Output: [0,1]

Algo -> use two pointers
1. loop the arr with 2 pointers, start, end
2. if a[start] + a[end] < target, start++ else end--
continue till we get the target
(assuming there EXIST EXACTLY ONE target sum)
*/

import fs from 'fs'

function twoSumSorted(arr, target) {
    let start = 0, end = arr.length - 1;
    while (start < end) {
        let sum = arr[start] + arr[end];
        if (sum < target) {
            start++
        } else if (sum > target) {
            end--
        } else {
            return [start, end]
        }
    }
    return []
}

const inputPath = process.argv[2]
const input = fs.readFileSync(inputPath, 'utf-8').trim().split('\n')
const arr = input[0].split(',').map(Number)
const target = Number(input[1])
console.log("--------Input--------")
console.log("arr", arr)
console.log("target", target)
console.log("--------Output--------")
console.log(twoSumSorted(arr, target))
console.log("----------------------")
