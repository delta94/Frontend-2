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
import { string } from 'prop-types';

export interface ILoginProps extends StateProps, DispatchProps, RouteComponentProps<{}> {}

export interface ILoginState {
  valueEmail: string;
  valuePassword: string;
  valueMerchantCode: string;

  messageErrorEmail: any;
  messageErrorPassword: any;
  messageErrorMerchantCode: any;
}

export class Login extends React.Component<ILoginProps, ILoginState> {
  state: ILoginState = {
    valueEmail: '',
    valuePassword: '',
    valueMerchantCode: '',

    messageErrorEmail: '',
    messageErrorPassword: '',
    messageErrorMerchantCode: ''
  };

  submitForm = () => {
    let { valueEmail, valuePassword, valueMerchantCode } = this.state;
    let submitValue = {
      email: valueEmail,
      password: valuePassword,
      merchantCode: valueMerchantCode
    };
    this.validateForm();
    if (valueEmail && valuePassword && valueMerchantCode) {
      this.props.login(submitValue);
    }
  };

  validateForm = () => {
    let { valueEmail, valuePassword, valueMerchantCode } = this.state;

    if (valueEmail) {
      this.setState({
        messageErrorEmail: ''
      });
    } else {
      this.setState({
        messageErrorEmail: <label className="message-error">* Vui lòng nhập Email</label>
      });
    }
    if (valuePassword) {
      this.setState({
        messageErrorPassword: ''
      });
    } else {
      this.setState({
        messageErrorPassword: <label className="message-error">* Vui lòng nhập Email</label>
      });
    }
    if (valueMerchantCode) {
      this.setState({
        messageErrorMerchantCode: ''
      });
    } else {
      this.setState({
        messageErrorMerchantCode: <label className="message-error">* Vui lòng nhập MerchantCode</label>
      });
    }
  };

  handleChangeEmail = event => {
    this.setState({ valueEmail: event.target.value });
  };
  handleChangePass = event => {
    this.setState({ valuePassword: event.target.value });
  };
  handleChangeMerchantCode = event => {
    this.setState({ valueMerchantCode: event.target.value });
  };

  render() {
    const { location, isAuthenticated, isAdmin, isConverter, isInterviewer } = this.props;
    console.info(this.props.account);
    let pathName = '/';
    if (isAdmin) pathName = '/tracking-schedule/plan';
    else if (isInterviewer) pathName = '/management-schedule';
    else if (isConverter) pathName = '/book-schedule/list';
    // const { from } = location.state || { from: { pathname: pathName, search: location.search } };
    const { from } = { from: { pathname: pathName, search: location.search } };
    if (isAuthenticated) {
      return <Redirect to={from} />;
    }
    return (
      <Fragment>
        <div className="h-100">
          <Row className="h-100 no-gutters">
            <Col lg="12" md="12" className="h-100 d-flex bg-white justify-content-center align-items-center">
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
                      <Col lg={7}>
                        <FormGroup>
                          <Label for="Email">Email </Label>
                          <Input
                            type="email"
                            name="email"
                            value={this.state.valueEmail}
                            onChange={this.handleChangeEmail}
                            id="Email"
                            placeholder="Email here..."
                          />
                          {this.state.messageErrorEmail}
                        </FormGroup>
                      </Col>
                      <Col lg={7}>
                        <FormGroup>
                          <Label for="Password">Password</Label>
                          <Input
                            type="password"
                            name="password"
                            value={this.state.valuePassword}
                            onChange={this.handleChangePass}
                            id="Password"
                            placeholder="Password here..."
                          />
                          {this.state.messageErrorPassword}
                        </FormGroup>
                      </Col>
                      <Col lg={7}>
                        <FormGroup>
                          <Label for="merchantCode">Merchant Code</Label>
                          <Input
                            type="merchantCode"
                            name="merchantCode"
                            value={this.state.valueMerchantCode}
                            onChange={this.handleChangeMerchantCode}
                            id="merchantCode"
                            placeholder="Merchant Code here..."
                          />
                          {this.state.messageErrorMerchantCode}
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
                      </div>
                    </div>
                  </Form>
                  <Button color="primary" size="lg" onClick={this.submitForm}>
                    Login to Dashboard
                  </Button>
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
