import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { selectAllCourses } from '../../store/course/course.selectors';

@Component({
  selector: 'app-course-summary-widget',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './course-summary-widget.component.html',
  styleUrl: './course-summary-widget.component.css'
})
export class CourseSummaryWidgetComponent {
  private store = inject(Store);
  totalCourses$: Observable<number> = this.store.select(selectAllCourses).pipe(
    map(courses => courses.length)
  );
}
