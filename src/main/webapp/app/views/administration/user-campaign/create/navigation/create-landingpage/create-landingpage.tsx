import React, { Component } from 'react';
import '../create-landingpage/create-landingpage.scss';

import { Card, Collapse, Button, Input, CardTitle, FormGroup, Label, CardBody } from 'reactstrap';
import Dropdown from '../../../../../../layout/DropDown/Dropdown';
import { connect } from 'react-redux';

import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

import FroalaEditorComponent from 'react-froala-wysiwyg';
import { string } from 'prop-types';
import { getCampaignInfoService } from '../../../../../../services/user-campaign';

export interface ICreateLandingPageEntity {
  headerMail?: string;
  contentMail?: string;
  typeMail?: string;
}

export interface ICreateLandingPageProps {}

export interface ICreateLandingPageState {
  showMailForFriend: boolean;
  defaultValueContent: string;
}

const dumpInteractive = ['landingpage 1', 'landingpage 2', 'landingpage 3'];

const dumpTemplates = [
  { id: '1', name: 'Template1' },
  { id: '1', name: 'Template2' },
  { id: '1', name: 'Template4' },
  { id: '1', name: 'Template3' }
];

class CreateLandingPage extends React.PureComponent<ICreateLandingPageProps, ICreateLandingPageState, ICreateLandingPageEntity> {
  constructor(props) {
    super(props);
  }
  state: ICreateLandingPageState = {
    showMailForFriend: false,
    defaultValueContent: ''
  };

  componentDidMount() {
    console.log(this.props);
  }

  toggleDropdownMail = () => {};

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

  handleModelChange = event => {
    this.setState({ defaultValueContent: event });
  };

  render() {
    let { showMailForFriend, defaultValueContent } = this.state;
    return (
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
            <div className="add-content-detail-title">
              <label>Preview</label>
              <div className="interactive" style={{ display: showMailForFriend ? 'none' : 'inline-block' }}>
                <div className="test-mail">
                  <Input placeHolder="Điền email test" value="" />
                  <Button color="primary">Test</Button>
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
                    <Input placeHolder="Tiêu đề Email" value={''} />
                    <Dropdown
                      selection={true}
                      defaultValue="Tham số"
                      listArray={dumpTemplates}
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
    );
  }
}

const mapStateToProps = state => ({
  allState: state
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateLandingPage);
