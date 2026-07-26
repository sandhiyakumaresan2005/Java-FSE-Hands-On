import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { CourseService } from './course.service';
import { Course } from '../models/course.model';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  const mockCourses: Course[] = [
    { id: 1, name: 'Angular', code: 'ANG101', credits: 3, gradeStatus: 'passed' },
    { id: 2, name: 'TypeScript', code: 'TS201', credits: 4, gradeStatus: 'pending' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CourseService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch courses from correct URL via getCourses()', () => {
    service.getCourses().subscribe(courses => {
      expect(courses.length).toBe(2);
      expect(courses).toEqual(mockCourses);
    });

    const req = httpMock.expectOne('http://localhost:3000/courses');
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
  });

  it('should handle HTTP error 500 properly', () => {
    service.getCourses().subscribe({
      next: () => fail('Should have failed with HTTP 500 error'),
      error: (error) => {
        expect(error.message).toContain('Server Error');
      }
    });

    const req = httpMock.expectOne('http://localhost:3000/courses');
    req.flush('Internal Server Error', { status: 500, statusText: 'Server Error' });
  });
});
