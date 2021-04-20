import { Database } from '3a-common';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { EndpointsService } from './endopoints.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private dataBaseSvc: Database.DatabaseService,
    private endPointsSvc: EndpointsService
  ) {}

  /**
   * Metodo que retorna un observable todos los productos que estan en la base de datos
   * @returns
   */
  getAllProducts(): Observable<Array<Product>> {
    return this.dataBaseSvc.find([], this.endPointsSvc.productCollection());
  }

  /**
   * Metodo que retorna un observable con el producto que coincida con el id
   * @param id id del producto
   * @returns
   */
  getProductById(id:string): Observable<Product> {
    return this.dataBaseSvc.get(id, this.endPointsSvc.productCollection());
  }
}
