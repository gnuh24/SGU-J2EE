import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourStatisticsComponent } from './tour-statistics.component';

describe('TourStatisticsComponent', () => {
  let component: TourStatisticsComponent;
  let fixture: ComponentFixture<TourStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TourStatisticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TourStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
