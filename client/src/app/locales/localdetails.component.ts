import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Locales, Producto, ProductosService, CartService } from '../shared';


@Component({
  selector: 'local-details',
  templateUrl: './localdetails.component.html',
  styleUrls: ['./locales.component.css']
})
export class LocalDetailsComponent implements OnInit {
  local: Locales;
  productos: Producto[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productosService: ProductosService,
    private cartService: CartService,
  ) {}


  ngOnInit() {
     // Retreive the prefetched article
     this.route.data.subscribe(
      (data: { local: Locales }) => {
        this.local = data.local;

        // Load the products on this local
        this.populateProductos();
      }
    );
  }

  populateProductos() {
    this.productosService.getAll(this.local.id_local)
      .subscribe(productos => {
        this.productos = productos
        console.log(productos)
      });
  }
  addCart(Product){
    this.cartService.addItem(Product) 
  }
}
