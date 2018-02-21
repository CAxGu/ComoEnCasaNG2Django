import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Producto, CartService } from '../../shared'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'] 
})
export class CartComponent implements OnInit {

  constructor(private cartService: CartService) { }

  ngOnInit() {
    //sessionStorage.removeItem("cart")
    let cartSession = localStorage.getItem("cart");
    //carrinho não está vazio
    if(cartSession != null){
      this.cartService.items = JSON.parse(cartSession);
    }
  }

  items(): Producto[] {
    return this.cartService.items;
  }
  removeItem(Product){
    let c = this.cartService
    return c.removeItem(Product)
  }

  total() :number{
    return this.cartService.total()
  }
}
