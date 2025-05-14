import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment',
  standalone: true,
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup;
  tripId: string;
  selectedSeats: string[];
  totalAmount: number;
  trip: any; // Sẽ được thay thế bằng interface Trip

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.paymentForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      paymentMethod: ['banking', Validators.required],
      cardNumber: [''],
      cardHolder: [''],
      expiryDate: [''],
      cvv: ['']
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.tripId = params['tripId'];
      this.selectedSeats = params['seats']?.split(',') || [];
      this.totalAmount = +params['total'] || 0;
      this.loadTripDetails();
    });
  }

  loadTripDetails(): void {
    // TODO: Gọi API lấy thông tin chuyến xe
  }

  onSubmit(): void {
    if (this.paymentForm.valid) {
      // TODO: Gọi API xử lý thanh toán
      console.log('Payment form submitted:', this.paymentForm.value);
      this.router.navigate(['/payment-success']);
    }
  }

  get paymentMethod() {
    return this.paymentForm.get('paymentMethod');
  }
} 