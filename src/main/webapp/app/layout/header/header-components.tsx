import React from 'react';
import { Translate } from 'react-jhipster';

import { NavItem, NavLink, NavbarBrand } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SVGIcon from 'app/common/component/common-components';
import appConfig from 'app/config/constants';

export const BrandIcon = props => (
  <div {...props} className="brand-icon">
    <img src="/content/images/logo.png" alt="Logo" />
  </div>
);

export const Brand = props => (
  <NavbarBrand
    tag={Link}
    to={
      props.value === 'isAdmin' ? '/tracking-schedule/plan' : props.value === 'isConverter' ? '/book-schedule/list' : '/management-schedule'
    }
    className="brand-logo"
    onClick={props.onClick}
  >
    {/* <BrandIcon /> */}
    <span className="brand-title">
      <span>Osscar</span>
      <Translate contentKey="global.title">TopicaTaca</Translate>
    </span>

    {/* <span className="navbar-version">{appConfig.VERSION}</span> */}
  </NavbarBrand>
);

export const Home = props => (
  <NavItem>
    <NavLink tag={Link} to="/" className="d-flex align-items-center">
      <FontAwesomeIcon icon="home" />
      <span>
        <Translate contentKey="global.menu.home">Home</Translate>
      </span>
    </NavLink>
  </NavItem>
);

export const SearchInput = props => (
  <div {...props} className="search-input-header">
    <span>
      <Link to={`/search-result?key=${props.value}`} id="total-search">
        <SVGIcon name="search" />
      </Link>
    </span>
    <input placeholder="Tìm kiếm..." value={props.value} onChange={props.onChange} onKeyPress={props.onKeyPress} />
  </div>
);
