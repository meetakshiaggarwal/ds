export function fruitsInBasket(fruits, k, logStep) {
    let maxFruitCount = 0; // Line 1
    let basketMap = new Map(); // Line 2
    let windowStart = 0; // Line 3

    // Initial step
    logStep({
        arr: [...fruits],
        k: k,
        maxFruitCount: maxFruitCount,
        basketMap: Object.fromEntries(basketMap),
        distinctFruitsInBasket: 0,
        windowStart: 0,
        windowEnd: -1,
        mode: 'fruits',
        action: 'Initializing variables.',
        codeLines: [1, 2, 3]
    });

    for(let windowEnd = 0; windowEnd < fruits.length; windowEnd++) { // Line 4
        let endFruit = fruits[windowEnd]; // Line 5
        basketMap.set(endFruit, (basketMap.get(endFruit) || 0) + 1); // Line 6

        logStep({
            arr: [...fruits],
            k: k,
            maxFruitCount: maxFruitCount,
            basketMap: Object.fromEntries(basketMap),
            distinctFruitsInBasket: basketMap.size,
            windowStart: windowStart,
            windowEnd: windowEnd,
            mode: 'fruits',
            action: `Adding fruit '${endFruit}' to basket. Basket: ${JSON.stringify(Object.fromEntries(basketMap))}.`,
            codeLines: [4, 5, 6]
        });

        while(basketMap.size > k) { // Line 7
            let startFruit = fruits[windowStart]; // Line 8
            basketMap.set(startFruit, basketMap.get(startFruit) - 1); // Line 9
            if(basketMap.get(startFruit) == 0) { // Line 10
                basketMap.delete(startFruit); // Line 11
            }
            windowStart++; // Line 12
            logStep({
                arr: [...fruits],
                k: k,
                maxFruitCount: maxFruitCount,
                basketMap: Object.fromEntries(basketMap),
                distinctFruitsInBasket: basketMap.size,
                windowStart: windowStart, // Updated windowStart
                windowEnd: windowEnd,
                mode: 'fruits',
                action: `Distinct fruits (${basketMap.size}) > k (${k}). Shrinking window, removed fruit '${startFruit}'.`,
                codeLines: [7, 8, 9, 10, 11, 12]
            });
        }
        maxFruitCount = Math.max(maxFruitCount, windowEnd - windowStart + 1); // Line 13
        logStep({
            arr: [...fruits],
            k: k,
            maxFruitCount: maxFruitCount,
            basketMap: Object.fromEntries(basketMap),
            distinctFruitsInBasket: basketMap.size,
            currentWindowLength: windowEnd - windowStart + 1,
            windowStart: windowStart,
            windowEnd: windowEnd,
            mode: 'fruits',
            action: `Updating maxFruitCount. Current window length: ${windowEnd - windowStart + 1}. Max fruit count: ${maxFruitCount}.`,
            codeLines: [13]
        });
    }
    // Final step
    logStep({
        arr: [...fruits],
        k: k,
        result: maxFruitCount,
        mode: 'fruits',
        action: `Algorithm finished. Final max fruit count: ${maxFruitCount}.`,
        codeLines: [14] // Highlight return
    });
    return maxFruitCount; // Line 14
}