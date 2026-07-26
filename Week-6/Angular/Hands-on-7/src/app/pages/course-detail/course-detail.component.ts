import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';
import { EnrollmentService } from '../../services/enrollment.service';
import { CreditLabelPipe } from '../../pipes/credit-label.pipe';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [NgIf, CreditLabelPipe],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css'
})
export class CourseDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private courseService = inject(CourseService);
  private enrollmentService = inject(EnrollmentService);

  course: Course | undefined;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.course = this.courseService.getCourseById(Number(idParam));
      }
    });
  }

  get isEnrolled(): boolean {
    return this.course ? this.enrollmentService.isEnrolled(this.course.id) : false;
  }

  onToggleEnroll(): void {
    if (this.course) {
      if (this.isEnrolled) {
        this.enrollmentService.unenroll(this.course.id);
      } else {
        this.enrollmentService.enroll(this.course.id);
      }
    }
  }

  goBack(): void {
    this.router.navigate(['/courses']);
  }
}
