import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss']
})
export class TripListComponent {
  @Input() trips: any[] = [];
  @Output() viewDetail = new EventEmitter<string>();

  onViewDetail(id: string) {
    this.viewDetail.emit(id);
  }
} 