import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTechnicalStatusComponent } from './edit-technical-status.component';

describe('EditTechnicalStatusComponent', () => {
  let component: EditTechnicalStatusComponent;
  let fixture: ComponentFixture<EditTechnicalStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTechnicalStatusComponent]
    });
    fixture = TestBed.createComponent(EditTechnicalStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
