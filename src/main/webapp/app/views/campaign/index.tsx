import React, { Fragment } from 'react';
import ErrorBoundaryRoute from 'app/common/components/ErrorBoundaryRoute';
// import PrivateRoute from '../../common/components/PrivateRoute';
import CampaignManagement from './campaign-automation/campaign-management';
import UserCampaign from './user-campaign';
import CampaignAuto from './campaign-automation';

const Routes = ({ match }) => (
  <Fragment>
    <ErrorBoundaryRoute path={`${match.url}/campaign-auto`} exact={true} component={CampaignAuto} />
    <ErrorBoundaryRoute path={`${match.url}/user-campaign`} exact={true} component={UserCampaign} />

    <ErrorBoundaryRoute path={`${match.url}/campaign-management`} exact={true} component={CampaignManagement} />

    {/*<PrivateRoute path={`${match.url}`} exact={true} component={CampaignManagement} />*/}
    {/*<PrivateRoute path={`${match.url}/user-campaign`} exact={true} component={UserCampaign} />*/}
  </Fragment>
);

export default Routes;
