import { Component, OnInit } from '@angular/core';
import { UserService, Errors } from '../../shared';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-change-password-recovery',
  templateUrl: './change-password-recovery.component.html',
  styleUrls: ['./change-password-recovery.component.css']
})
export class ChangePasswordRecoveryComponent implements OnInit {

  errors: Errors = new Errors()
  isSubmitting = false;
  changeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.changeForm = this.fb.group({
      'password': [null,  Validators.compose([Validators.required, Validators.maxLength(128),Validators.minLength(8)])]
    })
   }

  ngOnInit() {
    console.log(this.route.snapshot.params['token'])
    console.log(this.route.snapshot.params['email'])
  }

  submitForm() {
    this.errors = new Errors();
    const credentials = {token: this.route.snapshot.params['token'], password: this.changeForm.value.password, email: this.route.snapshot.params['email']};
    this.userService
    .changePasswordRecover(credentials)
    .subscribe(
      data => {
        this.router.navigateByUrl('/')
        this.toastr.success('Password cambiada','Change')
      } ,
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }
}