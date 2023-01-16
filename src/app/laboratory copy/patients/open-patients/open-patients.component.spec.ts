import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OpenpatientsComponent } from './open-patients.component';


describe('AllpatientsComponent', () => {
  let component: OpenpatientsComponent;
  let fixture: ComponentFixture<OpenpatientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenpatientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenpatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
