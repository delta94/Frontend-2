import React, { Fragment } from 'react';
import ErrorBoundaryRoute from 'app/common/routes/error-boundary-route';
import Flow from './Flow';
import DetailsFlow from './details-flow/details-flow';

const Routes = ({ match }) => (
  <Fragment>
    <ErrorBoundaryRoute path={`${match.url}`} exact={true} component={Flow} />
    <ErrorBoundaryRoute path={`${match.url}/details`} exact={true} component={DetailsFlow} />
  </Fragment>
);

export default Routes;
