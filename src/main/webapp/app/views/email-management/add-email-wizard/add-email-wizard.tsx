import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import CKEditor from 'ckeditor4-react';
import { Input, Button as Btn, Row, Popover, Tabs } from 'antd';
import { Table, Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Translate, translate } from 'react-jhipster';
import { IRootState } from 'app/reducers';
import LoaderAnim from 'react-loaders';
import Loader from 'react-loader-advanced';
import SweetAlert from 'sweetalert-react';
import { closeModal } from 'app/actions/modal';
import { IContentParams, IEmailSave } from 'app/common/models/email-config.model';
import { GROUP_PARAM } from 'app/constants/email-config';
import { getContentParamAction, createEmailAction, editEmailAction, createEmailTemplateAction } from 'app/actions/email-config';
import './add-email-wizard.scss';
import { RouteComponentProps } from 'react-router-dom';
import EmailPreview from './email-preview';

//TODO 1: START
import TopolEmailEditor from './topol-react-email-editor';
import './topol-react-email-editor/index.scss';
import DemoTemplate from './topol-react-email-editor/demo.json';
//TODO 1: END

const cheerio = require('cheerio');

interface IAddEmailWizardProps extends StateProps, DispatchProps, RouteComponentProps<{ id: any; idTemplate: any }> {}
interface IAddEmailWizardState {
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
    name: 'EVoucher',
    code: GROUP_PARAM.E_VOUCHER
  },
  {
    name: 'Contact',
    code: GROUP_PARAM.CUSTOMER
  },
  {
    name: 'Campaign',
    code: GROUP_PARAM.CAMPAIGN
  }
];

class AddEmailWizard extends React.Component<IAddEmailWizardProps, IAddEmailWizardState> {
  state: IAddEmailWizardState = {
    visiblePopOver: false,
    activeKey: groupParams[0].code,
    contentParams: [],
    emailsave: {},
    messageErrorEmailName: '',
    messageErrorEmailSubject: '',
    openModal: false
  };

  //TODO 2: START
  editor: any;
  onLoad = () => {
    console.log('onLoad');
    console.log(this.editor);
  };

  onLoadTemplate = () => {
    this.editor.loadDesign(JSON.stringify(DemoTemplate));
  };

  saveDesign = () => {
    this.editor.saveDesign(design => {
      console.log('saveDesign', design);
      alert('Design JSON has been logged in your developer console.');
    });
  };

  togglePreview = () => {
    this.editor.togglePreview();
  };

  onSave = (json, html) => {
    console.log(json);
    console.log(html);
  };

