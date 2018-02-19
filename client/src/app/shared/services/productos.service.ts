import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { Producto } from '../models';


@Injectable()
export class ProductosService {
  constructor (
    private apiService: ApiService
  ) {}

  getAll(id_local): Observable<Producto[]> {
    return this.apiService.get(`/locales/${id_local}/productos`)
           .map(data => data.productos);
  }

  destroy(productoId, id_local) {
    return this.apiService
           .delete(`/articles/${id_local}/comments/${productoId}`);
  }

}