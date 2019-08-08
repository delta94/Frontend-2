import React from 'react';
import SocialLogin from 'react-social-login';

export interface ISocialButtonProps {
  triggerLogin?: any;
  triggerLogout?: any;
  provider: string;
  appId: string;
  onLoginSuccess?: any;
  onLoginFailure?: any;
}

export interface ISocialButtonState {}

export class SocialButton extends React.Component<ISocialButtonProps, ISocialButtonState> {
  constructor(props) {
    super(props);
    // Create ref
    this.countdownRef = React.createRef();
  }
  // ref
  countdownRef;

  state: ISocialButtonState = {};

  render() {
    const { children, triggerLogin, triggerLogout, ...props } = this.props;
    const style = {
      background: '#eee',
      border: '1px solid black',
      borderRadius: '3px',
      display: 'inline-block',
      margin: '5px',
      padding: '10px 20px'
    };

    return (
      <div onClick={() => triggerLogin} style={style} {...props}>
        {children}
      </div>
    );
  }
}

export default SocialLogin(SocialButton);
