import React, { Fragment } from 'react';
import ErrorBoundaryRoute from 'app/common/components/ErrorBoundaryRoute';
import Home from './home/home'
import AppHeader from 'app/layout/AppHeader/';
import AppSidebar from 'app/layout/AppSidebar/';

const Routes = ({ match }) => (
  <Fragment>
    {/* <AppHeader /> */}
    <div className="app-main" style = {{paddingTop : "0px"}}>
      {/* <AppSidebar /> */}
      <div className="app-main__outer" style ={{paddingLeft : "unset"}}>
        <div className="app-main__inner">
          <ErrorBoundaryRoute path={`${match.url}`} component={Home} />
        </div>
      </div>
    </div>
  </Fragment>
);


export default Routes;
