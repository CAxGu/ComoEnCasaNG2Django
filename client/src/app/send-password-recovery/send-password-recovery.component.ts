import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Errors, UserService } from '../shared';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-send-password-recovery',
  templateUrl: './send-password-recovery.component.html',
  styleUrls: ['./send-password-recovery.component.css']
})
export class SendPasswordRecoveryComponent implements OnInit {

  errors: Errors = new Errors();
  isSubmitting = false;
  passwordForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { 
    this.passwordForm = this.fb.group({
      'email':[null, Validators.compose([Validators.required, Validators.email])],
    });
  }

  ngOnInit() {
  }
  
  submitForm() {
    this.isSubmitting = true;
    this.errors = new Errors();

    const credentials = this.passwordForm.value;
    this.userService.sendPasswordRecovery(credentials)
    .subscribe(
      data => {
        this.toastr.success('El email se ha enviado correctamente','Success')
        this.router.navigateByUrl('/')
      },//this.router.navigateByUrl('/'),
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }

}
