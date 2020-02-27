import React, { Fragment } from 'react';
import CampaignManagement from '../campaign/user-campaign';
import ErrorBoundaryRoute from 'app/common/components/ErrorBoundaryRoute';
import UserManagement from './user-management';
import UserRestore from './user-restore';
import AppHeader from 'app/layout/AppHeader/';
import AppSidebar from 'app/layout/AppSidebar/';
import TagManagement from './tag-management/tag-management';
import PropertiesCustomer from './properties-customer';
import PrivateRoute from '../../common/components/PrivateRoute';
import GroupAttributeCustomer from './group-attribute-customer/group-atrribute-customer';
// import CampaignAuto froapp/views/campaign/campaign-automation/list/campaign-automationion';

const Routes = ({ match }) => (
  <Fragment>
    <AppHeader />
    <div className="app-main">
      <AppSidebar />
      <div className="app-main__outer">
        <div className="app-main__inner">
          {/* <ErrorBoundaryRoute path={`${match.url}/campaign-auto`} component={CampaignAuto} /> */}
          <ErrorBoundaryRoute path={`${match.url}/user-management`} component={UserManagement} />
          <ErrorBoundaryRoute path={`${match.url}/user-campaign`} component={CampaignManagement} />
          <ErrorBoundaryRoute path={`${match.url}/tag-management`} component={TagManagement} />
          <ErrorBoundaryRoute path={`${match.url}/user-properties`} component={PropertiesCustomer} />
          <ErrorBoundaryRoute path={`${match.url}/user-group`} component={GroupAttributeCustomer} />
          <ErrorBoundaryRoute path={`${match.url}/user-restore`} component={UserRestore} />

          <PrivateRoute path={`${match.url}/user-management`} component={UserManagement} />
          {/* <PrivateRoute path={`${match.url}/campaign-auto`} component={CampaignAuto} /> */}
          <PrivateRoute path={`${match.url}/user-campaign`} component={CampaignManagement} />
          <PrivateRoute path={`${match.url}/tag-management`} component={TagManagement} />
          <PrivateRoute path={`${match.url}/user-properties`} component={PropertiesCustomer} />
          <PrivateRoute path={`${match.url}/user-group`} component={GroupAttributeCustomer} />
          {/* <PrivateRoute path={`${match.url}/user-management`} component={UserManagement} hasAnyAuthorities={['Admin']} /> */}
        </div>
      </div>
    </div>
  </Fragment>
);

export default Routes;
