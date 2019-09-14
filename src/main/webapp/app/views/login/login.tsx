import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { IRootState } from 'app/reducers';
import { login } from 'app/actions/authentication';
import LoginModal from './login-modal';
import './login.scss';
import { hasAnyAuthority } from 'app/common/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';
import Slider from 'react-slick';

import bg1 from 'app/assets/utils/images/originals/city.jpg';
import bg2 from 'app/assets/utils/images/originals/citydark.jpg';
import bg3 from 'app/assets/utils/images/originals/citynights.jpg';

export interface ILoginProps extends StateProps, DispatchProps, RouteComponentProps<{}> {}

export interface ILoginState {
  showModal: boolean;
}

export class Login extends React.Component<ILoginProps, ILoginState> {
  state: ILoginState = {
    showModal: this.props.showModal
  };

  componentDidUpdate(prevProps: ILoginProps, prevState) {
    if (this.props !== prevProps) {
      this.setState({ showModal: this.props.showModal });
    }
  }

  handleLogin = (accessToken, rememberMe = false) => {
    this.props.login(accessToken, rememberMe);
  };

  handleClose = () => {
    this.setState({ showModal: false });
    this.props.history.push('/');
  };

  render() {
    let settings = {
      dots: true,
      infinite: true,
      speed: 500,
      arrows: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      initialSlide: 0,
      autoplay: true,
      adaptiveHeight: true
    };
    const { location, isAuthenticated, isAdmin, isConverter, isInterviewer } = this.props;
    console.info(this.props.account);
    let pathName = '/';
    if (isAdmin) pathName = '/tracking-schedule/plan';
    else if (isInterviewer) pathName = '/management-schedule';
    else if (isConverter) pathName = '/book-schedule/list';
    // const { from } = location.state || { from: { pathname: pathName, search: location.search } };
    const { from } = { from: { pathname: pathName, search: location.search } };
    const { showModal } = this.state;
    if (isAuthenticated) {
      return <Redirect to={from} />;
    }
    return (
      <Fragment>
        <div className="h-100">
          <Row className="h-100 no-gutters">
            <Col lg="4" className="d-none d-lg-block">
              <div className="slider-light">
                <Slider {...settings}>
                  <div className="h-100 d-flex justify-content-center align-items-center bg-plum-plate">
                    <div
                      className="slide-img-bg"
                      style={{
                        backgroundImage: 'url(' + bg1 + ')'
                      }}
                    />
                    <div className="slider-content">
                      <p>
                        ArchitectUI is like a dream. Some think it's too good to be true! Extensive collection of unified React Boostrap
                        Components and Elements.
                      </p>
                    </div>
                  </div>
                  <div className="h-100 d-flex justify-content-center align-items-center bg-premium-dark">
                    <div
                      className="slide-img-bg"
                      style={{
                        backgroundImage: 'url(' + bg3 + ')'
                      }}
                    />
                    <div className="slider-content">
                      <p>
                        Easily exclude the components you don't require. Lightweight, consistent Bootstrap based styles across all elements
                        and components
                      </p>
                    </div>
                  </div>
                  <div className="h-100 d-flex justify-content-center align-items-center bg-sunny-morning">
                    <div
                      className="slide-img-bg opacity-6"
                      style={{
                        backgroundImage: 'url(' + bg2 + ')'
                      }}
                    />
                    <div className="slider-content">
                      <p>We've included a lot of components that cover almost all use cases for any type of application.</p>
                    </div>
                  </div>
                </Slider>
              </div>
            </Col>
            <Col lg="8" md="12" className="h-100 d-flex bg-white justify-content-center align-items-center">
              <Col lg="9" md="10" sm="12" className="mx-auto app-login-box">
                <div className="app-logo" />
                <h4 className="mb-0">
                  <div>Welcome to my service,</div>
                  <span>Please sign in to your account.</span>
                </h4>
                <h6 className="mt-3">
                  No account?{' '}
                  <a href="javascript:void(0);" className="text-primary">
                    Sign up now
                  </a>
                </h6>
                <Row className="divider" />
                <div>
                  <Form>
                    <Row form>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="Email">Email</Label>
                          <Input type="email" name="email" id="Email" placeholder="Email here..." />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="Password">Password</Label>
                          <Input type="password" name="password" id="Password" placeholder="Password here..." />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="merchantCode">Merchant Code</Label>
                          <Input type="merchantCode" name="merchantCode" id="merchantCode" placeholder="Merchant Code here..." />
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup check>
                      <Input type="checkbox" name="check" id="exampleCheck" />
                      <Label for="exampleCheck" check>
                        Keep me logged in
                      </Label>
                    </FormGroup>
                    <Row className="divider" />
                    <div className="d-flex align-items-center">
                      <div className="ml-auto">
                        <a href="javascript:void(0);" className="btn-lg btn btn-link">
                          Recover Password
                        </a>{' '}
                        <Button color="primary" size="lg">
                          Login to Dashboard
                        </Button>
                      </div>
                    </div>
                  </Form>
                </div>
              </Col>
            </Col>
          </Row>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ authentication }: IRootState) => ({
  isAuthenticated: authentication.isAuthenticated,
  loginError: authentication.loginError,
  showModal: authentication.showModalLogin,
  isAdmin: hasAnyAuthority(authentication.account.roles, [AUTHORITIES.ADMIN]),
  isConverter: hasAnyAuthority(authentication.account.roles, [AUTHORITIES.CONVERTER]),
  isInterviewer: hasAnyAuthority(authentication.account.roles, [AUTHORITIES.INTERVIEWER]),
  account: authentication.account
});

const mapDispatchToProps = { login };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
