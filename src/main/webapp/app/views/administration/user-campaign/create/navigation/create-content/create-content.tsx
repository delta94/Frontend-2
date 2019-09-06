import React, { Component, Fragment } from 'react';
import '../create-content/create-content.scss';
import Dropdown from '../../../../../../layout/DropDown/Dropdown';

import { Card, Collapse, Button, Input, CardTitle, FormGroup, Label, CardBody, Alert } from 'reactstrap';
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
  testEmailEntity: ICreateTestMailEntity;
  openModal: boolean;
}

class CreateContent extends React.PureComponent<ICreateContentProps, ICreateContentState, ICreateTestMailEntity> {
  constructor(props) {
    super(props);
  }
  state: ICreateContentState = {
    showMailForFriend: false,
    defaultValueContentEmailIntro: '',
    defaultValueContentEmailEward: '',
    testEmailEntity: {
      emailTo: '',
      subject: '',
      content: ''
    },
    openModal: false
  };

  componentDidMount() {
    this.props.getContentPageParams();
    this.props.getContentTemplateAsType('EMAIL_INTRO');
    this.props.getContentTemplateAsType('EMAIL_EWARD');
  }

  _handleshowMailForFriendState = () => {
    let showMailForFriend: boolean = !this.state.showMailForFriend;
    this.setState({ showMailForFriend });
  };

  handleInput = (event, type) => {
    let contentData = event.target.value;
    let { testEmailEntity } = this.state;
    testEmailEntity[type] = contentData;
    this.setState({ testEmailEntity });
  };

  handleModelChange = (event, typeMail) => {
    let { testEmailEntity } = this.state;

    if (typeMail === 'EMAIL_INTRO') {
      this.setState({ defaultValueContentEmailIntro: event, testEmailEntity });
    } else {
      this.setState({ defaultValueContentEmailEward: event, testEmailEntity });
    }
  };

  sendTestMailLanding = typeMail => {
    let { postMailRequest } = this.props;
    let { testEmailEntity, defaultValueContentEmailIntro, defaultValueContentEmailEward } = this.state;

    if (typeMail === 'EMAIL_INTRO') {
      testEmailEntity.content = defaultValueContentEmailIntro;
    } else {
      testEmailEntity.content = defaultValueContentEmailEward;
    }

    this.props.postTestMailLanding(testEmailEntity);
    if (postMailRequest.openModal === true) {
      this.setState({ openModal: true }, () => {
        this.closeModal();
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
    var sel, range;

    if (window.getSelection() && window.getSelection().focusNode.parentElement.offsetParent.className === 'fr-element fr-view') {
      console.log(window.getSelection().anchorNode);
      sel = window.getSelection();
      if (sel.rangeCount) {
        range = sel.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createTextNode(text));
      }
    }
  };

  toggleDropdownParams = event => {
    this.addText(event.name);
  };

  toggleLanding = (event, typeMail) => {
    this.addContentTemplate(event.id, typeMail);
  };

  addContentTemplate = (id, typeMail) => {
    let { listContentTemplateAsTypeEmailEward, listContentTemplateAsTypeEmailIntro } = this.props;
    let { defaultValueContentEmailEward, defaultValueContentEmailIntro } = this.state;

    if (typeMail === 'EMAIL_EWARD') {
      listContentTemplateAsTypeEmailEward.forEach(item => {
        if (item.id === id) {
          defaultValueContentEmailEward = item.content;
        }
      });

      this.setState({ defaultValueContentEmailEward });
    } else {
      listContentTemplateAsTypeEmailIntro.forEach(item => {
        if (item.id === id) {
          defaultValueContentEmailIntro = item.content;
        }
      });

      this.setState({ defaultValueContentEmailIntro });
    }
  };

  render() {
    let { showMailForFriend, defaultValueContentEmailEward, defaultValueContentEmailIntro, openModal } = this.state;
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
          <Alert color="success" isOpen={openModal} toggle={this.fastCloseModal}>
            <Translate contentKey="campaign.send-mail.success" />
          </Alert>
        </div>

        <div className="add-content">
          {/* Title */}
          <div className="add-content-title">
            <CardTitle>Tạo nội dung</CardTitle>
            <div className="interactive">
              <label>Hình thức tương tác</label>
              <Dropdown selection={true} defaultValue="Chọn hình thức" listArray={[{ id: 1, name: 'SMS' }, { id: 2, name: 'EMAIL' }]} />
            </div>
          </div>

          {/* Detail */}
          <div className="add-content-detail">
            {/* Title For Detail 1 */}
            <div className="content-detail">
              <div className="add-content-detail-title">
                <Button color="primary" style={{ marginBottom: '1rem' }} onClick={this._handleshowMailForFriendState}>
                  1
                </Button>
                <label>GỬI MAIL GIỚI THIỆU BẠN BÈ</label>
                <div className="interactive" style={{ display: showMailForFriend ? 'none' : 'inline-block' }}>
                  <div className="test-mail">
                    <Input
                      placeHolder="Điền email test"
                      onChange={event => {
                        this.handleInput(event, 'emailTo');
                      }}
                    />
                    <Button color="primary" onClick={this.sendTestMailLanding}>
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
                        listArray={listTemplateEmailEward}
                        toggleDropdown={this.toggleLanding}
                      />
                    </div>

                    <div className="input-mail-and-more">
                      <Input
                        placeHolder={'Tiêu đề mail'}
                        onChange={event => {
                          this.handleInput(event, 'subject');
                        }}
                      />
                      <Dropdown
                        selection={true}
                        defaultValue="Tham số"
                        listArray={listIndexParams}
                        toggleDropdown={this.toggleDropdownParams}
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
                        onModelChange={() => this.handleModelChange(event, 'EMAIL_INTRO')}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Collapse>
            </div>

            {/* Title For Detail 2 */}
            <div className="content-detail ">
              <div className="add-content-detail-title">
                <Button color="primary" style={{ marginBottom: '1rem' }} onClick={this._handleshowMailForFriendState}>
                  2
                </Button>
                <label>GỬI MAIL TẶNG QUÀ</label>
                <div className="interactive" style={{ display: showMailForFriend ? 'inline-block' : 'none' }}>
                  <div className="test-mail">
                    <Input
                      placeHolder="Điền email test"
                      onChange={event => {
                        this.handleInput(event, 'emailTo');
                      }}
                    />
                    <Button color="primary" onClick={this.sendTestMailLanding}>
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
                        listArray={listTemplateMailIntro}
                        toggleDropdown={event => this.toggleLanding(event, 'EMAIL_INTRO')}
                      />
                    </div>
                    <div className="input-mail-and-more">
                      <Input
                        placeHolder={'Tiêu đề mail'}
                        onChange={event => {
                          this.handleInput(event, 'emailTo');
                        }}
                      />
                      <Dropdown
                        selection={true}
                        defaultValue="Tham số"
                        listArray={listIndexParams}
                        toggleDropdown={event => this.toggleLanding(event, 'EMAIL_EWARD')}
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
                        onModelChange={this.handleModelChange}
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
