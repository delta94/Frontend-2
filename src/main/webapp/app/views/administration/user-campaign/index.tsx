import React from 'react';
import { Switch } from 'react-router-dom';
import CampaignManagement from './campagin-management';

import ErrorBoundaryRoute from 'app/common/error/error-boundary-route';

//todo rename cho router
const Routes = ({ match }) => (
  <>
    <Switch>
      {/* <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CreateUser} />
      <ErrorBoundaryRoute exact path={`${match.url}/results-files`} component={UserDetail} /> */}
      <ErrorBoundaryRoute exact path={match.url} component={CampaignManagement} />
      {/* <ErrorBoundaryRoute exact path={`${match.url}/:id/update`} component={UserUpdate} /> */}
    </Switch>
  </>
);

export default Routes;
