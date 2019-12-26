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
import Dropdown from 'app/layout/DropDown/Dropdown';
import CKEditor from 'ckeditor4-react';
import { Row, Col } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Input, Button as ButtonAntd, Popover } from 'antd';
import { connect } from 'react-redux';
import { validateCampaign } from 'app/actions/campaign-managament';
import { getContentPageParams, postTestMailLanding } from 'app/actions/user-campaign';
import { IRootState } from 'app/reducers';
import { getContentTemplate, getContentTemplateAsType } from 'app/actions/user-campaign';
import { openModal } from 'app/actions/modal';
import { getNavigationContentTemplates } from 'app/actions/navigation-info';
import TemplateEmail from './template-email/template-email';
import PreviewLanding from './preview/preview';
import { IParamester } from 'app/common/model/campaign-navigation.model';
import { Translate, translate } from 'react-jhipster';
import { FORM_LANDING, TEMPLATE_ID, INTRO_MAIL, REWARD_MAIL, EMAIL_EWARD, EMAIL_INTRO } from 'app/constants/common';
import CkeditorFixed from 'app/layout/ckeditor/CkeditorFixed';
import { SUBJECT } from 'app/constants/common';

// export interface I

export interface IConfigEmailProps extends StateProps, DispatchProps {
  onClick: Function;
  idNode: any;
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
    isOpenDropdown: false
  };
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getContentPageParams();
    this.props.getContentTemplateAsType(EMAIL_INTRO);
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
    for (var i = arr.length; i--; ) {
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
    let { defaultValueContent, subjectLanding, valueName, valueTitle } = this.state;

    listContentTemplateAsTypeEmailIntro.forEach(item => {
      if (item.id === event.id.toString()) {
        defaultValueContent = item.content;
        subjectLanding = item.name;
      }
    });

    this.setState({ defaultValueContent });
    this.props.getNavigationContentTemplates(event.id, INTRO_MAIL, 'templateId');
    this.props.getNavigationContentTemplates(subjectLanding, INTRO_MAIL, SUBJECT);
    let emailConfig = {
      id: this.props.idNode.id,
      nameEmail: event.name,
      valueName,
      valueTitle,
      contentEmail: defaultValueContent
    };

    let data = {
      messageConfig: listFieldData.messageConfig ? listFieldData.messageConfig : [],
      emailConfig: listFieldData.emailConfig ? listFieldData.emailConfig : [],
      listCampign: listFieldData.listCampign ? listFieldData.listCampign : [],
      timerEvent: listFieldData.timerEvent ? listFieldData.timerEvent : [],
      timer: listFieldData.timer ? listFieldData.timer : []
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

  getValueText = (option, item) => {
    const { onClick } = this.props;
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
    onClick(valueName, valueTitle);
  };
  getNameEmail = () => {
    const { listFieldData, idNode } = this.props;
    let data;
    listFieldData.emailConfig &&
      listFieldData.emailConfig.map(item => {
        if (item.id === idNode.id) {
          data = item.valueName;
        }
      });
    return data;
  };

  contentEmail = () => {
    let result;
    const { listFieldData, idNode } = this.props;
    listFieldData.emailConfig &&
      listFieldData.emailConfig.map(item => {
        if (item.id === idNode.id) {
          result = item.nameEmail;
          this.state.defaultValueContent = item.contentEmail;
        }
      });
    return <label>{result ? result : 'Vui lòng chọn Email'}</label>;
  };

  render() {
    let { showMailForFriend, defaultValueContent, openModal, idTemplate } = this.state;
    let { listCampainContentParams, listContentTemplateAsTypeEmailIntro, listFieldData } = this.props;

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

    return (
      <Fragment>
        <Modal className="modal-config-preview" isOpen={openModal} toggle={this.toggleModal}>
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
                          <label className="input-search_label">Tên</label>
                          <Input
                            defaultValue={this.getNameEmail()}
                            style={{ width: '80%' }}
                            // placeholder={translate('group-attribute-customer.group-modal-config.name-placeholder')}
                            onChange={e => this.getValueText('name', e)}
                            maxLength={160}
                          />
                        </Col>
                      </Row>
                      <br />
                      <Row>
                        <Col span={17}>
                          <label className="input-search_label">Tiêu đề mail</label>
                          <UncontrolledButtonDropdown style={{ width: '81%' }}>
                            <DropdownToggle caret className="mb-2 mr-2" style={{ width: '80%' }} color="info" outline>
                              {this.contentEmail()}
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
                        </Col>
                        <Col span={7} style={{ marginTop: '-5px' }}>
                          <ButtonAntd type="primary" onClick={this.openModalPreview} style={{ marginTop: '2%', background: '#3866DD' }}>
                            Xem trước
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
    listFieldData: campaignManagament.listFieldData
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfigEmail);
