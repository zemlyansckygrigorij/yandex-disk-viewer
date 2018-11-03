export interface InterfaceViewerError {
  readonly message: string;
}

export interface InterfaceFileMeta {
  readonly name: string;
  readonly type: string;
  readonly size?: number;
  readonly path: string;
}

export interface InterfaceFolderState {
  readonly error?: InterfaceViewerError;
  readonly items: InterfaceFileMeta[];
  readonly isLoading: boolean;
  readonly total: number;
  readonly path?: string;

}
