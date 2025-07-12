/**
 * Triplet Sum less than target, return count of triplets

Algo
1.  Sort, maintain allTriplets arr
2.  3pointers - fix p1, use next two for 2sum
3.  if = target => l++, r++
    if intersection => p1 move, reset l, r
    else logic <T => l++, >T => r--
4.  increase count - left to end (can be counted in one go)  
5.  return countOfTriplets
*/

import fs from 'fs'

function threeSumLessThanTargetCount(arr, T) {
    arr.sort((a, b) => a - b);
    let tripletCount = 0;
    for (let start = 0, length = arr.length; start < length - 2; start++) {
        if (start > 0 && arr[start] == arr[start - 1]) {
            continue;
        }
        let left = start + 1, right = length - 1;
        while (left < right) {
            let currentSum = arr[start] + arr[left] + arr[right];
            if (currentSum < T) {
                tripletCount += right - left;
                left++;
            } else {
                right--;
            }
        }
    }
    return tripletCount;
}

const inputPath = process.argv[2]
const input = fs.readFileSync(inputPath, 'utf-8').trim().split('\n')
const arr = input[0].split(',').map(Number)
const targetSum = Number(input[1])
console.log(threeSumLessThanTargetCount(arr, targetSum))