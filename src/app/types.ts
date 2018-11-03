
import { InterfaceFolderState } from '../observer/types';

interface IAuthState {
  readonly token: string;
}

interface IStoreState {
  readonly auth: IAuthState;
  readonly folder: InterfaceFolderState;
}

export { IAuthState, IStoreState };
