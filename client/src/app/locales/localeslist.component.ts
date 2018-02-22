import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalesService } from '../shared';
import { Local } from 'protractor/built/driverProviders';

@Component({
  selector: 'app-locales',
  templateUrl: './localeslist.component.html',
  styleUrls: ['./locales.component.css']
})
export class LocalesListComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private localesService: LocalesService
  ) {}

  locales: Array<string> = [];
  private categoria: string;
  private sub: any;

  ngOnInit() {
    
    this.sub = this.route.params.subscribe(params => {
      this.categoria = params['categoria'];
    });

    this.localesService.getbyCategory(this.categoria)
    .subscribe(locales => {
      this.locales = locales
    });
  }
}
