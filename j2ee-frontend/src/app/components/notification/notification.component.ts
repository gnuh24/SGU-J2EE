import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit {
  notifications: { type: string, message: string }[] = [];

  constructor() { }
  ngOnInit(): void {
  }

  showNotification(type: string, message: string) {
    this.notifications.push({ type, message });

    setTimeout(() => {
      this.notifications.shift();
    }, 3000);
  }

  removeNotification(index: number) {
    this.notifications.splice(index, 1);
  }

}
