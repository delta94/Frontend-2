import React, { Fragment } from 'react';
import '../create-content/create-content.scss';
import Dropdown from '../../../../../../layout/DropDown/Dropdown';

import { Card, Collapse, Button, Input, CardTitle, CardBody, Form } from 'reactstrap';
import { connect } from 'react-redux';

import CKEditor from 'ckeditor4-react';
import { getContentTemplateAsType, getContentPageParams, postTestMailLanding } from '../../../../../../actions/user-campaign';
import { getNavigationContentTemplates } from '../../../../../../actions/navigation-info';
import { openModal, closeModal } from '../../../../../../actions/modal';
import { IRootState } from '../../../../../../reducers/index';
import { Translate } from 'react-jhipster';
import { postTestMailLandingService } from 'app/services/user-campaign';
import { INTRO_MAIL, REWARD_MAIL, EMAIL_EWARD, EMAIL_INTRO } from 'app/constants/common';

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
  emailEward: string;
  subjectEward: string;
  emailIntro: string;
  subjectIntro: string;
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

    emailEward: '',
    subjectEward: '',
    emailIntro: '',
    subjectIntro: '',
    openModal: false,
    success: false,
    type: 'error',
    text: 'Thiếu trường thông tin',
    title: 'Cảnh báo'
  };

  componentDidMount() {
    this.props.getContentPageParams();
    this.props.getContentTemplateAsType(EMAIL_INTRO);
    this.props.getContentTemplateAsType(EMAIL_EWARD);
  }

  handleshowMailForFriendState = () => {
    let showMailForFriend: boolean = !this.state.showMailForFriend;
    this.setState({ showMailForFriend });
  };

  handleModelChange = (event, typeMail) => {
    let { listContentPageParams } = this.props;
    let paramester = [];

    listContentPageParams.forEach(item => {
      if (event.indexOf(item.paramCode) > 0) {
        paramester.push(item);
      }
    });

    let newParamester = paramester.map(item => ({
      id: item.id,
      name: item.paramName,
      code: item.paramCode
    }));

    if (typeMail === EMAIL_INTRO) {
      this.setState({ defaultValueContentEmailIntro: event });
      this.props.getNavigationContentTemplates(newParamester, INTRO_MAIL, 'parameter');
      this.props.getNavigationContentTemplates(event, INTRO_MAIL, 'content');
    }

    if (typeMail === EMAIL_EWARD) {
      this.setState({ defaultValueContentEmailEward: event });
      this.props.getNavigationContentTemplates(newParamester, REWARD_MAIL, 'parameter');
      this.props.getNavigationContentTemplates(event, REWARD_MAIL, 'content');
    }
  };

  sendTestMailLanding = typeMail => {
    let { defaultValueContentEmailIntro, defaultValueContentEmailEward, emailEward, emailIntro, subjectEward, subjectIntro } = this.state;

    let { postMailRequest } = this.props;
    let testMail: ICreateTestMailEntity = { emailTo: '', subject: '', content: '' };

    if (typeMail === EMAIL_EWARD) {
      testMail.emailTo = emailEward;
      testMail.subject = subjectEward;
      testMail.content = defaultValueContentEmailEward;
    }

    if (typeMail === EMAIL_INTRO) {
      testMail.emailTo = emailIntro;
      testMail.subject = subjectIntro;
      testMail.content = defaultValueContentEmailIntro;
    }

    if (testMail.emailTo === '' || testMail.subject === '' || testMail.content === '') {
      this.props.openModal({
        show: true,
        type: 'warning',
        title: 'Thiếu trường thông tin',
        text: 'vui lòng nhập trường bị thiếu'
      });
    } else {
      postTestMailLandingService(testMail)
        .then(item => {
          if (item) {
            this.props.openModal({
              show: true,
              type: 'success',
              title: 'Thành công',
              text: 'Đã gửi mail thành công'
            });
          }
        })
        .catch(err => {
          this.props.openModal({
            show: true,
            type: 'error',
            title: 'Thất bại',
            text: 'Email không hợp lệ'
          });
        });
    }
  };

  closeModal = () => {
    setTimeout(() => {
      this.setState({ openModal: false });
    }, 5000);
  };

  fastCloseModal = () => {
    this.setState({ openModal: false });
  };

  addText = text => {
    let sel, range;

    if (window.getSelection()) {
      let listChildren = window.getSelection().focusNode.childNodes;
      let canFix = true;

      listChildren.forEach(item => {
        if (item.nodeName === 'INPUT') {
          canFix = false;
        }
      });

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
    this.addContentTemplate(event.id, typeMail);
  };

  addContentTemplate = (id, typeMail) => {
    let { listContentTemplateAsTypeEmailEward, listContentTemplateAsTypeEmailIntro } = this.props;

    let { defaultValueContentEmailEward, defaultValueContentEmailIntro, subjectIntro, subjectEward } = this.state;

    if (typeMail === EMAIL_EWARD) {
      listContentTemplateAsTypeEmailEward.forEach(item => {
        if (item.id === id) {
          defaultValueContentEmailEward = item.content;
          subjectEward = item.subject;
        }
      });

      this.setState({ defaultValueContentEmailEward, subjectEward });
      this.props.getNavigationContentTemplates(id, REWARD_MAIL, 'templateId');
      this.props.getNavigationContentTemplates(subjectEward, REWARD_MAIL, 'subject');
    }

    if (typeMail === EMAIL_INTRO) {
      listContentTemplateAsTypeEmailIntro.forEach(item => {
        if (item.id === id) {
          defaultValueContentEmailIntro = item.content;
          subjectIntro = item.subject;
        }
      });

      this.setState({ defaultValueContentEmailIntro, subjectIntro });
      this.props.getNavigationContentTemplates(id, INTRO_MAIL, 'templateId');
      this.props.getNavigationContentTemplates(subjectIntro, INTRO_MAIL, 'subject');
    }
  };

  render() {
    let {
      showMailForFriend,
      defaultValueContentEmailEward,
      defaultValueContentEmailIntro,
      emailEward,
      emailIntro,
      subjectEward,
      subjectIntro
    } = this.state;

    let { listContentPageParams, listContentTemplateAsTypeEmailEward, listContentTemplateAsTypeEmailIntro, modalState } = this.props;

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
        <div className="create-content">
          <div className="add-content">
            {/* Title */}
            <div className="add-content-title">
              <CardTitle>
                <Translate contentKey="campaign.create-content" />
              </CardTitle>
              <div className="interactive">
                <label>
                  <Translate contentKey="campaign.type-interactive" />
                </label>
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
                  <label>
                    <Translate contentKey="campaign.send-intro" />
                  </label>
                  <div className="interactive" style={{ display: showMailForFriend ? 'none' : 'inline-block' }}>
                    <div className="test-mail">
                      <Input
                        type="text"
                        placeHolder="Điền email test"
                        value={emailIntro}
                        onChange={event => {
                          this.setState({ emailIntro: event.target.value });
                        }}
                      />
                      <Button color="primary" onClick={() => this.sendTestMailLanding(EMAIL_INTRO)}>
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
                        <label>
                          <Translate contentKey="campaign.type-mail" />
                        </label>
                        <Dropdown
                          selection={true}
                          defaultValue={'Chọn mẫu email'}
                          listArray={listTemplateMailIntro}
                          toggleDropdown={event => this.toggleLanding(event, EMAIL_INTRO)}
                        />
                      </div>
                      {/* mail data */}
                      <div className="input-mail-and-more">
                        <Input
                          type="text"
                          placeHolder={'Tiêu đề mail'}
                          name="subject"
                          value={subjectIntro}
                          onChange={event => {
                            this.setState({ subjectIntro: event.target.value });
                            this.props.getNavigationContentTemplates(event.target.value, INTRO_MAIL, 'subject');
                          }}
                        />
                        <Dropdown
                          selection={true}
                          defaultValue="Tham số"
                          listArray={listIndexParams}
                          toggleDropdown={event => this.toggleDropdownParams(event, EMAIL_INTRO)}
                        />
                      </div>
                      <div className="content-fixing">
                        <CKEditor
                          data={defaultValueContentEmailIntro}
                          config={{
                            extraPlugins: 'stylesheetparser'
                          }}
                          onBlur={event => this.handleModelChange(event, EMAIL_INTRO)}
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
                  <label>
                    <Translate contentKey="campaign.send-eward" />
                  </label>
                  <div className="interactive" style={{ display: showMailForFriend ? 'inline-block' : 'none' }}>
                    <div className="test-mail">
                      <Input
                        type="text"
                        placeHolder="Điền email test"
                        onChange={event => {
                          this.setState({ emailEward: event.target.value });
                        }}
                        value={emailEward}
                      />
                      <Button color="primary" onClick={() => this.sendTestMailLanding(EMAIL_EWARD)}>
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
                        <label>
                          <Translate contentKey="campaign.type-mail" />
                        </label>
                        <Dropdown
                          selection={true}
                          defaultValue={'Chọn mẫu mail'}
                          listArray={listTemplateEmailEward}
                          toggleDropdown={event => this.toggleLanding(event, EMAIL_EWARD)}
                        />
                      </div>
                      {/* mail data */}
                      <div className="input-mail-and-more">
                        <Input
                          type="text"
                          placeHolder={'Tiêu đề mail'}
                          onChange={event => {
                            this.setState({ subjectEward: event.target.value });
                            this.props.getNavigationContentTemplates(event.target.value, REWARD_MAIL, 'subject');
                          }}
                          value={subjectEward}
                        />
                        <Dropdown
                          selection={true}
                          defaultValue="Tham số"
                          listArray={listIndexParams}
                          toggleDropdown={event => this.toggleDropdownParams(event, EMAIL_EWARD)}
                        />
                      </div>
                      {/* Editor */}
                      <div className="content-fixing">
                        <CKEditor
                          data={defaultValueContentEmailEward}
                          config={{
                            extraPlugins: 'stylesheetparser'
                          }}
                          onBlur={event => this.handleModelChange(event, EMAIL_EWARD)}
                        />
                      </div>
                    </CardBody>
                  </Card>
                </Collapse>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const mapStateToProps = ({ userCampaign, handleModal }: IRootState) => {
  return {
    listContentPageParams: userCampaign.listCampainContentParams,
    postMailRequest: userCampaign.postMailRequest,
    listContentTemplateAsTypeEmailIntro: userCampaign.listContentTemplateAsTypeEmailIntro,
    listContentTemplateAsTypeEmailEward: userCampaign.listContentTemplateAsTypeEmailEward,
    modalState: handleModal.data
  };
};

const mapDispatchToProps = {
  getContentPageParams,
  postTestMailLanding,
  getContentTemplateAsType,
  getNavigationContentTemplates,
  openModal,
  closeModal
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateContent);
