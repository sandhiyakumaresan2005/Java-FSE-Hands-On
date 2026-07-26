import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectAllCourses } from '../../store/course/course.selectors';
import { selectEnrolledCount } from '../../store/enrollment/enrollment.selectors';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  private store = inject(Store);

  portalName = 'Student Course Portal';
  isPortalActive = true;
  message = '';
  searchTerm = '';
  coursesAvailableCount = 5;
  enrolledCount = 2;

  ngOnInit(): void {
    console.log('HomeComponent initialized');
    this.store.select(selectAllCourses).subscribe(courses => {
      this.coursesAvailableCount = courses.length || 5;
    });
    this.store.select(selectEnrolledCount).subscribe(count => {
      this.enrolledCount = count;
    });
  }

  ngOnDestroy(): void {
    console.log('HomeComponent destroyed');
  }

  onEnrollClick(): void {
    this.message = 'Enrollment opened!';
  }
}
