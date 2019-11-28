import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import MetisMenu from 'react-metismenu';

import { MainNav, ComponentsNav, FormsNav, WidgetsNav, ChartsNav } from './NavItems';

class Nav extends Component {

    state = {};

    render() {
        const { menu } = this.props
        let nameNav;
        menu && menu.length ? nameNav = this.props.menu.map(event => {
            let mainContent = event.permissions.map(item => {
                let mainNav = {
                    label: String(item.name),
                    to: '#/' + String(item.path)
                }
                return mainNav
            })
            let nav = {
                icon: event.icon,
                label: String(event.name),
                content: mainContent
            }
            return nav
        }) : null
      
        let guide = {
            icon : 'pe-7s-plugin',
            label : "Hướng dẫn sử dụng",
            to : "https://membership-userguide.herokuapp.com/"
        }
        nameNav ? nameNav.push(guide) : ''
        
        return (
            <Fragment>
                <h5 className="app-sidebar__heading">Menu</h5>
                <MetisMenu content={nameNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down" />
            </Fragment>
        );
    }

    isPathActive(path) {
        return this.props.location.pathname.startsWith(path);
    }
}

export default withRouter(Nav);