  //TODO 2: END
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
      let emailTemplate: any;
      emailTemplate = this.props.listContentTemplate;
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
  };

  onChangeInput = (value, field) => {
    let emailSave = this.state.emailsave;
    emailSave[field] = value;
    this.setState({
      emailsave: emailSave
    });
    switch (field) {
      case 'name':
        this.validateEmailName(emailSave);
        break;
      case 'subject':
        this.validateEmailSubject(emailSave);
        break;
      default:
        break;
    }
  };

  toggleModal = () => {
    this.setState({ openModal: !this.state.openModal });
  };

  preview = emailSave => {
    this.setState({
      emailsave: emailSave,
      openModal: true
    });
  };

  validateEmailName(emailSave: IEmailSave) {
    if (emailSave && emailSave.name && emailSave.name.trim() !== '') {
      this.setState({
        messageErrorEmailName: ''
      });
    } else {
      this.setState({
        messageErrorEmailName: (
          <div>
            <label className="message-error" style={{ color: 'red', marginLeft: '90px' }}>
              Tên email không được để trống
            </label>
          </div>
        )
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
        messageErrorEmailSubject: (
          <div>
            <label className="message-error" style={{ color: 'red', marginLeft: '90px' }}>
              Tiêu đề email không được để trống
            </label>
          </div>
        )
      });
    }
  }

  validateForm = (emailSave: IEmailSave) => {
    this.validateEmailName(emailSave);
    this.validateEmailSubject(emailSave);
    if (emailSave.name && emailSave.name.trim() !== '' && emailSave.subject && emailSave.subject.trim() !== '') {
      return true;
    }
    return false;
  };

  createEmailTemplate = () => {
    let { emailsave } = this.state;
    emailsave.content = this.validateHtmlContent(emailsave.content);
    if (this.validateForm(emailsave)) {
      let emailSaveValidate = {
        ...emailsave,
        name: emailsave.name.trim(),
        subject: emailsave.subject.trim()
      };
      this.props.createEmailTemplateAction(emailSaveValidate);
    }
  };

  saveEmail = async () => {
    let emailId = this.props.match.params.id;
    let url = this.props.match.url;
    let { emailsave } = this.state;
    emailsave.content = this.validateHtmlContent(emailsave.content);

    if (this.validateForm(emailsave)) {
      let emailSaveValidate = {
        ...emailsave,
        name: emailsave.name.trim(),
        subject: emailsave.subject.trim()
      };

      // update
      if (emailId && url && url.includes('edit')) {
        this.props.editEmailAction(emailId, emailSaveValidate);
      } else {
        // create, copy
        this.props.createEmailAction(emailSaveValidate);
      }
    }
  };

  validateHtmlContent = content => {
    const $ = cheerio.load(content);
    let _head = $('head');
    if (_head) {
      _head.html('');
      _head.append('<style type="text/css">html { display: block; }</style>');
    }
    return $.html();
  };

  title = (
    <div className="title-content-param">
      <label>Add a Persionaliztion</label>
      <Btn
        onClick={() => {
          this.handleVisibleChange(false);
        }}
      >
        <i className="pe-7s-close-circle" />
      </Btn>
    </div>
  );

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
    let content = (
      <div className="content-param">
        <Tabs tabPosition={'left'} onChange={this.getContentParam} defaultActiveKey={this.state.activeKey}>
          {groupParams.map((item, index) => (
            <TabPane tab={item.name} key={item.code}>
              {this.state.contentParams
                ? this.state.contentParams.map((item, index) => (
                    <div className="tabs-param" key={index}>
                      <label
                        onClick={() => {
                          this.selectParam(item.paramCode);
                        }}
                      >
                        {item.paramName}
                      </label>
                    </div>
                  ))
                : ''}
            </TabPane>
          ))}
        </Tabs>
      </div>
    );
    return content;
  };

  onEditorChange = event => {
    let emailSave = this.state.emailsave;
    emailSave.content = event.editor.getData();
    console.log(emailSave.content);
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
        content: newValue.body.innerHTML
      }
    });
  };

  render() {
    let { modalState } = this.props;
    let { emailsave, messageErrorEmailName, messageErrorEmailSubject, openModal } = this.state;
    const spinner1 = <LoaderAnim type="ball-pulse" active={true} />;
    return (
      <Loader message={spinner1} show={false} priority={1}>
        <Fragment>
          <SweetAlert
            title={modalState.title ? modalState.title : 'No title'}
            confirmButtonColor=""
            show={modalState.show ? modalState.show : false}
            text={modalState.text ? modalState.text : 'No'}
            type={modalState.type ? modalState.type : 'error'}
            onConfirm={() => this.props.closeModal()}
          />
          <Modal className="modal-config-preview" isOpen={openModal}>
            <ModalHeader toggle={this.toggleModal}>Landing preview</ModalHeader>
            <ModalBody>
              <EmailPreview contentParams={this.props.contentParams} htmlDOM={emailsave.content} styleForDOM={''} />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.toggleModal}>
                Thoát
              </Button>
            </ModalFooter>
          </Modal>
          <div className="add-email-wizard-management">
            <div className="add-email-wizard-title-header">
              <Button color="back" onClick={this.back} style={{ color: 'blue', textDecoration: 'underline' }}>
                Quay lại
              </Button>
              <div className="button-group">
                <Button color="primary" onClick={this.saveEmail}>
                  Lưu
                </Button>
                <Button color="primary" onClick={this.createEmailTemplate} style={{ marginLeft: '10px', marginRight: '10px' }}>
                  Lưu thành Template
                </Button>
              </div>
            </div>
            <div className="add-email-wizard-body">
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
                  <Popover
                    placement="leftTop"
                    title={this.title}
                    content={this.content()}
                    visible={this.state.visiblePopOver}
                    onVisibleChange={this.handleVisibleChange}
                    trigger="click"
                  >
                    <Button color="primary">Tham số</Button>
                  </Popover>
                  <label
                    onClick={() => this.preview(emailsave)}
                    style={{ marginLeft: '10px', textDecoration: 'underline', color: '#3866DD' }}
                  >
                    <FontAwesomeIcon icon={faEye} />
                    <span style={{ paddingLeft: '10px' }}>Preview</span>
                  </label>
                </div>
                <div style={{ clear: 'both' }}></div>
                <div style={{ marginTop: '10px' }}>
                  {/*TODO 3: START*/}
                  <button onClick={this.onLoadTemplate}>Load Demo Template</button>
                  <TopolEmailEditor
                    ref={editor => (this.editor = editor)}
                    onLoad={this.onLoad}
                    saveDesign={this.saveDesign}
                    onSave={this.onSave}
                    language={'vi'}
                    light={true}
                    templateId={1}
                    authorize={{
                      apiKey: '4QjRQJMtShNpVfZaOPvz6tAeVnpDrWyFGvT25iccj2OHjjikK9n1rYBfkhYQ',
                      userId: 'thangtq'
                    }}
                    googleFonts={['Roboto', 'K2D', 'Mali']}
                    mergeTags={[
                      {
                        name: 'Nhóm 1', // Group name
                        items: [
                          {
                            value: '{{CUSTOMER_NAME}}', // Text to be inserted
                            text: 'Tên khách hàng', // Shown text in the menu
                            label: 'Họ tên đầy đủ của khách hàng' // Shown description title in the menu
                          },
                          {
                            value: '{{CUSTOMER_NAME}}', // Text to be inserted
                            text: 'Tên khách hàng', // Shown text in the menu
                            label: 'Họ tên đầy đủ của khách hàng' // Shown description title in the menu
                          }
                        ]
                      },
                      {
                        name: 'Nhóm 2', // Group name
                        items: [
                          {
                            value: '{{CUSTOMER_NAME}}', // Text to be inserted
                            text: 'Tên khách hàng', // Shown text in the menu
                            label: 'Họ tên đầy đủ của khách hàng' // Shown description title in the menu
                          },
                          {
                            value: '{{CUSTOMER_NAME}}', // Text to be inserted
                            text: 'Tên khách hàng', // Shown text in the menu
                            label: 'Họ tên đầy đủ của khách hàng' // Shown description title in the menu
                          }
                        ]
                      }
                    ]}
                  />
                  {/*TODO 3: END*/}
                  <CKEditor
                    id={'ckeditor'}
                    data={emailsave.content}
                    config={{
                      fullPage: true,
                      allowedContent: true,
                      extraPlugins: 'stylesheetparser',
                      height: 450
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
  listContentTemplate: userCampaign.listContentTemplate,
  modalState: emailConfigState.modalResponse
});

const mapDispatchToProps = {
  getContentParamAction,
  createEmailAction,
  editEmailAction,
  createEmailTemplateAction,
  closeModal
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AddEmailWizard);
