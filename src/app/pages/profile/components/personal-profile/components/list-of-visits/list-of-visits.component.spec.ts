import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfVisitsComponent } from './list-of-visits.component';

describe('ListOfVisitsComponent', () => {
  let component: ListOfVisitsComponent;
  let fixture: ComponentFixture<ListOfVisitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfVisitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfVisitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
