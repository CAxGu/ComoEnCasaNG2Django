import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { NoAuthGuard } from './no-auth-guard.service';
import { SharedModule } from '../shared';
import { SendPasswordRecoveryComponent } from '../send-password-recovery/send-password-recovery.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChangePasswordRecoveryComponent } from './change-password-recovery/change-password-recovery.component';
import { ActivationComponent } from './activation/activation.component';

const authRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'login',
    component: AuthComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'register',
    component: AuthComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'resetpassword',
    component: SendPasswordRecoveryComponent,
    canActivate: [NoAuthGuard]
  },{
    path: 'changepassword/:token/:email',
    component: ChangePasswordRecoveryComponent,
    canActivate: [NoAuthGuard]
  },{
    path: 'activation/:token/:email',
    component: ActivationComponent,
    canActivate: [NoAuthGuard]
  }
]);

@NgModule({
  imports: [
    authRouting,
    SharedModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  declarations: [
    AuthComponent,
    SendPasswordRecoveryComponent,
    ChangePasswordRecoveryComponent,
    ActivationComponent
  ],

  providers: [
    NoAuthGuard
  ]
})
export class AuthModule {}
