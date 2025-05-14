import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ticket-lookup',
  standalone: true,
  templateUrl: './ticket-lookup.component.html',
  styleUrls: ['./ticket-lookup.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class TicketLookupComponent {
  lookupForm: FormGroup;
  ticket: any; // Sẽ được thay thế bằng interface Ticket
  showResult: boolean = false;

  constructor(private fb: FormBuilder) {
    this.lookupForm = this.fb.group({
      ticketCode: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
  }

  onSubmit(): void {
    if (this.lookupForm.valid) {
      this.ticket = {
        code: 'ABC123',
        status: 'confirmed',
        fromCity: 'An Hữu',
        toCity: 'TP.Hồ Chí Minh',
        departureTime: '10:00 13/05/2025',
        seatNumber: '12',
        price: 110000,
        passengerName: 'Nguyễn Văn A',
        phone: '0909123456'
      };
      this.showResult = true;
    }
  }

  printTicket(): void {
    window.print();
  }
} 