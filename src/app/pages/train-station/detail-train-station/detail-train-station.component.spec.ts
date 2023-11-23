import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTrainStationComponent } from './detail-train-station.component';

describe('DetailTrainStationComponent', () => {
  let component: DetailTrainStationComponent;
  let fixture: ComponentFixture<DetailTrainStationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailTrainStationComponent]
    });
    fixture = TestBed.createComponent(DetailTrainStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
