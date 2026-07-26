import { ComponentFixture, TestBed } from '@angular/core';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CourseListComponent } from './course-list.component';
import { selectAllCourses, selectCoursesLoading, selectCoursesError } from '../../store/course/course.selectors';
import { Course } from '../../models/course.model';

describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;
  let store: MockStore;

  const mockCourses: Course[] = [
    { id: 1, name: 'Angular Basics', code: 'ANG101', credits: 3, gradeStatus: 'passed' },
    { id: 2, name: 'RxJS Deep Dive', code: 'RX201', credits: 4, gradeStatus: 'pending' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseListComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideMockStore({
          selectors: [
            { selector: selectAllCourses, value: mockCourses },
            { selector: selectCoursesLoading, value: false },
            { selector: selectCoursesError, value: null }
          ]
        })
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render courses from MockStore correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('app-course-card').length).toBe(2);
    expect(compiled.textContent).toContain('Angular Basics');
    expect(compiled.textContent).toContain('RxJS Deep Dive');
  });

  it('should display loading indicator when MockStore loading state is true', () => {
    store.overrideSelector(selectCoursesLoading, true);
    store.refreshState();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.loading-state')?.textContent).toContain('Loading courses...');
  });
});
