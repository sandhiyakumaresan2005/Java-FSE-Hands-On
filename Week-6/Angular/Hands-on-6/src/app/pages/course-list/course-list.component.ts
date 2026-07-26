import { Component, inject, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';
import { CourseCardComponent } from '../../components/course-card/course-card.component';
import { CourseSummaryWidgetComponent } from '../../components/course-summary-widget/course-summary-widget.component';
import { NotificationComponent } from '../../components/notification/notification.component';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [NgFor, NgIf, CourseCardComponent, CourseSummaryWidgetComponent, NotificationComponent],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit {
  private courseService = inject(CourseService);

  isLoading = true;
  selectedCourseId: number | null = null;
  courses: Course[] = [];

  ngOnInit(): void {
    setTimeout(() => {
      this.courses = this.courseService.getCourses();
      this.isLoading = false;
    }, 1500);
  }

  trackByCourseId(index: number, course: Course): number {
    return course.id;
  }

  onEnroll(courseId: number): void {
    this.selectedCourseId = courseId;
  }
}
