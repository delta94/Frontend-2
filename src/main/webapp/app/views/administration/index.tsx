import React from 'react';

import ErrorBoundaryRoute from 'app/common/error/error-boundary-route';
import UserManagement from './user-management';
import UserManagementDeleteDialog from './user-management';
import UserUpdate from './user-management';
import Login from 'app/views/login/login';

const Routes = ({ match }) => (
  <div>
    <ErrorBoundaryRoute path={`${match.url}/user-management`} component={UserManagement} />
    {/* <ErrorBoundaryRoute path={`${match.url}/user-management-edit`} component={UserManagementUpdate} /> */}
    {/* <ErrorBoundaryRoute path={`${match.url}`} component={Login} exact={true} /> */}

    {/* <ErrorBoundaryRoute path={`${match.url}/user-management-delete`} component={UserManagementDeleteDialog} /> */}
  </div>
);

export default Routes;
