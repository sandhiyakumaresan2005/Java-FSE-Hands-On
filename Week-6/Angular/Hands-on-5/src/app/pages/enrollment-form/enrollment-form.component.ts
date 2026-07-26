import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-enrollment-form',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './enrollment-form.component.html',
  styleUrl: './enrollment-form.component.css'
})
export class EnrollmentFormComponent {
  isSubmitted = false;
  successMessage = '';

  formData = {
    studentName: '',
    studentEmail: '',
    courseId: '',
    preferredSemester: 'Odd',
    agreeToTerms: false
  };

  courses = [
    { id: 1, name: 'Angular Fundamentals (ANG101)' },
    { id: 2, name: 'TypeScript Essentials (TS201)' },
    { id: 3, name: 'RxJS Reactive Programming (RX301)' },
    { id: 4, name: 'Node.js Backend Development (ND401)' },
    { id: 5, name: 'Full Stack Project (FS501)' }
  ];

  onSubmit(form: NgForm): void {
    console.log('Form Value:', form.value);
    console.log('Form Valid:', form.valid);
    if (form.valid) {
      this.isSubmitted = true;
      this.successMessage = 'Enrollment submitted successfully!';
    }
  }

  onReset(form: NgForm): void {
    form.resetForm({
      preferredSemester: 'Odd',
      agreeToTerms: false
    });
    this.isSubmitted = false;
    this.successMessage = '';
  }
}
