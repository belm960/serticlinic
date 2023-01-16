import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InprogresspatientsComponent } from './inprogress-patients.component';


describe('AllpatientsComponent', () => {
  let component: InprogresspatientsComponent;
  let fixture: ComponentFixture<InprogresspatientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InprogresspatientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InprogresspatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
