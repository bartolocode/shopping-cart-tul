import { Database } from '3a-common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EndpointsService {
  constructor() {}

  /* La coleccion de los usuarios */
  userCollection(): Database.Collection {
    return { name: 'Users' };
  }

  /* La coleccion de productos */
  productCollection(): Database.Collection {
    return { name: `Products` };
  }

  /* La coleccion de ordenes */
  ordersCollection(id: string): Database.Collection {
    return { name: `Users/${id}/Carts` };
  }
}
