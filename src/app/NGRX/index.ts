import {
  ActionReducerMap,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { userLoginReducer } from './reducers/auth.reducers';
import { User } from '../models/user.model';

export interface AppState {
  userLogin: User | object;
}

export const reducers: ActionReducerMap<AppState> = {
  userLogin: userLoginReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
