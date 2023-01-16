import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormDialogComponentUnpayed } from './form-dialog.componentUnpayed';
describe('FormDialogComponent', () => {
  let component: FormDialogComponentUnpayed;
  let fixture: ComponentFixture<FormDialogComponentUnpayed>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormDialogComponentUnpayed]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(FormDialogComponentUnpayed);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
