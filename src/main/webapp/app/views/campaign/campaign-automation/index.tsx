import React, { Fragment } from 'react';
import ErrorBoundaryRoute from 'app/common/error/error-boundary-route';
import AppHeader from 'app/layout/AppHeader/';
import AppSidebar from 'app/layout/AppSidebar/';
import CampaginAuto from './list/campaign-automation';
import PrivateRoute from '../../../common/auth/private-route';

const Routes = ({ match }) => (
  <Fragment>
    <AppHeader />
    <div className="app-main">
      <AppSidebar />
      <div className="app-main__outer">
        <div className="app-main__inner">
          <ErrorBoundaryRoute path={`${match.url}`} component={CampaginAuto} />

          <PrivateRoute path={`${match.url}`} component={CampaginAuto} />
        </div>
      </div>
    </div>
  </Fragment>
);

export default Routes;
