import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/common/error/error-boundary-route';
import UserManagementUpdate from 'app/views/administration/user-management/user-update';
import UserManagement from './user-management';
import UserManagementDetail from 'app/views/administration/user-management/user-detail';
import CreateUser from 'app/views/administration/user-management/user-create';
import UserManagementDeleteDialog from 'app/views/administration/user-management/user-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CreateUser} />
      <ErrorBoundaryRoute exact path={`${match.url}/results-files`} component={UserManagementDetail} />
      <ErrorBoundaryRoute exact path={match.url} component={UserManagement} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={UserManagementDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/update`} component={UserManagementUpdate} />
    </Switch>
  </>
);

export default Routes;
