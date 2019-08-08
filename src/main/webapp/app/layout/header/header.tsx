import './header.scss';

import React from 'react';
import { Translate, Storage } from 'react-jhipster';
import { Navbar, Nav, NavbarToggler, NavbarBrand, Collapse } from 'reactstrap';

import LoadingBar from 'react-redux-loading-bar';
import { hasAnyAuthority } from 'app/common/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';
import { Home, Brand, SearchInput } from './header-components';
import { AccountMenu, LocaleMenu, LogoutMenu, LoginMenu } from '../menus';
import $ from 'jquery';
import { IRootState } from 'app/reducers';
import { connect } from 'react-redux';
export interface IHeaderProps extends StateProps, DispatchProps {
  isAuthenticated: boolean;
  currentLocale: string;
  onLocaleChange: Function;
  username: string;
}

export interface IHeaderState {
  menuOpen: boolean;
  keySearch: string;
  openModel: boolean;
  dropdownOpen: boolean;
}

export class Header extends React.Component<IHeaderProps, IHeaderState> {
  state: IHeaderState = {
    menuOpen: false,
    keySearch: '',
    openModel: false,
    dropdownOpen: false
  };

  handleLocaleChange = event => {
    const langKey = event.target.value;
    Storage.session.set('locale', langKey);
    this.props.onLocaleChange(langKey);
  };

  changeInput = event => {
    this.setState({
      ...this.state,
      keySearch: event.target.value
    });
    // this.props.handleSearchResult(event.target.value);
  };
  toggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  };
  keyPress = event => {
    if (event.key == 'Enter' && $('#total-search').length) {
      $('#total-search')[0].click();
    }
  };

  isToggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  redirectMenu = value => {
    let elements = document.getElementsByClassName('menuItem sidenav---sidenav-navitem---uwIJ-');
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].classList.contains('sidenav---highlighted---oUx9u')) {
        elements[i].classList.remove('sidenav---highlighted---oUx9u');
      }
      if (elements[i].classList.contains('sidenav---expandable---3_dr7')) {
        elements[i].classList.remove('sidenav---expandable---3_dr7');
      }
      if (elements[i].classList.contains('sidenav---expanded---1KdUL')) {
        elements[i].classList.remove('sidenav---expanded---1KdUL');
      }
      if (elements[i].classList.contains('sidenav---selected---1EK3y')) {
        elements[i].classList.remove('sidenav---selected---1EK3y');
      }
    }
    let elementsChildItem = document.getElementsByClassName('sidenav---sidenav-subnavitem---1cD47');
    for (let i = 0; i < elementsChildItem.length; i++) {
      if (elementsChildItem[i].classList.contains('sidenav---selected---1EK3y')) {
        elementsChildItem[i].classList.remove('sidenav---selected---1EK3y');
      }
    }
    let elementbooklistitem = document.getElementsByClassName('booklistitem');
    let elementMySchedule = document.getElementsByClassName('myschedule');
    let elementManagerSchedule = document.getElementsByClassName('managerschedule');
    let elementBookSchedule = document.getElementsByClassName('bookschedule');
    if (value === 'isAdmin') {
      elementManagerSchedule[0].classList.add('sidenav---highlighted---oUx9u');
      elementManagerSchedule[0].classList.add('sidenav---selected---1EK3y');
    }
    if (value === 'isInterviewer') {
      elementMySchedule[0].classList.add('sidenav---highlighted---oUx9u');
      elementMySchedule[0].classList.add('sidenav---selected---1EK3y');
    }
    if (value === 'isConverter') {
      elementBookSchedule[0].classList.add('sidenav---highlighted---oUx9u');
      elementBookSchedule[0].classList.add('sidenav---expandable---3_dr7');
      elementBookSchedule[0].classList.add('sidenav---expanded---1KdUL');
      elementbooklistitem[0].classList.add('sidenav---selected---1EK3y');
    }
  };

  render() {
    const { currentLocale, isAuthenticated, isAdmin, isConverter } = this.props;
    return (
      <div id="app-header">
        <LoadingBar className="loading-bar" />
        <Navbar dark expand="sm" fixed="top" className="jh-navbar">
          <NavbarToggler aria-label="Menu" onClick={this.toggleMenu} />
          {isAdmin ? (
            <Brand value="isAdmin" onClick={() => this.redirectMenu('isAdmin')} />
          ) : isConverter ? (
            <Brand value="isConverter" onClick={() => this.redirectMenu('isConverter')} />
          ) : (
            <Brand value="isInterviewer" onClick={() => this.redirectMenu('isInterviewer')} />
          )}
          <Collapse isOpen={this.state.menuOpen} navbar>
            <SearchInput ref="searchInput" onKeyPress={this.keyPress} onChange={this.changeInput} value={this.state.keySearch} />
            <Nav id="header-tabs" className="ml-auto" navbar>
              <div className="viewLanguages">
                <LocaleMenu currentLocale={currentLocale} onClick={this.handleLocaleChange} />
              </div>
              <a href="/#/admin">
                <p>Admin</p>
              </a>
              {/* <AccountMenu isAuthenticated={isAuthenticated} /> */}
              {isAuthenticated ? (
                <LogoutMenu dropdownOpen={this.state.dropdownOpen} isToggle={this.isToggle} username={this.props.username} />
              ) : (
                <LoginMenu />
              )}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
const mapStateToProps = ({ locale, authentication }: IRootState) => ({
  currentLocale: locale.currentLocale,
  isAdmin: hasAnyAuthority(authentication.account.roles, [AUTHORITIES.ADMIN]),
  isConverter: hasAnyAuthority(authentication.account.roles, [AUTHORITIES.CONVERTER]),
  isInterviewer: hasAnyAuthority(authentication.account.roles, [AUTHORITIES.INTERVIEWER]),
  account: authentication.account
});

const mapDispatchToProps = {};
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
