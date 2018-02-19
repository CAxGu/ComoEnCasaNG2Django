import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout/checkout.component';
import { SharedModule } from '../shared';

const stripeRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'stripe/checkout',
    component: CheckoutComponent
  }
]);

@NgModule({
  imports: [
    stripeRouting,
    SharedModule,
    CommonModule
  ],
  declarations: [CheckoutComponent]
})
export class StripeModule { }
