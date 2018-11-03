
import * as React from 'react';

import { Route, RouteComponentProps, withRouter } from 'react-router-dom';
import Observer from '../observer/Observer';

function App({ location }: RouteComponentProps<any>) {
  return <Route path="/:path?" component={Observer} key={location.pathname} />;
}

export default withRouter(App);
