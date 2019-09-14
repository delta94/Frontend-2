import React, { Fragment } from 'react';
import ErrorBoundaryRoute from 'app/common/error/error-boundary-route';
import Login from './login';

const Routes = ({ match }) => (
  <Fragment>
    <ErrorBoundaryRoute path={`${match.url}`} exact={true} component={Login} />
  </Fragment>
);

export default Routes;
