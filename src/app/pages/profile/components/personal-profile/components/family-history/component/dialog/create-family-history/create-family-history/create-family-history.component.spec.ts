import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFamilyHistoryComponent } from './create-family-history.component';

describe('CreateFamilyHistoryComponent', () => {
  let component: CreateFamilyHistoryComponent;
  let fixture: ComponentFixture<CreateFamilyHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFamilyHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFamilyHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
