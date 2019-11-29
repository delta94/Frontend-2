import React, { Fragment } from 'react';
import ErrorBoundaryRoute from 'app/common/error/error-boundary-route';
import PrivateRoute from '../../common/auth/private-route';
import CampaginManagament from './campaign-automation/campaign-managament/campaign-managament';
import UserCampaign from './user-campaign';

const Routes = ({ match }) => (
  <Fragment>
    <ErrorBoundaryRoute path={`${match.url}`} exact={true} component={CampaginManagament} />
    <ErrorBoundaryRoute path={`app/views/campaigns/user-campaign`} exact={true} component={UserCampaign} />

    <PrivateRoute path={`${match.url}`} exact={true} component={CampaginManagament} />
    <PrivateRoute path={`app/views/campaigns/user-campaign`} exact={true} component={UserCampaign} />
  </Fragment>
);

export default Routes;
