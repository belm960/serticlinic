import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AllpaymentReceptionComponent } from './allpaymentReception.component';
describe('AllpaymentReceptionComponent', () => {
  let component: AllpaymentReceptionComponent;
  let fixture: ComponentFixture<AllpaymentReceptionComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AllpaymentReceptionComponent]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AllpaymentReceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
