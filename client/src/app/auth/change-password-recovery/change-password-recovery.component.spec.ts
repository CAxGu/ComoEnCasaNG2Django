import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordRecoveryComponent } from './change-password-recovery.component';

describe('ChangePasswordRecoveryComponent', () => {
  let component: ChangePasswordRecoveryComponent;
  let fixture: ComponentFixture<ChangePasswordRecoveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePasswordRecoveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordRecoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
