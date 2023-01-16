import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllpatientsopdComponent } from './allpatientsopd.component';

describe('AllpatientsComponent', () => {
  let component: AllpatientsopdComponent;
  let fixture: ComponentFixture<AllpatientsopdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllpatientsopdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllpatientsopdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
