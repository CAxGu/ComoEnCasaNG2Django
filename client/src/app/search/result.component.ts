import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; 
import { SearchService } from '../shared';

/* import { Search } from 'protractor/built/driverProviders'; */

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-results',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private searchService: SearchService
  ) {}

  locales: Array<string> = [];
  searchObj:any;
  nresults:any;
  busqueda:any;
  searchForm: FormGroup;

  ngOnInit() {   

    this.searchObj=this.searchService.getDataSearch();
    if (this.searchObj !== undefined){
      $('#nofoundText').css('display','none');
      $('#nofound').css('display','none');
      $('#foundedtext').css('display','inherit');
      $('#results_list').css('display','inherit');
      this.locales=this.searchObj.local;
      this.busqueda=this.searchObj.search.search;
      this.nresults=this.locales.length;

      if(this.nresults==0){
        $('#nofound').css('display','inherit');
        this.router.navigateByUrl('search/noresult');
      }

    }else{
      $('#nofoundText').css('display','inherit');
      $('#nofound').css('display','inherit');
      $('#foundedtext').css('display','none');
      $('#results_list').css('display','none');
    }

  } 
}
