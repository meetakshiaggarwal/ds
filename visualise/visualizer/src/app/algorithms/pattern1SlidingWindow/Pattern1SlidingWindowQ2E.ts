export function getMaxSumOfSubarray(
  arr: number[],
  k: number,
  logStep: (data: any) => void
): number {
  let maxSum = 0; // Line 1
  let windowSum = 0; // Line 2
  let windowStart = 0; // Line 3

  // Initial step
  logStep({
    arr: [...arr],
    windowStart: 0,
    windowEnd: -1,
    windowSum: 0,
    maxSum: 0,
    mode: 'max',
    action: 'Initializing variables.',
    codeLines: [1, 2, 3] // Highlight lines 1, 2, 3
  });

  for (let windowEnd = 0; windowEnd < arr.length; windowEnd++) { // Line 4
    windowSum += arr[windowEnd]; // Line 5
    logStep({
      arr: [...arr],
      windowStart,
      windowEnd,
      windowSum,
      maxSum,
      mode: 'max',
      action: `Adding ${arr[windowEnd]} to window sum. Current sum: ${windowSum}.`,
      codeLines: [4, 5] // Highlight loop and sum update
    });

    if (windowEnd >= k - 1) { // Line 6
      maxSum = Math.max(maxSum, windowSum); // Line 7
      logStep({
        arr: [...arr],
        windowStart,
        windowEnd,
        windowSum,
        maxSum,
        mode: 'max',
        action: `Window size ${k} reached. Max Sum updated to ${maxSum}.`,
        codeLines: [6, 7] // Highlight if condition and maxSum update
      });

      windowSum -= arr[windowStart++]; // Line 8
      logStep({
        arr: [...arr],
        windowStart, // This will be the new windowStart after increment
        windowEnd,
        windowSum,
        maxSum,
        mode: 'max',
        action: `Shrinking window. Removing ${arr[windowStart - 1]}. New sum: ${windowSum}.`,
        codeLines: [8] // Highlight window slide
      });
    }
  }

  // Final step
  logStep({
    arr: [...arr],
    windowStart: -1,
    windowEnd: arr.length,
    result: maxSum,
    action: 'Algorithm finished. Final max sum.',
    mode: 'max',
    codeLines: [9] // Highlight the return line
  });

  return maxSum; // Line 9
}