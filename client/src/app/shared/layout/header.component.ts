import { Component, OnInit } from '@angular/core';


import { User } from '../models';
import { UserService, CartService } from '../services';

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  constructor(
    private userService: UserService,
    private cartService: CartService,
  ) {}

  currentUser: User;

  ngOnInit() {
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      }
    )
  }
  items(){
    return this.cartService.items.length > 0 ? this.cartService.items.length : ""
  }
}
