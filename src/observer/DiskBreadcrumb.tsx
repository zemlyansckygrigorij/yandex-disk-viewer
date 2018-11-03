
import * as React from 'react';
import Breadcrumb, { ICrumbItem } from '../app/common/Breadcrumb';

interface IProps {
  pathname: string;
}

class DiskBreadcrumb extends React.Component<IProps> {
  private buildItems(): ICrumbItem[] {
    let { pathname } = this.props;
    const items = [];

    while (pathname.length !== 0) {
      const index = pathname.lastIndexOf('/');
      const lastPath = pathname.substring(index + 1);

      if (lastPath.length !== 0) {
        items.unshift({ name: lastPath, path: pathname });
      }

      pathname = pathname.substring(0, index);
    }

    items.unshift({ name: 'Home', path: '/' });

    return items;
  }

  public render() {
    const items = this.buildItems();
    return <Breadcrumb items={items} />;
  }
}

export default DiskBreadcrumb;
