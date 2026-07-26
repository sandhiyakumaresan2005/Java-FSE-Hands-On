import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { NgClass, NgStyle, NgSwitch, NgSwitchCase, NgIf } from '@angular/common';
import { Course } from '../../models/course.model';
import { CreditLabelPipe } from '../../pipes/credit-label.pipe';
import { HighlightDirective } from '../../directives/highlight.directive';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [NgClass, NgStyle, NgSwitch, NgSwitchCase, NgIf, CreditLabelPipe, HighlightDirective],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent implements OnChanges {
  @Input() course!: Course;
  @Output() enrollRequested = new EventEmitter<number>();
  isExpanded = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['course']) {
      console.log('Previous:', changes['course'].previousValue);
      console.log('Current:', changes['course'].currentValue);
    }
  }

  toggleDetails(): void {
    this.isExpanded = !this.isExpanded;
  }

  get cardClasses() {
    return {
      'card--enrolled': !!this.course?.isEnrolled,
      'card--full': !!this.course?.isFull
    };
  }

  get borderStyle() {
    let color = '#9e9e9e';
    if (this.course?.gradeStatus === 'passed') color = '#4caf50';
    else if (this.course?.gradeStatus === 'failed') color = '#f44336';
    else if (this.course?.gradeStatus === 'pending') color = '#ff9800';
    return { 'border-left': `6px solid ${color}` };
  }

  onEnroll(): void {
    this.enrollRequested.emit(this.course.id);
  }
}
