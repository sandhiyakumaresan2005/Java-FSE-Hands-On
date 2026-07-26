import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Course } from '../../models/course.model';
import { CourseCardComponent } from '../../components/course-card/course-card.component';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [NgFor, NgIf, CourseCardComponent],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit {
  isLoading = true;
  selectedCourseId: number | null = null;

  courses: Course[] = [
    { id: 1, name: 'Angular Fundamentals', code: 'ANG101', credits: 3, gradeStatus: 'passed', isEnrolled: true, isFull: false },
    { id: 2, name: 'TypeScript Essentials', code: 'TS201', credits: 4, gradeStatus: 'passed', isEnrolled: true, isFull: true },
    { id: 3, name: 'RxJS Reactive Programming', code: 'RX301', credits: 1, gradeStatus: 'pending', isEnrolled: false, isFull: false },
    { id: 4, name: 'Node.js Backend Development', code: 'ND401', credits: 0, gradeStatus: 'failed', isEnrolled: false, isFull: false },
    { id: 5, name: 'Full Stack Project', code: 'FS501', credits: null, gradeStatus: 'pending', isEnrolled: false, isFull: false }
  ];

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }

  trackByCourseId(index: number, course: Course): number {
    return course.id;
  }

  onEnroll(courseId: number): void {
    this.selectedCourseId = courseId;
  }
}
