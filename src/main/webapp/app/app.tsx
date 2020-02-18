import 'react-toastify/dist/ReactToastify.css';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Card } from 'reactstrap';
import { HashRouter as Router } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { hot } from 'react-hot-loader';
import { Redirect } from 'react-router-dom';
import { IRootState } from 'app/reducers';
import { setLocale } from 'app/actions/locale';
import { getSession } from 'app/actions/auth';

import ErrorBoundary from 'app/common/components/ErrorBoundary';
import { hasAnyAuthority } from 'app/common/routes/private-route';
import { AUTHORITIES } from 'app/config/constants';
import AppRoutes from 'app/routes';
const baseHref = document
  .querySelector('base')
  .getAttribute('href')
  .replace(/\/$/, '');

import cx from 'classnames';
import ResizeDetector from 'react-resize-detector';
// Layout
import AppHeader from 'app/layouts/AppHeader/';
import AppSidebar from 'app/layouts/AppSidebar/';

export interface IAppProps extends StateProps, DispatchProps {}
export interface IAppState {
  closedSmallerSidebar: Boolean;
}
export class App extends React.Component<IAppProps, IAppState> {
  state: IAppState = {
    closedSmallerSidebar: false
  };

  componentDidMount = async () => {
    await this.props.getSession();
  };

  render() {
    let {
      colorScheme,
      enableFixedHeader,
      enableFixedSidebar,
      enableFixedFooter,
      enableClosedSidebar,
      enableMobileMenu,
      enablePageTabsAlt
    } = this.props;
    let { closedSmallerSidebar } = this.state;
    return (
      <Router basename={baseHref}>
        {/* <ResizeDetector
          handleWidth
          render={({ width }) => (
            <Fragment>
              <div
                className={cx(
                  'app-container app-theme-' + colorScheme,
                  { 'fixed-header': enableFixedHeader },
                  { 'fixed-sidebar': enableFixedSidebar || width < 1250 },
                  { 'fixed-footer': enableFixedFooter },
                  { 'closed-sidebar': enableClosedSidebar || width < 1250 },
                  { 'closed-sidebar-mobile': closedSmallerSidebar || width < 1250 },
                  { 'sidebar-mobile-open': enableMobileMenu },
                  { 'body-tabs-shadow-btn': enablePageTabsAlt }
                )}
              >
                <Fragment>
                  <AppHeader />
                  <div className="app-main">
                    <AppSidebar />
                    <div className="app-main__outer">
                      <div className="app-main__inner">
                        <AppRoutes />
                      </div>
                    </div>
                  </div>
                </Fragment>
              </div>
            </Fragment>
          )}
        /> */}
        <ResizeDetector
          handleWidth
          render={({ width }) => (
            <Fragment>
              <div
                className={cx(
                  'app-container app-theme-' + colorScheme,
                  { 'fixed-header': enableFixedHeader },
                  { 'fixed-sidebar': enableFixedSidebar || width < 1250 },
                  { 'fixed-footer': enableFixedFooter },
                  { 'closed-sidebar': enableClosedSidebar || width < 1250 },
                  { 'closed-sidebar-mobile': closedSmallerSidebar || width < 1250 },
                  { 'sidebar-mobile-open': enableMobileMenu },
                  { 'body-tabs-shadow-btn': enablePageTabsAlt }
                )}
              >
                <AppRoutes />
              </div>
            </Fragment>
          )}
        />
      </Router>
    );
  }
}

const mapStateToProps = ({ authentication, locale, themeOptions }: IRootState) => ({
  currentLocale: locale.currentLocale,
  isAuthenticated: authentication.isAuthenticated,
  account: authentication.account,
  colorScheme: themeOptions.colorScheme,
  enableFixedHeader: themeOptions.enableFixedHeader,
  enableMobileMenu: themeOptions.enableMobileMenu,
  enableFixedFooter: themeOptions.enableFixedFooter,
  enableFixedSidebar: themeOptions.enableFixedSidebar,
  enableClosedSidebar: themeOptions.enableClosedSidebar,
  enablePageTabsAlt: themeOptions.enablePageTabsAlt
});

const mapDispatchToProps = { setLocale, getSession };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(hot(module)(App));
