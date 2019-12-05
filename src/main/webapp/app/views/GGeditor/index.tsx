import React, { Fragment } from 'react';
import ErrorBoundaryRoute from 'app/common/error/error-boundary-route';
import ConfigEmail from './config-email/config-email';
import Flow from './Flow';

const Routes = ({ match }) => (
  <Fragment>
    <ErrorBoundaryRoute path={`${match.url}`} exact={true} component={Flow} />
    <ErrorBoundaryRoute path={`${match.url}/config`} exact={true} component={ConfigEmail} />
  </Fragment>
);

export default Routes;
