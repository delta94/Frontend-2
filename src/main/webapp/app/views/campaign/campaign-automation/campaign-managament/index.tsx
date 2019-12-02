import React, { Fragment } from 'react';
import ErrorBoundaryRoute from 'app/common/error/error-boundary-route';
import AppHeader from 'app/layout/AppHeader/';
import AppSidebar from 'app/layout/AppSidebar/';
import CampaginManagament from './campaign-managament';
import PrivateRoute from '../../../../common/auth/private-route';

const Routes = ({ match }) => (
  <Fragment>
    <ErrorBoundaryRoute path={`${match.url}`} component={CampaginManagament} />

    <PrivateRoute path={`${match.url}`} component={CampaginManagament} />
  </Fragment>
);

export default Routes;
