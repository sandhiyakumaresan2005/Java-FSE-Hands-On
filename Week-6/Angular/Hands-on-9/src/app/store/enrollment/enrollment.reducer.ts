import { createReducer, on } from '@ngrx/store';
import * as EnrollmentActions from './enrollment.actions';

export interface EnrollmentState {
  enrolledIds: number[];
}

export const initialEnrollmentState: EnrollmentState = {
  enrolledIds: [1, 2]
};

export const enrollmentReducer = createReducer(
  initialEnrollmentState,
  on(EnrollmentActions.enrollInCourse, (state, { courseId }) => ({
    ...state,
    enrolledIds: state.enrolledIds.includes(courseId) ? state.enrolledIds : [...state.enrolledIds, courseId]
  })),
  on(EnrollmentActions.unenrollFromCourse, (state, { courseId }) => ({
    ...state,
    enrolledIds: state.enrolledIds.filter(id => id !== courseId)
  }))
);
