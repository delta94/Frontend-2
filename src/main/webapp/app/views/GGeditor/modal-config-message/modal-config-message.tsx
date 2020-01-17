import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/reducers';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import $ from 'jquery';
import { validateCampaign } from 'app/actions/campaign-managament';
import { Button, Row, Col, Input, Select } from 'antd';
import { updateInfoCampaign } from 'app/actions/campaign-managament';
import './modal-config-message.scss';
import { translate, Translate } from 'react-jhipster';

const { TextArea } = Input;
const { Option } = Select;

interface IConfigMessageProps extends StateProps, DispatchProps {
  isOpenModal: boolean;
  toggleModal: Function;
  idNode: any;
}
interface IConfigMessageState {
  message_error: string;
  content_error: string;
}

export class ConfigMessage extends React.Component<IConfigMessageProps, IConfigMessageState> {
  state: IConfigMessageState = {
    message_error: '',
    content_error: '',
  };

  toggle = value => {
    let { toggleModal, isOpenModal } = this.props;
    this.setState({ content_error: '', message_error: '' })
    toggleModal(!isOpenModal, value);
  };

  save = () => {
    let { listFieldData, validateCampaign } = this.props;
    let data = {
      messageConfig: listFieldData.messageConfig ? listFieldData.messageConfig : [],
      emailConfig: listFieldData.emailConfig ? listFieldData.emailConfig : [],
      listCampign: listFieldData.listCampign ? listFieldData.listCampign : [],
      timerEvent: listFieldData.timerEvent ? listFieldData.timerEvent : [],
      timer: listFieldData.timer ? listFieldData.timer : [],
      getway: listFieldData.getway ? listFieldData.getway : []
    };
    let fieldMessageConfig = {
      id: this.props.idNode.id,
      name: $(`#name-message`).val(),
      content: $(`#text-content`).val()
    };
    if (this.checkValidate()) {
      localStorage.removeItem('isSave');
      data.messageConfig = this.remove(data.messageConfig, this.props.idNode);
      data.messageConfig.push(fieldMessageConfig);
      validateCampaign(data);
      this.toggle(fieldMessageConfig);
    }
  };

  checkValidate = (): boolean => {
    let { content_error, message_error } = this.state
    let count: number = 0
    let result: boolean = true
    let message: string = String($(`#name-message`).val())
    let content: string = String($(`#text-content`).val())
    if (!message) {
      count++;
      message_error = translate("config-message.message-error")
    } else {
      message_error = ""
    }
    if (!content) {
      count++;
      content_error = translate("config-message.content-error")
    } else {
      content_error = ""
    }
    if (count > 0) {
      result = false
    }
    this.setState({ content_error, message_error })
    return result
  }

  remove(arr, item) {
    for (var i = arr.length; i--;) {
      if (arr[i].id === item.id) {
        arr.splice(i, 1);
      }
    }
    return arr;
  }

  count = () => {
    let total = $('#text-content').val();
    total = String(total).replace(/\s/g, '');
    document.getElementById('total').innerHTML = `${total.length}/240`;
  };

  //add param in modal Send message
  insertAtCursor(newText) {
    const textarea = document.querySelector('textarea');
    textarea.setRangeText(newText, textarea.selectionStart, textarea.selectionEnd, 'end');
  }

  getNameSms = () => {
    
    const { listFieldData, idNode, list_clone_version } = this.props;
    let result: string;
    listFieldData.messageConfig &&
      listFieldData.messageConfig.map(item => {
        if (item.id === idNode.id) {
          result = item.name;
        }
      });
    if (Object.keys(list_clone_version).length > 0 && list_clone_version.cjId && !result) {
      list_clone_version.flowDetail.nodeMetaData.map(item => {
        if (item.nodeId = idNode.id) {
          result = item.nodeConfig.name
        }
      })
    }
    return result;
  };

  getNameContent = () => {
    const { listFieldData, idNode, list_clone_version } = this.props;
    let result: string;
    listFieldData.messageConfig &&
      listFieldData.messageConfig.map(item => {
        if (item.id === idNode.id) {
          result = item.content;
        }
      });
      if (Object.keys(list_clone_version).length > 0 && list_clone_version.cjId && !result) {
        list_clone_version.flowDetail.nodeMetaData.map(item => {
          if (item.nodeId = idNode.id) {
            result = item.nodeConfig.content
          }
        })
      }
    return result;
  };
  render() {
    let { isOpenModal } = this.props;
    let nameSMS = this.getNameSms();
    return (
      <Modal className="modal-message-config" isOpen={isOpenModal}>
        <ModalHeader toggle={this.toggle}><Translate contentKey="config-message.send-sms" /></ModalHeader>
        <ModalBody>
          <Row>
            <Row>
              <Col span={1}>
                <label className="label-message"><Translate contentKey="config-message.name" /></label>
              </Col>
              <Col span={14}>
                <Input defaultValue={nameSMS} id="name-message" maxLength={160} style={{ float: 'right', width: '92%' }} />
              </Col>
              <Col span={3} style={{ textAlign: 'right', paddingRight: '2%' }}>
                <label className="label-message"><Translate contentKey="config-message.param" /></label>
              </Col>

              <Col span={6}>
                <Select defaultValue="Tên" style={{ width: '100%' }} onChange={this.insertAtCursor}>
                  <Option value="{{Tên}}"><Translate contentKey="config-message.name" /></Option>
                  <Option value="{{Email}}"><Translate contentKey="config-message.email" /></Option>
                  <Option value="{{Số Điện Thoại}}"><Translate contentKey="config-message.phone" /></Option>
                </Select>
              </Col>
            </Row>
            <p className="error" style={{ color: "red", marginLeft: "9%" }}>{this.state.message_error}</p>
            <br />
            <Row>
              <Col span={2}>
                <label className="label-message"><Translate contentKey="config-message.content" /></label>
              </Col>
              <Col span={22}>
                <TextArea defaultValue={this.getNameContent()} onKeyUp={() => this.count()} id="text-content" maxLength={240} rows={10} />
                <p id="total">0/240</p>
              </Col>
            </Row>
            <p className="error" style={{ color: "red", marginLeft: "9%" }}>{this.state.content_error}</p>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button type="link" style={{ color: "black" }} onClick={this.toggle}>
            <Translate contentKey="config-email.cancel" />
          </Button>
          <Button type="primary" style={{ background: "#3866DD" }} onClick={this.save}>
            <Translate contentKey="config-email.chosse" />
          </Button>{' '}
        </ModalFooter>
      </Modal>
    );
  }
}
const mapStateToProps = ({ campaignManagament }: IRootState) => ({
  loading: campaignManagament.loading,
  listFieldData: campaignManagament.listFieldData,
  list_clone_version: campaignManagament.cloneInfoVersion
});

const mapDispatchToProps = {
  updateInfoCampaign,
  validateCampaign
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ConfigMessage);
