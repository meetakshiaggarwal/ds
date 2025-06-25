/**
 * Remove duplicates in sorted arr, inplace and return arr size
Input: nums = [1,1,2,2]
Output: 2  => [1,2]

Algo -> use inplace replace
*/

import fs from 'fs'

function removeDuplicatesSorted(nums) {
    let k = 0
    for(let i = 0; i < nums.length; i++) {
        if(nums[k] != nums[i]) {
            k++
            nums[k] = nums[i]
        }
    }
    return k+1
}

const inputPath = process.argv[2]
const input = fs.readFileSync(inputPath, 'utf-8').trim().split('\n')
const arr = input[0].split(',').map(Number)
console.log(removeDuplicatesSorted(arr))