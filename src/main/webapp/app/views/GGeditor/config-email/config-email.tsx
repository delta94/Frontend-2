import React, { Component, Fragment } from 'react';
import './config-email.scss';

import {
  Card,
  Collapse,
  Button,
  UncontrolledButtonDropdown,
  CardBody,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  DropdownToggle,
  Dropdown as DropdownReacts,
  DropdownMenu,
  DropdownItem,
  Col as ColReact,
  Row as RowReact
} from 'reactstrap';
import { Row, Col } from 'antd';
import { Input, Button as ButtonAntd, Popover } from 'antd';
import { connect } from 'react-redux';
import { validateCampaign } from 'app/actions/campaign-managament';
import { getContentPageParams, postTestMailLanding } from 'app/actions/user-campaign';
import { IRootState } from 'app/reducers';
import { getContentTemplate, getContentTemplateAsType } from 'app/actions/user-campaign';
import { openModal } from 'app/actions/modal';
import { getNavigationContentTemplates } from 'app/actions/navigation-info';
import PreviewLanding from './preview/preview';
import { IParamester } from 'app/common/model/campaign-navigation.model';
import { Translate, translate } from 'react-jhipster';
import { INTRO_MAIL, EMAIL_ALL } from 'app/constants/common';
import { SUBJECT } from 'app/constants/common';

// export interface I

export interface IConfigEmailProps extends StateProps, DispatchProps {
  isOpenModal: boolean;
  toggleModal: Function;
  idNode?: any;
}

export interface IConfigEmailState {
  showMailForFriend: boolean;
  defaultValueContent: string;
  defaultValueContentPopup: string;
  openModal: boolean;
  paramester: IParamester[];
  subjectLanding: string;
  valueName: string;
  valueTitle: string;
  visible: boolean;
  idTemplate: string;
  isOpenDropdown: boolean;
  idEmail: boolean;
  nameEmail: string;
  value_name_error: string;
  content_mail_error: string;
}

