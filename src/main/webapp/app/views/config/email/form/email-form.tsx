import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import CKEditor from 'ckeditor4-react';
import Dropdown from 'app/layout/DropDown/Dropdown';
import { Input, Icon, Row, Checkbox, Button, Modal, Popover, Tabs } from 'antd';
import { Table, ButtonGroup, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button as Btn } from 'reactstrap';
import { Translate, translate } from 'react-jhipster';
import { IRootState } from 'app/reducers';
import LoaderAnim from 'react-loaders';
import Loader from 'react-loader-advanced';
import SweetAlert from 'sweetalert-react';
import ReactPaginate from 'react-paginate';
import { IContentParams } from 'app/common/model/email-config.model';
import { GROUP_PARAM } from 'app/constants/email-config';
import classnames from 'classnames';
import {
  getContentParamAction
} from 'app/actions/email-config';
import './email-form.scss';
import { divideDurationByDuration } from 'fullcalendar';

interface IEmailFormManagementProps extends StateProps, DispatchProps { }
interface IEmailFormManagementState {
  visiblePopOver: boolean;
  activeKey: string;
  contentParams: IContentParams[];
  contentEmail: string;
}
const { TabPane } = Tabs;
const groupParams = [
  {
    "name": "EVoucher",
    "code": GROUP_PARAM.E_VOUCHER
  },
  {
    "name": "Contact",
    "code": GROUP_PARAM.CUSTOMER
  },
  {
    "name": "Campaign",
    "code": GROUP_PARAM.CAMPAIGN
  }
];

class EmailFormManagement extends React.Component<IEmailFormManagementProps, IEmailFormManagementState> {
  state: IEmailFormManagementState = {
    visiblePopOver: false,
    activeKey: groupParams[0].code,
    contentParams: [],
    contentEmail: ''
  };

  componentDidMount = async () => {
    await this.props.getContentParamAction();
    this.getContentParam(this.state.activeKey);
  }

  back = () => {
    location.assign('#/app/views/config/emails');
  }


  saveEmail = () => {
    console.log(this.state.contentEmail);
  }

  title = (<div className="title-content-param">
    <label>Add a Persionaliztion</label>
    <Button
      onClick={() => { this.handleVisibleChange(false) }}
    >
      <i className="pe-7s-close-circle" />
    </Button>
  </div>);

  getContentParam = activeKey => {
    this.setState({
      activeKey,
      contentParams: this.props.contentParams.filter(item => item.groupParam === activeKey)
    });
  };

  handleVisibleChange = visible => {
    this.setState({ visiblePopOver: visible });
  };

  content = () => {
    let content = (<div className="content-param">
      <Tabs tabPosition={'left'} onChange={this.getContentParam} defaultActiveKey={this.state.activeKey}>
        {groupParams ? groupParams.map((item, index) =>
          (<TabPane tab={item.name} key={item.code}>
            {this.state.contentParams ? this.state.contentParams.map((item, index) => (
              <div className="tabs-param" key={index}><label onClick={() => { this.selectParam(item.paramCode) }}>{item.paramName}</label></div>
            )) : ''}
          </TabPane>)
        ) : ''}
      </Tabs>
    </div>);
    return content;
  }

  handleModelChange = event => {
    console.log(event);
  };

  selectParam = paramCode => {
    debugger
    let sel, range;
    let newWindow = document.getElementsByTagName('iframe')[0].contentWindow;

    if (newWindow.getSelection()) {
      sel = newWindow.getSelection();
      if (sel.rangeCount) {
        range = sel.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createTextNode(paramCode + ' '));
      }
    }

    let newValue = document.getElementsByTagName('iframe')[0].contentWindow.document;
    this.setState({ contentEmail: newValue.documentElement.outerHTML });
  };

  render() {
    const spinner1 = <LoaderAnim type="ball-pulse" active={true} />;
    return (
      <Loader message={spinner1} show={false} priority={1}>
        <Fragment>
          <div className="email-form-management">
            <div className="email-form-title-header">
              <Button onClick={this.back}>Back</Button>
              <div className="button-group">
                <Button color="primary" onClick = {()=>{this.saveEmail}}>
                  Save
                      </Button>
                <Button color="primary" style={{ marginLeft: "5px" }}>
                  Save as Template
                      </Button>
              </div>
            </div>
            <div className="email-form-body">
              <div className="email-input-group">
                <label>Email Name</label>
                <Input
                />
              </div>
              <div className="email-input-group">
                <label>Email Subject</label>
                <Input
                />
              </div>
              <div className="email-content">
                <div style={{ float: 'right' }}>
                  <Popover placement="leftTop"
                    title={this.title}
                    content={this.content()}
                    visible={this.state.visiblePopOver}
                    onVisibleChange={this.handleVisibleChange}
                    trigger="click">
                    <Button>Variables</Button>
                  </Popover>
                </div>
                <div style={{ clear: 'both' }}></div>
                <div style={{ marginTop: '10px' }}>
                  <CKEditor
                    id={''}
                    editorName="editor2"
                    data={this.state.contentEmail}
                    config={{
                      extraPlugins: 'stylesheetparser'
                    }}
                    onBeforeLoad={CKEDITOR => (CKEDITOR.disableAutoInline = true)}
                    onInit={event => {
                      console.log(event);
                    }}
                    onChange={event => {
                      this.handleModelChange(event.editor.getData());
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      </Loader>
    );
  }
}

const mapStateToProps = ({ emailConfigState }: IRootState) => ({
  contentParams: emailConfigState.contentParams
});

const mapDispatchToProps = {
  getContentParamAction
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailFormManagement);
