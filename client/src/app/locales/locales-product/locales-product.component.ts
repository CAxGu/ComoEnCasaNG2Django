import { Component, OnInit, Input } from '@angular/core';
import { Producto } from '../../shared';

@Component({
  selector: 'app-locales-product',
  templateUrl: './locales-product.component.html',
  styleUrls: ['./locales-product.component.css']
})
export class LocalesProductComponent implements OnInit {

  constructor() { }

  @Input() producto: Producto;
  ngOnInit() {
  }

}
