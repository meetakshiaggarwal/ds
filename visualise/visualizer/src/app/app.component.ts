import { Component, OnInit } from '@angular/core'; // Import OnInit
import { RouterOutlet } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // For *ngFor, *ngIf, keyvalue pipe

import { VisualizerComponent } from './visualizer/visualizer.component';

// Import all your algorithm functions
import { findAvgSubArrays } from './algorithms/Pattern1SlidingWindowQ1E';
import { getMaxSumOfSubarray } from './algorithms/Pattern1SlidingWindowQ2E';
import { smallestSubArray } from './algorithms/Pattern1SlidingWindowQ3E';
import { longestSubstringLengthKDistinctChars } from './algorithms/Pattern1SlidingWindowQ4M';
import { fruitsInBasket } from './algorithms/Pattern1SlidingWindowQ5M';
import { longestSubstring } from './algorithms/Pattern1SlidingWindowQ6M'; // This wraps Q4M
import { longestSubstringWithoutRepeatingChars } from './algorithms/Pattern1SlidingWindowQ7M';
import { longestSubstringWithSameLetterWithKReplacements } from './algorithms/Pattern1SlidingWindowQ8M';
import { maxOnesWithKReplacements } from './algorithms/Pattern1SlidingWindowQ9M';
import { findPermutation } from './algorithms/Pattern1SlidingWindowQ10M';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, VisualizerComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit { // Implement OnInit
  problems = [
    { id: 'avg', label: '1. Find Averages of Subarrays (E)' },
    { id: 'max_sum_k', label: '2. Max Sum Subarray of Size K (E)' },
    { id: 'min_subarray_sum', label: '3. Smallest Subarray with Given Sum (E)' },
    { id: 'k_distinct_chars', label: '4. Longest Substring with K Distinct Chars (M)' },
    { id: 'fruits_basket', label: '5. Fruits into Basket (M)' },
    { id: 'two_distinct_chars', label: '6. Longest Substring with at most 2 Distinct Chars (M)' },
    { id: 'no_repeat_substring', label: '7. Longest Substring Without Repeating Chars (M)' },
    { id: 'longest_replacement', label: '8. Longest Substring with Same Letter after K Replacements (M)' },
    { id: 'max_ones_replacement', label: '9. Max Ones after K Replacements (M)' },
    { id: 'string_permutation', label: '10. Permutation in a String (M)' }
  ];

  selectedProblem = 'avg';
  steps: any[] = [];
  inputArray: string | number[] = []; // Can be number array or string
  k: number | null = null; // K can be null for problems not requiring it, or a number for others
  pattern: string = ""; // For permutation problem

  // Initial array and K for the selected problem
  ngOnInit() {
    this.updateInputsForProblem();
  }

  // Update inputs when problem changes
  onProblemChange() {
    this.updateInputsForProblem();
    this.run(); // Re-run visualization when problem changes
  }

  updateInputsForProblem() {
    // Reset defaults for all problems
    this.inputArray = [];
    this.k = null;
    this.pattern = '';

    // Set specific defaults based on selected problem
    switch (this.selectedProblem) {
      case 'avg':
        this.inputArray = [2, 1, 5, 1, 3, 2];
        this.k = 3;
        break;
      case 'max_sum_k':
        this.inputArray = [2, 3, 6, 1, 5, 3, 6, 7];
        this.k = 3;
        break;
      case 'min_subarray_sum':
        this.inputArray = [2, 3, 6, 4, 5, 3, 6, 7];
        this.k = 10; // targetSum for this problem
        break;
      case 'k_distinct_chars':
        this.inputArray = "araaci";
        this.k = 2;
        break;
      case 'fruits_basket':
        this.inputArray = [1, 2, 1, 3, 2, 3];
        this.k = 2; // Fixed k for this problem
        break;
      case 'two_distinct_chars':
        this.inputArray = "ccaabbb";
        this.k = null; // No 'k' input needed directly for this wrapper
        break;
      case 'no_repeat_substring':
        this.inputArray = "aabccbb";
        this.k = null;
        break;
      case 'longest_replacement':
        this.inputArray = "aabccbb";
        this.k = 2;
        break;
      case 'max_ones_replacement':
        this.inputArray = [0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1];
        this.k = 2;
        break;
      case 'string_permutation':
        this.inputArray = "oidbcaf";
        this.pattern = "abc";
        this.k = null; // Not directly used as 'k'
        break;
    }
  }


  run() {
    this.steps = []; // Clear previous steps
    const logStep = (data: any) => this.steps.push(data);

    let processedArray: any[];
    if (typeof this.inputArray === 'string') {
      processedArray = [...this.inputArray]; // Convert string to array of characters
    } else {
      processedArray = [...this.inputArray]; // Use as is
    }

    switch (this.selectedProblem) {
      case 'avg':
        findAvgSubArrays(processedArray as number[], this.k as number, logStep);
        break;
      case 'max_sum_k':
        getMaxSumOfSubarray(processedArray as number[], this.k as number, logStep);
        break;
      case 'min_subarray_sum':
        smallestSubArray(processedArray as number[], this.k as number, logStep);
        break;
      case 'k_distinct_chars':
        longestSubstringLengthKDistinctChars(processedArray as string[], this.k as number, logStep);
        break;
      case 'fruits_basket':
        fruitsInBasket(processedArray as number[], this.k as number, logStep);
        break;
      case 'two_distinct_chars':
        longestSubstring(processedArray as string[], logStep);
        break;
      case 'no_repeat_substring':
        longestSubstringWithoutRepeatingChars(processedArray as string[], logStep);
        break;
      case 'longest_replacement':
        longestSubstringWithSameLetterWithKReplacements(processedArray as string[], this.k as number, logStep);
        break;
      case 'max_ones_replacement':
        maxOnesWithKReplacements(processedArray as number[], this.k as number, logStep);
        break;
      case 'string_permutation':
        findPermutation(processedArray as string[], this.pattern, logStep);
        break;
      default:
        console.warn('Selected problem not implemented:', this.selectedProblem);
    }
  }
}