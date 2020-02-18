import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import React, { Suspense, lazy, Fragment } from 'react';

import { ToastContainer } from 'react-toastify';
import LoaderAnim from 'react-loaders';

const Admin = lazy(() => import('app/views/customer'));
const Pages = lazy(() => import('app/views/pages'));
const Login = lazy(() => import('app/views/login'));
const Config = lazy(() => import('app/views/config'));
const CampaginAuto = lazy(() => import('app/views/campaign'));
const CampaginManagament = lazy(() => import('app/views/campaign/campaign-automation/campaign-managament'));
const GGeditor = lazy(() => import('app/views/ggeditor'));
// const UserPages = lazy(() => import('app/DemoPages/UserPages'));
// const Applications = lazy(() => import('app/DemoPages/Applications'));
// const Dashboards = lazy(() => import('app/DemoPages/Dashboards'));

// const Widgets = lazy(() => import('app/DemoPages/Widgets'));
// const Elements = lazy(() => import('app/DemoPages/Elements'));
// const Components = lazy(() => import('app/DemoPages/Components'));
// const Charts = lazy(() => import('app/DemoPages/Charts'));
const Usercampaign = lazy(() => import('app/views/campaign/user-campaign'));
// const Tables = lazy(() => import('app/DemoPages/Tables'));

const AppRoutes = () => {
  return (
    <Fragment>
      {/* Login */}
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">{/* <Loader type="ball-pulse-rise" /> */}</div>
              <h6 className="mt-5">
                <LoaderAnim type="ball-pulse" active={true} />
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/flow" component={GGeditor} />
      </Suspense>

      {/* Login */}
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">{/* <Loader type="ball-pulse-rise" /> */}</div>
              <h6 className="mt-5">
                <LoaderAnim type="ball-pulse" active={true} />
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/login" component={Login} />
      </Suspense>

      {/* config email */}
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">{/* <Loader type="ball-pulse-rise" /> */}</div>
              <h6 className="mt-5">
                <LoaderAnim type="ball-pulse" active={true} />
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/app/views/config" component={Config} />
      </Suspense>

      {/* campaign */}
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">{/* <Loader type="ball-pulse-rise" /> */}</div>
              <h6 className="mt-5">
                <LoaderAnim type="ball-pulse" active={true} />
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/app/views/campaigns/campaign-auto" component={CampaginAuto} />
      </Suspense>

      {/* campaign */}
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">{/* <Loader type="ball-pulse-rise" /> */}</div>
              <h6 className="mt-5">
                <LoaderAnim type="ball-pulse" active={true} />
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/app/views/campaigns/campaign-managament" component={CampaginManagament} />
      </Suspense>

      {/* Admin */}
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">{/* <Loader type="ball-pulse-rise" /> */}</div>
              <h6 className="mt-5">
                <LoaderAnim type="ball-pulse" active={true} />
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/app/views/customers" component={Admin} />
      </Suspense>
      {/* Pages */}

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">{/* <Loader type="line-scale-party" /> */}</div>
              <h6 className="mt-3">
                <LoaderAnim type="ball-pulse" active={true} />
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/pages" component={Pages} />
      </Suspense>

      {/* Forms */}

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">{/* <Loader type="ball-pulse-rise" /> */}</div>
              <h6 className="mt-5">
                <LoaderAnim type="ball-pulse" active={true} />
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/app/views/campaigns/user-campaign" component={Usercampaign} />
      </Suspense>

      {/* Charts */}

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">{/* <Loader type="ball-rotate" /> */}</div>
              <h6 className="mt-3">
                <LoaderAnim type="ball-pulse" active={true} />
              </h6>
            </div>
          </div>
        }
      >
        {/*<Route path="/charts" component={Charts} />*/}
      </Suspense>

      {/* Tables */}

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">{/* <Loader type="ball-pulse-rise" /> */}</div>
              <h6 className="mt-5">
                <LoaderAnim type="ball-pulse" active={true} />
              </h6>
            </div>
          </div>
        }
      >
        {/*<Route path="/tables" component={Tables} />*/}
      </Suspense>

      {/* Elements */}

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">{/* <Loader type="line-scale" /> */}</div>
              <h6 className="mt-3">
                <LoaderAnim type="ball-pulse" active={true} />
              </h6>
            </div>
          </div>
        }
      >
        {/*<Route path="/elements" component={Elements} />*/}
      </Suspense>

      {/* Dashboard Widgets */}

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">{/* <Loader type="ball-pulse-sync" /> */}</div>
              <h6 className="mt-3">
                <LoaderAnim type="ball-pulse" active={true} />
              </h6>
            </div>
          </div>
        }
      >
        {/*<Route path="/widgets" component={Widgets} />*/}
      </Suspense>

      {/* Applications */}

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">{/* <Loader type="ball-pulse"/> */}</div>
              <h6 className="mt-3">
                <LoaderAnim type="ball-pulse" active={true} />
              </h6>
            </div>
          </div>
        }
      >
        {/*<Route path="/apps" component={Applications} />*/}
      </Suspense>

      {/* Dashboards */}

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">{/* <Loader type="ball-grid-beat"/> */}</div>
              <h6 className="mt-3">
                <LoaderAnim type="ball-pulse" active={true} />
              </h6>
            </div>
          </div>
        }
      >
        {/*<Route path="/dashboards" component={Dashboards} />*/}
      </Suspense>

      <Route exact path="/" render={() => <Redirect to="/login" />} />
      <ToastContainer />
    </Fragment>
  );
};

export default AppRoutes;
