import React, { Fragment } from 'react';
import ErrorBoundaryRoute from 'app/common/error/error-boundary-route';
import CampaginManagament from './campaign-automation/campaign-managament/campaign-managament';

const Routes = ({ match }) => (
  <Fragment>
    <ErrorBoundaryRoute path={`${match.url}`} exact={true} component={CampaginManagament} />
    <ErrorBoundaryRoute path={`${match.url}/manage`} exact={true} component={CampaginManagament} />
  </Fragment>
);

export default Routes;
