import React, { Component, Fragment } from 'react';
import '../create-landingpage/create-landingpage.scss';

import {
  Card,
  Collapse,
  Button,
  Input,
  CardTitle,
  FormGroup,
  Label,
  CardBody,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'reactstrap';
import Dropdown from '../../../../../../layout/DropDown/Dropdown';

import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

import FroalaEditorComponent from 'react-froala-wysiwyg';
import { connect } from 'react-redux';
import { getContentPageParams, postTestMailLanding } from 'app/actions/user-campaign';
import { IRootState } from 'app/reducers';
import ModalExample from 'app/DemoPages/Components/Modal/Examples/Modal';

export interface ICreateTestMailEntity {
  emailTo?: string;
  subject?: string;
  content?: string;
}

// export interface I

export interface ICreateLandingPageProps extends StateProps, DispatchProps {}

export interface ICreateLandingPageState {
  showMailForFriend: boolean;
  defaultValueContent: string;
  testEmailEntity: ICreateTestMailEntity;
  openModal: boolean;
}

const dumpInteractive = ['landingpage 1', 'landingpage 2', 'landingpage 3'];

const dumpTemplates = [
  { id: 1, name: 'Template1' },
  { id: 1, name: 'Template2' },
  { id: 1, name: 'Template4' },
  { id: 1, name: 'Template3' }
];

class CreateLandingPage extends React.PureComponent<ICreateLandingPageProps, ICreateLandingPageState, ICreateTestMailEntity> {
  constructor(props) {
    super(props);
  }
  state: ICreateLandingPageState = {
    showMailForFriend: false,
    defaultValueContent: '',
    testEmailEntity: {
      emailTo: '',
      subject: '',
      content: ''
    },

    openModal: false
  };

  componentDidMount() {
    this.props.getContentPageParams();
  }

  toggleDropdownMail = () => {};

  sendTestMailLanding = () => {
    let { testEmailEntity } = this.state;
    let { postMailRequest } = this.props;

    if (postMailRequest.openModal === true) {
      this.props.postTestMailLanding(testEmailEntity);
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

  handleModelChange = event => {
    let { testEmailEntity } = this.state;

    testEmailEntity.content = event;
    this.setState({ defaultValueContent: event, testEmailEntity });
  };

  handleInput = (event, type) => {
    let contentData = event.target.value;
    let { testEmailEntity } = this.state;
    testEmailEntity[type] = contentData;
    this.setState({ testEmailEntity });
  };

  toggleModal = () => {
    this.setState({ openModal: false });
  };

  render() {
    const { showMailForFriend, defaultValueContent, testEmailEntity, openModal } = this.state;
    const { listCampainContentParams, postMailRequest } = this.props;

    const listIndexParams = listCampainContentParams.map(item => {
      return {
        id: item.id,
        name: item.paramName
      };
    });

    return (
      <Fragment>
        <Modal isOpen={openModal} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Thông báo</ModalHeader>
          <ModalBody>{postMailRequest.name}</ModalBody>
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
              <label>Chọn landingpage</label>
              <FormGroup>
                <Input type="select" name="select" id="exampleSelect">
                  {dumpInteractive &&
                    dumpInteractive.map((item, index) => {
                      return <option key={index}>{item}</option>;
                    })}
                </Input>
              </FormGroup>
            </div>
          </div>

          {/* Detail */}
          <div className="add-content-detail">
            {/* Title For Detail 1 */}
            <div className="content-detail">
              <div className="add-content-detail-title  b-t">
                <label>Preview</label>
                <div className="interactive" style={{ display: showMailForFriend ? 'none' : 'inline-block' }}>
                  <div className="test-mail">
                    <Input
                      placeHolder="Điền email test"
                      onChange={event => {
                        this.handleInput(event, 'emailTo');
                      }}
                    />
                    <Button
                      color="primary"
                      onClick={() => {
                        this.sendTestMailLanding();
                      }}
                    >
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
                        selection={false}
                        defaultValue="Chọn mẫu email"
                        listArray={dumpTemplates}
                        toggleDropdown={this.toggleDropdownMail}
                      />
                    </div>
                    <div className="input-mail-and-more">
                      <Input
                        placeHolder="Tiêu đề email"
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
                      <FroalaEditorComponent
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
    postMailRequest: userCampaign.postMailRequest
  };
};

const mapDispatchToProps = { getContentPageParams, postTestMailLanding };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateLandingPage);
