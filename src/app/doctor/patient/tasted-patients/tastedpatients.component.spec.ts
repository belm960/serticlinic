import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TastedPatientsComponent } from './tastedpatients.component';

describe('TastedPatientsComponent', () => {
  let component: TastedPatientsComponent;
  let fixture: ComponentFixture<TastedPatientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TastedPatientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TastedPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
