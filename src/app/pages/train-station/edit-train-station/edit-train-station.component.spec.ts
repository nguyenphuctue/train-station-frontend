import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTrainStationComponent } from './edit-train-station.component';

describe('EditTrainStationComponent', () => {
  let component: EditTrainStationComponent;
  let fixture: ComponentFixture<EditTrainStationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTrainStationComponent]
    });
    fixture = TestBed.createComponent(EditTrainStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
