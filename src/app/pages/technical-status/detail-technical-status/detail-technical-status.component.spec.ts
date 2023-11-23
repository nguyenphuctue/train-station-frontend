import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTechnicalStatusComponent } from './detail-technical-status.component';

describe('DetailTechnicalStatusComponent', () => {
  let component: DetailTechnicalStatusComponent;
  let fixture: ComponentFixture<DetailTechnicalStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailTechnicalStatusComponent]
    });
    fixture = TestBed.createComponent(DetailTechnicalStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
