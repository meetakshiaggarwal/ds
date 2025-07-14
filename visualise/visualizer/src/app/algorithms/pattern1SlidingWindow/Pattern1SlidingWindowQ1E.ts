export function findAvgSubArrays(arr: number[], k: number, logStep: Function) {
  let subArrAvgs: number[] = []; // Line 1
  let windowStart = 0, windowSum = 0; // Line 2

  // Initial step before loop starts
  logStep({
    windowStart: 0,
    windowEnd: -1, // No window yet
    windowSum: 0,
    result: [],
    arr: [...arr],
    mode: 'average',
    action: 'Initializing variables.',
    codeLines: [1, 2] // Highlight lines 1 and 2
  });

  for (let windowEnd = 0; windowEnd < arr.length; windowEnd++) { // Line 3
    windowSum += arr[windowEnd]; // Line 4
    logStep({
      windowStart,
      windowEnd,
      windowSum,
      result: [...subArrAvgs],
      arr: [...arr],
      mode: 'average',
      action: `Adding ${arr[windowEnd]} to window sum. Current sum: ${windowSum}`,
      codeLines: [3, 4] // Highlight loop line and sum update
    });

    if (windowEnd >= k - 1) { // Line 5
      subArrAvgs.push(Number((windowSum / k).toFixed(2))); // Line 6
      logStep({
        windowStart,
        windowEnd,
        windowSum,
        result: [...subArrAvgs],
        arr: [...arr],
        mode: 'average',
        action: `Window size ${k} reached. Average: ${Number((windowSum / k).toFixed(2))}.`,
        codeLines: [5, 6] // Highlight if condition and push
      });

      windowSum -= arr[windowStart++]; // Line 7
      logStep({
        windowStart, // This will be the new windowStart after increment
        windowEnd,
        windowSum,
        result: [...subArrAvgs],
        arr: [...arr],
        mode: 'average',
        action: `Shrinking window. Removing ${arr[windowStart - 1]}. New sum: ${windowSum}.`,
        codeLines: [7] // Highlight window slide
      });
    }
  }
  // Final step after loop finishes
  logStep({
    windowStart: -1, // Indicates end state
    windowEnd: arr.length, // Indicates end state
    result: [...subArrAvgs],
    arr: [...arr],
    mode: 'average',
    action: 'Algorithm finished. Final averages calculated.',
    codeLines: [8] // Highlight the return line
  });
  return subArrAvgs; // Line 8
}