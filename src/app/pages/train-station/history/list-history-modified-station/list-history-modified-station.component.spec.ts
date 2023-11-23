import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHistoryModifiedStationComponent } from './list-history-modified-station.component';

describe('ListHistoryModifiedStationComponent', () => {
  let component: ListHistoryModifiedStationComponent;
  let fixture: ComponentFixture<ListHistoryModifiedStationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListHistoryModifiedStationComponent]
    });
    fixture = TestBed.createComponent(ListHistoryModifiedStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
