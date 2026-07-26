import { Component, inject } from '@angular/core';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-summary-widget',
  standalone: true,
  imports: [],
  templateUrl: './course-summary-widget.component.html',
  styleUrl: './course-summary-widget.component.css'
})
export class CourseSummaryWidgetComponent {
  private courseService = inject(CourseService);

  get totalCourses(): number {
    return this.courseService.getCourseCount();
  }
}
