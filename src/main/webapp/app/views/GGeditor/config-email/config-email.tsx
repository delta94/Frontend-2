import React, { Component, Fragment } from 'react';
import './config-email.scss';

import { Card, Collapse, Button, CardTitle, CardBody, Modal, ModalBody, ModalFooter, ModalHeader, Alert } from 'reactstrap';
import Dropdown from 'app/layout/DropDown/Dropdown';
import CKEditor from 'ckeditor4-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Input } from 'antd';
import { connect } from 'react-redux';
import { getContentPageParams, postTestMailLanding } from 'app/actions/user-campaign';
import { IRootState } from 'app/reducers';
import { getContentTemplate, getContentTemplateAsType } from 'app/actions/user-campaign';
import { openModal } from 'app/actions/modal';
import { getNavigationContentTemplates } from 'app/actions/navigation-info';
import PreviewLanding from './preview/preview';
import { IParamester } from 'app/common/model/campaign-navigation.model';
import { Translate, translate } from 'react-jhipster';
import { FORM_LANDING, TEMPLATE_ID } from 'app/constants/common';
import CkeditorFixed from 'app/layout/ckeditor/CkeditorFixed';
import { SUBJECT } from 'app/constants/common';

// export interface I

export interface IConfigEmailProps extends StateProps, DispatchProps {
  onClick: Function;
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
    valueTitle: ''
  };
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getContentPageParams();
    this.props.getContentTemplateAsType('LANDING');
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

  addText = text => {
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

  toggleLanding = event => {
    this.addContentTemplate(event.id);
    this.props.getNavigationContentTemplates(event.id, FORM_LANDING, TEMPLATE_ID);
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

  addContentTemplate = id => {
    let { listContentTemplateAsTypeLanding } = this.props;
    let { defaultValueContent, subjectLanding } = this.state;

    listContentTemplateAsTypeLanding.forEach(item => {
      if (item.id === id.toString()) {
        defaultValueContent = item.content;
        subjectLanding = item.name;
      }
    });

    this.setState({ defaultValueContent });
    this.props.getNavigationContentTemplates(subjectLanding, FORM_LANDING, SUBJECT);
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

  render() {
    let { showMailForFriend, defaultValueContent, openModal } = this.state;
    let { listCampainContentParams, listContentTemplateAsTypeLanding } = this.props;

    let listIndexParams = listCampainContentParams.map(item => {
      return {
        id: item.id,
        name: item.paramName
      };
    });

    let listTemplate = listContentTemplateAsTypeLanding.map(item => {
      return { id: item.id, name: item.name };
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
            <div className="interactive">
              <label onClick={this.openModalPreview} style={{ textDecoration: 'underline', color: '#3866DD' }}>
                <FontAwesomeIcon icon={faEye} />
                <span style={{ paddingLeft: '10px' }}>Preview</span>
              </label>
            </div>

            {/* Detail */}
            <div className="add-content-detail">
              {/* Title For Detail 1 */}
              <div className="content-detail">
                {/* Template Fix */}
                <Collapse isOpen={!showMailForFriend}>
                  <Card>
                    <CardBody>
                      <div className="input-search_group">
                        <label className="input-search_label">Tên</label>
                        <Input
                          style={{ width: '50%' }}
                          // placeholder={translate('group-attribute-customer.group-modal-config.name-placeholder')}
                          onChange={e => this.getValueText('name', e)}
                          maxLength={160}
                        />
                      </div>
                      <div className="input-search_group">
                        <label className="input-search_label">Tiêu đề mail</label>
                        <Input
                          style={{ width: '50%' }}
                          // placeholder={'yyyy/mm/dd hh:mm:ss'}
                          onChange={e => this.getValueText('title', e)}
                          maxLength={160}
                        />
                      </div>
                      <div className="input-mail-and-more">
                        <div style={{ width: 'calc(100% - 150px)', display: 'flex', marginBottom: '5px' }}>
                          <div style={{ padding: '0px 5px', lineHeight: '40px' }}>Chọn mẫu mail</div>
                          <div>
                            <Dropdown
                              selection={true}
                              defaultValue="Template mail"
                              listArray={listTemplate}
                              toggleDropdown={this.toggleLanding}
                            />
                          </div>
                        </div>
                        <div style={{ right: '0px' }}>
                          <Dropdown
                            selection={true}
                            defaultValue="Tham số"
                            listArray={listIndexParams}
                            toggleDropdown={this.toggleDropdownParams}
                          />
                        </div>
                      </div>
                      <CkeditorFixed id="editorLanding" data={defaultValueContent} type={FORM_LANDING} />
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

const mapStateToProps = ({ userCampaign, navigationInfo }: IRootState) => {
  return {
    listCampainContentParams: userCampaign.listCampainContentParams,
    postRequest: userCampaign.postRequest,
    listContentTemplateAsTypeLanding: userCampaign.listContentTemplateAsTypeLanding,
    navigationInfo
  };
};

const mapDispatchToProps = {
  getContentPageParams,
  postTestMailLanding,
  getContentTemplate,
  getContentTemplateAsType,
  getNavigationContentTemplates,
  openModal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfigEmail);
