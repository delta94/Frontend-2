import React, { Fragment } from 'react';
import GGEditor, { Flow } from 'gg-editor';
import { Row, Col, Popover, Input, Button, Layout, Menu, Breadcrumb, Icon, Select, InputNumber, Modal as ModalAntd } from 'antd';
import CustomNode from './node/node';
import CustomEdges from './egdes/egdes';
import FlowToolbar from './FlowToolBar/flow-tool-bar';
import { connect } from 'react-redux';
import Save from './save/save';
import { saveCampaignAuto, getNode } from 'app/actions/campaign-managament';
import { IRootState } from 'app/reducers';
import ConfigEmail from './config-email/config-email';
import FlowItemPanel from './EditorItemPannel/FlowItemPanel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCopy, faTrashAlt, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import ModalGroupCustomer from './modal-group-customer/modal-group-customer';
import FlowContextMenu from './EditorContextMenu/flow-context-menu';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import $ from 'jquery';
const { Option } = Select;
const { Header, Content, Footer, Sider } = Layout;
const { TextArea } = Input;
const { SubMenu } = Menu;
import './style.scss';
import SiderComponet from './sider/sider-tool';
import SiderTest from './sider/sider-test';

const ButtonGroup = Button.Group;
const { confirm } = ModalAntd;

interface IFlowPageProps extends StateProps, DispatchProps {}
interface IFlowPageState {
  visible: boolean;
  isOpen: boolean;
  data: any;
  idNode: any;
  collapsed: boolean;
  isUpdateNode: boolean;
  idEdge: any;
  isOpenModal: boolean;
  titleMail: string;
  isTest: boolean;
  timeStartCampaign: string;
  advancedSearches: any[];
  waitEvent: number;
  timeWaitEvent: string;
}

export class FlowPage extends React.Component<IFlowPageProps, IFlowPageState> {
  state: IFlowPageState = {
    visible: false,
    isOpen: false,
    data: JSON.parse(localStorage.getItem('nodeStore')),
    idNode: {},
    collapsed: false,
    isUpdateNode: false,
    idEdge: {},
    isOpenModal: false,
    titleMail: '',
    isTest: false,
    timeStartCampaign: '',
    advancedSearches: [],
    waitEvent: 0,
    timeWaitEvent: ''
  };
  //handler Popup send email
  confirmEmail = async () => {
    let { idNode, titleMail } = this.state;
    let data = JSON.parse(localStorage.getItem('nodeStore'));
    await data.nodes.map(event => {
      if (event.id === idNode.id) {
        event.label = titleMail;
      }
    });
    await localStorage.setItem('nodeStore', JSON.stringify(data));
    await this.setState({ isOpenModal: !this.state.isOpenModal, data: JSON.parse(localStorage.getItem('nodeStore')), isUpdateNode: true });
  };

  // handler Open modal
  getVisible = async (event, valueName, searchAdv, isSuccess) => {
    let { idNode, advancedSearches, timeStartCampaign, timeWaitEvent } = this.state;
    let data = JSON.parse(localStorage.getItem('nodeStore'));
    switch (idNode.param) {
      case 'DATA':
        this.setState({ visible: event });
        await data.nodes.map(event => {
          if (event.id === idNode.id) {
            event.label = String(valueName).split(',')[0];
          }
        });
        timeStartCampaign = String(valueName).split(',')[1];
        advancedSearches = searchAdv;
        this.setState({ timeStartCampaign, advancedSearches });
        break;

      case 'EMAIL':
        this.setState({ isOpenModal: event });
        break;
      case 'WAIT-UNTIL':
        confirm({
          icon: 'none',
          width: '55%',
          title: <label className="title-event-wait">CHỜ SỰ KIỆN </label>,
          content: this.contentWaitUltil('1'),
          onOk() {},
          onCancel() {}
        });
        break;
      case 'WAIT':
        confirm({
          icon: 'none',
          width: '55%',
          title: <label className="title-event-wait">THỜI GIAN CHỜ </label>,
          content: this.contentWaitUltil('2'),
          onOk: () => {},

          onCancel() {}
        });
        break;

      case 'MESSAGE':
        confirm({
          icon: 'none',
          width: '55%',
          title: <label className="title-event-wait">GỬI TIN NHẮN </label>,
          content: this.contentWaitUltil('3'),
          onOk() {},
          onCancel() {}
        });
        break;

      default:
        break;
    }
    if (isSuccess) {
      await localStorage.setItem('nodeStore', JSON.stringify(data));
      await this.setState({ data: JSON.parse(localStorage.getItem('nodeStore')), isUpdateNode: true });
    }
  };
  //get title email save in Node
  getInfoEmail = (event, value) => {
    let { titleMail } = this.state;
    titleMail = event;
    this.setState({ titleMail });
  };

