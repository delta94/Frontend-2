import React, { Component, Fragment } from 'react';
import '../create-landingpage/create-landingpage.scss';

import { Card, Collapse, Button, CardTitle, CardBody, Modal, ModalBody, ModalFooter, ModalHeader, Alert } from 'reactstrap';
import Dropdown from '../../../../../../layout/DropDown/Dropdown';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/plugins.pkgd.min.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

import FroalaEditor from 'react-froala-wysiwyg';
import { connect } from 'react-redux';
import { getContentPageParams, postTestMailLanding } from 'app/actions/user-campaign';
import { IRootState } from 'app/reducers';
import { getContentTemplate, getContentTemplateAsType } from '../../../../../../actions/user-campaign';
import { getNavigationContentTemplates } from 'app/actions/navigation-info';
import PreviewLanding from './preview-landing/preview-landing';
import { IParamester } from 'app/common/model/campaign-navigation.model';
import { Translate } from 'react-jhipster';

// export interface I

export interface ICreateLandingPageProps extends StateProps, DispatchProps {}

export interface ICreateLandingPageState {
  showMailForFriend: boolean;
  defaultValueContent: string;
  defaultValueContentPopup: string;
  openModal: boolean;
  paramester: IParamester[];
  subjectLanding: string;
}

class CreateLandingPage extends React.PureComponent<ICreateLandingPageProps, ICreateLandingPageState> {
  state: ICreateLandingPageState = {
    showMailForFriend: false,
    defaultValueContent: '',
    openModal: false,
    defaultValueContentPopup: '',
    paramester: [],
    subjectLanding: ''
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

  addText = text => {
    var sel, range;
    let newWindow = document.getElementsByTagName('iframe')[0].contentWindow;

    if (newWindow.getSelection()) {
      sel = newWindow.getSelection();
      if (sel.rangeCount) {
        range = sel.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createTextNode(text));
      }
    }
  };

  toggleDropdownParams = event => {
    let { listCampainContentParams } = this.props;
    listCampainContentParams.forEach(item => {
      if (event.id === item.id) {
        this.addText(item.paramCode);
      }
    });
  };

  toggleLanding = event => {
    this.addContentTemplate(event.id);
    this.props.getNavigationContentTemplates(event.id, 'FORM_LANDING', 'templateId');
  };

  handleModelChange = event => {
    let { listCampainContentParams } = this.props;
    let paramester = [];
    listCampainContentParams.forEach(item => {
      if (event.indexOf(item.paramCode) > 0) {
        paramester.push(item);
      }
    });

    let newParamester = paramester.map(item => ({
      id: item.id,
      name: item.paramName,
      code: item.paramCode
    }));

    this.setState({ defaultValueContent: event, paramester });
    this.props.getNavigationContentTemplates(newParamester, 'FORM_LANDING', 'parameter');
    this.props.getNavigationContentTemplates(event, 'FORM_LANDING', 'content');
    this.setValueForPopUp(event);
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
      if (item.id === id) {
        defaultValueContent = item.content;
        subjectLanding = item.name;
      }
    });

    this.setState({ defaultValueContent });
    this.props.getNavigationContentTemplates(subjectLanding, 'FORM_LANDING', 'subject');
  };

  openModalPreview = () => {
    this.setState({ openModal: true });
  };

  toggleModal = () => {
    this.setState({ openModal: false });
  };

  render() {
    const { showMailForFriend, defaultValueContent, openModal, defaultValueContentPopup } = this.state;
    const { listCampainContentParams, listContentTemplateAsTypeLanding } = this.props;

    const listIndexParams = listCampainContentParams.map(item => {
      return {
        id: item.id,
        name: item.paramName
      };
    });

    const listTemplate = listContentTemplateAsTypeLanding.map(item => {
      return { id: item.id, name: item.name };
    });

    return (
      <Fragment>
        <Modal isOpen={openModal} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Landing preview</ModalHeader>
          <ModalBody>
            <PreviewLanding htmlDOM={defaultValueContentPopup} styleForDOM={''} />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggleModal}>
              Thoát
            </Button>
          </ModalFooter>
        </Modal>
        <div className="create-landing">
          <div className="add-content">
            {/* Title */}
            <div className="add-content-title">
              <CardTitle>
                <Translate contentKey="campaign.create-landing" />
              </CardTitle>
              <div className="interactive">
                <label onClick={this.openModalPreview} style={{ textDecoration: 'underline' }}>
                  <FontAwesomeIcon icon={faEye} />
                  Preview
                </label>
              </div>
            </div>

            {/* Detail */}
            <div className="add-content-detail">
              {/* Title For Detail 1 */}
              <div className="content-detail">
                {/* Template Fix */}
                <Collapse isOpen={!showMailForFriend}>
                  <Card>
                    <CardBody>
                      <div className="input-mail-and-more">
                        <div style={{ width: 'calc(100% - 150px)', display: 'flex', marginBottom: '5px' }}>
                          <div style={{ padding: '0px 5px', lineHeight: '40px' }}>
                            <Translate contentKey="campaign.chose-landing" />
                          </div>
                          <div>
                            <Dropdown
                              selection={true}
                              defaultValue="Chọn landing"
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
                      <div className="content-fixing">
                        <FroalaEditor
                          tag="textarea"
                          config={{
                            placeholderText: '',
                            iframe: true,
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
        </div>
      </Fragment>
    );
  }
}

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const mapStateToProps = ({ userCampaign }: IRootState) => {
  return {
    listCampainContentParams: userCampaign.listCampainContentParams,
    postMailRequest: userCampaign.postMailRequest,
    listContentTemplateAsTypeLanding: userCampaign.listContentTemplateAsTypeLanding
  };
};

const mapDispatchToProps = {
  getContentPageParams,
  postTestMailLanding,
  getContentTemplate,
  getContentTemplateAsType,
  getNavigationContentTemplates
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateLandingPage);
