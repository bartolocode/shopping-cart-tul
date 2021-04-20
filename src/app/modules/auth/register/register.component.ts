import { BaseComponent } from 'src/app/components/base.component';
import { RegisteModel, User } from './../../../models/user.model';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { RxFormGroup } from '@rxweb/reactive-form-validators';
import { Component, forwardRef, Inject, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { take } from 'rxjs/operators';
import { AuthenticationService } from 'ngx-3a';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent extends BaseComponent implements OnInit {
  constructor(
    private userSvc: UserService,
    private rxFormBuilder: RxFormBuilder,
    @Inject(forwardRef(() => AuthenticationService))
    private authSvc: AuthenticationService,
    private modal: NzModalService,
    private router: Router
  ) {
    super();
  }

  passwordVisible = false;
  isLoadingOne = false;
  isLoadingTwo = false;
  registerDataFormGroup: RxFormGroup;

  ngOnInit() {
    this.initForm();
  }

  /**
   * Meotodo para inicializar el formulario
   */
  initForm() {
    const registeModel = new RegisteModel();
    this.registerDataFormGroup = this.rxFormBuilder.formGroup(
      registeModel
    ) as RxFormGroup;
  }

  /**
   * Metodo para registrar un usuario
   */
  register(): void {
    this.isLoadingOne = true;
    let user: User = {
      name: this.registerDataFormGroup.value.name,
      email: this.registerDataFormGroup.value.email,
      createdAt: new Date(),
      isActive: true,
    };
    this.observable(
      this.userSvc.getUserForEmail(user.email).pipe(take(1))
    ).subscribe((resp) => {
      if (resp.length >= 1) {
        this.isLoadingOne = false;
        this.modal.info({
          nzTitle: '¡Lo sentimos!',
          nzContent: 'El correo ya esta asociado a una cuenta existente',
          nzOnOk: () => console.log('Info OK'),
        });
      } else {
        this.authSvc.signUp(
          user.email,
          user.name,
          this.registerDataFormGroup.controls.password.value,
          (userId, error) => {
            if (error) {
              this.isLoadingOne = false;
              this.modal.error({
                nzTitle: '¡Lo sentimos!',
                nzContent:
                  'Ocurrio un error registrando el usuario, vuelve a intentarlo',
              });
            } else {
              user = { ...user, id: userId };
              this.observable(this.userSvc.saveUser(user)).subscribe((user) => {
                if (user) {
                  this.isLoadingOne = false;
                  const modal = this.modal.success({
                    nzTitle: '¡Éxito!',
                    nzContent: 'El usuario fue creado con éxito',
                  });

                  setTimeout(() => {
                    modal.destroy();
                    this.router.navigateByUrl('/');
                  }, 1000);
                }
              });
            }
          }
        );
      }
    });
  }
}
