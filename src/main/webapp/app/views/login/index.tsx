import React, { Fragment } from 'react';
import ErrorBoundaryRoute from 'app/common/components/ErrorBoundaryRoute';
import Login from './login';
import Logout from './logout';

const Routes = ({ match }) => (
  <Fragment>
    <ErrorBoundaryRoute path={`${match.url}`} exact={true} component={Login} />
    <ErrorBoundaryRoute path={`${match.url}/logout`} component={Logout} />
  </Fragment>
);

export default Routes;
