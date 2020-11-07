import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalBillComponent } from './medical-bill.component';

describe('MedicalBillComponent', () => {
  let component: MedicalBillComponent;
  let fixture: ComponentFixture<MedicalBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
