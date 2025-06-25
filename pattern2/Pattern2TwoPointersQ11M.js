/**
 * 4Sum, return quadreplets
Algo - 2 outer loops then triplets(3sum)
*/

import fs from 'fs'

/**
 * O(N^3) => O(NlogN) + O(N for outer loop)×O(N for second loop)×O(N for two-pointer)
 */
function quadrepletsSum(arr, T) {
    let quadreplets = []
    arr.sort((a, b) => a - b)
    for (let quadStart = 0, len = arr.length; quadStart < len - 3; quadStart++) {
        if (quadStart > 0 && arr[quadStart] == arr[quadStart - 1])
            continue
        for (let triplStart = quadStart + 1; triplStart < len - 2; triplStart++) {
            if (triplStart > quadStart + 1 && arr[triplStart] == arr[triplStart - 1])
                continue
            let left = triplStart + 1, right = len - 1
            while (left < right) {
                let currSum = arr[quadStart] + arr[triplStart] + arr[left] + arr[right]
                if (currSum == T) {
                    quadreplets.push([arr[quadStart], arr[triplStart], arr[left], arr[right]])
                    left++, right--
                    while (arr[left] == arr[left - 1]) left++
                    while (arr[right] == arr[right + 1]) right--
                } else if (currSum > T) {
                    right--
                    while (arr[right] == arr[right + 1]) right--
                } else {
                    left++
                    while (arr[left] == arr[left - 1]) left++
                }
            }
        }
    }
    return quadreplets
}

const inputPath = process.argv[2]
const input = fs.readFileSync(inputPath, 'utf-8').trim().split('\n')
const arr = input[0].split(',').map(Number)
const T = Number(input[1])
console.log(quadrepletsSum(arr, T))