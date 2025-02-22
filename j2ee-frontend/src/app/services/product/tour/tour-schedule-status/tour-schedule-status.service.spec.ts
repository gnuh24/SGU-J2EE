import { TestBed } from '@angular/core/testing';

import { TourScheduleStatusService } from './tour-schedule-status.service';

describe('TourScheduleStatusService', () => {
  let service: TourScheduleStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TourScheduleStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
