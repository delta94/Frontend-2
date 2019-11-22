import React, { Fragment } from 'react';
import { Switch } from 'react-router-dom';
import CampaignManagement from './list/campaign-management';
import CreateCampagin from './create/create';
import AppHeader from 'app/layout/AppHeader/';
import AppSidebar from 'app/layout/AppSidebar/';
import ErrorBoundaryRoute from 'app/common/error/error-boundary-route';
import PrivateRoute from '../../../common/auth/private-route';

//todo rename cho router
const Routes = ({ match }) => (
  <>
    <Fragment>
      <AppHeader />
      <div className="app-main">
        <AppSidebar />
        <div className="app-main__outer">
          <div className="app-main__inner">
            <Switch>
              <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CreateCampagin} />
              <ErrorBoundaryRoute exact path={match.url} component={CampaignManagement} />
            </Switch>
          </div>
        </div>
      </div>
    </Fragment>
  </>
);

export default Routes;
