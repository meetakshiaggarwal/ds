/**
 * Remove element in unsorted arr, inplace and return arr length
Input: nums = [1,1,2,2,3,4,5,3,2,1,6], 2
Output: 8  => [1,1,3,4,5,3,1,6]

Algo -> use inplace replace
*/

import fs from 'fs'

function removeDuplicatesUnSorted(arr,val) {
}

const inputPath = process.argv[2]
const input = fs.readFileSync(inputPath, 'utf-8').trim().split('\n')
const arr = input[0].split(',').map(Number)
const val = Number(input[1])
console.log(removeDuplicatesUnSorted(arr))