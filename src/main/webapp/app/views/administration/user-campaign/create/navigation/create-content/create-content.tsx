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
  defaultValueContent?: string;
  templateType?: string;
  testEmailEntity: ICreateTestMailEntity;
  openModal: boolean;
}

class CreateContent extends React.PureComponent<ICreateContentProps, ICreateContentState, ICreateTestMailEntity> {
  constructor(props) {
    super(props);
  }
  state: ICreateContentState = {
    showMailForFriend: false,
    defaultValueContent: '',
    templateType: 'EMAIL',
    testEmailEntity: {
      emailTo: '',
      subject: '',
      content: ''
    },
    openModal: false
  };

  componentDidMount() {
    this.props.getContentPageParams();
    this.props.getContentTemplateAsType('EMAIL');
    this.props.getContentTemplateAsType('SMS');
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

  handleModelChange = event => {
    let { testEmailEntity } = this.state;
    testEmailEntity.content = event;
    this.setState({ defaultValueContent: event, testEmailEntity });
  };

  sendTestMailLanding = () => {
    let { postMailRequest } = this.props;
    let { testEmailEntity } = this.state;

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

  toggleChangeTypeTemplate = event => {
    this.setState({ templateType: event.name });
  };

  toggleLanding = event => {
    this.addContentTemplate(event.id);
  };

  addContentTemplate = id => {
    let { listContentTemplateAsTypeEmail, listContentTemplateAsTypeSMS } = this.props;
    let { defaultValueContent } = this.state;

    listContentTemplateAsTypeEmail.forEach(item => {
      if (item.id === id) {
        defaultValueContent = item.content;
      }
    });

    this.setState({ defaultValueContent });
  };

  render() {
    let { showMailForFriend, templateType, defaultValueContent, openModal } = this.state;
    let { listContentPageParams, listContentTemplateAsTypeEmail, listContentTemplateAsTypeSMS } = this.props;

    const listIndexParams = listContentPageParams.map(item => {
      return {
        id: item.id,
        name: item.paramName
      };
    });

    const listTemplateSMS = listContentTemplateAsTypeSMS.map(item => {
      return { id: item.id, name: item.name };
    });

    const listTemplateMail = listContentTemplateAsTypeEmail.map(item => {
      return { id: item.id, name: item.name };
    });

    let listTemplate = [];

    switch (templateType) {
      case 'EMAIL':
        listTemplate = listTemplateMail;
        break;

      case 'SMS':
        listTemplate = listTemplateSMS;
        break;

      default:
        listTemplate = [];
        break;
    }

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
              <Dropdown
                selection={true}
                defaultValue="Chọn hình thức"
                listArray={[{ id: 1, name: 'SMS' }, { id: 2, name: 'EMAIL' }]}
                toggleDropdown={this.toggleChangeTypeTemplate}
              />
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
                        defaultValue={'Chọn mẫu ' + templateType}
                        listArray={listTemplate}
                        toggleDropdown={this.toggleLanding}
                      />
                    </div>

                    <div className="input-mail-and-more">
                      <Input
                        placeHolder={'Tiêu đề ' + templateType}
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
                        model={defaultValueContent}
                        onModelChange={this.handleModelChange}
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
                        defaultValue={'Chọn mẫu ' + templateType}
                        listArray={listTemplate}
                        toggleDropdown={this.toggleLanding}
                      />
                    </div>
                    <div className="input-mail-and-more">
                      <Input
                        placeHolder={'Tiêu đề ' + templateType}
                        onChange={event => {
                          this.handleInput(event, 'emailTo');
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
                        model={defaultValueContent}
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
    listContentTemplateAsTypeEmail: userCampaign.listContentTemplateAsTypeEmail,
    listContentTemplateAsTypeSMS: userCampaign.listContentTemplateAsTypeSMS
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
