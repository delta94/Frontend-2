import React from 'react';
import { connect } from 'react-redux';
import { Input } from 'antd';
import { IRootState } from 'app/reducers';
import LoaderAnim from 'react-loaders';
import Loader from 'react-loader-advanced';
import { updateEmailContentAction, updateEmailSettingAction } from 'app/actions/email-config';
import './add-email-wizard.scss';
import { RouteComponentProps } from 'react-router-dom';
import { IEmailPreviewProps } from 'app/views/email-management/add-email-wizard/email-preview';
import { IEmail, IEmailValidationMessage } from 'app/common/models/email-config.model';
import { EMAIL_CONFIG } from 'app/constants/email-config';

interface IEmailSettingProps extends StateProps, DispatchProps {}

interface IEmailSettingState {
  // emailDetail:IEmail,
  emailDetailValidationMessage: IEmailValidationMessage;
}

class EmailSetting extends React.Component<IEmailSettingProps, IEmailSettingState> {
  // public static defaultProps: IEmailSettingProps = {
  //   loading: false,
  //   emailDetail: null,
  //   updateEmailSettingAction:null,
  //   updateEmailContentAction:null,
  // };

  constructor(props: IEmailSettingProps) {
    super(props);
    this.state = {
      // emailDetail: props.emailDetail,
      emailDetailValidationMessage: {}
    };
  }

  _isEqual(data1: IEmail, data2: IEmail) {
    return data1 && data2 && data1.name === data2.name && data1.subject === data2.subject && data1.type === data2.type;
  }
  //
  // componentWillReceiveProps(nextProps:IEmailSettingProps) {
  //   if(!this._isEqual(nextProps.emailDetail, this.state.emailDetail)){
  //     this.setState({
  //       emailDetail: nextProps.emailDetail
  //     });
  //   }
  // }

  back = () => {
    location.assign('#/app/views/config/emails');
  };

  onChangeHandler = (value, field) => {
    // let {emailDetail} = this.props;
    switch (field) {
      case 'name':
        this.validateEmailName(value);
        break;
      case 'subject':
        this.validateEmailSubject(value);
        break;
      default:
        break;
    }
  };

  validateEmailName(name?: string) {
    let { emailDetailValidationMessage } = this.state;
    let isValid = name && name.trim() !== '';
    let validationMessage = isValid ? '' : 'Tên email không được để trống';
    let { updateEmailSettingAction, emailDetail } = this.props;
    updateEmailSettingAction({
      ...emailDetail,
      name: name
    });
    this.setState({
      // emailDetail: {
      //   ...emailDetail,
      //   name: name,
      // },
      emailDetailValidationMessage: {
        ...emailDetailValidationMessage,
        name: validationMessage
      }
    });
  }
  validateEmailSubject(subject?: string) {
    let { updateEmailSettingAction, emailDetail } = this.props;
    let { emailDetailValidationMessage } = this.state;
    let isValid = subject && subject.trim() !== '';
    let validationMessage = isValid ? '' : 'Tiêu đề email không được để trống';
    updateEmailSettingAction({
      ...emailDetail,
      subject: subject
    });
    this.setState({
      // emailDetail: {
      //   ...emailDetail,
      //   subject: subject,
      // },
      emailDetailValidationMessage: {
        ...emailDetailValidationMessage,
        subject: validationMessage
      }
    });
  }

  renderValidationMessage(message?: string) {
    if (message && message !== '') {
      return (
        <div>
          <label className="message-error" style={{ color: 'red', marginLeft: '0px' }}>
            * {message}
          </label>
        </div>
      );
    }
  }

  render() {
    let { loading } = this.props;
    let { emailDetail } = this.props;
    let { emailDetailValidationMessage } = this.state;
    const spinner = <LoaderAnim type="ball-pulse" active={true} />;
    return (
      <Loader message={spinner} show={loading} priority={1}>
        <div className="add-email-wizard-body">
          <div className="email-input-group">
            <label>Email Name</label>
            <Input
              className="tab-info"
              id="email-name"
              type="text"
              placeholder=""
              value={emailDetail.name}
              onChange={event => this.onChangeHandler(event.target.value, 'name')}
              maxLength={160}
            />
          </div>
          {this.renderValidationMessage(emailDetailValidationMessage.name)}
          <div className="email-input-group">
            <label>Email Subject</label>
            <Input
              className="tab-info"
              id="email-subject"
              type="text"
              placeholder=""
              value={emailDetail.subject}
              onChange={event => this.onChangeHandler(event.target.value, 'subject')}
              maxLength={160}
            />
          </div>
          {this.renderValidationMessage(emailDetailValidationMessage.subject)}
        </div>
      </Loader>
    );
  }
}

const mapStateToProps = ({ emailConfigState }: IRootState) => ({
  loading: emailConfigState.loading,
  emailDetail: emailConfigState.emailDetail
});

const mapDispatchToProps = {
  updateEmailSettingAction,
  updateEmailContentAction
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmailSetting);
