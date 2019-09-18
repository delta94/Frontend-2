import React from 'react';
import { Switch } from 'react-router-dom';
import CampaignManagement from './list/campaign-management';
import CreateCampagin from './create/create';
import ErrorBoundaryRoute from 'app/common/error/error-boundary-route';
import PrivateRoute from '../../../common/auth/private-route';

//todo rename cho router
const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CreateCampagin} />
      <ErrorBoundaryRoute exact path={match.url} component={CampaignManagement} />
      {/* <ErrorBoundaryRoute exact path={`${match.url}/:id/update`} component={UserUpdate} /> */}
    </Switch>
  </>
);

export default Routes;
