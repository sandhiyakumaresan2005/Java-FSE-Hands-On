import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, tap, catchError, switchMap } from 'rxjs/operators';
import { CourseService } from './course.service';
import { Course } from '../models/course.model';

export interface EnrollmentRecord {
  id?: number;
  courseId: number;
  enrolledAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private http = inject(HttpClient);
  private courseService = inject(CourseService);
  private apiUrl = 'http://localhost:3000/enrollments';

  private enrolledIdsSubject = new BehaviorSubject<Set<number>>(new Set<number>([1, 2]));
  enrolledIds$ = this.enrolledIdsSubject.asObservable();

  enroll(courseId: number): Observable<any> {
    const record: EnrollmentRecord = { courseId, enrolledAt: new Date().toISOString() };
    return this.http.post<EnrollmentRecord>(this.apiUrl, record).pipe(
      tap(() => {
        const current = new Set(this.enrolledIdsSubject.value);
        current.add(courseId);
        this.enrolledIdsSubject.next(current);
      }),
      catchError(() => {
        // Fallback for local state when JSON server is offline
        const current = new Set(this.enrolledIdsSubject.value);
        current.add(courseId);
        this.enrolledIdsSubject.next(current);
        return of(record);
      })
    );
  }

  unenroll(courseId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${courseId}`).pipe(
      tap(() => {
        const current = new Set(this.enrolledIdsSubject.value);
        current.delete(courseId);
        this.enrolledIdsSubject.next(current);
      }),
      catchError(() => {
        // Fallback for local state when JSON server is offline
        const current = new Set(this.enrolledIdsSubject.value);
        current.delete(courseId);
        this.enrolledIdsSubject.next(current);
        return of(true);
      })
    );
  }

  isEnrolled(courseId: number): boolean {
    return this.enrolledIdsSubject.value.has(courseId);
  }

  getEnrolledCourses(): Observable<Course[]> {
    return this.courseService.getCourses().pipe(
      map(courses => courses.filter(course => this.enrolledIdsSubject.value.has(course.id))),
      catchError(() => of([]))
    );
  }

  getEnrolledCount(): number {
    return this.enrolledIdsSubject.value.size;
  }
}
