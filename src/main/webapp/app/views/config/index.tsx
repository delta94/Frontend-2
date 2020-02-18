import React, { Fragment } from 'react';
import ErrorBoundaryRoute from 'app/common/components/ErrorBoundaryRoute';
import AppHeader from 'app/layout/AppHeader/';
import AppSidebar from 'app/layout/AppSidebar/';
import PrivateRoute from '../../common/components/PrivateRoute';
import EmailManagement from './email/email';
import EmailForm from './email/form/email-form';
import EmailTemplateManagement from './email-template/email-template';

const Routes = ({ match }) => (
  <Fragment>
    <AppHeader />
    <div className="app-main">
      <AppSidebar />
      <div className="app-main__outer">
        <div className="app-main__inner">
          <ErrorBoundaryRoute path={`${match.url}/emails`} exact={true} component={EmailManagement} />
          <ErrorBoundaryRoute path={`${match.url}/emails/add`} exact={true} component={EmailForm} />
          <ErrorBoundaryRoute path={`${match.url}/emails/:id/edit`} exact={true} component={EmailForm} />
          <ErrorBoundaryRoute path={`${match.url}/emails/:id/copy`} exact={true} component={EmailForm} />
          <ErrorBoundaryRoute path={`${match.url}/email-template`} exact={true} component={EmailTemplateManagement} />
          <ErrorBoundaryRoute path={`${match.url}/emails/:idTemplate/copyTemplate`} exact={true} component={EmailForm} />

          <PrivateRoute path={`${match.url}/emails`} exact={true} component={EmailManagement} />
          <PrivateRoute path={`${match.url}/emails/add`} exact={true} component={EmailForm} />
          <PrivateRoute path={`${match.url}/emails/:id/edit`} exact={true} component={EmailForm} />
          <PrivateRoute path={`${match.url}/emails/:id/copy`} exact={true} component={EmailForm} />
          <PrivateRoute path={`${match.url}/email-template`} exact={true} component={EmailTemplateManagement} />
          <PrivateRoute path={`${match.url}/emails/:idTemplate/copyTemplate`} exact={true} component={EmailForm} />
        </div>
      </div>
    </div>
  </Fragment>
);

export default Routes;
