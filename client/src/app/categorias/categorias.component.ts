import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CategoriasService } from '../shared';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  constructor(
    private router: Router,
    private categoriasService: CategoriasService
  ) {}

  categorias: Array<string> = [];

  ngOnInit() {
    this.categoriasService.getAll()
    .subscribe(categorias => {
      this.categorias = categorias;
    });
  }
}
