import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditListOfChargeComponent } from './edit-list-of-charge.component';

describe('EditListOfChargeComponent', () => {
  let component: EditListOfChargeComponent;
  let fixture: ComponentFixture<EditListOfChargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditListOfChargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditListOfChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
