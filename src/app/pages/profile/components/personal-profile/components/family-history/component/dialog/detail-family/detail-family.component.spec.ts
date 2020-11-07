import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailFamilyComponent } from './detail-family.component';

describe('DetailFamilyComponent', () => {
  let component: DetailFamilyComponent;
  let fixture: ComponentFixture<DetailFamilyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailFamilyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
