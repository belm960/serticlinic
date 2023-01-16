import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPatientopdComponent } from './edit-patient.component';

describe('EditPatientComponent', () => {
  let component: EditPatientopdComponent;
  let fixture: ComponentFixture<EditPatientopdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPatientopdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPatientopdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
