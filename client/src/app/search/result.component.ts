import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../shared';
/* import { Search } from 'protractor/built/driverProviders'; */

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

  ngOnInit() {   

    this.searchObj=this.searchService.getDataSearch();
    if (this.searchObj !== undefined){
      document.getElementById('nofoundText').style.display = "none";
      document.getElementById('nofound').style.display = "none";
      document.getElementById('foundedtext').style.display = "inherit";
      this.locales=this.searchObj.local;
      this.busqueda=this.searchObj.search.search;
      this.nresults=this.locales.length;

      if(this.nresults==0){
        document.getElementById('nofound').style.display = "inherit";
      }

    }else{
      document.getElementById('nofoundText').style.display = "inherit";
      document.getElementById('nofound').style.display = "inherit";
      document.getElementById('foundedtext').style.display = "none";
    }

  } 
}
