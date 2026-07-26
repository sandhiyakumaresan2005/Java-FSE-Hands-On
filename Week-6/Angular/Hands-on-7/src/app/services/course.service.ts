import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courses: Course[] = [
    { id: 1, name: 'Angular Fundamentals', code: 'ANG101', credits: 3, gradeStatus: 'passed', isFull: false },
    { id: 2, name: 'TypeScript Essentials', code: 'TS201', credits: 4, gradeStatus: 'passed', isFull: true },
    { id: 3, name: 'RxJS Reactive Programming', code: 'RX301', credits: 1, gradeStatus: 'pending', isFull: false },
    { id: 4, name: 'Node.js Backend Development', code: 'ND401', credits: 0, gradeStatus: 'failed', isFull: false },
    { id: 5, name: 'Full Stack Project', code: 'FS501', credits: null, gradeStatus: 'pending', isFull: false }
  ];

  getCourses(): Course[] {
    return this.courses;
  }

  getCourseById(id: number): Course | undefined {
    return this.courses.find(course => course.id === id);
  }

  addCourse(course: Course): void {
    this.courses.push(course);
  }

  getCourseCount(): number {
    return this.courses.length;
  }
}
