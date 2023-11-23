import { TestBed } from '@angular/core/testing';

import { HistoryModifiedStationService } from './history-modified-station.service';

describe('HistoryModifiedStationService', () => {
  let service: HistoryModifiedStationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoryModifiedStationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
