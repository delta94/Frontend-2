import React, { Component } from 'react';
import '../create-content/create-content.scss';
import Dropdown from '../../../../../../layout/DropDown/Dropdown';

import { Card, Collapse, Button, Input, CardTitle, FormGroup, Label, CardBody } from 'reactstrap';

import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

import FroalaEditorComponent from 'react-froala-wysiwyg';

export interface ICreateContentEntity {}

export interface ICreateContentProps {}

export interface ICreateContentState {
  showMailForFriend: boolean;
  defaultValueContent?: string;
}

const dumpInteractive = ['Email', 'Facebook', 'Gmail'];

const dumpTemplates = [
  { id: '1', name: 'Template1' },
  { id: '1', name: 'Template2' },
  { id: '1', name: 'Template4' },
  { id: '1', name: 'Template3' }
];

class CreateContent extends React.PureComponent<ICreateContentProps, ICreateContentState, ICreateContentEntity> {
  constructor(props) {
    super(props);
  }
  state: ICreateContentState = {
    showMailForFriend: false,
    defaultValueContent: ''
  };

  componentDidMount() {
    console.log(this.props);
  }

  _handleshowMailForFriendState = () => {
    let showMailForFriend: boolean = !this.state.showMailForFriend;
    this.setState({ showMailForFriend });
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

  handleModelChange = event => {
    this.setState({ defaultValueContent: event });
  };

  render() {
    let { showMailForFriend } = this.state;
    return (
      <div className="add-content">
        {/* Title */}
        <div className="add-content-title">
          <CardTitle>Tạo nội dung</CardTitle>
          <div className="interactive">
            <label>Hình thức tương tác</label>
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
            <div className="add-content-detail-title  b-t" onClick={this._handleshowMailForFriendState}>
              <Button color="primary" style={{ marginBottom: '1rem' }}>
                1
              </Button>
              <label>GỬI MAIL GIỚI THIỆU BẠN BÈ</label>
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
                      selection={true}
                      defaultValue="Chọn mẫu email"
                      listArray={dumpTemplates}
                      toggleDropdown={this.toggleDropdownParams}
                    />
                  </div>
                  <div className="input-mail-and-more">
                    <Input placeHolder="Tiêu đề email" />
                    <Dropdown
                      selection={true}
                      defaultValue="Tham số"
                      listArray={dumpTemplates}
                      toggleDropdown={this.toggleDropdownParams}
                    />
                  </div>
                  <div className="content-fixing">
                    <FroalaEditorComponent tag="textarea" />
                  </div>
                </CardBody>
              </Card>
            </Collapse>
          </div>

          {/* Title For Detail 2 */}
          <div className="content-detail ">
            <div className="add-content-detail-title b-t" onClick={this._handleshowMailForFriendState}>
              <Button color="primary" style={{ marginBottom: '1rem' }}>
                2
              </Button>
              <label>GỬI MAIL TẶNG QUÀ</label>
              <div className="interactive" style={{ display: showMailForFriend ? 'inline-block' : 'none' }}>
                <div className="test-mail">
                  <Input placeHolder="Điền email test" value="" />
                  <Button color="primary">Test</Button>
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
                      defaultValue="Chọn mẫu email"
                      listArray={dumpTemplates}
                      toggleDropdown={this.toggleDropdownParams}
                    />
                  </div>
                  <div className="input-mail-and-more">
                    <Input placeHolder="Tiêu đề email" />
                    <Dropdown
                      selection={true}
                      defaultValue="Tham số"
                      listArray={dumpTemplates}
                      toggleDropdown={this.toggleDropdownParams}
                    />
                  </div>
                  <div className="content-fixing">
                    <FroalaEditorComponent tag="textarea" />
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

export default CreateContent;
