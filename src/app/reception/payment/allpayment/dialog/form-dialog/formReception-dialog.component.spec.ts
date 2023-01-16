import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormReceptionDialogComponent } from './formReception-dialog.component';
describe('FormReceptionDialogComponent', () => {
  let component: FormReceptionDialogComponent;
  let fixture: ComponentFixture<FormReceptionDialogComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormReceptionDialogComponent]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(FormReceptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
