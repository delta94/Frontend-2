import React from 'react';
import './menu.scss';
import MenuItem from 'app/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink as Link } from 'react-router-dom';
import { Translate, translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';
import SVGIcon from 'app/common/component/common-components';
import { Dropdown, UncontrolledDropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
const accountMenuItemsAuthenticated = (
  <>
    <MenuItem icon="wrench" to="/account/settings">
      <Translate contentKey="global.menu.account.settings">Settings</Translate>
    </MenuItem>
    <MenuItem icon="clock" to="/account/password">
      <Translate contentKey="global.menu.account.password">Password</Translate>
    </MenuItem>
    <MenuItem icon="sign-out-alt" to="/logout">
      <Translate contentKey="global.menu.account.logout">Sign out</Translate>
    </MenuItem>
  </>
);

const accountMenuItems = (
  <>
    <MenuItem id="login-item" icon="sign-in-alt" to="/login">
      <Translate contentKey="global.menu.account.login">Sign in</Translate>
    </MenuItem>
    <MenuItem icon="sign-in-alt" to="/register">
      <Translate contentKey="global.menu.account.register">Register</Translate>
    </MenuItem>
  </>
);

export const AccountMenu = ({ isAuthenticated = false }) => (
  <NavDropdown icon="user" name={translate('global.menu.account.main')} id="account-menu">
    {isAuthenticated ? accountMenuItemsAuthenticated : accountMenuItems}
  </NavDropdown>
);

export const LogoutMenu = ({ username, dropdownOpen, isToggle }) => (
  <div className="viewAccount">
    <Dropdown isOpen={dropdownOpen} toggle={isToggle}>
      <UncontrolledDropdown nav inNavbar>
        <div className="avt_first_name">
          <p className="box_first">
            {
              username
                .split(' ')
                .pop()
                .split('')[0]
            }
          </p>
          <DropdownToggle caret nav className="drop_down_logout" />
        </div>

        <DropdownMenu right>
          <div className="user_name">{username}</div>
          <a href="/#/logout" className="user_name">
            Logout
          </a>
        </DropdownMenu>
      </UncontrolledDropdown>
    </Dropdown>
  </div>
);

export const LoginMenu = () => (
  <div className="viewAccount">
    <a href="/#/login">
      <p>Đăng nhập</p>
      <SVGIcon name="login" />
    </a>
  </div>
);

export default AccountMenu;
