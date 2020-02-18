import React from 'react';
import { Switch } from 'react-router-dom';
import ListProp from './list/properties-customer';
import Delete from './delete/delete';
import Edit from './edit/edit';
import ErrorBoundaryRoute from 'app/common/components/ErrorBoundaryRoute';
import PrivateRoute from '../../../common/components/PrivateRoute';

//todo rename cho router
const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={Delete} />
      <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={Edit} />
      <ErrorBoundaryRoute exact path={match.url} component={ListProp} />
      {/* <ErrorBoundaryRoute exact path={`${match.url}/:id/update`} component={UserUpdate} /> */}
    </Switch>
  </>
);

export default Routes;
