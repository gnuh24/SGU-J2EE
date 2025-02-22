import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourismStatisticsComponent } from './tourism-statistics.component';

describe('TourismStatisticsComponent', () => {
  let component: TourismStatisticsComponent;
  let fixture: ComponentFixture<TourismStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TourismStatisticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TourismStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
