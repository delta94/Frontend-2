import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/reducers';
import { validateCampaign, getDiagramCampaign } from 'app/actions/campaign-managament';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button as ButtonReacts } from 'reactstrap';
import { Button, Row, Col, Input, Select, InputNumber } from 'antd';
import { updateInfoCampaign } from 'app/actions/campaign-managament';
import './modal-wait-for-event.scss';
import { code_node } from 'app/common/model/campaign-managament.model';
import { CHARACTER_TIME, CHARACTER_NUMBER } from './constant-modal-wait';
import { Translate, translate } from 'react-jhipster';

const { TextArea } = Input;
const { Option } = Select;
const constantEvent = {
  EVENT: 'event',
  EMAIL: 'email',
  END_TIME: 'endTime'
};
interface IModalWaitForEventProps extends StateProps, DispatchProps {
  isOpenModal: boolean;
  toggleModal: Function;
  idNode?: any;
}
interface IModalWaitForEventState {
  event: string;
  email: string;
  time: number;
  timer: string;
  date: string;
  idEmail: string;
  event_error: string;
  time_error: string;
  idNode?: any;
}

export class ModalWaitForEvent extends React.Component<IModalWaitForEventProps, IModalWaitForEventState> {
  state: IModalWaitForEventState = {
    event: 'open-mail',
    email: '',
    time: 0,
    timer: '',
    date: '',
    idEmail: '',
    event_error: '',
    time_error: '',
    idNode: {}
  };

  toggle = () => {
    let { toggleModal, isOpenModal } = this.props;
    this.setState({ event_error: '', time_error: '' });
    toggleModal(!isOpenModal);
  };
  save = async () => {
    let { event, email, timer, time, date, idEmail } = this.state;
    let { listFieldData, validateCampaign } = this.props;
    let data = {
      messageConfig: listFieldData.messageConfig ? listFieldData.messageConfig : [],
      emailConfig: listFieldData.emailConfig ? listFieldData.emailConfig : [],
      listCampign: listFieldData.listCampign ? listFieldData.listCampign : [],
      timerEvent: listFieldData.timerEvent ? listFieldData.timerEvent : [],
      timer: listFieldData.timer ? listFieldData.timer : [],
      getway: listFieldData.getway ? listFieldData.getway : []
    };

    let timerEvent = {
      id: this.props.idNode.id,
      event,
      email,
      timer,
      date,
      time,
      idEmail,
      label: translate('flow-node-label.wait') + ' ' + translate('config-wait.' + event)
    };
    console.log(timerEvent);

    if (this.checkValidate()) {
      localStorage.removeItem('isSave');
      data.timerEvent.push(timerEvent);
      await validateCampaign(data);
      this.toggle();
    }
  };

  checkValidate = (): boolean => {
    let result: boolean = true;
    let { time, date, time_error } = this.state;

    if (time < 1) {
      time_error = '* Vui lòng chọn thời gian kết thúc';
    } else if (!date) {
      time_error = '* Vui lòng chọn thời gian kết thúc';
    } else if (date === 'Phút' && time < 3) {
      time_error = '* Thời gian phải lớn 3 phút';
    } else {
      time_error = '';
    }
    if (time_error.length > 0) {
      result = false;
    }
    this.setState({ time_error });
    return result;
  };

  // add condition time wait
  handlerTimeWait = async value => {
    let { idNode, listDiagram, getDiagramCampaign } = this.props;
    let data = listDiagram;
    let { time, timer, event, date } = this.state;
    switch (value) {
      case CHARACTER_TIME.YEAR:
        date = 'Năm';
        break;
      case CHARACTER_TIME.MONTH:
        date = 'Tháng';
        break;
      case CHARACTER_TIME.DAY:
        date = 'Ngày';
        break;
      case CHARACTER_TIME.HOUR:
        date = 'Giờ';
        break;
      case CHARACTER_TIME.MINUSTE:
        date = 'Phút';
        break;
      default:
        break;
    }
    if (value === CHARACTER_TIME.YEAR || value === CHARACTER_TIME.MONTH || value === CHARACTER_TIME.DAY) {
      timer = 'P' + time + value;
    } else {
      let timeSelect = value === 'M1' ? 'M' : value;
      timer = 'PT' + time + timeSelect;
    }
    await data.nodes.map(event => {
      if (event.id === idNode.id) {
        event.value = timer;
      }
    });
    await getDiagramCampaign(data);
    await this.setState({ timer, date });
  };

  handleChange(value, option) {
    let result: string;
    let { idEmail } = this.state;
    const { listFieldData } = this.props;
    listFieldData.emailConfig &&
      listFieldData.emailConfig.map(item => {
        if (item.id === value) {
          result = item.nameEmail;
          idEmail = item.id;
        }
      });
    switch (option) {
      case constantEvent.EVENT:
        this.setState({ event: value });
        break;
      case constantEvent.EMAIL:
        this.setState({ email: result, idEmail });
        break;
      default:
        break;
    }
  }

  getNumber = () => {
    const { listFieldData } = this.props;
    let result: number;
    listFieldData.timerEvent &&
      listFieldData.timerEvent.map(item => {
        if (item.id === this.props.idNode.id) {
          result = item.time;
        }
      });
    return result;
  };

