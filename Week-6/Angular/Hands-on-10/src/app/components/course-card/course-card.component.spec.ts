import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';
import { provideMockStore } from '@ngrx/store/testing';
import { CourseCardComponent } from './course-card.component';
import { Course } from '../../models/course.model';

describe('CourseCardComponent', () => {
  let component: CourseCardComponent;
  let fixture: ComponentFixture<CourseCardComponent>;

  const mockCourse: Course = {
    id: 101,
    name: 'Angular Testing Masterclass',
    code: 'ANG-TEST-101',
    credits: 4,
    gradeStatus: 'passed',
    isFull: false
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCardComponent],
      providers: [provideMockStore()]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCardComponent);
    component = fixture.componentInstance;
    component.course = mockCourse;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render @Input course properties correctly in DOM', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h3')?.textContent).toContain('Angular Testing Masterclass');
    expect(compiled.textContent).toContain('ANG-TEST-101');
    expect(compiled.textContent).toContain('4 Credits');
    expect(compiled.querySelector('.badge--passed')?.textContent).toContain('Passed');
  });

  it('should emit course id on enrollRequested output', () => {
    spyOn(component.enrollRequested, 'emit');
    component.currentlyEnrolled = false;
    component.onToggleEnroll();
    expect(component.enrollRequested.emit).toHaveBeenCalledWith(101);
  });

  it('should log previous and current values in ngOnChanges', () => {
    spyOn(console, 'log');
    const prevCourse: Course = { ...mockCourse, name: 'Old Course Name' };
    const currCourse: Course = { ...mockCourse, name: 'New Course Name' };

    component.ngOnChanges({
      course: new SimpleChange(prevCourse, currCourse, false)
    });

    expect(console.log).toHaveBeenCalledWith('Previous:', prevCourse);
    expect(console.log).toHaveBeenCalledWith('Current:', currCourse);
  });
});
