import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckoutService, CartService } from '../../shared';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { dotenv } from '../../../environments/dotenv';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;

  message: string;

  constructor(
    private checkoutService: CheckoutService,
    private cartService: CartService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {

    if(this.cartService.items.length <= 0){
      this.router.navigateByUrl('/')
      this.toastr.warning('Porfavor seleccione algun producto','Cart') 
    }
    (<any>window).Stripe.setPublishableKey(dotenv.stripe);
  }

  getToken() {
    (<any>window).Stripe.card.createToken({
      number: this.cardNumber,
      exp_month: this.expiryMonth,
      exp_year: this.expiryYear,
      cvc: this.cvc
    }, (status: number, response: any) => {
      if (status === 200) {
        let data = {stripeToken: response.id, cart: this.cartService.items};
        this.checkoutService.checkout(data)
        .subscribe(
          message => {
            this.cartService.removeAll();
            this.router.navigateByUrl('/');
            this.toastr.success('El pago se ha efectuado correctamente','Success');
          },
          err => {
            console.log(err);
            this.toastr.error('Ha habido algun problema por favor intentelo mas tarde','Error');
          }
        );

      } else {
        console.log(response.error.message)
        this.message = response.error.message;
      }
    });
  }

}
