import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, inject, OnInit } from '@angular/core';
import { NgClass, NgStyle, NgSwitch, NgSwitchCase, NgIf, AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { Course } from '../../models/course.model';
import { CreditLabelPipe } from '../../pipes/credit-label.pipe';
import { HighlightDirective } from '../../directives/highlight.directive';
import * as EnrollmentActions from '../../store/enrollment/enrollment.actions';
import { selectIsEnrolled } from '../../store/enrollment/enrollment.selectors';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [NgClass, NgStyle, NgSwitch, NgSwitchCase, NgIf, AsyncPipe, CreditLabelPipe, HighlightDirective],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent implements OnInit, OnChanges {
  private store = inject(Store);

  @Input() course!: Course;
  @Output() enrollRequested = new EventEmitter<number>();
  isExpanded = false;
  isEnrolled$: Observable<boolean> = of(false);
  currentlyEnrolled = false;

  ngOnInit(): void {
    if (this.course) {
      this.isEnrolled$ = this.store.select(selectIsEnrolled(this.course.id));
      this.isEnrolled$.subscribe(enrolled => this.currentlyEnrolled = enrolled);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['course'] && this.course) {
      this.isEnrolled$ = this.store.select(selectIsEnrolled(this.course.id));
      this.isEnrolled$.subscribe(enrolled => this.currentlyEnrolled = enrolled);
    }
  }

  toggleDetails(): void {
    this.isExpanded = !this.isExpanded;
  }

  get cardClasses() {
    return {
      'card--enrolled': this.currentlyEnrolled,
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

  onToggleEnroll(): void {
    if (this.currentlyEnrolled) {
      this.store.dispatch(EnrollmentActions.unenrollFromCourse({ courseId: this.course.id }));
    } else {
      this.store.dispatch(EnrollmentActions.enrollInCourse({ courseId: this.course.id }));
      this.enrollRequested.emit(this.course.id);
    }
  }
}
