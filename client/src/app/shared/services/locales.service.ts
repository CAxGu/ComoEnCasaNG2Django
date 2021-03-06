import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Locales } from '../models';
import { ApiService } from './api.service';

@Injectable()
export class LocalesService {
  constructor (
    private apiService: ApiService
  ) {}

  getAll(): Observable<[string]> {
    return this.apiService.get('/loclist/')
           .map(data => data.results);
  }

  getOne(id:string): Observable<[string]>{
    return this.apiService.get('/locdetail/'+id+'/')
            .map(data => data);

  }  

  getbyCategory(categoria:string): Observable<[string]> {
    return this.apiService.get('/loccat/'+categoria+'/')
           .map(data => data.results);
  }
}