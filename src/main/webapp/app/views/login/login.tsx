import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { IRootState } from 'app/reducers';
import { login } from 'app/actions/authentication';
import './login.scss';
import { hasAnyAuthority } from 'app/common/auth/private-route';
import { AUTHORITIES, messages } from 'app/config/constants';
import { openModal, closeModal } from 'app/actions/modal';
import { Loader as LoaderAnim } from 'react-loaders';
import Loader from 'react-loader-advanced';
import { Translate, translate } from 'react-jhipster';

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
    let { login } = this.props;
    let submitValue = {
      email: valueEmail,
      password: valuePassword,
      merchantCode: valueMerchantCode
    };
    this.validateForm();
    if (valueEmail && valuePassword && valueMerchantCode) {
      login(submitValue);
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
        messageErrorEmail: (
          <label className="message-error">
            <Translate contentKey="login.messages.error.mail-error" />
          </label>
        )
      });
    }
    if (valuePassword) {
      this.setState({
        messageErrorPassword: ''
      });
    } else {
      this.setState({
        messageErrorPassword: (
          <label className="message-error">
            <Translate contentKey="login.messages.error.pass-error" />
          </label>
        )
      });
    }
    if (valueMerchantCode) {
      this.setState({
        messageErrorMerchantCode: ''
      });
    } else {
      this.setState({
        messageErrorMerchantCode: (
          <label className="message-error">
            {' '}
            <Translate contentKey="login.messages.error.code-error" />
          </label>
        )
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
    const { location, isAuthenticated, /*isAdmin,*/ isConverter, loading, isInterviewer, loginError, modalState, account } = this.props;
    let pathName = 'app/views/administration/user-management';
    const { from } = { from: { pathname: pathName, search: location.search } };
    if (isAuthenticated) {
      return <Redirect to={from} />;
    }
    const spinner1 = <LoaderAnim color="#ffffff" type="ball-pulse" />;
    return (
      <Loader message={spinner1} show={loading} priority={1}>
        <Fragment>
          <div className="h-100">
            <Row className="h-100 no-gutters">
              <Col lg="12" md="12" className="h-100 d-flex bg-white justify-content-center align-items-center">
                <Col lg="9" md="10" sm="12" className="mx-auto app-login-box">
                  <Row className="divider" />
                  <div>
                    <Form>
                      <Row form>
                        <Col lg={7}>
                          <FormGroup>
                            <Label for="merchantCode">
                              <Translate contentKey="login.form.merchant" />
                            </Label>
                            <Input
                              maxLength="160"
                              type="merchantCode"
                              name="merchantCode"
                              value={this.state.valueMerchantCode}
                              onChange={this.handleChangeMerchantCode}
                              id="merchantCode"
                              placeholder={translate('login.form.code-placeholder')}
                            />
                            {this.state.messageErrorMerchantCode}
                          </FormGroup>
                        </Col>
                        <Col lg={7}>
                          <FormGroup>
                            <Label for="Email">
                              <Translate contentKey="login.form.email" />{' '}
                            </Label>
                            <Input
                              maxLength="160"
                              type="email"
                              name="email"
                              value={this.state.valueEmail}
                              onChange={this.handleChangeEmail}
                              id="Email"
                              placeholder={translate('login.form.email-placeholder')}
                            />
                            {this.state.messageErrorEmail}
                          </FormGroup>
                        </Col>
                        <Col lg={7}>
                          <FormGroup>
                            <Label for="Password">
                              <Translate contentKey="login.form.password" />
                            </Label>
                            <Input
                              maxLength="160"
                              type="password"
                              name="password"
                              value={this.state.valuePassword}
                              onChange={this.handleChangePass}
                              id="Password"
                              placeholder={translate('login.form.password-placeholder')}
                            />
                            {this.state.messageErrorPassword}
                          </FormGroup>
                        </Col>
                      </Row>
                      <FormGroup check>
                        <Input type="checkbox" name="check" id="exampleCheck" />
                        <Label for="exampleCheck" check>
                          <Translate contentKey="login.get-login" />
                        </Label>
                      </FormGroup>
                      <Row className="divider" />
                      <div className="d-flex align-items-center">
                        <div className="ml-auto">
                          <a href="javascript:void(0);" className="btn-lg btn btn-link">
                            <Translate contentKey="login.password.forgot" />
                          </a>{' '}
                        </div>
                      </div>
                    </Form>
                    <Button color="primary" size="lg" onClick={this.submitForm}>
                      <Translate contentKey="login.form.button" />
                    </Button>
                  </div>
                </Col>
              </Col>
            </Row>
          </div>
        </Fragment>
      </Loader>
    );
  }
}

const mapStateToProps = ({ authentication, handleModal }: IRootState) => ({
  isAuthenticated: authentication.isAuthenticated,
  loginError: authentication.loginError,
  showModal: authentication.showModalLogin,
  isAdmin: hasAnyAuthority(authentication.account.roles, [AUTHORITIES.ADMIN]),
  isConverter: hasAnyAuthority(authentication.account.roles, [AUTHORITIES.CONVERTER]),
  isInterviewer: hasAnyAuthority(authentication.account.roles, [AUTHORITIES.INTERVIEWER]),
  account: authentication.account,
  modalState: handleModal.data,
  loading: authentication.loading,
  message: authentication.errorMessage
});

const mapDispatchToProps = { login, openModal, closeModal };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
