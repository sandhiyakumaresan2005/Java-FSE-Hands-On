import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EnrollmentState } from './enrollment.reducer';

export const selectEnrollmentState = createFeatureSelector<EnrollmentState>('enrollment');

export const selectEnrolledIds = createSelector(
  selectEnrollmentState,
  (state: EnrollmentState) => state ? state.enrolledIds : []
);

export const selectIsEnrolled = (courseId: number) => createSelector(
  selectEnrolledIds,
  (enrolledIds: number[]) => enrolledIds.includes(courseId)
);

export const selectEnrolledCount = createSelector(
  selectEnrolledIds,
  (enrolledIds: number[]) => enrolledIds.length
);
