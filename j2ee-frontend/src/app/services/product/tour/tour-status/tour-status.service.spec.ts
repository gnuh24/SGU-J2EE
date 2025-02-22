import { TestBed } from '@angular/core/testing';

import { TourStatusService } from './tour-status.service';

describe('TourStatusService', () => {
  let service: TourStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TourStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