  handleChange(value) {
    console.log(`selected ${value}`);
  }

  //content Modal
  contentWaitUltil(option) {
    let data;
    switch (option) {
      case '1':
        data = (
          <Row>
            <Row>
              <Col span={6}>
                <label className="text-event-wait">Sự kiện</label>
              </Col>
              <Col span={18}>
                <Select defaultValue="lucy" style={{ width: '100%' }} onChange={this.handleChange}>
                  <Option value="jack">Khách hàng mở mail</Option>
                  <Option value="lucy">Sinh nhật khách hàng</Option>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <label className="text-event-wait">Email</label>
              </Col>
              <Col span={18}>
                <Select defaultValue="lucy" style={{ width: '100%' }} onChange={this.handleChange}>
                  <Option value="jack">Email 1</Option>
                  <Option value="lucy">Email 2</Option>
                  <Option value="Yiminghe">Email 3</Option>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <label className="text-event-wait">Kết thúc chờ sau</label>
              </Col>
              <Col span={18}>
                <Col span={17}>
                  <Input maxLength={160} />
                </Col>
                <Col span={6} style={{ float: 'right' }}>
                  <Select defaultValue="lucy" style={{ width: '100%' }} onChange={this.handleChange}>
                    <Option value="jack">Giờ</Option>
                    <Option value="lucy">Phút</Option>
                    <Option value="Yiminghe">Giây</Option>
                  </Select>
                </Col>
              </Col>
            </Row>
          </Row>
        );
        break;

      case '2':
        data = (
          <Row>
            <Row>
              <Col span={6}>
                <label className="text-event-wait">#</label>
              </Col>
              <Col span={18}>
                <Col span={17}>
                  <InputNumber
                    style={{ width: '100%' }}
                    min={1}
                    max={10000}
                    onChange={event => {
                      let { waitEvent } = this.state;
                      waitEvent = event;
                      this.setState({ waitEvent });
                    }}
                  />
                </Col>
                <Col span={6} style={{ float: 'right' }}>
                  <Select
                    style={{ width: '100%' }}
                    onChange={value => {
                      this.handlerTimeWait(value);
                    }}
                  >
                    <Option value="Y">Năm</Option>
                    <Option value="M">Tháng</Option>
                    <Option value="D">Ngày</Option>
                    <Option value="h">Giờ</Option>
                    <Option value="m">Phút</Option>
                    <Option value="s">Giây</Option>
                  </Select>
                </Col>
              </Col>
            </Row>
          </Row>
        );
        break;

      case '3':
        data = (
          <Row>
            <Row>
              <Col span={1}>
                <label className="label-message">Tên</label>
              </Col>
              <Col span={12}>
                <Input style={{ float: 'right', width: '92%' }} />
              </Col>
              <Col span={5} style={{ textAlign: 'center' }}>
                <label className="label-message">Tham số</label>
              </Col>
              <Col span={6}>
                <Select defaultValue="Tên" style={{ width: '100%' }} onChange={this.insertAtCursor}>
                  <Option value="{{Tên}}">Tên</Option>
                  <Option value="{{Email}}">Email</Option>
                  <Option value="{{Số Điện Thoại}}">Số điện thoại</Option>
                </Select>
              </Col>
            </Row>
            <br />
            <Row>
              <Col span={2}>
                <label className="label-message">Nội dung</label>
              </Col>
              <Col span={22}>
                <TextArea id="text-content" rows={4} />
              </Col>
            </Row>
          </Row>
        );
        break;
      case '4':
        data = (
          <Row>
            <Row>
              <Col span={3}>
                <label className="label-message">Tên Chiến dịch</label>
              </Col>
              <Col span={12}>
                <Input id="name-campaign" style={{ float: 'right', width: '92%' }} />
              </Col>
            </Row>
            <br />
            <Row>
              <Col span={3}>
                <label className="label-message">Tag</label>
              </Col>
              <Col span={12}>
                <Input style={{ float: 'right', width: '92%' }} />
              </Col>
            </Row>
            <br />
            <Row>
              <Col span={4}>
                <label className="label-message">Mô tả</label>
              </Col>
              <Col span={20}>
                <TextArea id="text-content" rows={4} />
              </Col>
            </Row>
          </Row>
        );
        break;
      default:
        break;
    }
    return data;
  }

