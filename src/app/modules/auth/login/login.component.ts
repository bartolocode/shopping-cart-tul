import { userLogin } from './../../../NGRX/actions/auth.actions';
import { BaseComponent } from './../../../components/base.component';
import { Component, forwardRef, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RxFormBuilder, RxFormGroup } from '@rxweb/reactive-form-validators';
import { AuthenticationService } from 'ngx-3a';
import { take } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { LoginModel } from 'src/app/models/user.model';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaseComponent implements OnInit {
  constructor(
    private rxFormBuilder: RxFormBuilder,
    @Inject(forwardRef(() => AuthenticationService))
    private authSvc: AuthenticationService,
    private router: Router,
    private modal: NzModalService,
    private userSvc: UserService,
    private store: Store
  ) {
    super();
  }
  passwordVisible = false;
  isLoadingOne = false;
  loginDataFormGroup: RxFormGroup;

  ngOnInit() {
    this.initForm();
  }
  /**
   * Metodo para inicializar el formulario
   */
  initForm() {
    const loginData = new LoginModel();
    this.loginDataFormGroup = this.rxFormBuilder.formGroup(
      loginData
    ) as RxFormGroup;
  }

  /**
   * Metodo para iniciar sesion
   */
  loginUser(): void {
    this.isLoadingOne = true;
    this.authSvc.signIn(
      this.loginDataFormGroup.controls.email.value,
      this.loginDataFormGroup.controls.password.value,
      (userId, error) => {
        this.isLoadingOne = false;
        if (error) {
          this.modal.error({
            nzTitle: '¡Lo sentimos!',
            nzContent: 'El correo o la contraseña es incorrecta',
          });
        } else {
          this.observable(
            this.userSvc.getUserForId(userId).pipe(take(1))
          ).subscribe((user) => {
            this.store.dispatch(userLogin(user));
            this.router.navigateByUrl('/');
          });
        }
      }
    );
  }
}
