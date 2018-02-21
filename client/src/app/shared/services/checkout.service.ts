import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { Producto } from '../models';


@Injectable()
export class CheckoutService {
  constructor (
    private apiService: ApiService
  ) {}

  checkout(data): Observable<JSON> {
    return this.apiService.post('/checkout',{data:data})
  }
}