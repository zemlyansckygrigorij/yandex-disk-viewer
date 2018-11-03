import { AnyAction, combineReducers } from 'redux';
import folder from '../observer/ObserverReducer';
import { IAuthState, IStoreState } from './types';

const initialAuthState = {
  token:'AQAAAAAUUiopAAVGfLapOSEBbk5jgcTNn8sLiMo'
};

function auth(state: IAuthState = initialAuthState, action: AnyAction): IAuthState {
  switch (action.type) {
    default: {
      return state;
    }
  }
}

export default combineReducers<IStoreState>({
  auth,
  folder,
});
