import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailImmunizationComponent } from './detail-immunization.component';

describe('DetailImmunizationComponent', () => {
  let component: DetailImmunizationComponent;
  let fixture: ComponentFixture<DetailImmunizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailImmunizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailImmunizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
