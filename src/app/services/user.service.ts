import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Database } from '3a-common';
import { EndpointsService } from './endopoints.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private dataBaseSvc: Database.DatabaseService,
    private endPointsSvc: EndpointsService
  ) {}

  /**
   * Metodo para guardar un usuario
   * @param user usuario
   */
  saveUser(user: User): Observable<User> {
    return this.dataBaseSvc.save(user, this.endPointsSvc.userCollection());
  }

  /**
   * Metodo que confirmar si ese correo ya fue registrado
   * @param email correo electronico del usuario
   */
  getUserForEmail(email: string): Observable<Array<User>> {
    return this.dataBaseSvc.find(
      [
        {
          key: 'email',
          relation: Database.DatabaseQueryRelation.Equal,
          value: email,
        },
      ],
      this.endPointsSvc.userCollection()
    );
  }

  /**
   * Metodo que trae un usuario por id
   * @param id id del usuario
   */
  getUserForId(id: string): Observable<User> {
    return this.dataBaseSvc.get(id, this.endPointsSvc.userCollection());
  }
}
