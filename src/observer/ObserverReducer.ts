import { ViewerAction } from './ObserverActions';
import {
  SET_ERROR, SET_META, SET_PATH, START_LOADING, STOP_LOADING,
} from './constants';
import { InterfaceFolderState } from './types';

const initialFolderState: InterfaceFolderState = {
  error: undefined,
  isLoading: false,
  items: [],
  path: undefined,
  total: 0,
};

export default function folder(state = initialFolderState, action: ViewerAction): InterfaceFolderState {
  switch (action.type) {
    case SET_ERROR: {
      const { error } = action;
      return {
        ...state,
        error,
      };
    }
    case SET_META: {
      const { items, total } = action;
      const currentItems = state.items || [];
      return {
        ...state,
        items: currentItems.concat(items),
        total,
      };
    }
    case SET_PATH: {
      const { path } = action;
      return {
        ...initialFolderState,
        path,
      };
    }
    case START_LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case STOP_LOADING: {
      return {
        ...state,
        isLoading: false,
      };
    }
    default: {
      return state;
    }
  }
}
