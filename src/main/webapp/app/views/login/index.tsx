import React, { Fragment } from 'react';
import ErrorBoundaryRoute from 'app/common/error/error-boundary-route';
import Login from './login';
import Logout from './logout';

const Routes = ({ match }) => (
  <Fragment>
    <ErrorBoundaryRoute path={`${match.url}`} exact={true} component={Login} />
    <ErrorBoundaryRoute path={`${match.url}/logout`} exact={true} component={Logout} />
  </Fragment>
);

export default Routes;
