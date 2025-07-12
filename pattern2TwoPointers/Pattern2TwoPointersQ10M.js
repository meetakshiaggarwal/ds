/**
 * Dutch National Flag
 * Algo - 2 pointers - low,high, 0before l, 2after high
*/

import fs from 'fs'

/**
 * O(N)
 */
function dutchNationalFlagProblem(arr) {
    let i = 0, low = 0, high = arr.length - 1
    while (i < high) {
        if (arr[i] == 0) {
            [arr[i], arr[low]] = [arr[low], arr[i]]
            low++, i++
        } else if (arr[i] == 1) {
            i++
        } else {
            [arr[i], arr[high]] = [arr[high], arr[i]]
            high--
        }
    }
}

const inputPath = process.argv[2]
const input = fs.readFileSync(inputPath, 'utf-8').trim().split('\n')
const arr = input[0].split(',').map(Number)
console.log(dutchNationalFlagProblem(arr))