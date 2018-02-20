import { Component, OnInit } from '@angular/core';
import { UserService, Errors } from '../../shared';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  //styleUrls: ['./activation.component.css']
})
export class ActivationComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    console.log(this.route.snapshot.params['token'])
    console.log(this.route.snapshot.params['email'])
    const credentials = {token: this.route.snapshot.params['token'], email: this.route.snapshot.params['email']};
    this.userService
    .changeActivation(credentials)
    .subscribe(
      data => {
        this.router.navigateByUrl('/')
        this.toastr.success('Tu cuenta ha sido activada, logeate para comprobarlo','Activada')
      } ,
      err => {
        this.router.navigateByUrl('/')
        this.toastr.error(err,'Ops')
      }
    );
  }
  

}
