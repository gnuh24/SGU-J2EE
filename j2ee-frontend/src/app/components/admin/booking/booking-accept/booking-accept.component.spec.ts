import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingAcceptComponent } from './booking-accept.component';

describe('BookingAcceptComponent', () => {
  let component: BookingAcceptComponent;
  let fixture: ComponentFixture<BookingAcceptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingAcceptComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingAcceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
