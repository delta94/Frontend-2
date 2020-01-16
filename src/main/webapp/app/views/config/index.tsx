import React, { Fragment } from 'react';
import ErrorBoundaryRoute from 'app/common/error/error-boundary-route';
import AppHeader from 'app/layout/AppHeader/';
import AppSidebar from 'app/layout/AppSidebar/';
import PrivateRoute from '../../common/auth/private-route';
import EmailManagement from './email/email';
import EmailForm from './email/form/email-form';

const Routes = ({ match }) => (
  <Fragment>
    <AppHeader />
    <div className="app-main">
      <AppSidebar />
      <div className="app-main__outer">
        <div className="app-main__inner">
        <ErrorBoundaryRoute path={`${match.url}/emails`} exact={true} component={EmailManagement} />
        <ErrorBoundaryRoute path={`${match.url}/emails/add`} exact={true} component={EmailForm} />

        <PrivateRoute path={`${match.url}/emails`} exact={true} component={EmailManagement} />
        <PrivateRoute path={`${match.url}/emails/add`} exact={true} component={EmailForm} />
        </div>
      </div>
    </div>
  </Fragment>
);

export default Routes;
