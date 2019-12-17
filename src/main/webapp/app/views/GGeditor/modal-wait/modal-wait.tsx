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
}

export class ModalTimeWait extends React.Component<IModalTimeWaitProps, IModalTimeWaitState> {
  state: IModalTimeWaitState = {
    waitEvent: 0,
    timeWaitEvent: ''
  };

  toggle = () => {
    let { toggleModal, isOpenModal } = this.props;
    toggleModal(!isOpenModal);
  };

  save = () => {
    let { validateCampaign, listFieldData } = this.props;
    let { timeWaitEvent } = this.state;
    let data = {
      messageConfig: listFieldData.messageConfig ? listFieldData.messageConfig : [],
      emailConfig: listFieldData.emailConfig ? listFieldData.emailConfig : [],
      listCampign: listFieldData.listCampign ? listFieldData.listCampign : [],
      timerEvent: listFieldData.timerEvent ? listFieldData.timerEvent : [],
      timer: listFieldData.timer ? listFieldData.timer : []
    };
    let timer = {
      id: this.props.idNode.id,
      timeWaitEvent
    };
    data.timer.push(timer);
    validateCampaign(data);
    this.toggle();
  };

  // add condition time wait
  handlerTimeWait = async value => {
    let { idNode, listDiagram, getDiagramCampaign } = this.props;
    let data = listDiagram;
    let { waitEvent, timeWaitEvent } = this.state;
    if (value === 'Y' || value === 'M' || value === 'D') {
      timeWaitEvent = 'P' + waitEvent + value;
    } else {
      timeWaitEvent = 'PT' + waitEvent + value === 'M1' ? 'M' : value;
    }
    await data.nodes.map(event => {
      if (event.id === idNode.id) {
        event.value = timeWaitEvent;
      }
    });
    await getDiagramCampaign(data);
    await this.setState({ timeWaitEvent });
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
