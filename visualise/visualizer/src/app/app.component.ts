import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { VisualizerComponent } from './visualizer/visualizer.component';

// Import all your algorithm functions (these are the executable functions)
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

interface Problem {
  id: string;
  label: string;
  filename: string;
}

interface Step {
  arr: any[];
  windowStart: number;
  windowEnd: number;
  winSum?: number;
  maxSum?: number;
  minVal?: number;
  distinctCount?: number;
  fruitsInBasket?: any;
  replacements?: number;
  onesCount?: number;
  permutationsFound?: string[];
  mode: string;
  action: string;
  codeLines?: number[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, VisualizerComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  problems: Problem[] = [
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

  selectedProblem: string = 'avg';
  steps: Step[] = [];
  inputArray: any;
  k: number | null = null;
  pattern: string | null = null;
  currentStepIndex: number = 0;
  selectedProblemCode: string = '';
  highlightedLines: number[] = [];

  @ViewChild('codeEditorPre') codeEditorPre!: ElementRef;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.updateInputsForProblem();
    this.loadAlgorithmCode();
  }

  onProblemChange() {
    this.updateInputsForProblem();
    this.loadAlgorithmCode();
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
      const filePath = `assets/algorithms/pattern1SlidingWindow/${problem.filename}`;
      this.http.get(filePath, { responseType: 'text' }).subscribe(
        code => {
          this.selectedProblemCode = code;
          this.run();
        },
        error => {
          console.error('Error loading algorithm code:', error);
          this.selectedProblemCode = `// Error loading code for ${problem.label}. Check console for details.`;
          this.steps = [];
          this.currentStepIndex = 0;
          this.highlightedLines = [];
        }
      );
    } else {
      this.selectedProblemCode = '// No code available for this problem.';
      this.steps = [];
      this.currentStepIndex = 0;
      this.highlightedLines = [];
    }
  }

  onVisualizerStepChange(step: Step): void {
    this.currentStepIndex = this.steps.indexOf(step);
    this.highlightedLines = step.codeLines || [];
    if (this.highlightedLines.length > 0) {
      setTimeout(() => this.scrollToHighlightedLine(this.highlightedLines[0]), 0);
    }
  }

  private scrollToHighlightedLine(lineNumber: number): void {
    if (this.codeEditorPre) {
      const lineElement = this.codeEditorPre.nativeElement.querySelector(`.code-line:nth-child(${lineNumber})`);
      if (lineElement) {
        lineElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }

  run() {
    this.steps = [];
    this.currentStepIndex = 0;
    this.highlightedLines = [];

    const logStep = (data: any) => {
      this.steps.push(data);
    };

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
        break;
      case 'fruits_basket':
        fruitsInBasket(processedArray as number[], this.k as number, logStep);
        break;
      case 'two_distinct_chars':
        longestSubstring(processedArray as string, logStep);
        break;
      case 'no_repeat_substring':
        longestSubstringWithoutRepeatingChars(processedArray as string, logStep);
        break;
      case 'longest_replacement':
        longestSubstringWithSameLetterWithKReplacements(processedArray as string, this.k as number, logStep);
        break;
      case 'max_ones_replacement':
        maxOnesWithKReplacements(processedArray as number[], this.k as number, logStep);
        break;
      case 'string_permutation':
        findPermutation(processedArray as string, this.pattern as string, logStep);
        break;
      default:
        console.warn('Unknown problem selected:', this.selectedProblem);
    }

    if (this.steps.length > 0) {
      this.highlightedLines = this.steps[0].codeLines || [];
      setTimeout(() => this.scrollToHighlightedLine(this.highlightedLines[0]), 0);
    }
  }
}