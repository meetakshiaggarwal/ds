export function getMaxSumOfSubarray(
  arr: number[],
  k: number,
  logStep: (data: any) => void
): number {
  let maxSum = 0;
  let windowSum = 0;
  let windowStart = 0;

  for (let windowEnd = 0; windowEnd < arr.length; windowEnd++) {
    windowSum += arr[windowEnd];

    if (windowEnd >= k - 1) {
      maxSum = Math.max(maxSum, windowSum);

      logStep({
        arr: [...arr],
        windowStart,
        windowEnd,
        windowSum,
        maxSum,
        mode: 'max'  // for green highlight
      });

      windowSum -= arr[windowStart++];
    }
  }

  return maxSum;
}