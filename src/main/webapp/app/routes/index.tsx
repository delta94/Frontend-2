import { Redirect, Route } from 'react-router-dom';
import React, { Fragment, lazy, Suspense } from 'react';

import { ToastContainer } from 'react-toastify';
import LoaderAnim from 'react-loaders';
const Home = lazy(()=> import('app/view'))
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

      {/* Charts */}
      <Suspense fallback={loader}>
        <Route path="/home" component={Home} />
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

      <Route exact path="/" render={() => <Redirect to="/home"/>}/>
      <ToastContainer/>
    </Fragment>
  );
};

export default AppRoutes;
