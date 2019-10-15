import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/common/error/error-boundary-route';
import Infomation from './infomation/infomation';
import UserManagement from './list/user-management';
import UserDetail from 'app/views/administration/user-management/user-detail';
import CreateUser from 'app/views/administration/user-management/import/import';
import SelectField from 'app/views/administration/user-management/import/select-field/select-field';

//todo rename cho router
const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CreateUser} />
      <ErrorBoundaryRoute exact path={`${match.url}/results-files`} component={UserDetail} />
      <ErrorBoundaryRoute exact path={match.url} component={UserManagement} />
      <ErrorBoundaryRoute exact path={`${match.url}/info`} component={Infomation} />
      <ErrorBoundaryRoute exact path={`${match.url}/select-fields`} component={SelectField} />
    </Switch>
  </>
);

export default Routes;