  // add condition time wait
  handlerTimeWait = async value => {
    let data = JSON.parse(localStorage.getItem('nodeStore'));
    let { waitEvent, timeWaitEvent, idNode } = this.state;
    if (value === 'Y' || value === 'M' || value === 'D') {
      timeWaitEvent = 'P' + waitEvent + value;
    } else {
      timeWaitEvent = 'PT' + waitEvent + value;
    }
    await data.nodes.map(event => {
      if (event.id === idNode.id) {
        event.value = timeWaitEvent;
      }
    });
    await localStorage.setItem('nodeStore', JSON.stringify(data));
    await this.setState({ timeWaitEvent, data: JSON.parse(localStorage.getItem('nodeStore')), isUpdateNode: true });
  };

  //add param in modal Send message
  insertAtCursor(newText) {
    const textarea = document.querySelector('textarea');
    textarea.setRangeText(newText, textarea.selectionStart, textarea.selectionEnd, 'end');
  }
  //excute command
  commandExecute = command => {
    let name = command.command.name;
    let model = command.command;
    console.log(command.command);
    switch (name) {
      case 'delete':
        this.deleteModel(command.command.itemIds[0]);
        break;
      case 'add':
        this.addModel(model);
        break;
      default:
        break;
    }
  };
  // remove item in array
  remove(arr, item) {
    for (var i = arr.length; i--; ) {
      if (arr[i].id === item.id) {
        arr.splice(i, 1);
      }
    }
    return arr;
  }
  //delete Node
  deleteModel(id) {
    debugger;
    let { idNode, idEdge } = this.state;
    let data = {
      nodes: [],
      edges: []
    };
    let props = JSON.parse(localStorage.getItem('nodeStore')) ? JSON.parse(localStorage.getItem('nodeStore')) : {};

    if (props && Object.keys(props).length > 0) {
      data = JSON.parse(localStorage.getItem('nodeStore'));
    }
    switch (idNode.type ? idNode.type : idEdge.type) {
      case 'node':
        data.nodes = this.remove(data.nodes, idNode);
        data.edges = this.remove(data.edges, idNode);
        break;

      case 'edge':
        data.edges = this.remove(data.edges, idNode);
        break;

      default:
        break;
    }
    localStorage.setItem('nodeStore', JSON.stringify(data));
  }

  //add node and save in local store
  addModel(command) {
    let type = command.type;
    let data = {
      edges: [],
      nodes: [],
      groups: []
    };

    let props = JSON.parse(localStorage.getItem('nodeStore')) ? JSON.parse(localStorage.getItem('nodeStore')) : {};

    switch (type) {
      case 'edge':
        if (props.edges && Object.keys(props).length > 0) {
          data = JSON.parse(localStorage.getItem('nodeStore'));
        }
        data.edges.push(command.addModel);
        localStorage.setItem('nodeStore', JSON.stringify(data));
        break;
      case 'node':
        if (props.nodes && Object.keys(props).length > 0) {
          data = JSON.parse(localStorage.getItem('nodeStore'));
        }
        data.nodes.push(command.addModel);
        localStorage.setItem('nodeStore', JSON.stringify(data));

        break;
      default:
        break;
    }
  }

