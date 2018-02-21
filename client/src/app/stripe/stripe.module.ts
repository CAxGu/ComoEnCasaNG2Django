import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart/cart.component';
import { SharedModule } from '../shared';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const stripeRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'stripe/checkout',
    component: CheckoutComponent
  },
  {
    path: 'cart/shopping',
    component: CartComponent
  }
]);

@NgModule({
  imports: [
    stripeRouting,
    SharedModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  declarations: [
    CheckoutComponent,
    CartComponent,
  ]
})
export class StripeModule { }
