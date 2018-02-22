import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; 
import { Router } from '@angular/router';

import { User } from '../models';
import { UserService, CartService ,SearchService} from '../services';

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  isSubmitting = false;
  searchForm: FormGroup;
  defaultValue = 'localizacion'
  search='';

  constructor(
    private userService: UserService,
    private searchService: SearchService,
    private router: Router,
    private cartService: CartService,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      'options':[null],
      'search':[null, Validators.compose([Validators.required,Validators.maxLength(25),Validators.minLength(3)])]
    })
  }

  currentUser: User;
  /* public busqueda:any; */

  logout() {
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }


  submitSearch(){
  console.log(this.searchForm.value);
console.log(this.search);
  if (this.searchForm.value.search == null || this.searchForm.value.search == ''){
      this.router.navigateByUrl('/searthich/results')
  }else {
    this.searchService
    .getbySearch(this.searchForm.value)
    .subscribe(
      data => {
        this.router.navigateByUrl('/search/results');
      });
  }

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