  //@@
  //modal edit info campaign
  showModalInfoCampaign = () => {
    confirm({
      icon: 'none',
      width: '55%',
      title: <label className="title-event-wait">CHIẾN DỊCH </label>,
      content: this.contentWaitUltil('4'),
      onOk() {},
      onCancel() {}
    });
  };

  //close Popover Setting
  hide = () => {
    this.setState({
      isOpen: false
    });
  };

  // handler Popover Setting
  handleVisibleChange = visible => {
    this.setState({ isOpen: visible });
  };

  //Content Popover Setting
  contentSetting() {
    return (
      <Row>
        <Row>
          <Button type="link" onClick={this.hide} className="btn-multi">
            <FontAwesomeIcon icon={faCopy} /> &nbsp; <label>Nhân bản chiến dịch</label>
          </Button>
        </Row>
        <hr />
        <Row>
          <Button type="link" onClick={this.hide} className="btn-multi">
            <FontAwesomeIcon icon={faTrashAlt} color="red" /> &nbsp; <label style={{ color: 'red' }}>Xóa version này</label>
          </Button>
        </Row>
        <Row>
          <Button type="link" onClick={this.hide} className="btn-multi">
            <Icon type="notification" style={{ color: 'red' }} /> &nbsp; <label style={{ color: 'red' }}>Xóa chiến dịch này</label>
          </Button>
        </Row>
      </Row>
    );
  }
  //event save campaign
  saveCampaign = node => {
    const { idFolder, saveCampaignAuto } = this.props;
    let { timeStartCampaign, advancedSearches } = this.state;
    let graph = {
      nodes: node.nodes.map(event => {
        return {
          type: event.type,
          label: event.label,
          code: event.code,
          value: event.value,
          id: event.id
        };
      }),
      edges: node.edges.map(value => {
        return {
          source: value.source,
          target: value.target,
          sourceAnchor: value.sourceAnchor,
          targetAnchor: value.targetAnchor,
          id: value.id,
          value: ''
        };
      })
    };
    let data = {
      folderId: idFolder,
      cj: {
        id: null,
        name: $('name-campaign').val(),
        description: $('text-content').val()
      },
      cjTags: [
        {
          id: '',
          name: ''
        }
      ],
      flow: {
        startTime: timeStartCampaign,
        customerAdvancedSave: advancedSearches,
        graph: graph
      }
    };
    saveCampaignAuto(data);
  };

