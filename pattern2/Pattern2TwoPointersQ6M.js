/**
 * Triplet Sum to zero, return all triplets

Algo - without sorting, NOT GREAT !
using pairs (add to new pairs, check if sum with old pairs give the target val)
var threeSum = function(nums) {
    let distinctArrMap = new Map(), pairsSum = [], tripletsSum0 = [];
    for(let i = 0; i < nums.length; i++) {
        if(!distinctArrMap.has(nums[i])) {
            distinctArrMap[nums[i]] = i
            for(let k = 0; k < pairs.length; k++) {
            }
            for(let j = 0; i > 0 && j < distinctArrMap.size; j++) {
                newPairsSum[j] = [distinctArrMap[j]+nums[i]]
            }
            pairsSum = [..., ...newPairsSum]
        }
    }
};


Algo
1.  Sort, maintain allTriplets arr
2.  3pointers - fix p1, use next two for 2sum
3.  if = target => l++, r++
    if intersection => p1 move, reset l, r
    else logic <T => l++, >T => r--
    add to triplets arr
4.  return arr
*/

import fs from 'fs'

function threeSum(arr) {
    arr.sort((a, b) => a - b);
    let triplets = [];
    for (let start = 0, length = arr.length, T = 0; start < length - 2; start++) {
        if(start > 0 && arr[start] == arr[start-1]) {
            continue;
        }
        let left = start + 1, right = length - 1;
        while (left < right) {
            let currentSum = arr[start] + arr[left] + arr[right];
            if (currentSum == T) {
                triplets.push([arr[start], arr[left], arr[right]]);
                left++, right--;
                while (arr[right] == arr[right + 1]) right--
                while (arr[left] == arr[left - 1]) left++
            } else if (currentSum < T) {
                left++;
                while (arr[left] == arr[left - 1]) left++
            } else {
                right--;
                while (arr[right] == arr[right + 1]) right--
            }
        }
    }
    return triplets;
}

const inputPath = process.argv[2]
const input = fs.readFileSync(inputPath, 'utf-8').trim().split('\n')
const arr = input[0].split(',').map(Number)
console.log(threeSum(arr))