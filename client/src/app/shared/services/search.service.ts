import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';


import { Locales } from '../models';

@Injectable()
export class SearchService {
  constructor (
    private apiService: ApiService
  ) {}

  dataSearch:any;

  getbySearch(searchData): Observable<[string]> {

    return this.apiService.post('/search/', {search: searchData})
    .map(
      data => this.dataSearch=data, 
    );
  }

  getDataSearch(){
    return this.dataSearch;
  }

/*   getAll(): Observable<[string]> {
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
  } */
}