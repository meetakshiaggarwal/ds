/**
 * Bubble Sort => O(n^2)
 * bubble up the largest number in the end

I/p             ->  5,8,2,1,6,7
Bubble sort     ->  5,2,8,1,6,7
                    5,2,1,8,6,7
                    --
                    5,2,1,6,7,8
                    --
                    --
                    --
O/p             ->  1,2,5,6,7,8
Time Comp       ->  O(n^2)
*/
import fs from 'fs';

(()=> {
    function bubbleSort(arr) {
        for(let i=0; i<arr.length; i++) {
            for(let j=0; j<arr.length-i-1; j++) {
                if(arr[j]>arr[j+1]) {
                    swap(arr,j,j+1);
                }
            }
        }
        return arr;
    }

    function swap(arr,i,j) {
        let temp = arr[i];
        arr[i]=arr[j];
        arr[j]=temp;
    }


    const inputPath = process.argv[2];
    const input = fs.readFileSync(inputPath, 'utf-8').trim().split('\n');
    const arr = input[0].split(',').map(Number);

    console.log(bubbleSort(arr));
})();