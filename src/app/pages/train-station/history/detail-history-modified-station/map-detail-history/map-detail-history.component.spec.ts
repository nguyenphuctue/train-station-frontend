import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapDetailHistoryComponent } from './map-detail-history.component';

describe('MapDetailHistoryComponent', () => {
  let component: MapDetailHistoryComponent;
  let fixture: ComponentFixture<MapDetailHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapDetailHistoryComponent]
    });
    fixture = TestBed.createComponent(MapDetailHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
