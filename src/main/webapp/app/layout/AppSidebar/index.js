import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { Redirect } from 'react-router-dom';

import Nav from '../AppNav/VerticalNavWrapper';
import SweetAlert from 'sweetalert-react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import PerfectScrollbar from 'react-perfect-scrollbar';
import HeaderLogo from '../AppLogo';

import {
    setEnableMobileMenu
} from 'app/actions/theme-options';

class AppSidebar extends Component {

    state = {};

    toggleMobileSidebar = () => {
        let { enableMobileMenu, setEnableMobileMenu } = this.props;
        setEnableMobileMenu(!enableMobileMenu);

    }

    render() {
        let {
            backgroundColor,
            enableBackgroundImage,
            enableSidebarShadow,
            backgroundImage,
            backgroundImageOpacity,
            menu,
            isAuthenticated } = this.props;
        // let pathName = '/login';
        // const { from } = { from: { pathname: pathName, search: location.search } };
        // // let listUser = JSON.parse(localStorage.getItem('listUser'));
        // if (!isAuthenticated) {
        //     return <Redirect to={from} />;
        // }
        return (
            <Fragment>
                {/* <div className="sidebar-mobile-overlay" onClick={this.toggleMobileSidebar}/> */}
                <ReactCSSTransitionGroup
                    component="div"
                    className={cx("app-sidebar", backgroundColor, { 'sidebar-shadow': enableSidebarShadow })}
                    transitionName="SidebarAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={1500}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <HeaderLogo />
                    <PerfectScrollbar>
                        <div className="app-sidebar__inner">
                            <Nav menu={menu} />
                        </div>
                    </PerfectScrollbar>
                    <div
                        className={cx("app-sidebar-bg", backgroundImageOpacity)}
                        style={{
                            backgroundImage: enableBackgroundImage ? 'url(' + backgroundImage + ')' : null
                        }}>
                    </div>
                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    enableBackgroundImage: state.themeOptions.enableBackgroundImage,
    enableSidebarShadow: state.themeOptions.enableSidebarShadow,
    enableMobileMenu: state.themeOptions.enableMobileMenu,
    backgroundColor: state.themeOptions.backgroundColor,
    backgroundImage: state.themeOptions.backgroundImage,
    backgroundImageOpacity: state.themeOptions.backgroundImageOpacity,
    menu: state.authentication.account,
    isAuthenticated: state.authentication.isAuthenticated


});

const mapDispatchToProps = dispatch => ({

    setEnableMobileMenu: enable => dispatch(setEnableMobileMenu(enable)),


});

export default connect(mapStateToProps, mapDispatchToProps)(AppSidebar);