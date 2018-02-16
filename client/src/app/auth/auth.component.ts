import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Errors, UserService } from '../shared';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'auth-page',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
  authType: String = '';
  title: String = '';
  errors: Errors = {errors: {}};
  isSubmitting = false;
  authForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({

      'email':[null, Validators.compose([Validators.required, Validators.email])],
      'password': [null,  Validators.compose([Validators.required, Validators.maxLength(128),Validators.minLength(8)])]
    });
  }

  ngOnInit() {
    this.route.url.subscribe(data => {
      // Get the last piece of the URL (it's either 'login' or 'register')
      this.authType = data[data.length - 1].path;
      // Set a title for the page accordingly
      this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';
      // add form control for username if this is the register page
      if (this.authType === 'register') {
        this.authForm.addControl('username', new FormControl());
        this.authForm.get('username').setValidators([Validators.required, Validators.minLength(3), Validators.maxLength(15)]);
      }
    });
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = {errors: {}};

    const credentials = this.authForm.value;
    this.userService
    .attemptAuth(this.authType, credentials)
    .subscribe(
      data => {
        if(this.authType !== 'login'){
          this.userService.purgeAuth();//logout()
          this.router.navigateByUrl('/')
          this.toastr.success('Porfavor revise el email','Email Validation')
        }else{
          this.router.navigateByUrl('/')
        }

      } ,
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }
}
