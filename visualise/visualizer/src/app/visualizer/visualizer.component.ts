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
  pattern?: string;
  patternCharFreq?: { [key: string]: number };
  matched?: number;
  result?: boolean;
  t?: string;
  tFreqMap?: Map<string, number>;
  winFreqMap?: Map<string, number>;
  winMatchesWithFreq?: number;
  tCharCount?: number;
  currentWindowLen?: number;
  minLen?: number;
  minStart?: number;
  finalResult?: string;
  charE?: string;
  charS?: string;
  rightChar?: string;
  leftChar?: string;
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
    if (changes['steps'] && changes['steps'].currentValue !== changes['steps'].previousValue) {
      this.stop();
    }
    if (this.steps.length > 0) {
      if (this.currentStepIndex >= this.steps.length) {
        this.currentStepIndex = this.steps.length - 1;
        this.pause();
      } else if (this.currentStepIndex < 0) {
        this.currentStepIndex = 0;
      }
      this.currentStep = this.steps[this.currentStepIndex];
      this.stepChange.emit(this.currentStep);
    } else {
      this.currentStep = null;
      this.stepChange.emit(null as any);
    }
    if (changes['speed'] && this.isPlaying) {
      this.pause();
      this.play();
    }
  }

  play() {
    if (this.currentStepIndex >= this.steps.length - 1 && this.steps.length > 0) {
      this.pause();
      return;
    }

    if (!this.isPlaying && this.currentStepIndex < this.steps.length) {
      this.isPlaying = true;
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        if (this.currentStepIndex < this.steps.length - 1) {
          this.prevStep = this.currentStep;
          this.currentStepIndex++;
          this.currentStep = this.steps[this.currentStepIndex];
          this.stepChange.emit(this.currentStep);
        } else {
          this.pause();
        }
      }, this.speed);
    }
  }

  pause() {
    this.isPlaying = false;
    clearInterval(this.interval);
  }

  togglePlayPause() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  next() {
    if (this.currentStepIndex < this.steps.length - 1) {
      this.pause();
      this.prevStep = this.currentStep;
      this.currentStepIndex++;
      this.currentStep = this.steps[this.currentStepIndex];
      this.stepChange.emit(this.currentStep);
    } else {
      this.pause();
    }
  }

  prev() {
    if (this.currentStepIndex > 0) {
      this.pause();
      this.currentStepIndex--;
      this.prevStep = this.steps[this.currentStepIndex - 1] || null;
      this.currentStep = this.steps[this.currentStepIndex];
      this.stepChange.emit(this.currentStep);
    } else {
      this.pause();
    }
  }

  stop() {
    this.pause();
    this.currentStepIndex = 0;
    this.prevStep = null;
    this.currentStep = this.steps.length > 0 ? this.steps[0] : null;
    this.stepChange.emit(this.currentStep);
  }

  getKeys(obj: any): string[] {
    return Object.keys(obj || {});
  }

  hasVariableChanged(key: string): boolean {
    if (!this.prevStep || !this.currentStep) {
      return false;
    }
    if (this.currentStep[key] instanceof Map) {
      const prevMap = this.prevStep[key] as Map<any, any>;
      const currentMap = this.currentStep[key] as Map<any, any>;
      if (prevMap.size !== currentMap.size) return true;
      for (const [k, v] of currentMap.entries()) {
        if (prevMap.get(k) !== v) return true;
      }
      return false;
    }
    if (typeof this.currentStep[key] === 'object' && this.currentStep[key] !== null && !Array.isArray(this.currentStep[key])) {
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
    if (value instanceof Map) {
      return JSON.stringify(Object.fromEntries(value), null, 2);
    }
    if (typeof value === 'object') {
      return JSON.stringify(value, null, 2);
    }
    if (value === Infinity) {
        return 'Infinity';
    }
    return value.toString();
  }
}
