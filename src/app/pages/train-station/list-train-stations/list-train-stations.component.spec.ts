import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTrainStationsComponent } from './list-train-stations.component';

describe('ListTrainStationsComponent', () => {
  let component: ListTrainStationsComponent;
  let fixture: ComponentFixture<ListTrainStationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListTrainStationsComponent]
    });
    fixture = TestBed.createComponent(ListTrainStationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
