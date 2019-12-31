import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/reducers';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Button, Row, Col, Input, Select, InputNumber } from 'antd';
import { getDiagramCampaign, validateCampaign } from 'app/actions/campaign-managament';
import './modal-wait.scss';

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
}

export class ModalTimeWait extends React.Component<IModalTimeWaitProps, IModalTimeWaitState> {
  state: IModalTimeWaitState = {
    waitEvent: 0,
    timeWaitEvent: '',
    date: ''
  };

  toggle = () => {
    let { toggleModal, isOpenModal } = this.props;
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
    data.timer.push(timer);
    validateCampaign(data);
    localStorage.removeItem('isSave');
    this.toggle();
  };

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
      case 'S':
        date = 'Giây';
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
  render() {
    let { isOpenModal } = this.props;
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
                    defaultValue={this.getNumber()}
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
                    defaultValue={this.getDate()}
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
                    <Option value="S">Giây</Option>
                  </Select>
                </Col>
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
  listDiagram: campaignManagament.listDiagram,
  listFieldData: campaignManagament.listFieldData
});

const mapDispatchToProps = {
  getDiagramCampaign,
  validateCampaign
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalTimeWait);
