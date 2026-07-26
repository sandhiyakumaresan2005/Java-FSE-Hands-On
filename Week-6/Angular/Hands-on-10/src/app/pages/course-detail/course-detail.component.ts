import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';
import { EnrollmentService } from '../../services/enrollment.service';
import { CreditLabelPipe } from '../../pipes/credit-label.pipe';

const SAMPLE_COURSES: Course[] = [
  { id: 1, name: 'Angular Fundamentals', code: 'ANG101', credits: 3, gradeStatus: 'passed', isFull: false },
  { id: 2, name: 'TypeScript Essentials', code: 'TS201', credits: 4, gradeStatus: 'passed', isFull: true },
  { id: 3, name: 'RxJS Reactive Programming', code: 'RX301', credits: 1, gradeStatus: 'pending', isFull: false },
  { id: 4, name: 'Node.js Backend Development', code: 'ND401', credits: 0, gradeStatus: 'failed', isFull: false },
  { id: 5, name: 'Full Stack Project', code: 'FS501', credits: null, gradeStatus: 'pending', isFull: false }
];

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
        const id = Number(idParam);
        this.courseService.getCourseById(id).subscribe({
          next: (c) => this.course = c,
          error: () => {
            this.course = SAMPLE_COURSES.find(c => c.id === id);
          }
        });
      }
    });
  }

  get isEnrolled(): boolean {
    return this.course ? this.enrollmentService.isEnrolled(this.course.id) : false;
  }

  onToggleEnroll(): void {
    if (this.course) {
      if (this.isEnrolled) {
        this.enrollmentService.unenroll(this.course.id).subscribe();
      } else {
        this.enrollmentService.enroll(this.course.id).subscribe();
      }
    }
  }

  goBack(): void {
    this.router.navigate(['/courses']);
  }
}
