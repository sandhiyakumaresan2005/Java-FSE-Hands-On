import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../services/course.service';
import { EnrollmentService } from '../../services/enrollment.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  private courseService = inject(CourseService);
  private enrollmentService = inject(EnrollmentService);

  portalName = 'Student Course Portal';
  isPortalActive = true;
  message = '';
  searchTerm = '';
  coursesAvailableCount = 5;

  get enrolledCount(): number {
    return this.enrollmentService.getEnrolledCount();
  }

  ngOnInit(): void {
    console.log('HomeComponent initialized');
    this.courseService.getCourseCount().subscribe(count => {
      this.coursesAvailableCount = count || 5;
    });
  }

  ngOnDestroy(): void {
    console.log('HomeComponent destroyed');
  }

  onEnrollClick(): void {
    this.message = 'Enrollment opened!';
  }
}
