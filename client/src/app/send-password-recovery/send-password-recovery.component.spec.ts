import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendPasswordRecoveryComponent } from './send-password-recovery.component';

describe('SendPasswordRecoveryComponent', () => {
  let component: SendPasswordRecoveryComponent;
  let fixture: ComponentFixture<SendPasswordRecoveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendPasswordRecoveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendPasswordRecoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