class ConfigEmail extends React.PureComponent<IConfigEmailProps, IConfigEmailState> {
  state: IConfigEmailState = {
    showMailForFriend: false,
    defaultValueContent: '',
    openModal: false,
    defaultValueContentPopup: '',
    paramester: [],
    subjectLanding: '',
    valueName: '',
    valueTitle: '',
    visible: false,
    idTemplate: '',
    isOpenDropdown: false,
    idEmail: false,
    nameEmail: '',
    value_name_error: '',
    content_mail_error: '',
  };
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getContentPageParams();
    this.props.getContentTemplateAsType(EMAIL_ALL);
  }

  closeModal = () => {
    setTimeout(() => {
      this.setState({ openModal: false });
    }, 5000);
  };

  toggleDropdownParams = event => {
    const { listCampainContentParams } = this.props;
    listCampainContentParams.forEach(item => {
      if (event.id === item.id) {
        this.addText(item.paramCode);
      }
    });
  };

  remove(arr, item) {
    for (var i = arr.length; i--;) {
      if (arr[i].id === item.id) {
        arr.splice(i, 1);
      }
    }
    return arr;
  }

  hide = () => {
    this.setState({
      visible: false
    });
  };

  handleVisibleChange = visible => {
    this.setState({ visible });
  };

  addText = text => {
    let { valueName, valueTitle, defaultValueContent } = this.state;
    let sel, range;
    let newWindow = document.getElementsByTagName('iframe')[0].contentWindow;

    if (newWindow.getSelection()) {
      sel = newWindow.getSelection();
      if (sel.rangeCount) {
        range = sel.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createTextNode(text + ' '));
      }
    }

    let newValue = document.getElementsByTagName('iframe')[0].contentWindow.document;
    this.setState({ defaultValueContent: newValue.documentElement.outerHTML });
  };

  // select template email
  toggleLanding = event => {
    this.addContentTemplate(event);
    this.setState({ idTemplate: event.id });
    this.hide();
  };

  setValueForPopUp = event => {
    let { listCampainContentParams } = this.props;
    let newValue: string = '';

    let listParam = listCampainContentParams.map(item => {
      return { paramCode: item.paramCode, sampleValue: item.sampleValue };
    });

    for (let i = 0; i < listParam.length; i++) {
      let item = listParam[i];
      let paramCode = item.paramCode;
      let sampleValue = item.sampleValue;

      newValue = event.replace(paramCode, sampleValue);
      event = newValue;
    }

    this.setState({ defaultValueContentPopup: event });
  };

  //add content in CKeditor
  addContentTemplate = event => {
    let { listContentTemplateAsTypeEmailIntro, listFieldData } = this.props;
    let { defaultValueContent, subjectLanding, valueName, valueTitle, idEmail } = this.state;

    listContentTemplateAsTypeEmailIntro.forEach(item => {
      if (item.id === event.id.toString()) {
        defaultValueContent = item.content;
        subjectLanding = item.name;
        idEmail = item.id;
      }
    });

    this.setState({ defaultValueContent, idEmail, nameEmail: event.subject });
    this.props.getNavigationContentTemplates(event.id, INTRO_MAIL, 'templateId');
    this.props.getNavigationContentTemplates(subjectLanding, INTRO_MAIL, SUBJECT);
    let emailConfig = {
      id: this.props.idNode.id,
      nameEmail: event.subject,
      valueName,
      valueTitle,
      contentEmail: defaultValueContent,
      idEmail
    };

    let data = {
      messageConfig: listFieldData.messageConfig ? listFieldData.messageConfig : [],
      emailConfig: listFieldData.emailConfig ? listFieldData.emailConfig : [],
      listCampign: listFieldData.listCampign ? listFieldData.listCampign : [],
      timerEvent: listFieldData.timerEvent ? listFieldData.timerEvent : [],
      timer: listFieldData.timer ? listFieldData.timer : [],
      getway: listFieldData.getway ? listFieldData.getway : []
    };
    data.emailConfig = this.remove(data.emailConfig, this.props.idNode);
    data.emailConfig.push(emailConfig);
    this.props.validateCampaign(data);
  };

  openModalPreview = () => {
    this.setState({ openModal: true });
  };

  toggleModal = () => {
    this.setState({ openModal: false });
  };

  getValueText = async (option, item) => {
    let { valueName, valueTitle } = this.state;
    switch (option) {
      case 'name':
        valueName = item.target.value;
        break;
      case 'title':
        valueTitle = item.target.value;
        break;
      default:
        break;
    }
    this.setState({ valueTitle, valueName });
  };
  getNameEmail = () => {
    const { listFieldData, idNode } = this.props;
    let data: string;
    listFieldData.emailConfig &&
      listFieldData.emailConfig.map(item => {
        if (item.id === idNode.id) {
          data = item.valueName;
        }
      });
    return data;
  };

  contentEmail = () => {
    let result: string;
    const { listFieldData, idNode } = this.props;
    listFieldData.emailConfig &&
      listFieldData.emailConfig.map(item => {
        if (item.id === idNode.id) {
          result = item.nameEmail;
          this.state.defaultValueContent = item.contentEmail;
        }
      });
    return result;
  };

  toggle = () => {
    let { toggleModal, isOpenModal } = this.props;
    toggleModal(!isOpenModal, this.state.valueName);
  };

  confirmEmail = () => {
    let { listFieldData } = this.props;
    let { defaultValueContent, nameEmail, valueName, valueTitle, idEmail, content_mail_error, value_name_error } = this.state;
    let emailConfig = {
      id: this.props.idNode.id,
      nameEmail,
      valueName,
      valueTitle,
      contentEmail: defaultValueContent,
      idEmail
    };

    let data = {
      messageConfig: listFieldData.messageConfig ? listFieldData.messageConfig : [],
      emailConfig: listFieldData.emailConfig ? listFieldData.emailConfig : [],
      listCampign: listFieldData.listCampign ? listFieldData.listCampign : [],
      timerEvent: listFieldData.timerEvent ? listFieldData.timerEvent : [],
      timer: listFieldData.timer ? listFieldData.timer : [],
      getway: listFieldData.getway ? listFieldData.getway : []
    };
    let count: number = 0
    if (valueName) {
      value_name_error = ""
    } else {
      count++;
      value_name_error = translate("config-email.please-input")
    }

    if (defaultValueContent) {
      content_mail_error = ""
    } else {
      count++;
      content_mail_error = translate("config-email.please-chosse-email")
    }
    this.setState({ value_name_error, content_mail_error })


    if (count < 1) {
      data.emailConfig = this.remove(data.emailConfig, this.props.idNode);
      data.emailConfig.push(emailConfig);
      this.props.validateCampaign(data);
      this.toggle()
    }
  }

  getCloneDetailVersion = (name, info) => {
    let { list_clone_version, idNode } = this.props;
    if (!name && Object.keys(list_clone_version).length > 0 && list_clone_version.cjId) {
      list_clone_version.flowDetail.nodeMetaData.map(item => {
        if (item.nodeId === idNode.id) {
          name = item.nodeConfig[info]
        }
      })
    }
    return name
  }

  getCloneDetailVersion1 = (name, info) => {
    let { list_clone_version, idNode } = this.props;
    if (!name && Object.keys(list_clone_version).length > 0 && list_clone_version.cjId) {
      list_clone_version.flowDetail.nodeMetaData.map(item => {
        if (item.nodeId === idNode.id) {
          name = item.nodeConfig[info]
        }
      })
    }
    return name
  }

  render() {
    let { showMailForFriend, defaultValueContent, openModal, idTemplate } = this.state;
    let { listContentTemplateAsTypeEmailIntro, isOpenModal, list_clone_version } = this.props;
    let listTemplate = listContentTemplateAsTypeEmailIntro.map(item => {
      return {
        id: item.id,
        name: item.name,
        content: item.content,
        description: item.description,
        thumbnail: item.thumbnail,
        subject: item.subject
      };
    });

    let default_name_email = this.getNameEmail() ? this.getNameEmail() : this.getCloneDetailVersion(this.getNameEmail(), 'name')
    let default_title_email = this.contentEmail() ? this.contentEmail() : this.getCloneDetailVersion1(this.contentEmail(), 'titlle')


    return (
      <Fragment>
        <Modal className="modal-config-preview" isOpen={openModal}>
          <ModalHeader toggle={this.toggleModal}>Landing preview</ModalHeader>
          <ModalBody>
            <PreviewLanding htmlDOM={defaultValueContent} styleForDOM={''} />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggleModal}>
              Thoát
            </Button>
          </ModalFooter>
        </Modal>

        <Modal className="modal-config-email" isOpen={isOpenModal}>
          <ModalHeader
            toggle={this.toggle}

          >
            {' '}
            <Translate contentKey="config-email.send-email" />
          </ModalHeader>
          <ModalBody>

            <div className="config-email">
              <div className="add-content">
                {/* Detail */}
                <div className="add-content-detail">
                  {/* Title For Detail 1 */}
                  <div className="content-detail">
                    {/* Template Fix */}
                    <Collapse isOpen={!showMailForFriend}>
                      <Card>
                        <CardBody>
                          <Row>
                            <Col span={17}>
                              <label className="input-search_label"><Translate contentKey="config-email.name" /></label>
                              <Input
                                defaultValue={default_name_email}
                                style={{ width: '80%' }}
                                // placeholder={translate('group-attribute-customer.group-modal-config.name-placeholder')}
                                onChange={e => this.getValueText('name', e)}
                                maxLength={160}
                              />
                            </Col>

                          </Row>
                          <p style={{ color: "red", marginLeft: "13%" }}>{this.state.value_name_error}</p>

                          <br />
                          <Row>
                            <Col span={17}>
                              <label className="input-search_label"><Translate contentKey="config-email.chosse-email" /></label>
                              <UncontrolledButtonDropdown style={{ width: '81%' }}>
                                <DropdownToggle caret className="mb-2 mr-2" style={{ width: '80%' }} color="info" outline>
                                  {default_title_email ? default_title_email : <Translate contentKey="config-email.please-chosse-email" />}
                                </DropdownToggle>

                                <DropdownMenu className="dropdown-menu-xl">
                                  <div className="grid-menu grid-menu-xl grid-menu-3col">
                                    <RowReact className="no-gutters">
                                      {listTemplate &&
                                        listTemplate.map((item, index) => {
                                          return (
                                            <ColReact xl="4" sm="6">
                                              <Button
                                                key={index}
                                                href="javascript:void(0)"
                                                className="btn-icon-vertical btn-square btn-transition"
                                                outline
                                                color="link"
                                              >
                                                <DropdownItem>
                                                  <img
                                                    onClick={() => this.toggleLanding(item)}
                                                    style={{ width: '100%' }}
                                                    src={item.thumbnail}
                                                    alt={item.subject}
                                                  />
                                                </DropdownItem>
                                                {item.subject}
                                              </Button>
                                            </ColReact>
                                          );
                                        })}
                                    </RowReact>
                                  </div>
                                </DropdownMenu>
                              </UncontrolledButtonDropdown>
                              <p style={{ color: "red", marginLeft: "18%" }}>{this.state.content_mail_error}</p>

                            </Col>
                            <Col span={7} style={{ marginTop: '-5px' }}>
                              <ButtonAntd type="primary" onClick={this.openModalPreview} style={{ marginTop: '2%', background: '#3866DD' }}>
                                <Translate contentKey="config-email.preview" />
                              </ButtonAntd>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Collapse>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="none"
              onClick={this.toggle} >
              {' '}
              <Translate contentKey="config-email.cancel" />
            </Button>
            <Button
              type="primary"
              style={{ background: '#3866DD' }}
              onClick={() => {
                localStorage.removeItem('isSave');
                this.confirmEmail();
              }}
            >
              <Translate contentKey="config-email.chosse" />
            </Button>{' '}
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const mapStateToProps = ({ userCampaign, navigationInfo, campaignManagament }: IRootState) => {
  return {
    listCampainContentParams: userCampaign.listCampainContentParams,
    postRequest: userCampaign.postRequest,
    listContentTemplateAsTypeEmailIntro: userCampaign.listContentTemplateAsTypeEmailIntro,
    navigationInfo,
    listFieldData: campaignManagament.listFieldData,
    list_diagram: campaignManagament.listDiagram,
    list_clone_version: campaignManagament.cloneInfoVersion
  };
};

const mapDispatchToProps = {
  getContentPageParams,
  postTestMailLanding,
  getContentTemplate,
  getContentTemplateAsType,
  getNavigationContentTemplates,
  openModal,
  validateCampaign
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfigEmail);
