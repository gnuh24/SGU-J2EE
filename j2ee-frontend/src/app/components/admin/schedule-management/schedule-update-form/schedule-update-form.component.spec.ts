import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleUpdateFormComponent } from './schedule-update-form.component';

describe('ScheduleUpdateFormComponent', () => {
  let component: ScheduleUpdateFormComponent;
  let fixture: ComponentFixture<ScheduleUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleUpdateFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
