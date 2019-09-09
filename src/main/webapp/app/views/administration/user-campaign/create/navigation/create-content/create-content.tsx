import React, { Component, Fragment } from 'react';
import '../create-content/create-content.scss';
import Dropdown from '../../../../../../layout/DropDown/Dropdown';
import SweetAlert from 'sweetalert-react';

import { Card, Collapse, Button, Input, CardTitle, CardBody } from 'reactstrap';
import { connect } from 'react-redux';

import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/plugins.pkgd.min.js';

import FroalaEditor from 'react-froala-wysiwyg';
import { getContentTemplateAsType, getContentPageParams, postTestMailLanding } from '../../../../../../actions/user-campaign';
import { IRootState } from '../../../../../../reducers/index';
import { Translate } from 'react-jhipster';

export interface ICreateTestMailEntity {
  emailTo?: string;
  subject?: string;
  content?: string;
}

export interface ICreateContentProps extends StateProps, DispatchProps {}

export interface ICreateContentState {
  showMailForFriend: boolean;
  defaultValueContentEmailIntro?: string;
  defaultValueContentEmailEward?: string;
  testEmailEntityForIntro: ICreateTestMailEntity;
  testEmailEntityForEward: ICreateTestMailEntity;
  openModal: boolean;
  success: boolean;
  type: string;
  text: string;
  title: string;
}

class CreateContent extends React.PureComponent<ICreateContentProps, ICreateContentState, ICreateTestMailEntity> {
  constructor(props) {
    super(props);
  }
  state: ICreateContentState = {
    showMailForFriend: false,
    defaultValueContentEmailIntro: '',
    defaultValueContentEmailEward: '',
    testEmailEntityForIntro: {
      emailTo: '',
      subject: '',
      content: ''
    },

    testEmailEntityForEward: {
      emailTo: '',
      subject: '',
      content: ''
    },
    openModal: false,
    success: false,
    type: 'error',
    text: 'Thiếu trường thông tin',
    title: 'Cảnh báo'
  };

  componentDidMount() {
    this.props.getContentPageParams();
    this.props.getContentTemplateAsType('EMAIL_INTRO');
    this.props.getContentTemplateAsType('EMAIL_EWARD');
  }

  handleshowMailForFriendState = () => {
    let showMailForFriend: boolean = !this.state.showMailForFriend;
    this.setState({ showMailForFriend });
  };

  handleInput = (event, type, typeMail) => {
    let contentData = event.target.value;
    let { testEmailEntityForIntro, testEmailEntityForEward } = this.state;

    if (typeMail === 'EMAIL_INTRO') {
      testEmailEntityForIntro[type] = contentData;
      this.setState({ testEmailEntityForIntro });
    }

    if (typeMail === 'EMAIL_EWARD') {
      testEmailEntityForEward[type] = contentData;
      this.setState({ testEmailEntityForEward });
    }
  };

  handleModelChange = (event, typeMail) => {
    let { testEmailEntityForIntro, testEmailEntityForEward } = this.state;

    if (typeMail === 'EMAIL_INTRO') {
      this.setState({ defaultValueContentEmailIntro: event, testEmailEntityForIntro });
    }

    if (typeMail === 'EMAIL_EWARD') {
      this.setState({ defaultValueContentEmailEward: event, testEmailEntityForEward });
    }
  };

  sendTestMailLanding = typeMail => {
    let { testEmailEntityForEward, testEmailEntityForIntro, defaultValueContentEmailIntro, defaultValueContentEmailEward } = this.state;
    let testMail: ICreateTestMailEntity = { emailTo: '', subject: '', content: '' };

    if (typeMail === 'EMAIL_EWARD') {
      testEmailEntityForEward.content = defaultValueContentEmailEward;
      testMail = testEmailEntityForEward;
    }

    if (typeMail === 'EMAIL_INTRO') {
      testEmailEntityForIntro.content = defaultValueContentEmailIntro;
      testMail = testEmailEntityForIntro;
    }

    if (testMail.emailTo === '' || testMail.subject === '' || testMail.content === '') {
      this.setState({ openModal: true, type: 'warning', title: 'Thiếu trường thông tin', text: 'vui lòng nhập trường bị thiếu' });
    } else {
      this.props.postTestMailLanding(testMail);
    }
  };

