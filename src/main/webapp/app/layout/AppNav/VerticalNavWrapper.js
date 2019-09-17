import React, {Component, Fragment} from 'react';
import {withRouter} from 'react-router-dom';

import MetisMenu from 'react-metismenu';

import {MainNav, ComponentsNav, FormsNav, WidgetsNav, ChartsNav} from './NavItems';

class Nav extends Component {

    state = {};

    render() {
        let menu = this.props;
        let nameNav ;
        menu && menu.length ? nameNav = menu.map(event => {
            let mainContent = event.permissions.map(item =>{
              let  mainNav = {
                   label : String(item.name),
                   to : '#/' + String(item.path)
               }
               return mainNav
            })
          
            console.log(mainContent)
            let nav ={
                icon : 'pe-7s-rocket',
                label : String(event.name),
                content :mainContent
            }
            return nav 
        }) : null;
        
        return (
            <Fragment>
                <h5 className="app-sidebar__heading">Menu</h5>
                <MetisMenu content={nameNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
            </Fragment>
        );
    }
    
    isPathActive(path) {
        return this.props.location.pathname.startsWith(path);
    }
}

export default withRouter(Nav);