  getDate = () => {
    const { listFieldData } = this.props;
    let result: string;
    listFieldData.timerEvent &&
      listFieldData.timerEvent.map(item => {
        if (item.id === this.props.idNode.id) {
          result = item.date;
        }
      });
    return result;
  };

  getDefaultValueClone = option => {
    const { list_clone_version, idNode } = this.props;
    let result;
    if (Object.keys(list_clone_version).length > 0 && list_clone_version.cjId) {
      list_clone_version.flowDetail.graph.nodes.map(item => {
        if (code_node.TIMER_EVENT === item.code && item.id === idNode.id) {
          switch (option) {
            case CHARACTER_NUMBER.NUMBER:
              if (
                item.value.charAt(0) === CHARACTER_TIME.YEAR ||
                item.value.charAt(0) === CHARACTER_TIME.MONTH ||
                item.value.charAt(0) === CHARACTER_TIME.DAY
              ) {
                result = Number(item.value.substring(1, item.value.length - 1));
                return result;
              } else {
                result = Number(item.value.substring(2, item.value.length - 1));
                return result;
              }
            case CHARACTER_NUMBER.TIME:
              let get_time;
              get_time = item.value.substring(item.value.length - 1, item.value.length);
              switch (get_time) {
                case CHARACTER_TIME.YEAR:
                  result = 'Năm';
                  break;
                case CHARACTER_TIME.MONTH:
                  if (
                    item.value.charAt(0) === CHARACTER_TIME.YEAR ||
                    item.value.charAt(0) === CHARACTER_TIME.MONTH ||
                    item.value.charAt(0) === CHARACTER_TIME.DAY
                  ) {
                    result = 'Tháng';
                  } else {
                    result = 'Phút';
                  }
                  break;
                case CHARACTER_TIME.DAY:
                  result = 'Ngày';
                  break;
                case CHARACTER_TIME.HOUR:
                  result = 'Giờ';
                  break;
              }
              return result;
            default:
              break;
          }
        }
      });
    }
    return result;
  };

  render() {
    let { isOpenModal, listFieldData } = this.props;
    let default_number = this.getNumber() ? this.getNumber() : this.getDefaultValueClone(CHARACTER_NUMBER.NUMBER);
    let default_time = this.getDate() ? this.getDate() : this.getDefaultValueClone(CHARACTER_NUMBER.TIME);
    // let valueEmail = listFieldData.emailConfig[listFieldData.emailConfig.length - 1].nameEmail ? listFieldData.emailConfig[listFieldData.emailConfig.length - 1].nameEmail : 'Vui lòng chọn Email'
    return (
      <Modal className="modal-wait-event-config" isOpen={isOpenModal}>
        <ModalHeader toggle={this.toggle}>Chờ Sự kiện</ModalHeader>
        <ModalBody>
          <Row>
            <Row>
              <Col span={6}>
                <label className="text-event-wait">Sự kiện</label>
              </Col>
              <Col span={18}>
                <Select defaultValue="open-mail" id="event" style={{ width: '100%' }} onChange={event => this.handleChange(event, 'event')}>
                  <Option value="open-mail">{translate('config-wait.open-mail')}</Option>
                  {/* <Option value="activated-voucher">Khách hàng kick hoạt mã voucher</Option> */}
                </Select>
              </Col>
            </Row>

            <Row>
              <Col span={6}>
                <label className="text-event-wait">Kết thúc chờ sau</label>
              </Col>
              <Col span={18}>
                <Col span={17}>
                  <InputNumber
                    id="input-number"
                    defaultValue={default_number}
                    style={{ width: '100%' }}
                    min={1}
                    max={10000}
                    onChange={event => {
                      let { time } = this.state;
                      time = event;
                      this.setState({ time });
                    }}
                  />
                </Col>
                <Col span={6} style={{ float: 'right' }}>
                  <Select defaultValue={default_time} style={{ width: '100%' }} onChange={this.handlerTimeWait} id="select-time">
                    <Option value="Y">Năm</Option>
                    <Option value="M">Tháng</Option>
                    <Option value="D">Ngày</Option>
                    <Option value="H">Giờ</Option>
                    <Option value="M1">Phút</Option>
                  </Select>
                </Col>
              </Col>
              <p className="error">{this.state.time_error}</p>
            </Row>
          </Row>
        </ModalBody>
        <ModalFooter>
          <ButtonReacts color="none" onClick={this.toggle}>
            Hủy
          </ButtonReacts>
          <ButtonReacts color="primary" style={{ background: '#3866DD' }} onClick={this.save}>
            Chọn
          </ButtonReacts>{' '}
        </ModalFooter>
      </Modal>
    );
  }
}
const mapStateToProps = ({ campaignManagament }: IRootState) => ({
  loading: campaignManagament.loading,
  listFieldData: campaignManagament.listFieldData,
  listDiagram: campaignManagament.listDiagram,
  list_clone_version: campaignManagament.cloneInfoVersion
});

const mapDispatchToProps = {
  updateInfoCampaign,
  validateCampaign,
  getDiagramCampaign
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ModalWaitForEvent);
