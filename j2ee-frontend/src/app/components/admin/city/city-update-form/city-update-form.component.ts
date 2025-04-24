import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-update-city-form',
  templateUrl: './update-city-form.component.html',
  styleUrls: ['./update-city-form.component.css']
})
export class UpdateCityFormComponent {
  @Input() city: any = {};  // Dữ liệu thành phố sẽ được truyền vào
  @Output() cityUpdated = new EventEmitter<any>();  // Sự kiện khi cập nhật thành công
  @Output() cancelUpdate = new EventEmitter<void>(); // Sự kiện khi hủy cập nhật

  constructor() {}

  onUpdate() {
    // Gửi dữ liệu thành phố sau khi cập nhật
    this.cityUpdated.emit(this.city);
  }

  onCancel() {
    // Thông báo hủy cập nhật
    this.cancelUpdate.emit();
  }
}
