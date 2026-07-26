import { Component } from '@angular/core';
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
export class CourseListComponent {
  selectedCourseId: number | null = null;

  courses: Course[] = [
    { id: 1, name: 'Angular Fundamentals', code: 'ANG101', credits: 3 },
    { id: 2, name: 'TypeScript Essentials', code: 'TS201', credits: 4 },
    { id: 3, name: 'RxJS Reactive Programming', code: 'RX301', credits: 3 },
    { id: 4, name: 'Node.js Backend Development', code: 'ND401', credits: 4 },
    { id: 5, name: 'Full Stack Project', code: 'FS501', credits: 5 }
  ];

  onEnroll(courseId: number): void {
    this.selectedCourseId = courseId;
  }
}
