import React, { Component } from 'react';
import '../create-landingpage/create-landingpage.scss';

import { Card, Collapse, Button, Input, CardTitle, FormGroup, Label, CardBody } from 'reactstrap';

import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

import FroalaEditorComponent from 'react-froala-wysiwyg';

export interface CreateLandingPageEntity {}

export interface CreateLandingPageProps {}

export interface CreateLandingPageState {
  showMailForFriend: boolean;
}

const dumpInteractive = ['landingpage 1', 'landingpage 2', 'landingpage 3'];

const dumpTemplates = ['Template1', 'Template2', 'Template3', 'Template4'];

class CreateLandingPage extends React.PureComponent<CreateLandingPageProps, CreateLandingPageEntity, CreateLandingPageState> {
  constructor(props) {
    super(props);
  }
  state: CreateLandingPageState = {
    showMailForFriend: false
  };

  render() {
    let { showMailForFriend } = this.state;
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
            <div className="add-content-detail-title  b-t">
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

export default CreateLandingPage;
