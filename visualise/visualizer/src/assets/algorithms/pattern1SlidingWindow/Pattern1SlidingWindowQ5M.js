/**
 * Fruits into basket
 * --------------------
 * Same as Q4
 * Input:   fruits,k
 *          [1,2,4,3,2,1,2,1,2,2,3], 2
 * O/P:     maxFruitCount
 * Algo:    Sliding Window
 * Maintain
 * - hashmap (freq of fruits from tree),
 * - maxFruitCount
 * 
 * 1. Loop the fruits-tree arr
 * 2. Add the fruit to map (increase freq if already exist)
 * 3. if k(2) > map size,
 *  - decrease freq (if freq 0 - remove from map),
 *  - reduce window size
 * 4. if k(2) == map size, update maxFruitCount to max of (maxFruitCount, currWindowFreq)
 */
function fruitsInBasket(fruits, k) {
    let totalFruits=0, basketMap=new Map();
    for(let windowEnd=0, windowStart=0; windowEnd<fruits.length; windowEnd++) {
        let endFruit = fruits[windowEnd];
        basketMap.set(endFruit, (basketMap.get(endFruit) || 0) + 1);
        while(basketMap.size > k) {
            let startFruit = fruits[windowStart];
            basketMap[startFruit]--;
            basketMap.set(startFruit,basketMap.get(startFruit)-1)
            if(basketMap.get(startFruit) == 0) {
                basketMap.delete(startFruit);
            }
            windowStart++;
        }
        totalFruits = Math.max(totalFruits, windowEnd-windowStart+1);
    }
    return totalFruits;
}