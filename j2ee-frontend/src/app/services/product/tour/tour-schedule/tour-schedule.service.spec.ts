import { TestBed } from '@angular/core/testing';

import { TourScheduleService } from './tour-schedule.service';

describe('TourScheduleService', () => {
  let service: TourScheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TourScheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
