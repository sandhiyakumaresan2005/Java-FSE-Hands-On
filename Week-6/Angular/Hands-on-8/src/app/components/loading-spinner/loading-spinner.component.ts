import { Component, inject } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [AsyncPipe, NgIf],
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.css'
})
export class LoadingSpinnerComponent {
  loadingService = inject(LoadingService);
}
