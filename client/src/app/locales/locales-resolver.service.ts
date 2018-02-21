import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { Locales, LocalesService, UserService } from '../shared';

@Injectable()
export class LocalResolver implements Resolve<Locales> {
  constructor(
    private localesService: LocalesService,
    private router: Router,
    private userService: UserService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.localesService.getOne(route.params['id'])
           .catch((err) => this.router.navigateByUrl('/'));

  }
}
