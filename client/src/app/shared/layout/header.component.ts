import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; 
import { Router } from '@angular/router';

import { User } from '../models';
import { UserService, CartService ,SearchService} from '../services';

declare var jQuery:any;
declare var $:any;

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

    $('#searchinput').keypress((e)=>{
      if(e.which == 13) {
        $('#formSearch').submit(this.searchService.submitSearch(this.searchForm));
      }
    })

    $('#submitbutton').click(()=>{
      $('#formSearch').submit(this.searchService.submitSearch(this.searchForm));
    })

   
  }
  items(){
    return this.cartService.items.length > 0 ? this.cartService.items.length : ""
  }
  
}

