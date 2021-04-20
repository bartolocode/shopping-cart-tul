import { User } from './../../models/user.model';
import { createAction, props } from '@ngrx/store';

export const userLogin = createAction(
  '[User Login] login',
  props<User>()
);
