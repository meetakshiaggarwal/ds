import { Component, OnInit } from '@angular/core'; // Import OnInit
import { RouterOutlet } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // For *ngFor, *ngIf, keyvalue pipe

import { VisualizerComponent } from './visualizer/visualizer.component';

// Import all your algorithm functions
import { findAvgSubArrays } from './algorithms/pattern1SlidingWindow/Pattern1SlidingWindowQ1E';
import { getMaxSumOfSubarray } from './algorithms/pattern1SlidingWindow/Pattern1SlidingWindowQ2E';
import { smallestSubArray } from './algorithms/pattern1SlidingWindow/Pattern1SlidingWindowQ3E';
import { longestSubstringLengthKDistinctChars } from './algorithms/pattern1SlidingWindow/Pattern1SlidingWindowQ4M';
import { fruitsInBasket } from './algorithms/pattern1SlidingWindow/Pattern1SlidingWindowQ5M';
import { longestSubstring } from './algorithms/pattern1SlidingWindow/Pattern1SlidingWindowQ6M'; // This wraps Q4M
import { longestSubstringWithoutRepeatingChars } from './algorithms/pattern1SlidingWindow/Pattern1SlidingWindowQ7M';
import { longestSubstringWithSameLetterWithKReplacements } from './algorithms/pattern1SlidingWindow/Pattern1SlidingWindowQ8M';
import { maxOnesWithKReplacements } from './algorithms/pattern1SlidingWindow/Pattern1SlidingWindowQ9M';
import { findPermutation } from './algorithms/pattern1SlidingWindow/Pattern1SlidingWindowQ10M';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, VisualizerComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit { // Implement OnInit
  problems = [
    { id: 'avg', label: '1. Find Averages of Subarrays (E) LC643', filename: 'Pattern1SlidingWindowQ1E.js' },
    { id: 'max_sum_k', label: '2. Max Sum Subarray of Size K (E) LC1708', filename: 'Pattern1SlidingWindowQ2E.js' },
    { id: 'min_subarray_sum', label: '3. Smallest Subarray with Given Sum (E) LC209', filename: 'Pattern1SlidingWindowQ3E.js' },
    { id: 'k_distinct_chars', label: '4. Longest Substring with K Distinct Chars (M) LC340', filename: 'Pattern1SlidingWindowQ4M.js' },
    { id: 'fruits_basket', label: '5. Fruits into Basket (M) LC904', filename: 'Pattern1SlidingWindowQ5M.js' },
    { id: 'two_distinct_chars', label: '6. Longest Substring with at most 2 Distinct Chars (M) LC159', filename: 'Pattern1SlidingWindowQ6M.js' },
    { id: 'no_repeat_substring', label: '7. Longest Substring Without Repeating Chars (M) LC3', filename: 'Pattern1SlidingWindowQ7M.js' },
    { id: 'longest_replacement', label: '8. Longest Substring with Same Letter after K Replacements (M) LC424', filename: 'Pattern1SlidingWindowQ8M.js' },
    { id: 'max_ones_replacement', label: '9. Max Ones after K Replacements (M) LC1004', filename: 'Pattern1SlidingWindowQ9M.js' },
    { id: 'string_permutation', label: '10. Permutation in a String (M) LC567', filename: 'Pattern1SlidingWindowQ10M.js' }
  ];

selectedProblem = 'avg';
  steps: any[] = [];
  inputArray: any;
  k: number | null = null;
  pattern: string | null = null;
  currentStepIndex: number = 0;
  selectedProblemCode: string = '';

  constructor(private http: HttpClient) {} // Inject HttpClient

  ngOnInit() {
    this.updateInputsForProblem();
    this.loadAlgorithmCode(); // Load code on init
  }

  onProblemChange() {
    this.updateInputsForProblem();
    this.loadAlgorithmCode(); // Load new code when problem changes
    this.run();
  }

  updateInputsForProblem() {
    this.inputArray = [];
    this.k = null;
    this.pattern = '';

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
        this.k = 10;
        break;
      case 'k_distinct_chars':
        this.inputArray = "araaci";
        this.k = 2;
        break;
      case 'fruits_basket':
        this.inputArray = [1, 2, 1, 3, 2, 3];
        this.k = 2;
        break;
      case 'two_distinct_chars':
        this.inputArray = "ccaabbb";
        this.k = null;
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
        this.k = null;
        break;
    }
  }

  loadAlgorithmCode() {
    const problem = this.problems.find(p => p.id === this.selectedProblem);
    if (problem && problem.filename) {
      // Construct the path to the file in the assets folder
      const filePath = `assets/algorithms/pattern1SlidingWindow/${problem.filename}`;
      this.http.get(filePath, { responseType: 'text' }).subscribe(
        code => {
          this.selectedProblemCode = code;
        },
        error => {
          console.error('Error loading algorithm code:', error);
          this.selectedProblemCode = `// Error loading code for ${problem.label}. Check console for details.`;
        }
      );
    } else {
      this.selectedProblemCode = '// No code available for this problem.';
    }
  }

  run() {
    this.steps = [];
    this.currentStepIndex = 0;

    const logStep = (data: any) => this.steps.push(data);

    let processedArray: any;

    if (['k_distinct_chars', 'two_distinct_chars', 'no_repeat_substring', 'longest_replacement', 'string_permutation'].includes(this.selectedProblem)) {
      processedArray = this.inputArray as string;
    } else {
      if (typeof this.inputArray === 'string') {
        processedArray = (this.inputArray as string).split(',').map(s => {
          const num = Number(s.trim());
          return isNaN(num) ? s.trim() : num;
        }).filter(item => item !== '');
      } else {
        processedArray = [...this.inputArray];
      }
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
        longestSubstringLengthKDistinctChars(processedArray as string, this.k as number, logStep);
        console.log('K Distinct Chars not yet visualized.');
        break;
      case 'fruits_basket':
        fruitsInBasket(processedArray as number[], this.k as number, logStep);
        console.log('Fruits in Basket not yet visualized.');
        break;
      case 'two_distinct_chars':
        longestSubstring(processedArray as string, logStep);
        console.log('Two Distinct Chars not yet visualized.');
        break;
      case 'no_repeat_substring':
        longestSubstringWithoutRepeatingChars(processedArray as string, logStep);
        console.log('No Repeat Substring not yet visualized.');
        break;
      case 'longest_replacement':
        longestSubstringWithSameLetterWithKReplacements(processedArray as string, this.k as number, logStep);
        console.log('Longest Replacement not yet visualized.');
        break;
      case 'max_ones_replacement':
        maxOnesWithKReplacements(processedArray as number[], this.k as number, logStep);
        console.log('Max Ones Replacement not yet visualized.');
        break;
      case 'string_permutation':
        // stringPermutation(processedArray as string, this.pattern as string, logStep);
        console.log('String Permutation not yet visualized.');
        break;
      default:
        console.warn('Unknown problem selected:', this.selectedProblem);
    }
  }
}