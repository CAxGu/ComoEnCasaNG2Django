import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../models';
import { UserService, CartService } from '../services';

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private cartService: CartService,
  ) {}

  currentUser: User;

  logout() {
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }

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
