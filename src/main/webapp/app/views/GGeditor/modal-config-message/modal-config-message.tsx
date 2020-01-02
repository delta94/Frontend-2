import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/reducers';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import $ from 'jquery';
import { validateCampaign } from 'app/actions/campaign-managament';
import { Button, Row, Col, Input, Select } from 'antd';
import { updateInfoCampaign } from 'app/actions/campaign-managament';
import './modal-config-message.scss';

const { TextArea } = Input;
const { Option } = Select;

interface IConfigMessageProps extends StateProps, DispatchProps {
  isOpenModal: boolean;
  toggleModal: Function;
  idNode: any;
}
interface IConfigMessageState {}

export class ConfigMessage extends React.Component<IConfigMessageProps, IConfigMessageState> {
  state: IConfigMessageState = {};

  toggle = value => {
    let { toggleModal, isOpenModal } = this.props;
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
    localStorage.removeItem('isSave');
    data.messageConfig = this.remove(data.messageConfig, this.props.idNode);
    data.messageConfig.push(fieldMessageConfig);
    validateCampaign(data);
    this.toggle(fieldMessageConfig);
  };

  remove(arr, item) {
    for (var i = arr.length; i--; ) {
      if (arr[i].id === item.id) {
        arr.splice(i, 1);
      }
    }
    return arr;
  }

  count = () => {
    let total = $('#text-content').val();
    total = String(total).replace(/\s/g, '');
    document.getElementById('total').innerHTML = `${total.length}/160`;
  };

  //add param in modal Send message
  insertAtCursor(newText) {
    const textarea = document.querySelector('textarea');
    textarea.setRangeText(newText, textarea.selectionStart, textarea.selectionEnd, 'end');
  }

  getNameSms = () => {
    const { listFieldData, idNode } = this.props;
    let result: string;
    listFieldData.messageConfig &&
      listFieldData.messageConfig.map(item => {
        if (item.id === idNode.id) {
          result = item.name;
        }
      });
    return result;
  };

  getNameContent = () => {
    const { listFieldData, idNode } = this.props;
    let result: string;
    listFieldData.messageConfig &&
      listFieldData.messageConfig.map(item => {
        if (item.id === idNode.id) {
          result = item.content;
        }
      });
    return result;
  };
  render() {
    let { isOpenModal } = this.props;
    let nameSMS = this.getNameSms();
    return (
      <Modal className="modal-message-config" isOpen={isOpenModal}>
        <ModalHeader toggle={this.toggle}>Gửi SMS</ModalHeader>
        <ModalBody>
          <Row>
            <Row>
              <Col span={1}>
                <label className="label-message">Tên</label>
              </Col>
              <Col span={14}>
                <Input defaultValue={nameSMS} id="name-message" style={{ float: 'right', width: '92%' }} />
              </Col>
              <Col span={3} style={{ textAlign: 'right', paddingRight: '2%' }}>
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
                <TextArea defaultValue={this.getNameContent()} onKeyUp={() => this.count()} id="text-content" maxLength={160} rows={10} />
                <p id="total">0/160</p>
              </Col>
            </Row>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button type="link" onClick={this.toggle}>
            Hủy
          </Button>
          <Button type="primary" onClick={this.save}>
            Chọn
          </Button>{' '}
        </ModalFooter>
      </Modal>
    );
  }
}
const mapStateToProps = ({ campaignManagament }: IRootState) => ({
  loading: campaignManagament.loading,
  listFieldData: campaignManagament.listFieldData
});

const mapDispatchToProps = {
  updateInfoCampaign,
  validateCampaign
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ConfigMessage);
