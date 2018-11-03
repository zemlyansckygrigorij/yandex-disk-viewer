import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import { IStoreState } from '../app/types';
import * as C from './constants';
import { InterfaceFileMeta, InterfaceViewerError } from './types';

interface ILoadFolder {
  type: C.LOAD_FOLDER;
  path: string;
}

interface IStartLoading {
  type: C.START_LOADING;
}

interface IStopLoading {
  type: C.STOP_LOADING;
}

interface ISetError {
  type: C.SET_ERROR;
  error: InterfaceViewerError;
}

interface ISetMeta {
  type: C.SET_META;
  items: InterfaceFileMeta[];
  total: number;
}

interface ISetPath {
  type: C.SET_PATH;
  path: string;
}

export type ViewerAction = | ILoadFolder
  | IStartLoading
  | IStopLoading
  | ISetError
  | ISetMeta
  | ISetPath;

export const loadFolder = (path: string): ILoadFolder => ({
  type: C.LOAD_FOLDER,
  path,
});

const startLoading = (): IStartLoading => ({
  type: C.START_LOADING,
});

const stopLoading = (): IStopLoading => ({
  type: C.STOP_LOADING,
});

const setError = (error: InterfaceViewerError): ISetError => ({
  type: C.SET_ERROR,
  error,
});

const setMeta = (items: InterfaceFileMeta[], total: number): ISetMeta => ({
  type: C.SET_META,
  items,
  total,
});

const setPath = (path: string): ISetPath => ({
  type: C.SET_PATH,
  path,
});

const getResources = (token: string, path: string, offset: number) => {
  const searchParamFields = ['size', 'type', 'path', 'name']
    .map(item => `_embedded.items.${item}`)
    .join(',');
  const searchParams = new URLSearchParams(
    `path=${path}&offset=${offset}&fields=${searchParamFields},_embedded.total`,
  );
  const fetchInit = {
    headers: new Headers({
      Authorization: `OAuth ${token}`,
    }),
    method: 'GET',
  };

  return fetch(`https://cloud-api.yandex.net/v1/disk/resources?${searchParams}`, fetchInit);
};

const getFolder = (state: IStoreState) => state.folder;

const getAuth = (state: IStoreState) => state.auth;

const loadFolderAsync = function* ({ path }: ILoadFolder): any {
  const { path: currentPath } = yield select(getFolder);

  if (path !== currentPath) {
    yield put(setPath(path));
  }

  yield put(startLoading());

  const { token } = yield select(getAuth);
  // It's important to get items only after setPath call.
  const { items } = yield select(getFolder);
  const offset = items.length;

  try {
    const response = yield call(getResources, token, path, offset);
    const json = yield call([response, response.json]);
    const { _embedded } = json;
    if (_embedded) {
      // 200 OK
      const { items: fileMetaItems, total } = _embedded;
      yield put(setMeta(fileMetaItems, total));
    } else {
      yield put(setError(json));
    }
  } catch (e) {
    yield put(setError(e));
  }

  yield put(stopLoading());
};

export default function* mySaga() {
  yield takeLatest(C.LOAD_FOLDER, loadFolderAsync);
}
