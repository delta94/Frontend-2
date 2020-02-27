import { Redirect, Route } from 'react-router-dom';
import React, { Fragment, lazy, Suspense } from 'react';

import { ToastContainer } from 'react-toastify';
import LoaderAnim from 'react-loaders';

const Admin = lazy(() => import('app/views/customer'));
const Pages = lazy(() => import('app/views/pages'));
const Login = lazy(() => import('app/views/login'));
const Config = lazy(() => import('app/views/config'));
// const Campaign = lazy(() => import('app/views/campaign'));
const CampaignAuto = lazy(() => import('app/views/campaign/campaign-automation'));
const UserCampaign = lazy(() => import('app/views/campaign/user-campaign'));
const CampaignManagement = lazy(() => import('app/views/campaign/campaign-automation/campaign-management'));

const GGEditor = lazy(() => import('app/views/ggeditor'));
// const UserPages = lazy(() => import('app/DemoPages/UserPages'));
// const Applications = lazy(() => import('app/DemoPages/Applications'));
// const Dashboards = lazy(() => import('app/DemoPages/Dashboards'));

// const Widgets = lazy(() => import('app/DemoPages/Widgets'));
// const Elements = lazy(() => import('app/DemoPages/Elements'));
// const Components = lazy(() => import('app/DemoPages/Components'));
// const Charts = lazy(() => import('app/DemoPages/Charts'));
// const Tables = lazy(() => import('app/DemoPages/Tables'));

const AppRoutes = () => {
  const loader = (<div className="loader-container">
    <div className="loader-container-inner">
      {/*<div className="text-center">/!* <Loader type="ball-pulse-rise" /> *!/</div>*/}
      <h6 className="mt-5">
        <LoaderAnim type="ball-pulse" active={true}/>
      </h6>
    </div>
  </div>);
  return (
    <Fragment>
      {/* Login */}
      <Suspense fallback={loader}>
        <Route path="/flow" component={GGEditor}/>
      </Suspense>

      {/* Login */}
      <Suspense fallback={loader}>
        <Route path="/login" component={Login}/>
      </Suspense>

      {/* config email */}
      <Suspense fallback={loader}>
        <Route path="/app/views/config" component={Config}/>
      </Suspense>

      {/*<Suspense fallback={loader}>*/}
      {/*  <Route path="/app/views/campaigns" component={Campaign}/>*/}
      {/*</Suspense>*/}

      {/* campaign */}
      <Suspense fallback={loader}>
        <Route path="/app/views/campaigns/campaign-auto" component={CampaignAuto}/>
      </Suspense>

      {/* campaign */}
      <Suspense fallback={loader}>
        <Route path="/app/views/campaigns/user-campaign" component={UserCampaign}/>
      </Suspense>

      {/* campaign */}
      <Suspense fallback={loader}>
        <Route path="/app/views/campaigns/campaign-management" component={CampaignManagement}/>
      </Suspense>

      {/* Admin */}
      <Suspense fallback={loader}>
        <Route path="/app/views/customers" component={Admin}/>
      </Suspense>
      {/* Pages */}
      <Suspense fallback={loader}>
        <Route path="/pages" component={Pages}/>
      </Suspense>


      {/* Charts */}
      <Suspense fallback={loader}>
        {/*<Route path="/charts" component={Charts} />*/}
      </Suspense>

      {/* Tables */}
      <Suspense fallback={loader}>
        {/*<Route path="/tables" component={Tables} />*/}
      </Suspense>

      {/* Elements */}
      <Suspense fallback={loader}>
        {/*<Route path="/elements" component={Elements} />*/}
      </Suspense>

      {/* Dashboard Widgets */}
      <Suspense fallback={loader}>
        {/*<Route path="/widgets" component={Widgets} />*/}
      </Suspense>

      {/* Applications */}
      <Suspense fallback={loader}>
        {/*<Route path="/apps" component={Applications} />*/}
      </Suspense>

      {/* Dashboards */}
      <Suspense fallback={loader}>
        {/*<Route path="/dashboards" component={Dashboards} />*/}
      </Suspense>

      <Route exact path="/" render={() => <Redirect to="/login"/>}/>
      <ToastContainer/>
    </Fragment>
  );
};

export default AppRoutes;
