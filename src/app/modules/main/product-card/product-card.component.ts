import { DatabaseService } from '3a-common/dist/database';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  constructor() {}

  @Input('product') product: Product;
  @Output() addProduct = new EventEmitter<Product>();

  ngOnInit() {}
  /**
   * Metodo para emitir a al lista el producto que se debe agregar al carrito
   */
  addToCart(): void {
    this.addProduct.emit(this.product);
  }
}
