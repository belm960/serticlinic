import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TastedPatientProfileComponent } from './tasted-patient-profile.component';

describe('TastedPatientProfileComponent', () => {
  let component: TastedPatientProfileComponent;
  let fixture: ComponentFixture<TastedPatientProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TastedPatientProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TastedPatientProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
