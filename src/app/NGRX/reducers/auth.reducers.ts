import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { userLogin } from '../actions/auth.actions';

export const initialState: User = {};

const _userLoginReducer = createReducer(
  initialState,
  on(userLogin, (state, user) => (state = user))
);

export function userLoginReducer(state, action) {
  return _userLoginReducer(state, action);
}
