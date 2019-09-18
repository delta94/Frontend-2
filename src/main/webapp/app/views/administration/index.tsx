import React, { Fragment } from 'react';
import CampaignManagement from './user-campaign';
import ErrorBoundaryRoute from 'app/common/error/error-boundary-route';
import UserManagement from './user-management';
import AppHeader from 'app/layout/AppHeader/';
import AppSidebar from 'app/layout/AppSidebar/';
import PrivateRoute from '../../common/auth/private-route';

const Routes = ({ match }) => (
  <Fragment>
    <AppHeader />
    <div className="app-main">
      <AppSidebar />
      <div className="app-main__outer">
        <div className="app-main__inner">
          <ErrorBoundaryRoute path={`${match.url}/user-management`} component={UserManagement} />
          <ErrorBoundaryRoute path={`${match.url}/user-campaign`} component={CampaignManagement} />
        </div>
      </div>
    </div>
  </Fragment>
);

export default Routes;
