import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateImmunizationComponent } from './create-immunization.component';

describe('CreateImmunizationComponent', () => {
  let component: CreateImmunizationComponent;
  let fixture: ComponentFixture<CreateImmunizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateImmunizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateImmunizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
