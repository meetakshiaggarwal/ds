/**
 * Two Sum - unsorted
Input: nums = [2,7,11,15], target = 9
Output: [0,1]

Algo -> use hashmap
*/

import fs from 'fs'

function twoSumUnsorted(nums, target) {
    let arrMap = new Map();
    for(let i=0; i<nums.length; i++) {
        let diffNum = target-nums[i];
        if(arrMap.has(diffNum)) {
            return [i,arrMap.get(diffNum)]
        } else {
            arrMap.set(nums[i],i)
        }
    }
    return []
}

const inputPath = process.argv[2]
const input = fs.readFileSync(inputPath, 'utf-8').trim().split('\n')
const arr = input[0].split(',').map(Number)
const target = Number(input[1])
console.log(twoSumUnsorted(arr, target))