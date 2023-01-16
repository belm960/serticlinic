import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteDialogComponentUnpayed } from './deleteUnpayed.component';
describe('DeleteComponent', () => {
  let component: DeleteDialogComponentUnpayed;
  let fixture: ComponentFixture<DeleteDialogComponentUnpayed>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteDialogComponentUnpayed]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDialogComponentUnpayed);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
