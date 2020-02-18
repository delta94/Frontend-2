import React, { Fragment } from 'react';
import CampaignManagement from '../campaign/user-campaign';
import ErrorBoundaryRoute from 'app/common/routes/error-boundary-route';
import UserManagement from './user-management';
import AppHeader from 'app/layouts/AppHeader/';
import AppSidebar from 'app/layouts/AppSidebar/';
import TagManagament from './tag-mangament/tag-mangament';
import PropertiesCustomer from './properties-customer';
import PrivateRoute from '../../common/routes/private-route';
import GroupAttributeCustomer from './group-attribute-customer/group-atrribute-customer';
// import CampaginAuto froapp/views/campaign/campaign-automation/list/campaign-automationion';

const Routes = ({ match }) => (
  <Fragment>
    <AppHeader />
    <div className="app-main">
      <AppSidebar />
      <div className="app-main__outer">
        <div className="app-main__inner">
          {/* <ErrorBoundaryRoute path={`${match.url}/campaign-auto`} component={CampaginAuto} /> */}
          <ErrorBoundaryRoute path={`${match.url}/user-management`} component={UserManagement} />
          <ErrorBoundaryRoute path={`${match.url}/user-campaign`} component={CampaignManagement} />
          <ErrorBoundaryRoute path={`${match.url}/tag-management`} component={TagManagament} />
          <ErrorBoundaryRoute path={`${match.url}/user-properties`} component={PropertiesCustomer} />
          <ErrorBoundaryRoute path={`${match.url}/user-group`} component={GroupAttributeCustomer} />

          <PrivateRoute path={`${match.url}/user-management`} component={UserManagement} />
          {/* <PrivateRoute path={`${match.url}/campaign-auto`} component={CampaginAuto} /> */}
          <PrivateRoute path={`${match.url}/user-campaign`} component={CampaignManagement} />
          <PrivateRoute path={`${match.url}/tag-management`} component={TagManagament} />
          <PrivateRoute path={`${match.url}/user-properties`} component={PropertiesCustomer} />
          <PrivateRoute path={`${match.url}/user-group`} component={GroupAttributeCustomer} />
          {/* <PrivateRoute path={`${match.url}/user-management`} component={UserManagement} hasAnyAuthorities={['Admin']} /> */}
        </div>
      </div>
    </div>
  </Fragment>
);

export default Routes;
