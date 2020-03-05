import React, { Fragment } from 'react';
import ErrorBoundaryRoute from 'app/common/components/ErrorBoundaryRoute';
import FlowEditor from './flow-editor';
const FlowEditorRoutes = ({ match }) => (
  <Fragment>
    <ErrorBoundaryRoute path={`${match.url}`} exact={true} component={FlowEditor} />
  </Fragment>
);

export default FlowEditorRoutes;
