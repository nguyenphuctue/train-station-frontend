import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTechnicalStatusComponent } from './list-technical-status.component';

describe('ListTechnicalStatusComponent', () => {
  let component: ListTechnicalStatusComponent;
  let fixture: ComponentFixture<ListTechnicalStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListTechnicalStatusComponent]
    });
    fixture = TestBed.createComponent(ListTechnicalStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
