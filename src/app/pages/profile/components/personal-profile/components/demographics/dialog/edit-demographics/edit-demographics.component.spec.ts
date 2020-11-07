import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDemographicsComponent } from './edit-demographics.component';

describe('EditDemographicsComponent', () => {
  let component: EditDemographicsComponent;
  let fixture: ComponentFixture<EditDemographicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDemographicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDemographicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
