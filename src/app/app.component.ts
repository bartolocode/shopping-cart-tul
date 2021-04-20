import { AppState } from 'src/app/NGRX';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { BaseComponent } from './components/base.component';
import { UserService } from './services/user.service';
import { userLogin } from './NGRX/actions/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends BaseComponent implements OnInit {
  title = 'shopping-cart-tul';
  constructor(
    private afAuth: AngularFireAuth,
    private userSvc: UserService,
    private store: Store<AppState>
  ) {
    super();
  }
  ngOnInit(): void {
    this.afAuth.authState.pipe(take(1)).subscribe((user) => {
      if (user && user.uid) {
        this.observable(
          this.userSvc.getUserForId(user.uid).pipe(take(1))
        ).subscribe((user) => {
          this.store.dispatch(userLogin(user));
        });
      }
    });
  }
}
