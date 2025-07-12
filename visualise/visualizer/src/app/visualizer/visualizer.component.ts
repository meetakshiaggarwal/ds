import { Component, Input, OnChanges } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // For *ngFor, *ngIf, keyvalue pipe

@Component({
  selector: 'app-visualizer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './visualizer.component.html',
  styleUrl: './visualizer.component.scss'
})
export class VisualizerComponent  implements OnChanges {
  @Input() steps: any[] = [];
  @Input() speed = 1000;

  currentStepIndex = 0;
  interval: any;
  playing = false;

  ngOnChanges(): void {
    this.currentStepIndex = 0;
    this.stop();
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
      this.currentStepIndex++;
    } else {
      this.pause();
    }
  }

  prev() {
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
    }
  }

  stop() {
    this.pause();
    this.currentStepIndex = 0;
  }

  get currentStep() {
    return this.steps[this.currentStepIndex];
  }

  getKeys(obj: any): string[] {
    return Object.keys(obj || {});
  }
}