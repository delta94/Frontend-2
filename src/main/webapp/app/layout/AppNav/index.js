import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import MetisMenu from 'react-metismenu';

class AppNav extends Component {

    state = {};

    render() {
        const { menu } = this.props
        console.log(menu)
        let nameNav;
        menu && menu.length ? nameNav = this.props.menu.map(event => {
            let mainContent = event.permissions.map(item => {
                let mainNav = {
                    label: String(item.name),
                    to: '#/' + String(item.path),
                    icon: event.icon
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
            icon: 'pe-7s-plugin',
            label: "Hướng dẫn sử dụng",
            to: "https://membership-userguide.herokuapp.com/"
        }
        nameNav ? nameNav.push(guide) : ''
        console.log('menu', nameNav)

        return (
            <Fragment>
                {nameNav && nameNav.map((item, key) => {
                    return (
                        <Fragment key={key}>
                            <h5 className="app-sidebar__heading"><a href={item.to ? item.to : 'javascript:void(0);'}>{item.label}</a></h5>
                            <MetisMenu content={item.content} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down" />
                        </Fragment>
                    )
                })}
            </Fragment>
        );
    }

    isPathActive(path) {
        return this.props.location.pathname.startsWith(path);
    }
}

export default withRouter(AppNav);
