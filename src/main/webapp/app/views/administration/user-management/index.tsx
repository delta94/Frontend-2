import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/common/error/error-boundary-route';
import UserManagement from './user-management';
import UserManagementDetail from 'app/views/administration/user-management/user-detail';
import UserManagementUpdate from 'app/views/administration/user-management/user-create';
import UserManagementDeleteDialog from 'app/views/administration/user-management/user-management-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={UserManagementUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:login/edit`} component={UserManagementUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:login`} component={UserManagementDetail} />
      <ErrorBoundaryRoute path={match.url} component={UserManagement} />
      <ErrorBoundaryRoute path={`${match.url}/:login/delete`} component={UserManagementDeleteDialog} />
    </Switch>
  </>
);

export default Routes;
