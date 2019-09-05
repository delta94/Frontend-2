import React from 'react';
import ErrorBoundaryRoute from 'app/common/error/error-boundary-route';
import Landing from './landing/landing';
import { Switch } from 'react-router-dom';
const Routes = ({ match }) => (
  <div>
    <Switch>
      <ErrorBoundaryRoute path={`${match.url}/landing/:idCampaing/customer/:customerCode`} exact={true} component={Landing} />
      {/* <ErrorBoundaryRoute path={`${match.url}`} component={Landing} /> */}
    </Switch>
  </div>
);

export default Routes;
