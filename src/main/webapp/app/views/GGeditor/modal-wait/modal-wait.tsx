import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/reducers';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Button, Row, Col, Input, Select, InputNumber } from 'antd';
import { getDiagramCampaign, validateCampaign } from 'app/actions/campaign-managament';
import './modal-wait.scss';
import { code_node } from 'app/common/model/campaign-managament.model';
import { CHARACTER_NUMBER, CHARACTER_TIME } from '../modal-wait-for-event/constant-modal-wait';

const { TextArea } = Input;
const { Option } = Select;

interface IModalTimeWaitProps extends StateProps, DispatchProps {
  isOpenModal: boolean;
  toggleModal: Function;
  idNode?: any;
}
interface IModalTimeWaitState {
  waitEvent: number;
  timeWaitEvent: string;
  date: string;
  waitEvent_error: string;
}

export class ModalTimeWait extends React.Component<IModalTimeWaitProps, IModalTimeWaitState> {
  state: IModalTimeWaitState = {
    waitEvent: 0,
    timeWaitEvent: '',
    date: '',
    waitEvent_error: '',
  };

  toggle = () => {
    let { toggleModal, isOpenModal } = this.props;
    this.setState({ waitEvent_error: '' })
    toggleModal(!isOpenModal);
  };

  save = () => {
    let { validateCampaign, listFieldData } = this.props;
    let { timeWaitEvent, waitEvent, date } = this.state;
    let data = {
      messageConfig: listFieldData.messageConfig ? listFieldData.messageConfig : [],
      emailConfig: listFieldData.emailConfig ? listFieldData.emailConfig : [],
      listCampign: listFieldData.listCampign ? listFieldData.listCampign : [],
      timerEvent: listFieldData.timerEvent ? listFieldData.timerEvent : [],
      timer: listFieldData.timer ? listFieldData.timer : [],
      getway: listFieldData.getway ? listFieldData.getway : []
    };
    let timer = {
      id: this.props.idNode.id,
      timeWaitEvent,
      waitEvent,
      date
    };
    if (this.checkValidate()) {
      data.timer.push(timer);
      validateCampaign(data);
      localStorage.removeItem('isSave');
      this.toggle();
    }
  };

  checkValidate = (): boolean => {
    let { waitEvent_error, waitEvent, date } = this.state
    let result: boolean = true
    if (waitEvent < 1) {
      waitEvent_error = "* Vui lòng chọn thời gian chờ"
    } else {
      waitEvent_error = ""
    }
    if (!date) {
      waitEvent_error = "* Vui lòng chọn thời gian chờ"
    } else if (date === "Phút" && waitEvent < 3) {
      waitEvent_error = "* Thời gian phải lớn 3 phút"
    } else {
      waitEvent_error = ""
    }

    if (waitEvent_error.length > 0) {
      result = false
    }
    this.setState({ waitEvent_error })
    return result
  }

  // add condition time wait
  handlerTimeWait = async value => {
    let { idNode, listDiagram, getDiagramCampaign } = this.props;
    let data = listDiagram;
    let { date } = this.state;
    switch (value) {
      case 'Y':
        date = 'Năm';
        break;
      case 'M':
        date = 'Tháng';
        break;
      case 'D':
        date = 'Ngày';
        break;
      case 'H':
        date = 'Giờ';
        break;
      case 'M1':
        date = 'Phút';
        break;
      case 'S':
        date = 'Giây';
        break;
      default:
        break;
    }
    let { waitEvent, timeWaitEvent } = this.state;
    if (value === 'Y' || value === 'M' || value === 'D') {
      timeWaitEvent = 'P' + waitEvent + value;
    } else {
      let time = value === 'M1' ? 'M' : value;
      timeWaitEvent = 'PT' + waitEvent + time;
    }
    await data.nodes.map(event => {
      if (event.id === idNode.id) {
        event.value = timeWaitEvent;
      }
    });
    await this.setState({ timeWaitEvent, date });

    await getDiagramCampaign(data);
  };
  getNumber = () => {
    const { listFieldData } = this.props;
    let result: number;
    listFieldData.timer &&
      listFieldData.timer.map(item => {
        if (item.id === this.props.idNode.id) {
          result = item.waitEvent;
        }
      });
    return result;
  };

