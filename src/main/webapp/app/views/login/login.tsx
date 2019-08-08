import React from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router-dom';

import { IRootState } from 'app/reducers';
import { login } from 'app/actions/authentication';
import LoginModal from './login-modal';
import './login.scss';
import { hasAnyAuthority } from 'app/common/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';

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
      <LoginModal showModal={showModal} handleLogin={this.handleLogin} handleClose={this.handleClose} loginError={this.props.loginError} />
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
