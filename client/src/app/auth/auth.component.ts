import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Errors, UserService } from '../shared';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from "angular2-social-login";


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


  public user;
  sub: any;
  credentials:any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    public _auth: AuthService
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

      console.log("este es el authtype actual:")
      console.log(this.authType);

      // Set a title for the page accordingly
      switch (this.authType){
        case 'login':
          this.title='Sign In';
        break;
        case 'social':
          this.title= 'Sign In';
        break;
        default:
          this.title = 'Sign up';
      }

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


  //Social Login with AuthService angular2-social
  signIn(provider){
    this.authType='social';
    
    this.errors = new Errors();
    this.sub = this._auth.login(provider).subscribe(
      (data) => {
        this.user=data;
        //Regex to use the first part of email as username
        this.user.username = this.user.email.split(['@'][0])[0];
        this.user.password = '1234567890';
        this.credentials = this.user;
        
        this.userService
        .attemptAuth(this.authType, this.credentials)
        .subscribe(
          data => this.router.navigateByUrl('/').then(()=>{location.reload()}),
          err => {
            this.errors = err;
          });
      }
    )
  }
  
}
