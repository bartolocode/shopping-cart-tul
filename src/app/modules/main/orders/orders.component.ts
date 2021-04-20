import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { map, mergeAll, mergeMap } from 'rxjs/operators';
import { BaseComponent } from 'src/app/components/base.component';
import { Order, StatusOrder } from 'src/app/models/cart.model';
import { User } from 'src/app/models/user.model';
import { AppState } from 'src/app/NGRX';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent extends BaseComponent implements OnInit {
  constructor(
    private cartSvc: CartService,
    private store: Store<AppState>,
  ) {
    super();
  }
  orders: Array<any> = [];
  user: User;
  ngOnInit() {
    this.observable(this.store.select('userLogin')).subscribe((user) => {
      this.user = user;
      if (this.user.id) {
        this.loadOrders();
      }
    });
  }

  /**
   * Metodo que se subscribe al observable que retorna la lista de ordenes que tenga el usuario
   */
  loadOrders(): void {
    this.observable(this.cartSvc.getAllOrders(this.user.id))
      .pipe(
        map((orders) =>
          orders.map((order) => {
            return {
              numberOrder: order.numberOrder,
              createdAt: moment(order.createdAt.toDate()).format('L'),
              status:
                order.status === StatusOrder.completed
                  ? 'Completado'
                  : 'Pendiente',
              shipping: order.shipping,
              total: order.total,
            };
          })
        )
      )
      .subscribe((orders) => {
        this.orders = orders;
      });
  }
}
