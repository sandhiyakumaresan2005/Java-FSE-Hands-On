import { Component, inject, OnInit } from '@angular/core';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { Course } from '../../models/course.model';
import { CreditLabelPipe } from '../../pipes/credit-label.pipe';
import { selectAllCourses } from '../../store/course/course.selectors';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';
import * as EnrollmentActions from '../../store/enrollment/enrollment.actions';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe, CreditLabelPipe],
  templateUrl: './student-profile.component.html',
  styleUrl: './student-profile.component.css'
})
export class StudentProfileComponent implements OnInit {
  private store = inject(Store);

  student = {
    name: 'Alex Johnson',
    email: 'alex.johnson@student.edu',
    studentId: 'STU-2026-089',
    major: 'Computer Science',
    gpa: 3.8
  };

  enrolledCourses$: Observable<Course[]>;

  constructor() {
    this.enrolledCourses$ = combineLatest([
      this.store.select(selectAllCourses),
      this.store.select(selectEnrolledIds)
    ]).pipe(
      map(([courses, ids]) => courses.filter(c => ids.includes(c.id)))
    );
  }

  ngOnInit(): void {}

  unenroll(courseId: number): void {
    this.store.dispatch(EnrollmentActions.unenrollFromCourse({ courseId }));
  }
}
