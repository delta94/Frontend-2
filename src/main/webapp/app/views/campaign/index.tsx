import React, { Fragment } from 'react';
import ErrorBoundaryRoute from 'app/common/error/error-boundary-route';
import PrivateRoute from '../../common/auth/private-route';
import CampaginManagament from './campaign-automation/campaign-managament';
import UserCampaign from './user-campaign';
import CampaignAuto from './campaign-automation';

const Routes = ({ match }) => (
  <Fragment>
    <ErrorBoundaryRoute path={`${match.url}`} exact={true} component={CampaignAuto} />
    <ErrorBoundaryRoute path={`${match.url}/user-campaign`} exact={true} component={UserCampaign} />

    <ErrorBoundaryRoute path={`${match.url}/campaign-managament`} exact={true} component={CampaginManagament} />

    <PrivateRoute path={`${match.url}`} exact={true} component={CampaginManagament} />
    <PrivateRoute path={`${match.url}/user-campaign`} exact={true} component={UserCampaign} />
  </Fragment>
);

export default Routes;
