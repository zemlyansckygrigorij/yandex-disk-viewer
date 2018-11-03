
import * as React from 'react';
import * as InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import Alert from '../app/common/Alert';
import Spinner from '../app/common/Spinner';
import { IStoreState } from '../app/types';
import DiskBreadcrumb from './DiskBreadcrumb';
import EmbeddedItem from './EmbeddedItem';
import { loadFolder } from './ObserverActions';
import { InterfaceViewerError } from './types';
import { InterfaceFileMeta } from './types';

interface IProps extends RouteComponentProps<any> {
  readonly error?: InterfaceViewerError;
  readonly isLoading: boolean;
  readonly items: InterfaceFileMeta[];
  readonly onLoadFolder: (path: string) => void;
  readonly total: number;
}

class Observer extends React.Component<IProps> {
  public componentDidMount() {
    const { isLoading, location, onLoadFolder } = this.props;
    if (isLoading) {
      throw new Error('isLoading cannot be true here.');
    }

    onLoadFolder(location.pathname);
  }

  private hasMore = () => {
    const { isLoading, items, total } = this.props;
    return total > items.length && !isLoading;
  };

  private onLoadFolder = () => {
    const { location, onLoadFolder } = this.props;
    if (this.hasMore()) {
      onLoadFolder(location.pathname);
    }
  };

  private handleEmbeddedItemClick = (item: any) => {
    const { history } = this.props;
    history.push(item.path.replace('disk:', ''));
  };

  private renderEmbeddedItems() {
    const { items } = this.props;

    return (
      <div className="list-group">
        {items.map(item => (
          <EmbeddedItem item={item} key={item.path} onClick={this.handleEmbeddedItemClick} />
        ))}
      </div>
    );
  }

  public render() {
    const { error, location, isLoading } = this.props;
    return (
      <div>
        <DiskBreadcrumb pathname={location.pathname} />
        {!!error && <Alert message={error.message} level="warning" />}
        <InfiniteScroll
          hasMore={this.hasMore()}
          loader={undefined}
          loadMore={this.onLoadFolder}
          pageStart={0}
        >
          {this.renderEmbeddedItems()}
          {isLoading && <Spinner />}
        </InfiniteScroll>
      </div>
    );
  }
}

const mapStateToProps = (state: IStoreState) => state.folder;
const mapDispatchToProps = (dispatch: any) => ({
  onLoadFolder: (path: string) => {
    dispatch(loadFolder(path));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Observer);
