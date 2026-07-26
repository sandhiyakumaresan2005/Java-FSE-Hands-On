import { Component, inject, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-summary-widget',
  standalone: true,
  imports: [],
  templateUrl: './course-summary-widget.component.html',
  styleUrl: './course-summary-widget.component.css'
})
export class CourseSummaryWidgetComponent implements OnInit {
  private courseService = inject(CourseService);
  totalCourses = 5;

  ngOnInit(): void {
    this.courseService.getCourseCount().subscribe(count => {
      this.totalCourses = count || 5;
    });
  }
}
