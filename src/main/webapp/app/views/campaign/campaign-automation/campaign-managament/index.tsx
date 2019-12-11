import React, { Fragment } from 'react';
import ErrorBoundaryRoute from 'app/common/error/error-boundary-route';
import CampaginManagament from './campaign-managament';
import PrivateRoute from '../../../../common/auth/private-route';
import CreateCampaign from './campaign-list/create-campaign/create-campaign';

const Routes = ({ match }) => (
  <Fragment>
    <ErrorBoundaryRoute path={`${match.url}`} exact={true} component={CampaginManagament} />
    <ErrorBoundaryRoute path={`${match.url}/new`} exact={true} component={CreateCampaign} />

    <PrivateRoute path={`${match.url}/new`} component={CreateCampaign} />
    <PrivateRoute path={`${match.url}`} component={CampaginManagament} />
  </Fragment>
);

export default Routes;