import { TestBed } from '@angular/core/testing';

import { TechnicalStatusService } from './technical-status.service';

describe('TechnicalStatusService', () => {
  let service: TechnicalStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechnicalStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
