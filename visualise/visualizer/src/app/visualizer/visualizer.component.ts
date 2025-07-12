import { Component, Input, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // For *ngFor, *ngIf, keyvalue pipe

@Component({
  selector: 'app-visualizer',
  standalone: true,
  imports: [CommonModule, FormsModule], // Ensure BrowserModule is imported if used
  templateUrl: './visualizer.component.html',
  styleUrl: './visualizer.component.scss'
})
export class VisualizerComponent implements OnChanges {
  @Input() steps: any[] = [];
  @Input() speed = 1000;

  currentStepIndex = 0;
  interval: any;
  playing = false;
  private prevStep: any = null; // To store the previous step for comparison

  ngOnChanges(): void {
    this.currentStepIndex = 0;
    this.stop();
    this.prevStep = null; // Reset prevStep when steps change
  }

  play() {
    if (!this.playing) {
      this.playing = true;
      this.interval = setInterval(() => this.next(), this.speed);
    }
  }

  pause() {
    this.playing = false;
    clearInterval(this.interval);
  }

  next() {
    if (this.currentStepIndex < this.steps.length - 1) {
      this.prevStep = this.steps[this.currentStepIndex]; // Store current as previous
      this.currentStepIndex++;
    } else {
      this.pause();
    }
  }

  prev() {
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
      // For 'prev', determine prevStep. If going back to index 0, prevStep is null.
      this.prevStep = this.steps[this.currentStepIndex - 1] || null;
    } else {
      this.stop(); // If at the very beginning, stop and reset.
    }
  }

  stop() {
    this.pause();
    this.currentStepIndex = 0;
    this.prevStep = null;
  }

  get currentStep() {
    return this.steps[this.currentStepIndex];
  }

  getKeys(obj: any): string[] {
    return Object.keys(obj || {});
  }

  // New method to check if a variable has changed
  hasVariableChanged(key: string): boolean {
    if (!this.prevStep || !this.currentStep) {
      return false;
    }
    // Deep comparison for objects/arrays (like maps or result arrays)
    if (typeof this.currentStep[key] === 'object' && this.currentStep[key] !== null) {
      return JSON.stringify(this.prevStep[key]) !== JSON.stringify(this.currentStep[key]);
    }
    // Simple comparison for primitives
    return this.prevStep[key] !== this.currentStep[key];
  }

  // New method to format variables for display (e.g., objects)
  formatVariable(value: any): string {
    if (value === undefined) {
      return 'undefined';
    }
    if (value === null) {
      return 'null';
    }
    if (typeof value === 'object') {
      // For objects (like charFreqMap), stringify them nicely
      return JSON.stringify(value, null, 2); // Pretty print JSON
    }
    return value.toString();
  }
}