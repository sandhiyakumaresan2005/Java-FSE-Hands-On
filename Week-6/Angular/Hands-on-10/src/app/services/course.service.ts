import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map, tap, catchError, retry } from 'rxjs/operators';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/courses';

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl).pipe(
      retry(2),
      tap(courses => console.log('Fetched courses:', courses)),
      catchError(this.handleError)
    );
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`).pipe(
      retry(2),
      tap(course => console.log(`Fetched course ${id}:`, course)),
      catchError(this.handleError)
    );
  }

  createCourse(course: Partial<Course>): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course).pipe(
      tap(newCourse => console.log('Created course:', newCourse)),
      catchError(this.handleError)
    );
  }

  updateCourse(id: number, course: Partial<Course>): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${id}`, course).pipe(
      tap(updatedCourse => console.log('Updated course:', updatedCourse)),
      catchError(this.handleError)
    );
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => console.log(`Deleted course ${id}`)),
      catchError(this.handleError)
    );
  }

  getCourseCount(): Observable<number> {
    return this.getCourses().pipe(
      map(courses => courses.length),
      catchError(() => of(0))
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred while fetching course data.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      errorMessage = `Server Error (Code ${error.status}): ${error.message}`;
    }
    console.error('CourseService Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
