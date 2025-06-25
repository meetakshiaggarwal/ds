/**
 * Subarr Product less than target, return subarr and count
Algo - Sliding Window + 2pointers
*/

import fs from 'fs'

/**
 * O(N)
 */
function productLessThanTargetSubArraysCount(arr, T) {
    if (T <= 1) return 0;
    let count = 0;
    for (let right = 0, left = 0, prod = 1; right < arr.length; right++) {
        prod *= arr[right];
        while (prod >= T) {
            prod /= arr[left++];
        }
        count += right - left + 1;
    }
    return count;
}

/**
 * O(N^2)
 */
function productLessThanTargetSubArraysArraysAndCount(arr, T) {
    if (T <= 1) return { count: 0, subarrays: [] }
    let subarr = [], count = 0;
    for (let right = 0, prod = 1; right < arr.length; right++) {
        prod *= arr[right];
        while (prod >= T) {
            prod /= arr[left++];
        }
        for (let i = right; i >= left; i--) {
            subarr.push(arr.slice(i, right + 1));
            count++;
        }
    }
    return { count: count, subarrays: subarr }
}

const inputPath = process.argv[2]
const input = fs.readFileSync(inputPath, 'utf-8').trim().split('\n')
const arr = input[0].split(',').map(Number)
const target = Number(input[1])
console.log(productLessThanTargetSubArraysCount(arr, target))