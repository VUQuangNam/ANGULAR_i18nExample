import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditImmunizationComponent } from './edit-immunization.component';

describe('EditImmunizationComponent', () => {
  let component: EditImmunizationComponent;
  let fixture: ComponentFixture<EditImmunizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditImmunizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditImmunizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
