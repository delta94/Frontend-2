import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import cx from 'classnames';
import {withRouter} from 'react-router-dom';

import ResizeDetector from 'react-resize-detector';


import AppMain from '../../layout/AppMain';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            closedSmallerSidebar: false
        };

    }

    render() {
        let {
            colorScheme,
            enableFixedHeader,
            enableFixedSidebar,
            enableFixedFooter,
            enableClosedSidebar,
            closedSmallerSidebar,
            enableMobileMenu,
            enablePageTabsAlt,
        } = this.props;
        console.info('aaaa', this.props)
        return (
            <ResizeDetector
                handleWidth
                render={({ width }) => (
                    <Fragment>
                        <div className={cx(
                            "app-container app-theme-" + colorScheme,
                            {'fixed-header': enableFixedHeader},
                            {'fixed-sidebar': enableFixedSidebar || width < 1250},
                            {'fixed-footer': enableFixedFooter},
                            {'closed-sidebar': enableClosedSidebar || width < 1250},
                            {'closed-sidebar-mobile': closedSmallerSidebar || width < 1250},
                            {'sidebar-mobile-open': enableMobileMenu},
                            {'body-tabs-shadow-btn': enablePageTabsAlt},
                        )}>
                            <AppMain/>
                        </div>
                    </Fragment>
                )}
            />
        )
    }
}

const mapStateToProp = state => ({
    colorScheme: state.themeOptions.colorScheme,
    enableFixedHeader: state.themeOptions.enableFixedHeader,
    enableMobileMenu: state.themeOptions.enableMobileMenu,
    enableFixedFooter: state.themeOptions.enableFixedFooter,
    enableFixedSidebar: state.themeOptions.enableFixedSidebar,
    enableClosedSidebar: state.themeOptions.enableClosedSidebar,
    enablePageTabsAlt: state.themeOptions.enablePageTabsAlt,

});

export default withRouter(connect(mapStateToProp)(Main));