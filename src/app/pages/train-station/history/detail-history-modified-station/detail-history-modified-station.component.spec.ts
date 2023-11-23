import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailHistoryModifiedStationComponent } from './detail-history-modified-station.component';

describe('DetailHistoryModifiedStationComponent', () => {
  let component: DetailHistoryModifiedStationComponent;
  let fixture: ComponentFixture<DetailHistoryModifiedStationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailHistoryModifiedStationComponent]
    });
    fixture = TestBed.createComponent(DetailHistoryModifiedStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
