import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelStatisticsComponent } from './hotel-statistics.component';

describe('HotelStatisticsComponent', () => {
  let component: HotelStatisticsComponent;
  let fixture: ComponentFixture<HotelStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelStatisticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
