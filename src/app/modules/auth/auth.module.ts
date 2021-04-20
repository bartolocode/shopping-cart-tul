import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth.routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AuthRoutingModule,
    NzInputModule,
    NzButtonModule,
    NzFormModule,
    NzIconModule,
    FormsModule,
    RxReactiveFormsModule,
    ReactiveFormsModule,
    NzModalModule
  ],
  declarations: [LoginComponent, RegisterComponent],
  providers: [],
})
export class AuthModule {}
