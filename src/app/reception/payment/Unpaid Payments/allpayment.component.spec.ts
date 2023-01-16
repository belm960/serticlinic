import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AllpaymentComponentUnpayed } from './allpayment.component';
describe('AllpaymentComponentUnpayed', () => {
  let component: AllpaymentComponentUnpayed;
  let fixture: ComponentFixture<AllpaymentComponentUnpayed>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AllpaymentComponentUnpayed]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AllpaymentComponentUnpayed);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
