import { NzIconModule } from 'ng-zorro-antd/icon';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main.routing.module';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { MainComponent } from './main.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { ProductCardComponent } from './product-card/product-card.component';
import { NzTableModule } from 'ng-zorro-antd/table';
@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzToolTipModule,
    NzModalModule,
    NzButtonModule,
    NzCardModule,
    NzSkeletonModule,
    NzTableModule
  ],
  declarations: [
    OrdersComponent,
    ShoppingCartComponent,
    ProductsComponent,
    MainComponent,
    ProductCardComponent
  ],
})
export class MainModule {}
