import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {
  private notifications: string[] = [
    'Welcome to the Student Course Portal!',
    'Fall semester course registrations are now open.'
  ];

  getNotifications(): string[] {
    return this.notifications;
  }

  addNotification(message: string): void {
    this.notifications.push(message);
  }
}