  getDate = () => {
    const { listFieldData } = this.props;
    let result: string;
    listFieldData.timer &&
      listFieldData.timer.map(item => {
        if (item.id === this.props.idNode.id) {
          result = item.date;
        }
      });
    return result;
  };

  getDefaultValueClone = (option) => {
    const { list_clone_version, idNode } = this.props
    let result
    if (Object.keys(list_clone_version).length > 0 && list_clone_version.cjId) {
      list_clone_version.flowDetail.graph.nodes.map(item => {
        if (code_node.TIMER === item.code && item.id === idNode.id) {
          switch (option) {
            case CHARACTER_NUMBER.NUMBER:
              if (item.value.charAt(0) === CHARACTER_TIME.YEAR || item.value.charAt(0) === CHARACTER_TIME.MONTH || item.value.charAt(0) === CHARACTER_TIME.DAY) {
                result = Number(item.value.substring(1, item.value.length - 1))
                return result
              } else {
                result = Number(item.value.substring(2, item.value.length - 1))
                return result
              }
            case CHARACTER_NUMBER.TIME:
              let get_time
              get_time = item.value.substring(item.value.length - 1, item.value.length)
              switch (get_time) {
                case CHARACTER_TIME.YEAR:
                  result = 'Năm';
                  break;
                case CHARACTER_TIME.MONTH:
                  if (item.value.charAt(0) === CHARACTER_TIME.YEAR || item.value.charAt(0) === CHARACTER_TIME.MONTH || item.value.charAt(0) === CHARACTER_TIME.DAY) {
                    result = 'Tháng';
                  } else {
                    result = 'Phút'
                  }
                  break;
                case CHARACTER_TIME.DAY:
                  result = 'Ngày';
                  break;
                case CHARACTER_TIME.HOUR:
                  result = 'Giờ';
                  break;
              }
              return result
            default:
              break;
          }
        }
      })
    }
    return result
  }

  render() {
    let { isOpenModal } = this.props;
    let default_number = this.getNumber() ? this.getNumber() : this.getDefaultValueClone(CHARACTER_NUMBER.NUMBER)
    let default_time = this.getDate() ? this.getDate() : this.getDefaultValueClone(CHARACTER_NUMBER.TIME)
    return (
      <Modal className="modal-message-config" isOpen={isOpenModal}>
        <ModalHeader toggle={this.toggle}>Thời gian chờ</ModalHeader>
        <ModalBody>
          <Row>
            <Row>
              <Col span={6}>
                <label className="text-event-wait">#</label>
              </Col>
              <Col span={18}>
                <Col span={17}>
                  <InputNumber
                    defaultValue={default_number}
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
                    defaultValue={default_time}
                    style={{ width: '100%' }}
                    onChange={value => {
                      this.handlerTimeWait(value);
                    }}
                  >
                    <Option value="Y">Năm</Option>
                    <Option value="M">Tháng</Option>
                    <Option value="D">Ngày</Option>
                    <Option value="H">Giờ</Option>
                    <Option value="M1">Phút</Option>
                  </Select>
                </Col>
              </Col>
              <p className="error" style={{ color: "red" }}>{this.state.waitEvent_error}</p>
            </Row>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button type="link" style={{ color: "black" }} onClick={this.toggle}>
            Hủy
          </Button>
          <Button type="primary" style={{ background: '#3866DD' }} onClick={this.save}>
            Chọn
          </Button>{' '}
        </ModalFooter>
      </Modal>
    );
  }
}
const mapStateToProps = ({ campaignManagament }: IRootState) => ({
  loading: campaignManagament.loading,
  listDiagram: campaignManagament.listDiagram,
  listFieldData: campaignManagament.listFieldData,
  list_clone_version: campaignManagament.cloneInfoVersion
});

const mapDispatchToProps = {
  getDiagramCampaign,
  validateCampaign
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ModalTimeWait);
