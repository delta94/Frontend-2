import React, { Fragment } from 'react';
import ErrorBoundaryRoute from 'app/common/components/ErrorBoundaryRoute';
import AppHeader from 'app/layout/AppHeader/';
import AppSidebar from 'app/layout/AppSidebar/';
import CampaignAuto from './list/campaign-automation';
import PrivateRoute from '../../../common/components/PrivateRoute';

const Routes = ({ match }) => (
  <Fragment>
    <AppHeader />
    <div className="app-main">
      <AppSidebar />
      <div className="app-main__outer">
        <div className="app-main__inner">
          <ErrorBoundaryRoute path={`${match.url}`} component={CampaignAuto} />

          <PrivateRoute path={`${match.url}`} component={CampaignAuto} />
        </div>
      </div>
    </div>
  </Fragment>
);

export default Routes;