  render() {
    let { collapsed, data, isTest } = this.state;
    const imgSetting = require('app/assets/utils/images/flow/setting.png');
    const imgAward = require('app/assets/utils/images/flow/award.png');
    const imgMove = require('app/assets/utils/images/flow/move.png');
    let dataDisable = JSON.parse(localStorage.getItem('nodeStore'));
    return (
      <Fragment>
        <GGEditor
          className="editor"
          onAfterCommandExecute={command => {
            this.commandExecute(command);
          }}
        >
          <Layout style={{ minHeight: '200vh' }}>
            {isTest ? <SiderTest /> : <SiderComponet />}
            <Layout>
              <Header className="header-flow">
                <Row>
                  <Col span={24} className="titleContent">
                    <Row>
                      <Breadcrumb separator=">">
                        <Breadcrumb.Item>
                          <a onClick={() => window.location.assign('/#/app/views/customers/user-management')} href="javascript:void(0);">
                            <FontAwesomeIcon icon={faHome} />
                          </a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                          <a onClick={() => window.location.assign('/#/app/views/campaigns/campaign-auto')} href="javascript:void(0);">
                            Chiến dịch tự động
                          </a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                          <a
                            onClick={() => window.location.assign('/#/app/views/campaigns/campaign-managament')}
                            href="javascript:void(0);"
                          >
                            Danh sách chiến dịch
                          </a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                          <a
                            onClick={() => window.location.assign('/#/app/views/campaigns/campaign-managament/new')}
                            href="javascript:void(0);"
                          >
                            Tạo chiến dịch
                          </a>
                        </Breadcrumb.Item>
                        <label className="ant-breadcrumb-link">Chiến dịch mới</label>
                        <Button type="link" id="config-name" onClick={this.showModalInfoCampaign}>
                          <FontAwesomeIcon icon={faUserEdit} />
                        </Button>
                      </Breadcrumb>
                    </Row>
                  </Col>
                </Row>
              </Header>
              <Row type="flex" className="editorHd">
                <Col span={24} style={{ borderBottom: '0.25px solid', padding: '1%' }}>
                  <Col span={4}>
                    <label>Phiên bản: 1.0</label>
                  </Col>
                  <Col span={8}>
                    <label>Trạng Thái : Bản nháp</label>
                  </Col>
                  <Col span={4}>
                    <img src={imgMove} /> &nbsp;
                    <Popover
                      content={this.contentSetting()}
                      visible={this.state.isOpen}
                      placement="bottom"
                      onVisibleChange={this.handleVisibleChange}
                      title=""
                      trigger="click"
                    >
                      <img src={imgSetting} /> &nbsp;
                    </Popover>
                    <img src={imgAward} />
                  </Col>
                  <Col span={6}>
                    <ButtonGroup>
                      <Button
                        onClick={() => {
                          this.setState({ isTest: true });
                        }}
                        disabled={dataDisable && dataDisable.nodes.length > 0 ? false : true}
                      >
                        Test
                      </Button>
                      <Button disabled={dataDisable && dataDisable.nodes.length > 0 ? false : true}>Validate</Button>
                      <Save onClick={this.saveCampaign} />
                    </ButtonGroup>
                  </Col>
                  <Col span={2}>
                    <Button type="primary" style={{ float: 'right' }}>
                      Kích hoạt
                    </Button>
                  </Col>
                </Col>
                <Col span={24} style={{ padding: '0% 23%' }}>
                  <FlowToolbar />
                </Col>
              </Row>
              <Flow
                // onClick= {(e)=> {this.setState({isUpdate:true})}}
                onClick={e => {
                  console.log(e);
                  if (e.item && e.item.type === 'node') {
                    this.setState({ idNode: e.item && e.item.type === 'node' ? e.item.model : '' });
                  }
                  if (e.item && e.item.type === 'edge') {
                    this.setState({ idEdge: e.item && e.item.type === 'edge' ? e.item.model : '' });
                  }
                }}
                // onMouseMove = {(e)=>{}}
                graph={{
                  edgeDefaultShape: 'custom-edge'
                }}
                className="flow"
                data={data}
              />
              <CustomNode />
              <CustomEdges />
            </Layout>
          </Layout>
          <FlowContextMenu onClick={this.getVisible} />
        </GGEditor>
        <div className="content-group-modal-attribute">
          <ModalGroupCustomer
            is_show={this.state.visible}
            type_modal={'empty'}
            id_list_customer={''}
            toggle={this.getVisible}
            title_modal={'CHỌN NHÓM'}
          />
        </div>
        <Modal className="modal-config-email" isOpen={this.state.isOpenModal}>
          <ModalHeader
            toggle={() => {
              this.setState({ isOpenModal: !this.state.isOpenModal });
            }}
          >
            {' '}
            GỬI EMAIL
          </ModalHeader>
          <ModalBody>
            <ConfigEmail onClick={this.getInfoEmail} />
          </ModalBody>
          <ModalFooter>
            <Button
              color="link"
              onClick={() => {
                this.setState({ isOpenModal: !this.state.isOpenModal });
              }}
            >
              {' '}
              Hủy
            </Button>
            <Button
              color="primary"
              onClick={() => {
                this.confirmEmail();
              }}
            >
              Chọn
            </Button>{' '}
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}
const mapStateToProps = ({ campaignManagament }: IRootState) => ({
  loading: campaignManagament.loading,
  list_tree_folder: campaignManagament.tree_folder,
  idFolder: campaignManagament.listNode
});

const mapDispatchToProps = {
  saveCampaignAuto,
  getNode
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlowPage);
