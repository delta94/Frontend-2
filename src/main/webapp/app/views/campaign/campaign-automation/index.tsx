import React, { Fragment } from 'react';
import ErrorBoundaryRoute from 'app/common/routes/error-boundary-route';
import AppHeader from 'app/layouts/AppHeader/';
import AppSidebar from 'app/layouts/AppSidebar/';
import CampaginAuto from './list/campaign-automation';
import PrivateRoute from '../../../common/routes/private-route';

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
