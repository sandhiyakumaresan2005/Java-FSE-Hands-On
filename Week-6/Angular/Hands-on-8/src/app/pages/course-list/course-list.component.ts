import { Component, inject, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';
import { CourseCardComponent } from '../../components/course-card/course-card.component';
import { CourseSummaryWidgetComponent } from '../../components/course-summary-widget/course-summary-widget.component';
import { NotificationComponent } from '../../components/notification/notification.component';

const SAMPLE_COURSES: Course[] = [
  { id: 1, name: 'Angular Fundamentals', code: 'ANG101', credits: 3, gradeStatus: 'passed', isFull: false },
  { id: 2, name: 'TypeScript Essentials', code: 'TS201', credits: 4, gradeStatus: 'passed', isFull: true },
  { id: 3, name: 'RxJS Reactive Programming', code: 'RX301', credits: 1, gradeStatus: 'pending', isFull: false },
  { id: 4, name: 'Node.js Backend Development', code: 'ND401', credits: 0, gradeStatus: 'failed', isFull: false },
  { id: 5, name: 'Full Stack Project', code: 'FS501', credits: null, gradeStatus: 'pending', isFull: false }
];

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, CourseCardComponent, CourseSummaryWidgetComponent, NotificationComponent],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit {
  private courseService = inject(CourseService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  isLoading = true;
  errorMessage = '';
  selectedCourseId: number | null = null;
  allCourses: Course[] = [];
  filteredCourses: Course[] = [];
  searchQuery = '';

  ngOnInit(): void {
    this.fetchCourses();
  }

  fetchCourses(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.courseService.getCourses().subscribe({
      next: (courses) => {
        this.allCourses = courses && courses.length > 0 ? courses : SAMPLE_COURSES;
        this.filteredCourses = [...this.allCourses];
        this.isLoading = false;
        this.listenQueryParamChanges();
      },
      error: (err) => {
        console.error('Failed to load courses from API:', err);
        this.errorMessage = 'Could not load courses from backend server. Showing cached courses.';
        this.allCourses = SAMPLE_COURSES;
        this.filteredCourses = [...this.allCourses];
        this.isLoading = false;
        this.listenQueryParamChanges();
      },
      complete: () => {
        console.log('Course fetching completed.');
      }
    });
  }

  private listenQueryParamChanges(): void {
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
      this.filteredCourses = [...this.allCourses];
    } else {
      const q = query.toLowerCase();
      this.filteredCourses = this.allCourses.filter(c =>
        c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)
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
