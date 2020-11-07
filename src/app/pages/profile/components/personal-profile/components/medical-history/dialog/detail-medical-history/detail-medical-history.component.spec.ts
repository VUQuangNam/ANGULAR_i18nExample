import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMedicalHistoryComponent } from './detail-medical-history.component';

describe('DetailMedicalHistoryComponent', () => {
  let component: DetailMedicalHistoryComponent;
  let fixture: ComponentFixture<DetailMedicalHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailMedicalHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailMedicalHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
