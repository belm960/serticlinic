import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteReceptionDialogComponent } from './deleteReception.component';
describe('DeleteReceptionComponent', () => {
  let component: DeleteReceptionDialogComponent;
  let fixture: ComponentFixture<DeleteReceptionDialogComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteReceptionDialogComponent]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteReceptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
