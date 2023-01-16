import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AllUserComponent } from './alluser.component';
describe('AllUserComponent', () => {
  let component: AllUserComponent;
  let fixture: ComponentFixture<AllUserComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AllUserComponent]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AllUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
