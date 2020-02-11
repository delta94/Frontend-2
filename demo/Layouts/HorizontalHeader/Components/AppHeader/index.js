import React, {Fragment} from 'react';
import cx from 'classnames';

import {connect} from 'react-redux';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import HeaderLogo from '../AppLogo/index';

import SearchBox from '../../../../../layout/AppHeader/Components/SearchBox';
import UserBox from '../../../../../layout/AppHeader/Components/UserBox';
import HeaderRightDrawer from "../../../../../layout/AppHeader/Components/HeaderRightDrawer";

import HeaderDots from "../../../../../layout/AppHeader/Components/HeaderDots";

class Header extends React.Component {
    render() {
        let {
            headerBackgroundColor,
            enableMobileMenuSmall
        } = this.props;
        return (
            <Fragment>
                <ReactCSSTransitionGroup
                    component="div"
                    className={cx("app-header", headerBackgroundColor)}
                    transitionName="HeaderAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={1500}
                    transitionEnter={false}
                    transitionLeave={false}>

                    <HeaderLogo/>

                    <div className={cx(
                        "app-header__content",
                        {'header-mobile-open': enableMobileMenuSmall},
                    )}>
                        <div className="app-header-left">
                            <SearchBox/>
                            <HeaderDots/>
                        </div>
                        <div className="app-header-right">
                            <UserBox/>
                            <HeaderRightDrawer/>
                        </div>
                    </div>
                </ReactCSSTransitionGroup>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    headerBackgroundColor: state.themeOptions.headerBackgroundColor,
    enableMobileMenuSmall: state.themeOptions.enableMobileMenuSmall,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Header);