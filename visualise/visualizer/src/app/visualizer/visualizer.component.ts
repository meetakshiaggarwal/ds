import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  selector: 'app-visualizer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './visualizer.component.html',
  styleUrl: './visualizer.component.scss'
})
export class VisualizerComponent implements OnChanges {
  @Input() steps: Step[] = [];
  @Input() currentStepIndex: number = 0;
  @Input() speed = 1000;

  isPlaying = false;
  interval: any;
  private prevStep: any = null;

  currentStep: Step | null = null;

  @Output() stepChange = new EventEmitter<Step>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['steps'] || changes['currentStepIndex']) {
      if (this.steps.length > 0) {
        this.currentStep = this.steps[this.currentStepIndex];
        this.stepChange.emit(this.currentStep);
      } else {
        this.currentStep = null;
        this.stepChange.emit(null as any);
      }
    }
  }

  play() {
    if (!this.isPlaying) {
      this.isPlaying = true;
      this.interval = setInterval(() => {
        if (this.currentStepIndex < this.steps.length - 1) {
          this.prevStep = this.currentStep;
          this.currentStepIndex++;
          this.currentStep = this.steps[this.currentStepIndex];
          this.stepChange.emit(this.currentStep);
        } else {
          this.stop();
        }
      }, this.speed);
    }
  }

  pause() {
    this.isPlaying = false;
    clearInterval(this.interval);
  }

  next() {
    if (this.currentStepIndex < this.steps.length - 1) {
      this.prevStep = this.currentStep;
      this.currentStepIndex++;
      this.currentStep = this.steps[this.currentStepIndex];
      this.stepChange.emit(this.currentStep);
    } else {
      this.stop();
    }
  }

  prev() {
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
      this.prevStep = this.steps[this.currentStepIndex - 1] || null;
      this.currentStep = this.steps[this.currentStepIndex];
      this.stepChange.emit(this.currentStep);
    } else {
      this.stop();
    }
  }

  stop() {
    this.pause();
    this.currentStepIndex = 0;
    this.prevStep = null;
    this.currentStep = this.steps[this.currentStepIndex];
    this.stepChange.emit(this.currentStep);
  }

  togglePlayPause() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  getKeys(obj: any): string[] {
    return Object.keys(obj || {});
  }

  hasVariableChanged(key: string): boolean {
    if (!this.prevStep || !this.currentStep) {
      return false;
    }
    if (typeof this.currentStep[key] === 'object' && this.currentStep[key] !== null) {
      return JSON.stringify(this.prevStep[key]) !== JSON.stringify(this.currentStep[key]);
    }
    return this.prevStep[key] !== this.currentStep[key];
  }

  formatVariable(value: any): string {
    if (value === undefined) {
      return 'undefined';
    }
    if (value === null) {
      return 'null';
    }
    if (typeof value === 'object') {
      return JSON.stringify(value, null, 2);
    }
    return value.toString();
  }
}