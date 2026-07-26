import { Component, inject, OnInit } from '@angular/core';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Course } from '../../models/course.model';
import { CourseCardComponent } from '../../components/course-card/course-card.component';
import { CourseSummaryWidgetComponent } from '../../components/course-summary-widget/course-summary-widget.component';
import { NotificationComponent } from '../../components/notification/notification.component';
import * as CourseActions from '../../store/course/course.actions';
import { selectAllCourses, selectCoursesLoading, selectCoursesError } from '../../store/course/course.selectors';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe, FormsModule, CourseCardComponent, CourseSummaryWidgetComponent, NotificationComponent],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit {
  private store = inject(Store);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  courses$: Observable<Course[]> = this.store.select(selectAllCourses);
  isLoading$: Observable<boolean> = this.store.select(selectCoursesLoading);
  error$: Observable<string | null> = this.store.select(selectCoursesError);

  selectedCourseId: number | null = null;
  searchQuery = '';
  filteredCourses$: Observable<Course[]>;

  constructor() {
    this.filteredCourses$ = this.courses$;
  }

  ngOnInit(): void {
    this.store.dispatch(CourseActions.loadCourses());

    this.route.queryParamMap.subscribe(params => {
      const search = params.get('search') || '';
      this.searchQuery = search;
      this.applyFilter(search);
    });
  }

  onSearchChange(query: string): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { search: query || null },
      queryParamsHandling: 'merge'
    });
  }

  applyFilter(query: string): void {
    if (!query) {
      this.filteredCourses$ = this.courses$;
    } else {
      const q = query.toLowerCase();
      this.filteredCourses$ = this.courses$.pipe(
        map(courses => courses.filter(c =>
          c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)
        ))
      );
    }
  }

  trackByCourseId(index: number, course: Course): number {
    return course.id;
  }

  onEnroll(courseId: number): void {
    this.selectedCourseId = courseId;
    this.router.navigate(['/courses', courseId]);
  }
}
