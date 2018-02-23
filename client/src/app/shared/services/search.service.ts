import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';

import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';


import { Locales } from '../models';

declare var jQuery:any;
declare var $:any;

@Injectable()
export class SearchService {
  constructor (
    private apiService: ApiService,
    private router: Router,
  ) {}

  dataSearch:any;
  searchData:any;

  getbySearch(searchData): Observable<[string]> {

    return this.apiService.post('/search/', {search: searchData})
    .map(
      data => this.dataSearch=data, 
    );
  }

  getDataSearch(){
    let searchValue='';

    if(this.dataSearch !== undefined){
      searchValue=this.dataSearch.search.search;
      //If the value is not null, we format the text and then send it to controller
      searchValue=searchValue.replace('_', ' ');
      this.dataSearch.search.search=searchValue;
    }
    return this.dataSearch;
  }

  returnFormData(){
    return this.searchData;
  }

  submitSearch(searchForm){

    let url= window.location.href;
    let searchValue=searchForm.value.search;
    // We get the final param in our current url
    let finalurl=url.split("/").slice(-1)[0];
    
    if(searchValue !== null && searchValue !== undefined){
      //If the value is not null, we format the text before post it to server
      searchValue=searchValue.toLowerCase();
      searchValue=searchValue.replace(' ', '_');
      searchForm.value.search=searchValue;
    }

    this.searchData=searchForm;

    if (searchForm.value.search == null || searchForm.value.search == ''){
        switch(finalurl){
          case 'noresult':
            $('#nofoundText').css('display','inherit');
            $('#nofound').css('display','inherit');
            $('#foundedtext').css('display','none');
            $('#results_list').css('display','none');
          break;
          default:
            this.router.navigateByUrl('/search/noresult');
        }
    }else {
      this
      .getbySearch(searchForm.value)
      .subscribe(
        data => {
         switch(finalurl){
            case 'noresult':
              this.router.navigateByUrl('/search/resultsb2');
            break;
            case 'resultsb1':
              this.router.navigateByUrl('/search/resultsb2');
            break;
            case 'resultsb2':
              this.router.navigateByUrl('/search/resultsb1');
            break;
            default:
              this.router.navigateByUrl('/search/resultsb1');
          }
        });
    }

   }

}