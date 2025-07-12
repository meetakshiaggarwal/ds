export function findAvgSubArrays(arr: number[], k: number, logStep: Function) {
  let subArrAvgs: number[] = [];
  let windowStart = 0, windowSum = 0;
  for (let windowEnd = 0; windowEnd < arr.length; windowEnd++) {
    windowSum += arr[windowEnd];
    if (windowEnd >= k - 1) {
      subArrAvgs.push(Number((windowSum / k).toFixed(2)));
      logStep({
        windowStart,
        windowEnd,
        windowSum,
        result: [...subArrAvgs],
        arr,
        mode: 'average'
      });
      windowSum -= arr[windowStart++];
    }
  }
  return subArrAvgs;
}