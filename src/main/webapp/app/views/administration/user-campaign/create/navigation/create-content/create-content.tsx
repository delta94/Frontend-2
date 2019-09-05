import React, { Component } from 'react';
import '../create-content/create-content.scss';
import Dropdown from '../../../../../../layout/DropDown/Dropdown';

import { Card, Collapse, Button, Input, CardTitle, FormGroup, Label, CardBody } from 'reactstrap';
import { connect } from 'react-redux';

import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

import FroalaEditorComponent from 'react-froala-wysiwyg';
import {
  getContentTemplateAsType,
  getContentPageParams,
  postTestMailLanding,
  getContentTemplate
} from '../../../../../../actions/user-campaign';
import { IRootState } from '../../../../../../reducers/index';

export interface ICreateContentEntity {}

export interface ICreateContentProps extends StateProps, DispatchProps {}

export interface ICreateContentState {
  showMailForFriend: boolean;
  defaultValueContent?: string;
}

class CreateContent extends React.PureComponent<ICreateContentProps, ICreateContentState, ICreateContentEntity> {
  constructor(props) {
    super(props);
  }
  state: ICreateContentState = {
    showMailForFriend: false,
    defaultValueContent: ''
  };

  componentDidMount() {
    this.props.getContentPageParams();
    // this.props.getContentTemplate();
    this.props.getContentTemplateAsType('EMAIL');
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

  toggleLanding = event => {
    this.addContentTemplate(event.id);
  };

  addContentTemplate = id => {
    let { listContentTemplateAsType } = this.props;
    let { defaultValueContent } = this.state;
    listContentTemplateAsType.forEach(item => {
      if (item.id === id) {
        defaultValueContent = item.content;
      }
    });

    this.setState({ defaultValueContent });
  };

  render() {
    let { showMailForFriend } = this.state;
    let { listContentPageParams, listContentTemplateAsType } = this.props;

    const listIndexParams = listContentPageParams.map(item => {
      return {
        id: item.id,
        name: item.paramName
      };
    });

    const listTemplate = listContentTemplateAsType.map(item => {
      return { id: item.id, name: item.name };
    });

    return (
      <div className="add-content">
        {/* Title */}
        <div className="add-content-title">
          <CardTitle>Tạo nội dung</CardTitle>
          <div className="interactive">
            <label>Hình thức tương tác</label>
            <Dropdown
              selection={true}
              defaultValue="Chọn mẫu email"
              listArray={[{ id: 1, name: 'SMS' }, { id: 2, name: 'EMAIL' }]}
              toggleDropdown={this.toggleDropdownParams}
            />
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
                    <Dropdown selection={true} defaultValue="Chọn mẫu email" listArray={listTemplate} toggleDropdown={this.toggleLanding} />
                  </div>
                  <div className="input-mail-and-more">
                    <Input placeHolder="Tiêu đề email" />
                    <Dropdown
                      selection={true}
                      defaultValue="Tham số"
                      listArray={listIndexParams}
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
                    <Dropdown selection={true} defaultValue="Chọn mẫu email" listArray={listTemplate} toggleDropdown={this.toggleLanding} />
                  </div>
                  <div className="input-mail-and-more">
                    <Input placeHolder="Tiêu đề email" />
                    <Dropdown
                      selection={true}
                      defaultValue="Tham số"
                      listArray={listIndexParams}
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

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const mapStateToProps = ({ userCampaign }: IRootState) => {
  return {
    listContentPageParams: userCampaign.listCampainContentParams,
    postMailRequest: userCampaign.postMailRequest,
    listContentTemplateAsType: userCampaign.listContentTemplateAsType
  };
};

const mapDispatchToProps = { getContentPageParams, postTestMailLanding, getContentTemplate, getContentTemplateAsType };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateContent);
