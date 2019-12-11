import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/reducers';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Button, Row, Col, Input, Select } from 'antd';
import { updateInfoCampaign } from 'app/actions/campaign-managament';
import './modal-wait-for-event.scss';

const { TextArea } = Input;
const { Option } = Select;

interface IModalWaitForEventProps extends StateProps, DispatchProps {
  isOpenModal: boolean;
  toggleModal: Function;
}
interface IModalWaitForEventState {}

export class ModalWaitForEvent extends React.Component<IModalWaitForEventProps, IModalWaitForEventState> {
  state: IModalWaitForEventState = {};

  toggle = () => {
    let { toggleModal, isOpenModal } = this.props;
    toggleModal(!isOpenModal);
  };

  handleChange(value) {
    console.log(`selected ${value}`);
  }
  render() {
    let { isOpenModal } = this.props;
    return (
      <Modal className="modal-message-config" isOpen={isOpenModal}>
        <ModalHeader toggle={this.toggle}>Chờ Sự kiện</ModalHeader>
        <ModalBody>
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
        </ModalBody>
        <ModalFooter>
          <Button type="link" onClick={this.toggle}>
            Hủy
          </Button>
          <Button type="primary" onClick={this.toggle}>
            Chọn
          </Button>{' '}
        </ModalFooter>
      </Modal>
    );
  }
}
const mapStateToProps = ({ campaignManagament }: IRootState) => ({
  loading: campaignManagament.loading
});

const mapDispatchToProps = {
  updateInfoCampaign
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalWaitForEvent);
