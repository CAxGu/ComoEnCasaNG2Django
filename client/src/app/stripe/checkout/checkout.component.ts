import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckoutService } from '../../shared';

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
  ) { }

  ngOnInit() {
  }

  getToken() {
    this.message = 'Loading...';

    (<any>window).Stripe.card.createToken({
      number: this.cardNumber,
      exp_month: this.expiryMonth,
      exp_year: this.expiryYear,
      cvc: this.cvc
    }, (status: number, response: any) => {
      if (status === 200) {
        this.message = `Success! Card token ${response.card.id}.`;
        console.log(`Success! Card token ${response.card.id}.`)
        console.log(`Success! Card token ${response.id}.`)
        let data = {stripeToken: response.id};
        this.checkoutService.checkout(data)
        .subscribe(
          message => {
            console.log('----okey')
/*             this.router.navigateByUrl('/')
            this.toastr.success('El email se ha enviado correctamente','Success') */
          },
          err => {
            console.log(err)
/*             this.errors = err;
            this.toastr.error('Ha habido algun problema por favor intentelo mas tarde','Error')
            this.isSubmitting = false; */
          }
        );

      } else {
        this.message = response.error.message;
      }
    });
  }

}
