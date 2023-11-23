import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapTrainStationComponent } from './map-train-station.component';

describe('MapTrainStationComponent', () => {
  let component: MapTrainStationComponent;
  let fixture: ComponentFixture<MapTrainStationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapTrainStationComponent]
    });
    fixture = TestBed.createComponent(MapTrainStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
