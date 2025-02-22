import { TestBed } from '@angular/core/testing';

import { HotelbookingService } from './hotelbooking.service';

describe('HotelbookingService', () => {
  let service: HotelbookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotelbookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
