import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMedicalHistoryComponent } from './edit-medical-history.component';

describe('EditMedicalHistoryComponent', () => {
  let component: EditMedicalHistoryComponent;
  let fixture: ComponentFixture<EditMedicalHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMedicalHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMedicalHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
