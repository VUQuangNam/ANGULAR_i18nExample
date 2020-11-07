import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewSymptomsComponent } from './create-new-symptoms.component';

describe('CreateNewSymptomsComponent', () => {
  let component: CreateNewSymptomsComponent;
  let fixture: ComponentFixture<CreateNewSymptomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewSymptomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewSymptomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
