import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/common/components/ErrorBoundaryRoute';
import Infomation from './infomation/infomation';
import UserRestore from './list/user-restore';
import UserDetail from 'app/views/customer/user-management/import/detail/detail';
import CreateUser from 'app/views/customer/user-management/import/import';

//todo rename cho router
const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={match.url} component={UserRestore} />
    </Switch>
  </>
);

export default Routes;
