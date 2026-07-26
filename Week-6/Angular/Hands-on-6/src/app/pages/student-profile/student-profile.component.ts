import { Component, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { EnrollmentService } from '../../services/enrollment.service';
import { Course } from '../../models/course.model';
import { CreditLabelPipe } from '../../pipes/credit-label.pipe';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [NgFor, NgIf, CreditLabelPipe],
  templateUrl: './student-profile.component.html',
  styleUrl: './student-profile.component.css'
})
export class StudentProfileComponent {
  private enrollmentService = inject(EnrollmentService);

  student = {
    name: 'Alex Johnson',
    email: 'alex.johnson@student.edu',
    studentId: 'STU-2026-089',
    major: 'Computer Science',
    gpa: 3.8
  };

  get enrolledCourses(): Course[] {
    return this.enrollmentService.getEnrolledCourses();
  }

  unenroll(courseId: number): void {
    this.enrollmentService.unenroll(courseId);
  }
}
