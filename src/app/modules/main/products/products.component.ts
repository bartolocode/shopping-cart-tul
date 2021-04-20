import { DatabaseService } from '3a-common/dist/database';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/components/base.component';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent extends BaseComponent implements OnInit {
  constructor(private productSvc: ProductService, private cartSvc:CartService, private bd:DatabaseService) {
    super();
  }
  products: Array<Product>;
  ngOnInit() {


    this.loadProducts();
  }
  /**
   * Metodo que se subcribe para traer todos los productos
   */
  loadProducts() {
    this.observable(this.productSvc.getAllProducts()).subscribe((products) => {
      this.products = products;
    });
  }

  addProductToCart(product:Product):void {
    this.cartSvc.addItemShoppingCart(product);

  }
}
