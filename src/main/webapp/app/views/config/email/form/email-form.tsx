import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import CKEditor from 'ckeditor4-react';
import { Input, Icon, Row, Checkbox, Button, Modal, Popover, Tabs } from 'antd';
import { Table, ButtonGroup, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button as Btn } from 'reactstrap';
import { Translate, translate } from 'react-jhipster';
import { IRootState } from 'app/reducers';
import LoaderAnim from 'react-loaders';
import Loader from 'react-loader-advanced';
import SweetAlert from 'sweetalert-react';
import { IContentParams, IEmailSave } from 'app/common/model/email-config.model';
import { GROUP_PARAM } from 'app/constants/email-config';
import {
  getContentParamAction, createEmailAction, getEmailDetailAction, editEmailAction
} from 'app/actions/email-config';
import './email-form.scss';
import { RouteComponentProps } from 'react-router-dom';
import CkeditorFixed from 'app/layout/ckeditor/CkeditorFixed';
import EditorPreview from './editor-preview'

interface IEmailFormManagementProps extends StateProps, DispatchProps, RouteComponentProps<{ id: any }> { }
interface IEmailFormManagementState {
  visiblePopOver: boolean;
  activeKey: string;
  contentParams: IContentParams[];
  emailsave: IEmailSave;
  messageErrorEmailName: any;
  messageErrorEmailSubject: any;
}


const { TabPane } = Tabs;
const groupParams = [
  {
    "name": "EVoucher",
    "code": GROUP_PARAM.E_VOUCHER
  },
  {
    "name": "Contact",
    "code": GROUP_PARAM.CUSTOMER
  },
  {
    "name": "Campaign",
    "code": GROUP_PARAM.CAMPAIGN
  }
];

class EmailFormManagement extends React.Component<IEmailFormManagementProps, IEmailFormManagementState> {
  state: IEmailFormManagementState = {
    visiblePopOver: false,
    activeKey: groupParams[0].code,
    contentParams: [],
    emailsave: {},
    messageErrorEmailName: '',
    messageErrorEmailSubject: ''
  };

  componentDidMount = async () => {
    let emailId = this.props.match.params.id;
    if (emailId) {
      await this.props.getEmailDetailAction(emailId);
      this.setState({
        emailsave: {
          id: this.props.emailDetail.id,
          name: this.props.emailDetail.name,
          subject: this.props.emailDetail.subject,
          content: this.props.emailDetail.content
        }
      });
    }
    await this.props.getContentParamAction();
    this.getContentParam(this.state.activeKey);
  }

  back = () => {
    location.assign('#/app/views/config/emails');
  }

  onChangeInput = (value, field) => {
    let emailSave = this.state.emailsave;
    emailSave[field] = value;
    this.setState({
      emailsave: emailSave
    });
    switch (field) {
      case 'name':
        this.validateEmailName(emailSave); break;
      case 'subject':
        this.validateEmailSubject(emailSave); break;
      default: break;
    }
  }


  validateEmailName(emailSave: IEmailSave) {
    if (emailSave && emailSave.name && emailSave.name.trim() !== '') {
      this.setState({
        messageErrorEmailName: ''
      });
    } else {
      this.setState({
        messageErrorEmailName: (<div><label className="message-error" style={{ color: 'red', marginLeft: '90px' }}>Tên email không được để trống</label></div>)
      });
    }
  }

  validateEmailSubject(emailSave: IEmailSave) {
    if (emailSave && emailSave.subject && emailSave.subject.trim() !== '') {
      this.setState({
        messageErrorEmailSubject: ''
      });
    } else {
      this.setState({
        messageErrorEmailSubject: (<div><label className="message-error" style={{ color: 'red', marginLeft: '90px' }}>Tiêu đề email không được để trống</label></div>)
      });
    }
  }

  validateForm = (emailSave: IEmailSave) => {
    this.validateEmailName(emailSave);
    this.validateEmailSubject(emailSave);
    if (emailSave.name && emailSave.name.trim() !== ''
      && emailSave.subject && emailSave.subject.trim() !== '') {
      return true;
    }
    return false;
  };

  saveEmail = () => {
    let emailId = this.props.match.params.id;
    let url = this.props.match.url;
    let { emailsave } = this.state;
    if (this.validateForm(emailsave)) {
      let emailSaveValidate = {
        ...emailsave,
        name: emailsave.name.trim(),
        subject: emailsave.subject.trim(),
      }

      // update
      if (emailId && url && url.includes('edit')) {
        this.props.editEmailAction(emailId, emailSaveValidate);
      } else {
        // create, copy
        this.props.createEmailAction(emailSaveValidate);
      }

    }
  }

