import React, { Fragment } from 'react';
import ErrorBoundaryRoute from 'app/common/components/ErrorBoundaryRoute';
import CampaignManagement from './campaign-management';
import PrivateRoute from '../../../../common/components/PrivateRoute';
import CreateCampaign from './campaign-list/create-campaign/create-campaign';
import VersionList from './campaign-list/version-list/version-list';

const Routes = ({ match }) => (
  <Fragment>
    <ErrorBoundaryRoute path={`${match.url}`} exact={true} component={CampaignManagement} />
    <ErrorBoundaryRoute path={`${match.url}/new`} exact={true} component={CreateCampaign} />
    <ErrorBoundaryRoute path={`${match.url}/version/:id`} exact={true} component={VersionList} />

    <PrivateRoute path={`${match.url}/version/:id`} component={VersionList} />
    <PrivateRoute path={`${match.url}/new`} component={CreateCampaign} />
    <PrivateRoute path={`${match.url}`} component={CampaignManagement} />
  </Fragment>
);

export default Routes;
