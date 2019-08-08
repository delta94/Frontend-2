import React from 'react';
import { Translate, translate } from 'react-jhipster';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Alert, Row, Col } from 'reactstrap';
import { GoogleLogin } from 'react-google-login';
import './login.scss';
import { IRootState } from 'app/reducers';
import { toast } from 'react-toastify';
import { login, logout } from 'app/actions/authentication';

export interface ILoginModalProps {
  showModal: boolean;
  loginError: boolean;
  handleLogin: Function;
  handleClose: Function;
}

class LoginModal extends React.Component<ILoginModalProps> {
  //   handleSubmit = (event, errors, { username, password, rememberMe }) => {
  //     const { handleLogin } = this.props;
  //     handleLogin(username, password, rememberMe);
  //   };

  constructor(props) {
    super(props);
    // This binding is necessary to make `this` work in the callback
    this.responseGoogleSuccess = this.responseGoogleSuccess.bind(this);
  }

  responseGoogleSuccess(response) {
    const rememberMe = false;
    if (window.gapi) {
      const auth2 = window.gapi.auth2.getAuthInstance();
      auth2.disconnect();
      // console.info(auth2);
    }
    const accessToken = {
      accessToken: response.accessToken
    };
    this.props.handleLogin(accessToken, rememberMe);
  }

  responseGoogleFail(response) {
    console.log(response);
    // toast.error('Login with Google fail.');
  }

  render() {
    const { loginError, handleClose } = this.props;
    let _this = this;
    return (
      <Modal isOpen={this.props.showModal} toggle={handleClose} backdrop="static" id="login-page" autoFocus={false}>
        <div className="login">
          <div className="viewLogin">
            <p>
              Osscar <span>Interview</span>
            </p>
            <div className="viewWithEmail">
              <div className="viewWithEmailText">Đăng nhập bằng email Topica</div>
            </div>
            <div className="viewLoginButton">
              <GoogleLogin
                clientId="376552122117-3gbla9tck36hm5jpfio87tcue458nk2s.apps.googleusercontent.com"
                onSuccess={this.responseGoogleSuccess}
                onFailure={this.responseGoogleFail}
                cookiePolicy={'single_host_origin'}
                isSignedIn={false}
                autoLoad={false}
                icon={false}
              >
                <i className="fa fa-google-plus" />
              </GoogleLogin>
            </div>
            <Row>
              <Col md="12">
                {loginError ? (
                  <div className="alertLoginFailure">
                    <Translate contentKey="login.messages.error.authentication">
                      <strong>Failed to sign in!</strong> Please check your credentials and try again.
                    </Translate>
                  </div>
                ) : // <Alert color="danger">
                // </Alert>
                null}
              </Col>
            </Row>
          </div>
          {/* <ModalHeader id="login-title" toggle={handleClose}>
            <Translate contentKey="login.title">Sign in</Translate>
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col md="12">
                {loginError ? (
                  <Alert color="danger">
                    <Translate contentKey="login.messages.error.authentication">
                      <strong>Failed to sign in!</strong> Please check your credentials and try again.
                    </Translate>
                  </Alert>
                ) : null}
              </Col>
              <Col md="12">
                <GoogleLogin
                  clientId="376552122117-3gbla9tck36hm5jpfio87tcue458nk2s.apps.googleusercontent.com"
                  buttonText="Sign in with Google"
                  onSuccess={this.responseGoogleSuccess}
                  onFailure={this.responseGoogleFail}
                  cookiePolicy={'single_host_origin'}
                  isSignedIn={false}
                  autoLoad={false}
                />
              </Col>
            </Row>
          </ModalBody> */}
          {/* <ModalFooter>
            <Button color="secondary" onClick={handleClose} tabIndex="1">
              <Translate contentKey="entity.action.cancel">Cancel</Translate>
            </Button>{' '}
          </ModalFooter> */}
        </div>
      </Modal>
    );
  }
}

export default LoginModal;