  title = (<div className="title-content-param">
    <label>Add a Persionaliztion</label>
    <Button
      onClick={() => { this.handleVisibleChange(false) }}
    >
      <i className="pe-7s-close-circle" />
    </Button>
  </div>);

  getContentParam = activeKey => {
    this.setState({
      activeKey,
      contentParams: this.props.contentParams.filter(item => item.groupParam === activeKey)
    });
  };

  handleVisibleChange = visible => {
    this.setState({ visiblePopOver: visible });
  };

  content = () => {
    let content = (<div className="content-param">
      <Tabs tabPosition={'left'} onChange={this.getContentParam} defaultActiveKey={this.state.activeKey}>
        {groupParams ? groupParams.map((item, index) =>
          (<TabPane tab={item.name} key={item.code}>
            {this.state.contentParams ? this.state.contentParams.map((item, index) => (
              <div className="tabs-param" key={index}><label onClick={() => { this.selectParam(item.paramCode) }}>{item.paramName}</label></div>
            )) : ''}
          </TabPane>)
        ) : ''}
      </Tabs>
    </div>);
    return content;
  }

  onEditorChange = event => {
    let emailSave = this.state.emailsave;
    emailSave.content = event.editor.getData();
    this.setState({
      emailsave: emailSave
    });
  };

  selectParam = paramCode => {
    let sel, range;
    let newWindow = document.getElementsByTagName('iframe')[0].contentWindow;

    if (newWindow.getSelection()) {
      sel = newWindow.getSelection();
      if (sel.rangeCount) {
        range = sel.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createTextNode(paramCode + ' '));
      }
    }

    let newValue = document.getElementsByTagName('iframe')[0].contentWindow.document;
    this.setState({
      emailsave: {
        ...this.state.emailsave,
        content: newValue.documentElement.outerHTML
      }
    });
  };

  render() {
    let { emailsave, messageErrorEmailName, messageErrorEmailSubject } = this.state;
    const spinner1 = <LoaderAnim type="ball-pulse" active={true} />;
    console.log('aaaaaaaaaaaaaaaaaaaaa', emailsave)
    return (
      <Loader message={spinner1} show={false} priority={1}>
        <Fragment>
          <div className="email-form-management">
            <div className="email-form-title-header">
              <Button onClick={this.back}>Back</Button>
              <div className="button-group">
                <Button color="primary" onClick={this.saveEmail}>
                  Save
                      </Button>
                <Button color="primary" style={{ marginLeft: "5px" }}>
                  Save as Template
                      </Button>
              </div>
            </div>
            <div className="email-form-body">
              <div className="email-input-group">
                <label>Email Name</label>
                <Input
                  className="tab-info"
                  id="email-name"
                  type="text"
                  placeholder=""
                  value={emailsave.name}
                  onChange={event => this.onChangeInput(event.target.value, 'name')}
                  maxLength={160}
                />
              </div>
              {messageErrorEmailName}
              <div className="email-input-group">
                <label>Email Subject</label>
                <Input
                  className="tab-info"
                  id="email-subject"
                  type="text"
                  placeholder=""
                  value={emailsave.subject}
                  onChange={event => this.onChangeInput(event.target.value, 'subject')}
                  maxLength={160}
                />
              </div>
              {messageErrorEmailSubject}
              <div className="email-content">
                <div style={{ float: 'right' }}>
                  <Popover placement="leftTop"
                    title={this.title}
                    content={this.content()}
                    visible={this.state.visiblePopOver}
                    onVisibleChange={this.handleVisibleChange}
                    trigger="click">
                    <Button>Variables</Button>
                  </Popover>
                </div>
                <div style={{ clear: 'both' }}></div>
                <div style={{ marginTop: '10px' }}>
                  <CKEditor
                    id={'ckeditor'}
                    data={emailsave.content}
                    config={{
                      extraPlugins: 'stylesheetparser'
                    }}
                    onBeforeLoad={CKEDITOR => (CKEDITOR.disableAutoInline = true)}
                    onChange={this.onEditorChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      </Loader>
    );
  }
}

const mapStateToProps = ({ emailConfigState }: IRootState) => ({
  contentParams: emailConfigState.contentParams,
  emailDetail: emailConfigState.emailDetail
});

const mapDispatchToProps = {
  getContentParamAction,
  createEmailAction,
  editEmailAction,
  getEmailDetailAction
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailFormManagement);
