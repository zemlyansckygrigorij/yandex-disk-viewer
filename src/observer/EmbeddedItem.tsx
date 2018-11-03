
import * as React from 'react';
import bytesToSize from '../utils/bytesToSize';
import './EmbeddedItem.css';
import icFolder from './ic_folder.svg';
import { InterfaceFileMeta } from './types';

interface IProps {
  readonly item: InterfaceFileMeta;
  readonly onClick?: (item: InterfaceFileMeta) => void;
}

class EmbeddedItem extends React.Component<IProps> {
  private readonly onClick = (e: any) => {
    e.preventDefault();
    const { onClick, item } = this.props;
    if (onClick) {
      onClick(item);
    }
  };

  public render() {
    const { item } = this.props;
    const { name, size, type } = item;

    const isDir = type === 'dir';
    return (
      <div
        className="list-group-item list-group-item-action viewer__embedded-item"
        onClick={isDir ? this.onClick : undefined}
      >
        {isDir && (
          <img src={icFolder} alt="folder" className="viewer__embedded-item__file-type-icon" />
        )}
        <div className="viewer__embedded-item__info">
          <div>{name}</div>
          {!isDir && <div>{bytesToSize(size!)}</div>}
        </div>
      </div>
    );
  }
}

export default EmbeddedItem;
