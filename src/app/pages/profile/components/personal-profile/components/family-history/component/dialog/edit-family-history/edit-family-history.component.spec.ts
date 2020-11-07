import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFamilyHistoryComponent } from './edit-family-history.component';

describe('EditFamilyHistoryComponent', () => {
  let component: EditFamilyHistoryComponent;
  let fixture: ComponentFixture<EditFamilyHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFamilyHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFamilyHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
