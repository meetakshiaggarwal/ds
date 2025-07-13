export function smallestSubArray(
  arr: number[],
  targetSum: number,
  logStep: (data: any) => void
): number {
  let minLength = Infinity;
  let windowSum = 0;
  let windowStart = 0;

  for (let windowEnd = 0; windowEnd < arr.length; windowEnd++) {
    windowSum += arr[windowEnd];

    while (windowSum >= targetSum) {
      minLength = Math.min(minLength, windowEnd - windowStart + 1);

      logStep({
        arr: [...arr],
        windowStart,
        windowEnd,
        windowSum,
        minLength,
        mode: 'min'  // for orange highlight
      });

      windowSum -= arr[windowStart++];
    }
  }

  return minLength === Infinity ? 0 : minLength;
}