import { Component, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [NgFor, NgIf],
  providers: [NotificationService],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
  private notificationService = inject(NotificationService);

  get notifications(): string[] {
    return this.notificationService.getNotifications();
  }
}
