import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/common/components/ErrorBoundaryRoute';
import Infomation from './infomation/infomation';
import UserManagement from './list/user-management';
import UserDetail from 'app/views/customer/user-management/import/detail/detail';
import CreateUser from 'app/views/customer/user-management/import/import';

//todo rename cho router
const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CreateUser} />
      <ErrorBoundaryRoute exact path={`${match.url}/results-files`} component={UserDetail} />
      <ErrorBoundaryRoute exact path={match.url} component={UserManagement} />
      <ErrorBoundaryRoute exact path={`${match.url}/info/:id`} component={Infomation} />
    </Switch>
  </>
);

export default Routes;
