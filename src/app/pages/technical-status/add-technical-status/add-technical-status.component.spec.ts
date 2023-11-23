import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTechnicalStatusComponent } from './add-technical-status.component';

describe('AddTechnicalStatusComponent', () => {
  let component: AddTechnicalStatusComponent;
  let fixture: ComponentFixture<AddTechnicalStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTechnicalStatusComponent]
    });
    fixture = TestBed.createComponent(AddTechnicalStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
