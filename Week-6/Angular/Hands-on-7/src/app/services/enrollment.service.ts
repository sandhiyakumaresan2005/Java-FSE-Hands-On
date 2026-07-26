import { Injectable, inject } from '@angular/core';
import { CourseService } from './course.service';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private courseService = inject(CourseService);
  private enrolledCourseIds = new Set<number>([1, 2]); // Initial sample enrolled courses

  enroll(courseId: number): void {
    this.enrolledCourseIds.add(courseId);
  }

  unenroll(courseId: number): void {
    this.enrolledCourseIds.delete(courseId);
  }

  isEnrolled(courseId: number): boolean {
    return this.enrolledCourseIds.has(courseId);
  }

  getEnrolledCourses(): Course[] {
    return this.courseService.getCourses().filter(course => this.enrolledCourseIds.has(course.id));
  }

  getEnrolledCount(): number {
    return this.enrolledCourseIds.size;
  }
}
