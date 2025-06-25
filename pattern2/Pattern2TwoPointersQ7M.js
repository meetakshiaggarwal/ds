/**
 * Triplet Sum closest to target, return sum with smallest sum

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

function threeSumClosestToTarget(arr, T) {
    arr.sort((a, b) => a - b);
    let smallestClosestSum = Infinity;
    for (let start = 0, length = arr.length; start < length - 2; start++) {
        if(start > 0 && arr[start] == arr[start-1]) {
            continue;
        }
        let left = start + 1, right = length - 1;
        while (left < right) {
            let currentSum = arr[start] + arr[left] + arr[right];
            if(Math.abs(T-currentSum) < Math.abs(T-smallestClosestSum)) {
                smallestClosestSum = currentSum;
            }
            if (currentSum == T) {
                return T;
            } else if (currentSum < T) {
                left++;
                while (arr[left] == arr[left - 1]) left++
            } else {
                right--;
                while (arr[right] == arr[right + 1]) right--
            }
        }
    }
    return smallestClosestSum;
}

const inputPath = process.argv[2]
const input = fs.readFileSync(inputPath, 'utf-8').trim().split('\n')
const arr = input[0].split(',').map(Number)
const targetSum = Number(input[1])
console.log(threeSumClosestToTarget(arr, targetSum))