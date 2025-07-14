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