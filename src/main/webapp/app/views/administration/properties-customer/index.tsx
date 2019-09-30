import React from 'react';
import { Switch } from 'react-router-dom';
import ListProp from './list/properties-customer';
import Delete from './delete/delete';
import ErrorBoundaryRoute from 'app/common/error/error-boundary-route';
import PrivateRoute from '../../../common/auth/private-route';

//todo rename cho router
const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={Delete} />
      <ErrorBoundaryRoute exact path={match.url} component={ListProp} />
      {/* <ErrorBoundaryRoute exact path={`${match.url}/:id/update`} component={UserUpdate} /> */}
    </Switch>
  </>
);

export default Routes;
