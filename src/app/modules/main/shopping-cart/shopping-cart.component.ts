import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BaseComponent } from 'src/app/components/base.component';
import { Order, StatusOrder } from 'src/app/models/cart.model';
import { Product, ProductCart } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { AppState } from 'src/app/NGRX';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent extends BaseComponent implements OnInit {
  constructor(
    private cartSvc: CartService,
    private modal: NzModalService,
    private router: Router,
    private store: Store<AppState>
  ) {
    super();
  }
  productsShoppingCart: Array<ProductCart> = [];
  valueCart = { total: 0, subTotal: 0, iva: 0, shipping: 0 };
  user: User;
  ngOnInit() {
    this.loadCart();
    this.observable(this.store.select('userLogin')).subscribe((user) => {
      this.user = user;
    });
  }

  /**
   * Metodo para traer los productos que tengo en local storage
   */
  loadCart() {
    this.productsShoppingCart = this.cartSvc.itemsShopingCart;
    if (this.productsShoppingCart.length) {
      this.valueCart.subTotal = this.productsShoppingCart.reduce(
        (temp, element) => {
          return temp + element.price * element.quantity;
        },
        0
      );

      this.valueCart.iva = this.valueCart.subTotal * 0.19;
      this.valueCart.subTotal = Math.trunc(
        this.valueCart.subTotal - this.valueCart.iva
      );
      this.valueCart.shipping = 15000;
      this.valueCart.total = Math.trunc(
        this.valueCart.subTotal + this.valueCart.iva + this.valueCart.shipping
      );
    }
  }

  /**
   * Metodo para aumentar la cantidad en uno del item seleccionado
   * @param item item que voy agregar
   */
  addItemToCart(item): void {
    this.cartSvc.addItemShoppingCart(item);
    this.loadCart();
  }

  /**
   * Metodo para borrar la cantidad en uno del item seleccionado
   * @param item item que voy eliminar
   */
  subtractItemToCart(item): void {
    this.cartSvc.subtractItemShoppingCart(item);
    this.loadCart();
  }

  /**
   * Metodo que elimina todas las cantidades del producto seleccionado
   * @param item item para borrar
   */
  deleteItem(item): void {
    this.cartSvc.deleteItem(item);
    this.loadCart();
  }

  /**
   * Metodo para generar una orden
   */
  pay(): void {
    if (this.user.id) {
      const dataSave: Order = {
        ...this.valueCart,
        status: StatusOrder.pending,
        createdAt: new Date(),
        numberOrder: moment().valueOf(),
        user: this.user,
        products: this.productsShoppingCart
      };
      this.observable(this.cartSvc.saveOrder(dataSave, this.user.id)).subscribe(
        (order) => {
          const modal = this.modal.success({
            nzTitle: 'Felicidades',
            nzContent: `Se a creado la orden de compra # ${order.numberOrder}, pronto estaras disfrutando de tus productos`,
          });
          this.cartSvc.deleteCart();
          setTimeout(() => {
            modal.destroy();
            this.router.navigateByUrl('/');
          }, 3000);
        }
      );
    } else {
      const modal = this.modal.warning({
        nzTitle: 'Lo sentimos',
        nzContent: `Para realizar una compra debes iniciar sesión`,
      });
      setTimeout(() => {
        modal.destroy();
        this.router.navigateByUrl('/login');
      }, 3000);
    }
  }
}
