import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

function forbiddenCourseIdValidator(control: AbstractControl): ValidationErrors | null {
  if (control.value && typeof control.value === 'string' && control.value.toUpperCase().startsWith('XX')) {
    return { forbiddenCourseId: true };
  }
  return null;
}

function forbiddenEmailAsyncValidator(control: AbstractControl): Observable<ValidationErrors | null> {
  if (!control.value) {
    return of(null);
  }
  return of(control.value).pipe(
    delay(800),
    map(value => {
      if (typeof value === 'string' && value.includes('test@')) {
        return { forbiddenEmail: true };
      }
      return null;
    })
  );
}

@Component({
  selector: 'app-reactive-enrollment-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './reactive-enrollment-form.component.html',
  styleUrl: './reactive-enrollment-form.component.css'
})
export class ReactiveEnrollmentFormComponent implements OnInit {
  private fb = inject(FormBuilder);

  enrollForm!: FormGroup;
  isSubmitted = false;
  successMessage = '';

  courses = [
    { id: 'ANG101', name: 'Angular Fundamentals (ANG101)' },
    { id: 'TS201', name: 'TypeScript Essentials (TS201)' },
    { id: 'RX301', name: 'RxJS Reactive Programming (RX301)' },
    { id: 'XX999', name: 'Forbidden Course (XX999)' }
  ];

  ngOnInit(): void {
    this.enrollForm = this.fb.group({
      studentName: ['', [Validators.required, Validators.minLength(3)]],
      studentEmail: ['', [Validators.required, Validators.email], [forbiddenEmailAsyncValidator]],
      courseId: ['', [Validators.required, forbiddenCourseIdValidator]],
      preferredSemester: ['Odd'],
      agreeToTerms: [false, [Validators.requiredTrue]],
      additionalCourses: this.fb.array([])
    });
  }

  get additionalCourses(): FormArray {
    return this.enrollForm.get('additionalCourses') as FormArray;
  }

  addAdditionalCourse(): void {
    this.additionalCourses.push(this.fb.control('', Validators.required));
  }

  removeAdditionalCourse(index: number): void {
    this.additionalCourses.removeAt(index);
  }

  onSubmit(): void {
    console.log('enrollForm.value:', this.enrollForm.value);
    console.log('enrollForm.getRawValue():', this.enrollForm.getRawValue());
    if (this.enrollForm.valid) {
      this.isSubmitted = true;
      this.successMessage = 'Reactive Enrollment submitted successfully!';
    }
  }

  onReset(): void {
    this.enrollForm.reset({
      preferredSemester: 'Odd',
      agreeToTerms: false
    });
    this.additionalCourses.clear();
    this.isSubmitted = false;
    this.successMessage = '';
  }
}
