import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasonForBookingComponent } from './reason-for-booking.component';

describe('ReasonForBookingComponent', () => {
  let component: ReasonForBookingComponent;
  let fixture: ComponentFixture<ReasonForBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReasonForBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReasonForBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
