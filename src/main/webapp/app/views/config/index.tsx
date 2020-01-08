import React, { Fragment } from 'react';
import ErrorBoundaryRoute from 'app/common/error/error-boundary-route';
import AppHeader from 'app/layout/AppHeader/';
import AppSidebar from 'app/layout/AppSidebar/';
import PrivateRoute from '../../common/auth/private-route';
import EmailManagement from './email/email';

const Routes = ({ match }) => (
  <Fragment>
    <AppHeader />
    <div className="app-main">
      <AppSidebar />
      <div className="app-main__outer">
        <div className="app-main__inner">
        <ErrorBoundaryRoute path={`${match.url}/emails`} component={EmailManagement} />
        <PrivateRoute path={`${match.url}/emails`} component={EmailManagement} />
        </div>
      </div>
    </div>
  </Fragment>
);

export default Routes;
