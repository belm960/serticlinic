import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormInvoiceDialogComponent } from './forminvoice-dialog.component';
describe('FormInvoiceDialogComponent', () => {
  let component: FormInvoiceDialogComponent;
  let fixture: ComponentFixture<FormInvoiceDialogComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormInvoiceDialogComponent]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(FormInvoiceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