  componentWillReceiveProps(nextProps, prevState) {
    if (nextProps.postMailRequest.openModal === true) {
      this.setState({ openModal: true, type: 'success', title: 'Thành công', text: 'Đã gửi đến email' });
    }
  }

  closeModal = () => {
    setTimeout(() => {
      this.setState({ openModal: false });
    }, 5000);
  };

  fastCloseModal = () => {
    this.setState({ openModal: false });
  };

  addText = text => {
    var sel, range;

    if (window.getSelection()) {
      let listChildren = window.getSelection().focusNode.childNodes;
      let canFix = true;

      listChildren.forEach(item => {
        if (item.nodeName === 'INPUT') {
          canFix = false;
        }
      });

      console.log(listChildren);
      sel = window.getSelection();
      if (sel.rangeCount && canFix) {
        range = sel.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createTextNode(text));
      }
    }
  };

  toggleDropdownParams = (event, typeMail) => {
    let { listContentPageParams } = this.props;

    listContentPageParams.forEach(item => {
      if (event.id === item.id) {
        this.addText(item.paramCode);
      }
    });
  };

  toggleLanding = (event, typeMail) => {
    console.log(event, typeMail);
    this.addContentTemplate(event.id, typeMail);
  };

  addContentTemplate = (id, typeMail) => {
    let { listContentTemplateAsTypeEmailEward, listContentTemplateAsTypeEmailIntro } = this.props;
    let { defaultValueContentEmailEward, defaultValueContentEmailIntro, testEmailEntityForEward, testEmailEntityForIntro } = this.state;

    if (typeMail === 'EMAIL_EWARD') {
      listContentTemplateAsTypeEmailEward.forEach(item => {
        console.log(item);
        if (item.id === id) {
          defaultValueContentEmailEward = item.content;
          testEmailEntityForEward.subject = item.subject;
        }
      });

      this.setState({ defaultValueContentEmailEward });
    }

    if (typeMail === 'EMAIL_INTRO') {
      listContentTemplateAsTypeEmailIntro.forEach(item => {
        console.log(item);
        if (item.id === id) {
          defaultValueContentEmailIntro = item.content;
          testEmailEntityForIntro.subject = item.subject;
        }
      });

      this.setState({ defaultValueContentEmailIntro });
    }
  };

  render() {
    let { showMailForFriend, defaultValueContentEmailEward, defaultValueContentEmailIntro, openModal, text, title, type } = this.state;
    let { listContentPageParams, listContentTemplateAsTypeEmailEward, listContentTemplateAsTypeEmailIntro } = this.props;

    const listIndexParams = listContentPageParams.map(item => {
      return {
        id: item.id,
        name: item.paramName
      };
    });

    const listTemplateEmailEward = listContentTemplateAsTypeEmailEward.map(item => {
      return { id: item.id, name: item.name };
    });

    const listTemplateMailIntro = listContentTemplateAsTypeEmailIntro.map(item => {
      return { id: item.id, name: item.name };
    });

    return (
      <Fragment>
        <div style={{ position: 'fixed', top: '100px', right: '300px', zIndex: 2 }}>
          <SweetAlert
            title={title}
            confirmButtonColor=""
            show={openModal}
            text={text}
            type={type}
            onConfirm={() => this.setState({ openModal: false })}
          />
        </div>

        <div className="add-content">
          {/* Title */}
          <div className="add-content-title">
            <CardTitle>Tạo nội dung</CardTitle>
            <div className="interactive">
              <label>Hình thức tương tác</label>
              <Dropdown selection={true} defaultValue="Chọn hình thức" listArray={[{ id: 2, name: 'EMAIL' }]} />
            </div>
          </div>

          {/* Detail */}
          <div className="add-content-detail">
            {/* Title For Detail 1 */}
            <div className="content-detail">
              <div className="add-content-detail-title">
                <Button color="primary" style={{ marginBottom: '1rem', width: '40px' }} onClick={this.handleshowMailForFriendState}>
                  1
                </Button>
                <label>GỬI MAIL GIỚI THIỆU BẠN BÈ</label>
                <div className="interactive" style={{ display: showMailForFriend ? 'none' : 'inline-block' }}>
                  <div className="test-mail">
                    <Input
                      placeHolder="Điền email test"
                      onChange={event => {
                        this.handleInput(event, 'emailTo', 'EMAIL_INTRO');
                      }}
                    />
                    <Button color="primary" onClick={() => this.sendTestMailLanding('EMAIL_INTRO')}>
                      Test
                    </Button>
                  </div>
                </div>
              </div>
              {/* Template Fix */}
              <Collapse isOpen={!showMailForFriend}>
                <Card>
                  <CardBody>
                    <div className="template-add">
                      <label>Mẫu email gửi</label>
                      <Dropdown
                        selection={true}
                        defaultValue={'Chọn mẫu email'}
                        listArray={listTemplateMailIntro}
                        toggleDropdown={event => this.toggleLanding(event, 'EMAIL_INTRO')}
                      />
                    </div>
                    {/* mail data */}
                    <div className="input-mail-and-more">
                      <Input
                        placeHolder={'Tiêu đề mail'}
                        onChange={event => {
                          this.handleInput(event, 'subject', 'EMAIL_INTRO');
                        }}
                      />
                      <Dropdown
                        selection={true}
                        defaultValue="Tham số"
                        listArray={listIndexParams}
                        toggleDropdown={event => this.toggleDropdownParams(event, 'EMAIL_INTRO')}
                      />
                    </div>
                    <div className="content-fixing">
                      <FroalaEditor
                        tag="textarea"
                        config={{
                          placeholderText: 'Tạo nội dung của bạn',
                          events: {}
                        }}
                        model={defaultValueContentEmailIntro}
                        onModelChange={event => this.handleModelChange(event, 'EMAIL_INTRO')}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Collapse>
            </div>

            {/* Title For Detail 2 */}
            <div className="content-detail ">
              <div className="add-content-detail-title">
                <Button color="primary" style={{ marginBottom: '1rem', width: '40px' }} onClick={this.handleshowMailForFriendState}>
                  2
                </Button>
                <label>GỬI MAIL TẶNG QUÀ</label>
                <div className="interactive" style={{ display: showMailForFriend ? 'inline-block' : 'none' }}>
                  <div className="test-mail">
                    <Input
                      placeHolder="Điền email test"
                      onChange={event => {
                        this.handleInput(event, 'emailTo', 'EMAIL_EWARD');
                      }}
                    />
                    <Button color="primary" onClick={() => this.sendTestMailLanding('EMAIL_EWARD')}>
                      Test
                    </Button>
                  </div>
                </div>
              </div>

              {/* Template Fix */}
              <Collapse isOpen={showMailForFriend}>
                <Card>
                  <CardBody>
                    <div className="template-add">
                      <label>Mẫu email gửi</label>
                      <Dropdown
                        selection={true}
                        defaultValue={'Chọn mẫu mail'}
                        listArray={listContentTemplateAsTypeEmailEward}
                        toggleDropdown={event => this.toggleLanding(event, 'EMAIL_EWARD')}
                      />
                    </div>
                    {/* mail data */}
                    <div className="input-mail-and-more">
                      <Input
                        placeHolder={'Tiêu đề mail'}
                        onChange={event => {
                          this.handleInput(event, 'subject', 'EMAIL_EWARD');
                        }}
                      />
                      <Dropdown
                        selection={true}
                        defaultValue="Tham số"
                        listArray={listIndexParams}
                        toggleDropdown={event => this.toggleDropdownParams(event, 'EMAIL_EWARD')}
                      />
                    </div>
                    <div className="content-fixing">
                      <FroalaEditor
                        tag="textarea"
                        config={{
                          placeholderText: 'Tạo nội dung của bạn',
                          events: {}
                        }}
                        model={defaultValueContentEmailEward}
                        onModelChange={event => this.handleModelChange(event, 'EMAIL_EWARD')}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Collapse>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const mapStateToProps = ({ userCampaign }: IRootState) => {
  return {
    listContentPageParams: userCampaign.listCampainContentParams,
    postMailRequest: userCampaign.postMailRequest,
    listContentTemplateAsTypeEmailIntro: userCampaign.listContentTemplateAsTypeEmailIntro,
    listContentTemplateAsTypeEmailEward: userCampaign.listContentTemplateAsTypeEmailEward
  };
};

const mapDispatchToProps = {
  getContentPageParams,
  postTestMailLanding,
  getContentTemplateAsType
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateContent);
