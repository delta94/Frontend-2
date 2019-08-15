import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/common/error/error-boundary-route';
import UserManagement from './user-management';
import UserManagementDetail from 'app/views/administration/user-management/user-detail';
import CreateUser from 'app/views/administration/user-management/user-create';

//todo rename cho router
const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CreateUser} />
      <ErrorBoundaryRoute exact path={`${match.url}/results-files`} component={UserManagementDetail} />
      <ErrorBoundaryRoute path={match.url} component={UserManagement} />
    </Switch>
  </>
);

export default Routes;
