import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotestPatientsComponent } from './totestpatients.component';

describe('TotestPatientsComponent', () => {
  let component: TotestPatientsComponent;
  let fixture: ComponentFixture<TotestPatientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotestPatientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotestPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
