import React, { Fragment } from 'react';
import ErrorBoundaryRoute from 'app/common/error/error-boundary-route';
import Login from './login';
import Logout from './logout';
import AppHeader from 'app/layout/AppHeader/';
import AppSidebar from 'app/layout/AppSidebar/';

const Routes = ({ match }) => (
  <Fragment>
    <AppHeader />
    <div className="app-main">
      <AppSidebar />
      <div className="app-main__outer">
        <div className="app-main__inner">
          <ErrorBoundaryRoute path={`${match.url}`} exact={true} component={Login} />
          <ErrorBoundaryRoute path={`${match.url}/logout`} exact={true} component={Logout} />
        </div>
      </div>
    </div>
  </Fragment>
);

export default Routes;
