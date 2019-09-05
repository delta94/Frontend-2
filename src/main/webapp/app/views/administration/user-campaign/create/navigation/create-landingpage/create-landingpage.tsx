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
import PreviewLanding from './preview-landing/preview-landing';

// export interface I

export interface ICreateLandingPageProps extends StateProps, DispatchProps {}

export interface ICreateLandingPageState {
  showMailForFriend: boolean;
  defaultValueContent: string;
  openModal: boolean;
}

class CreateLandingPage extends React.PureComponent<ICreateLandingPageProps, ICreateLandingPageState> {
  constructor(props) {
    super(props);
  }

  state: ICreateLandingPageState = {
    showMailForFriend: false,
    defaultValueContent: '',
    openModal: false
  };

  componentDidMount() {
    this.props.getContentPageParams();
    this.props.getContentTemplateAsType('LANDING');
  }

  toggleDropdownMail = () => {};

  closeModal = () => {
    setTimeout(() => {
      this.setState({ openModal: false });
    }, 5000);
  };

  addText = text => {
    var sel, range;

    if (window.getSelection() && window.getSelection().focusNode.parentElement.offsetParent.className === 'fr-element fr-view') {
      console.log(window.getSelection().anchorNode);
      sel = window.getSelection();
      if (sel.rangeCount) {
        range = sel.getRangeAt(0);

        if (range === '' || range === null) {
          range.insertNode(document.createTextNode(text));
        } else {
          range.deleteContents();
          range.insertNode(document.createTextNode(text));
        }
      }
    }
  };

  toggleDropdownParams = event => {
    this.addText(event.name);
  };

  toggleLanding = event => {
    this.addContentTemplate(event.id);
  };

  handleModelChange = event => {
    this.setState({ defaultValueContent: event });
  };

  addContentTemplate = id => {
    let { listContentTemplateAsTypeLanding } = this.props;
    let { defaultValueContent } = this.state;
    listContentTemplateAsTypeLanding.forEach(item => {
      if (item.id === id) {
        defaultValueContent = item.content;
      }
    });

    this.setState({ defaultValueContent });
  };

  openModalPreview = () => {
    this.setState({ openModal: true });
  };

  toggleModal = () => {
    this.setState({ openModal: false });
  };

  // handleInput = () => { };

  render() {
    const { showMailForFriend, defaultValueContent, openModal } = this.state;
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
            <PreviewLanding htmlDOM={defaultValueContent} styleForDOM={''} />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggleModal}>
              Thoát
            </Button>
          </ModalFooter>
        </Modal>

        <div className="add-content">
          {/* Title */}
          <div className="add-content-title">
            <CardTitle>Tạo landingpage</CardTitle>
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
                      <div style={{ width: 'calc(100% - 150px)', display: 'flex' }}>
                        <div style={{ padding: '0px 5px', lineHeight: '40px' }}>Chọn landingpage</div>
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
    listCampainContentParams: userCampaign.listCampainContentParams,
    postMailRequest: userCampaign.postMailRequest,
    listContentTemplateAsTypeLanding: userCampaign.listContentTemplateAsTypeLanding
  };
};

const mapDispatchToProps = { getContentPageParams, postTestMailLanding, getContentTemplate, getContentTemplateAsType };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateLandingPage);
