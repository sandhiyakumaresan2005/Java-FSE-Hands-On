import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { CourseService } from '../../services/course.service';
import * as CourseActions from './course.actions';

const SAMPLE_COURSES = [
  { id: 1, name: 'Angular Fundamentals', code: 'ANG101', credits: 3, gradeStatus: 'passed' as const, isFull: false },
  { id: 2, name: 'TypeScript Essentials', code: 'TS201', credits: 4, gradeStatus: 'passed' as const, isFull: true },
  { id: 3, name: 'RxJS Reactive Programming', code: 'RX301', credits: 1, gradeStatus: 'pending' as const, isFull: false },
  { id: 4, name: 'Node.js Backend Development', code: 'ND401', credits: 0, gradeStatus: 'failed' as const, isFull: false },
  { id: 5, name: 'Full Stack Project', code: 'FS501', credits: null, gradeStatus: 'pending' as const, isFull: false }
];

@Injectable()
export class CourseEffects {
  private actions$ = inject(Actions);
  private courseService = inject(CourseService);

  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.loadCourses),
      switchMap(() =>
        this.courseService.getCourses().pipe(
          map(courses => CourseActions.loadCoursesSuccess({ courses: courses && courses.length > 0 ? courses : SAMPLE_COURSES })),
          catchError((err) =>
            of(CourseActions.loadCoursesSuccess({ courses: SAMPLE_COURSES }))
          )
        )
      )
    )
  );
}
