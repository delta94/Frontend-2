import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import CKEditor from 'ckeditor4-react';
import { Input, Button as Btn, Row, Popover, Tabs } from 'antd';
import { Table, Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Translate, translate } from 'react-jhipster';
import { IRootState } from 'app/reducers';
import LoaderAnim from 'react-loaders';
import Loader from 'react-loader-advanced';
import SweetAlert from 'sweetalert-react';
import { IContentParams, IEmailSave } from 'app/common/model/email-config.model';
import { GROUP_PARAM } from 'app/constants/email-config';
import {
  getContentParamAction, createEmailAction, editEmailAction, createEmailTemplateAction
} from 'app/actions/email-config';
import './email-form.scss';
import { RouteComponentProps } from 'react-router-dom';
import PreviewEmailLanding from '../../email-template/preview/preview';

interface IEmailFormManagementProps extends StateProps, DispatchProps, RouteComponentProps<{ id: any, idTemplate: any }> { }
interface IEmailFormManagementState {
  visiblePopOver: boolean;
  activeKey: string;
  contentParams: IContentParams[];
  emailsave: IEmailSave;
  messageErrorEmailName: any;
  messageErrorEmailSubject: any;
  openModal: boolean;
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
    messageErrorEmailSubject: '',
    openModal: false
  };

  async componentDidMount() {
    let emailId = this.props.match.params.id;
    let idTemplate = this.props.match.params.idTemplate;
    // edit, copy email
    if (emailId) {
      this.setState({
        emailsave: {
          id: this.props.emailDetail.id,
          name: this.props.emailDetail.name,
          subject: this.props.emailDetail.subject,
          content: this.props.emailDetail.content
        }
      });
    }
    // copy email-template
    if (idTemplate) {
      let emailTemplate: any
      emailTemplate = this.props.listContentTemplate
      this.setState({
        emailsave: {
          name: emailTemplate.name,
          subject: emailTemplate.subject,
          content: emailTemplate.content
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

  toggleModal = () => {
    this.setState({ openModal: !this.state.openModal });
  }

  preview = (emailSave) => {
    this.setState({
      emailsave: emailSave,
      openModal: true
    })
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

  createEmailTemplate = () => {
    let { emailsave } = this.state;
    if (this.validateForm(emailsave)) {
      let emailSaveValidate = {
        ...emailsave,
        name: emailsave.name.trim(),
        subject: emailsave.subject.trim(),
      }
      this.props.createEmailTemplateAction(emailSaveValidate);
    }
  }

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
    <Btn
      onClick={() => { this.handleVisibleChange(false) }}
    >
      <i className="pe-7s-close-circle" />
    </Btn>
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
        {groupParams.map((item, index) =>
          (<TabPane tab={item.name} key={item.code}>
            {this.state.contentParams ? this.state.contentParams.map((item, index) => (
              <div className="tabs-param" key={index}><label onClick={() => { this.selectParam(item.paramCode) }}>{item.paramName}</label></div>
            )) : ''}
          </TabPane>)
        )}
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
    let { emailsave, messageErrorEmailName, messageErrorEmailSubject, openModal } = this.state;
    const spinner1 = <LoaderAnim type="ball-pulse" active={true} />;
    console.log('aaaaaaaaaaaaaaaaaaaaa', emailsave)
    return (
      <Loader message={spinner1} show={false} priority={1}>
        <Fragment>
          <Modal className="modal-config-preview" isOpen={openModal}>
            <ModalHeader toggle={this.toggleModal}>Landing preview</ModalHeader>
            <ModalBody>
              <PreviewEmailLanding contentParams={this.props.contentParams} htmlDOM={emailsave.content} styleForDOM={''} />
            </ModalBody>
            <ModalFooter>
              <Btn color="primary" onClick={this.toggleModal}>
                Thoát
            </Btn>
            </ModalFooter>
          </Modal>
          <div className="email-form-management">
            <div className="email-form-title-header">
              <Button color="primary" onClick={this.back}>Back</Button>
              <div className="button-group">
                <Button color="primary" onClick={this.saveEmail}>
                  Save
                      </Button>
                <Button color="primary" onClick={this.createEmailTemplate} style={{ marginLeft: '10px', marginRight: '10px' }}>
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
                    <Button color="primary">Variables</Button>
                  </Popover>
                  <Button onClick={() => this.preview(emailsave)} color="primary" style={{ marginLeft: '10px' }}>Preview</Button>
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

const mapStateToProps = ({ emailConfigState, userCampaign }: IRootState) => ({
  contentParams: emailConfigState.contentParams,
  emailDetail: emailConfigState.emailDetail,
  listContentTemplate: userCampaign.listContentTemplate
});

const mapDispatchToProps = {
  getContentParamAction,
  createEmailAction,
  editEmailAction,
  createEmailTemplateAction
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailFormManagement);
