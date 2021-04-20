import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AuthenticationService } from 'ngx-3a';
import { User } from 'src/app/models/user.model';
import { AppState } from 'src/app/NGRX';
import { userLogin } from 'src/app/NGRX/actions/auth.actions';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(
    private store: Store<AppState>,
    private authSvc: AuthenticationService,
    private router: Router
  ) {}
  user: User;
  showModalLogOut: boolean = false;
  ngOnInit() {
    this.store.select('userLogin').subscribe((user: User) => {
      this.user = user;
    });
  }

  /**
   * Metodo para cerrar sesión
   */
  logOut(): void {
    this.authSvc.signOut();
    this.store.dispatch(userLogin({}));
    this.showModalLogOut = true;
  }

  /**
   * Metodo para cerrar la modal
   */
  handleCancel(): void {
    this.showModalLogOut = false;
    this.router.navigateByUrl('/');
  }

  /**
   * metodo para cerrar la modal e ir a la vista de productos
   */
  goToProducts(): void {
    this.showModalLogOut = false;
    this.router.navigateByUrl('/');
  }

  /**
   * Metodo para cerrar la modal e ir a la vista para iniciar seión
   */
  goToLogin(): void {
    this.showModalLogOut = false;
    this.router.navigateByUrl('/login');
  }
}
