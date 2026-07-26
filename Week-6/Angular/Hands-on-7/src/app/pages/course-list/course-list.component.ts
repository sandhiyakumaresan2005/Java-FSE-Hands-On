import { Component, inject, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';
import { CourseCardComponent } from '../../components/course-card/course-card.component';
import { CourseSummaryWidgetComponent } from '../../components/course-summary-widget/course-summary-widget.component';
import { NotificationComponent } from '../../components/notification/notification.component';

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
  selectedCourseId: number | null = null;
  allCourses: Course[] = [];
  filteredCourses: Course[] = [];
  searchQuery = '';

  ngOnInit(): void {
    setTimeout(() => {
      this.allCourses = this.courseService.getCourses();
      this.filteredCourses = [...this.allCourses];
      this.isLoading = false;

      this.route.queryParamMap.subscribe(params => {
        const search = params.get('search') || '';
        this.searchQuery = search;
        this.applyFilter(search);
      });
    }, 1500);
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
