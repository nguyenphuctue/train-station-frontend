import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrainStationComponent } from './add-train-station.component';

describe('AddTrainStationComponent', () => {
  let component: AddTrainStationComponent;
  let fixture: ComponentFixture<AddTrainStationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTrainStationComponent]
    });
    fixture = TestBed.createComponent(AddTrainStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
