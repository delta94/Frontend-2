import React, { Component } from 'react';
import '../create-content/create-content.scss';
import { connect } from 'react-redux';

import { Card, Collapse, Button, Input, CardTitle, FormGroup, Label, CardBody } from 'reactstrap';

import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

import FroalaEditorComponent from 'react-froala-wysiwyg';

export interface CreateContentEntity {}

export interface CreateContentProps {}

export interface CreateContentState {
  showMailForFriend: boolean;
  mailHeader: string;
}

const dumpInteractive = ['Email', 'Facebook', 'Gmail'];

const dumpTemplates = ['Template1', 'Template2', 'Template3', 'Template4'];

class CreateContent extends React.PureComponent<CreateContentEntity, CreateContentProps, CreateContentState> {
  constructor(props) {
    super(props);
  }
  state: CreateContentState = {
    showMailForFriend: false,
    mailHeader: ''
  };

  componentDidMount() {
    console.log(this.props);
  }

  _handleshowMailForFriendState = () => {
    let showMailForFriend: boolean = !this.state.showMailForFriend;
    this.setState({ showMailForFriend });
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
            <div className="add-content-detail-title" onClick={this._handleshowMailForFriendState}>
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
                    <FormGroup>
                      <Input type="select" name="select" id="exampleSelect">
                        {dumpTemplates &&
                          dumpTemplates.map((item, index) => {
                            return <option key={index}>{item}</option>;
                          })}
                      </Input>
                    </FormGroup>
                  </div>
                  <div className="input-mail-and-more">
                    <Input placeHolder="Tiêu đề email" />
                    <FormGroup>
                      <Input type="select" name="select" id="exampleSelect" style={{ width: '200px' }}>
                        {dumpTemplates &&
                          dumpTemplates.map((item, index) => {
                            return <option key={index}>{item}</option>;
                          })}
                      </Input>
                    </FormGroup>
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
            <div className="add-content-detail-title" onClick={this._handleshowMailForFriendState}>
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
                    <FormGroup>
                      <Input type="select" name="select" id="exampleSelect">
                        {dumpTemplates &&
                          dumpTemplates.map((item, index) => {
                            return <option key={index}>{item}</option>;
                          })}
                      </Input>
                    </FormGroup>
                  </div>
                  <div className="input-mail-and-more">
                    <Input placeHolder="Tiêu đề email" />
                    <FormGroup>
                      <Input type="select" name="select" id="exampleSelect" style={{ width: '200px' }}>
                        {dumpTemplates &&
                          dumpTemplates.map((item, index) => {
                            return <option key={index}>{item}</option>;
                          })}
                      </Input>
                    </FormGroup>
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
