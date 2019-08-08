import './sidebar.scss';

import React from 'react';
import { Translate } from 'react-jhipster';
import { Col, Row } from 'reactstrap';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { DateClicking } from 'fullcalendar';

const Sidebar = props => (
  <SideNav
    expanded={props.show}
    onToggle={expanded => {
      // debugger
      // this.setState({ expanded });
    }}
    onSelect={selected => {
      // debugger
      // Add your code here
      var elements = document.getElementsByClassName('menuItem sidenav---sidenav-navitem---uwIJ-');
      for (var i = 0; i < elements.length; i++) {
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
      var elementsChildItem = document.getElementsByClassName('sidenav---sidenav-subnavitem---1cD47');
      for (var i = 0; i < elementsChildItem.length; i++) {
        if (elementsChildItem[i].classList.contains('sidenav---selected---1EK3y')) {
          elementsChildItem[i].classList.remove('sidenav---selected---1EK3y');
        }
      }
      var elementMySchedule = document.getElementsByClassName('myschedule');
      var elementManagerSchedule = document.getElementsByClassName('managerschedule');
      var elementBookSchedule = document.getElementsByClassName('bookschedule');
      var elementbooklistitem = document.getElementsByClassName('booklistitem');
      var elementbookscheduleitem = document.getElementsByClassName('bookscheduleitem');
      var elemenaddscheduleitem = document.getElementsByClassName('addscheduleitem');
      if (selected === 'report3') {
        elementMySchedule[0].classList.add('sidenav---highlighted---oUx9u');
        elementMySchedule[0].classList.add('sidenav---selected---1EK3y');
      }
      if (selected === 'report2') {
        elementManagerSchedule[0].classList.add('sidenav---highlighted---oUx9u');
        elementManagerSchedule[0].classList.add('sidenav---selected---1EK3y');
      }
      if (selected === 'book-schedule/list') {
        elementBookSchedule[0].classList.add('sidenav---highlighted---oUx9u');
        elementBookSchedule[0].classList.add('sidenav---expandable---3_dr7');
        elementBookSchedule[0].classList.add('sidenav---expanded---1KdUL');
        elementbooklistitem[0].classList.add('sidenav---selected---1EK3y');
      }
      if (selected === 'book-schedule/main') {
        elementBookSchedule[0].classList.add('sidenav---highlighted---oUx9u');
        elementBookSchedule[0].classList.add('sidenav---expandable---3_dr7');
        elementBookSchedule[0].classList.add('sidenav---expanded---1KdUL');
        elementbookscheduleitem[0].classList.add('sidenav---selected---1EK3y');
      }
      if (selected === 'book-schedule/auto') {
        elementBookSchedule[0].classList.add('sidenav---highlighted---oUx9u');
        elementBookSchedule[0].classList.add('sidenav---expandable---3_dr7');
        elementBookSchedule[0].classList.add('sidenav---expanded---1KdUL');
        elemenaddscheduleitem[0].classList.add('sidenav---selected---1EK3y');
      }
    }}
  >
    {/* <span> */}

    {/* <SideNav.Toggle show={props.show}/> */}
    {/* </span> */}
    {/* {
        if(
          props.show
        )? null : <SideNav.Toggle show={props.show}/>
    } */}
    <SideNav.Nav defaultSelected={props.isAdmin ? 'report2' : props.isInterviewer ? 'report3' : 'book-schedule/list'}>
      {/* <NavItem eventKey="home" className="menuItem">
        <NavIcon>
          <Link to="/">
            <img className="img-menuItem" src="/content/images/qt.svg" />
          </Link>
        </NavIcon>
        <NavText>
          <Link to="/">Home</Link>
        </NavText>
      </NavItem> */}
      {props.isAdmin || props.isInterviewer ? (
        <NavItem eventKey="report3" id="report3" className="menuItem myschedule">
          <NavIcon>
            <i className="fa fa-calendar" />
          </NavIcon>
          <NavText>
            <Link to="/management-schedule">Lịch phỏng vấn của tôi</Link>
          </NavText>
        </NavItem>
      ) : null}
      {props.isAdmin ? (
        <NavItem eventKey="report2" className="menuItem managerschedule">
          <NavIcon>
            <i className="fa fa-cog" />
          </NavIcon>
          <NavText>
            <Link to="/tracking-schedule/plan">Quản trị lịch phỏng vấn</Link>
          </NavText>
        </NavItem>
      ) : null}
      {props.isAdmin ? (
        <NavItem eventKey="decentralize" className="menuItem">
          <NavIcon>
            <i className="fa fa-address-book-o " />
          </NavIcon>
          <NavText>
            <Link to="/decentralize">Phân quyền người dùng</Link>
          </NavText>
        </NavItem>
      ) : null}
      {props.isAdmin || props.isConverter ? (
        <NavItem eventKey="report1" className="menuItem bookschedule">
          <NavIcon>
            <i className="fa fa-address-book" />
          </NavIcon>
          <NavText>
            <span className="side-nav-menu-bar">Đặt lịch phỏng vấn</span>
            <i className="fa fa-chevron-down" />
          </NavText>
          <NavItem eventKey="book-schedule/list" className="booklistitem">
            <NavText>
              <Link to="/book-schedule/list">Danh sách đặt lịch</Link>
            </NavText>
          </NavItem>
          {props.isAdmin ? (
            <NavItem eventKey="book-schedule/main" className="bookscheduleitem">
              <NavText>
                <Link to="/book-schedule/main">Đặt lịch ứng viên</Link>
              </NavText>
            </NavItem>
          ) : null}
          <NavItem eventKey="book-schedule/auto" className="addscheduleitem">
            <NavText>
              <Link to="/book-schedule/auto">Thêm ứng viên</Link>
            </NavText>
          </NavItem>
        </NavItem>
      ) : null}
    </SideNav.Nav>
  </SideNav>
);

export default Sidebar;
