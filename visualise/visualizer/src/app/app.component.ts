import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // For *ngFor, *ngIf, keyvalue pipe

import { VisualizerComponent } from './visualizer/visualizer.component';

import { findAvgSubArrays } from './algorithms/Pattern1SlidingWindowQ1E';
import { getMaxSumOfSubarray } from './algorithms/Pattern1SlidingWindowQ2E';
import { smallestSubArray } from './algorithms/Pattern1SlidingWindowQ3E';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, VisualizerComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  problems = [
    { id: 'avg', label: 'Find Averages of Subarrays' },
    { id: 'max', label: 'Maximum Sum Subarray of Size K' },
    { id: 'min', label: 'Smallest Subarray with Given Sum' }
  ];

  selectedProblem = 'avg';
  steps: any[] = [];
  inputArray = [2, 1, 5, 1, 3, 2];
  k = 3;

  run() {
    this.steps = [];
    const logStep = (data: any) => this.steps.push(data);
    const arr = this.inputArray;

    switch (this.selectedProblem) {
      case 'avg':
        findAvgSubArrays(arr, this.k, logStep);
        break;
      case 'max':
        getMaxSumOfSubarray(arr, this.k, logStep);
        break;
      case 'min':
        smallestSubArray(arr, this.k, logStep);
        break;
    }
  }
}