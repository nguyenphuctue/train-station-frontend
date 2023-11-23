import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRequestRepairComponent } from './list-request-repair.component';

describe('ListRequestRepairComponent', () => {
  let component: ListRequestRepairComponent;
  let fixture: ComponentFixture<ListRequestRepairComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListRequestRepairComponent]
    });
    fixture = TestBed.createComponent(ListRequestRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
