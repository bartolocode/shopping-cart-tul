import { DatabaseService } from '3a-common/dist/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/cart.model';
import { Product, ProductCart } from '../models/product.model';
import { User } from '../models/user.model';
import { EndpointsService } from './endopoints.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(
    private databaseSvc: DatabaseService,
    private endPointsSvc: EndpointsService
  ) {
    if (this.getShopingCart()) {
      this.itemsShopingCart = this.getShopingCart();
    }
  }

  itemsShopingCart: Array<ProductCart> = [];

  /**
   * Trae el carrito que esta en el locale storage
   */
  getShopingCart(): Array<ProductCart> {
    return JSON.parse(localStorage.getItem('shoppingCart'));
  }

  /**
   * Metodo para agregar items al carrito
   * @param item item para agregar
   */
  addItemShoppingCart(item) {
    let itemTemp = this.itemsShopingCart.findIndex(
      (resp) => resp.id === item.id
    );
    if (this.itemsShopingCart.length && itemTemp !== -1) {
      if (
        this.itemsShopingCart[itemTemp] === undefined ||
        this.itemsShopingCart[itemTemp] === null
      ) {
        this.itemsShopingCart[itemTemp].quantity = 1;
      } else {
        this.itemsShopingCart[itemTemp].quantity =
          this.itemsShopingCart[itemTemp].quantity + 1;
      }
    } else {
      item.quantity = 1;
      this.itemsShopingCart.push(item);
    }
    localStorage.setItem('shoppingCart', JSON.stringify(this.itemsShopingCart));
  }

  /**
   * Metodo para bajar la cantidad de un producto en el carrito
   * @param item item a eliminar
   */
  subtractItemShoppingCart(item: ProductCart) {
    let itemTemp = this.itemsShopingCart.findIndex(
      (resp) => resp.id === item.id
    );
    if (this.itemsShopingCart.length && itemTemp !== -1) {
      if (this.itemsShopingCart[itemTemp].quantity > 1) {
        this.itemsShopingCart[itemTemp].quantity--;
      } else {
        this.itemsShopingCart.splice(itemTemp, 1);
      }
      localStorage.setItem(
        'shoppingCart',
        JSON.stringify(this.itemsShopingCart)
      );
    }
  }

  /**
   * Metodo para eliminar un producto
   * @param item itema a eliminar
   */
  deleteItem(item: ProductCart) {
    let itemTemp = this.itemsShopingCart.findIndex(
      (resp) => resp.id === item.id
    );
    this.itemsShopingCart.splice(itemTemp, 1);
    localStorage.setItem('shoppingCart', JSON.stringify(this.itemsShopingCart));
  }

  /**
   * Metodo que borra el carrito del local storage
   */
  deleteCart(): void {
    localStorage.removeItem('shoppingCart');
  }
  /**
   * Metodo para guardar una orden
   * @param order
   */
  saveOrder(order: Order, id: string): Observable<Order> {
    return this.databaseSvc.save(order, this.endPointsSvc.ordersCollection(id));
  }

  /**
   * Retorna uno observable con todas las ordenes
   * @returns
   */
  getAllOrders(id: string): Observable<Array<Order>> {
    return this.databaseSvc.find([], this.endPointsSvc.ordersCollection(id));
  }
}
