import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenClientsComponent } from './open-clients.component';

describe('OpenClientsComponent', () => {
  let component: OpenClientsComponent;
  let fixture: ComponentFixture<OpenClientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenClientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
