import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/reducers';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Button, Row, Col, Input } from 'antd';
import { updateInfoCampaign } from 'app/actions/campaign-managament';
import CampaignTag from 'app/views/campaign/campaign-automation/campaign-managament/campaign-list/campaign-tag/campaign-tag';
import './modal-update-info.scss';
import { isThisSecond } from 'date-fns';

const { TextArea } = Input;

interface IUpdateInfoCampaignProps extends StateProps, DispatchProps {
  isOpenModal: boolean;
  toggleModal: Function;
}
interface IUpdateInfoCampaignState {
  nameCampaign: string;
  strTag: {
    id: string;
    name: string;
  };
  valueDes: string;
  defaulftTag: any[];
}

export class UpdateInfoCampaign extends React.Component<IUpdateInfoCampaignProps, IUpdateInfoCampaignState> {
  state: IUpdateInfoCampaignState = {
    nameCampaign: '',
    strTag: {
      id: '',
      name: ''
    },
    valueDes: '',
    defaulftTag: []
  };

  toggle = () => {
    let { toggleModal, isOpenModal } = this.props;
    toggleModal(!isOpenModal);
  };

  getNameCampaign = event => {
    let { nameCampaign } = this.state;
    nameCampaign = event.target.value;
    this.setState({ nameCampaign });
  };

  handleChange = cjTags => {
    this.setState({
      strTag: cjTags,
      defaulftTag: cjTags
    });
  };
  getDes = event => {
    let { valueDes } = this.state;
    valueDes = event.target.value;
    this.setState({ valueDes });
  };

  save = async () => {
    const { updateInfoCampaign } = this.props;
    let { nameCampaign, strTag, valueDes } = this.state;
    let data = {
      name: nameCampaign,
      tag: strTag,
      des: valueDes
    };
    await updateInfoCampaign(data);
    await this.toggle();
  };

  render() {
    let { isOpenModal, listInfoCampaing } = this.props;
    let { nameCampaign } = this.state;
    return (
      <Modal className="modal-info-title" isOpen={isOpenModal}>
        <ModalHeader toggle={this.toggle}>Chiến dịch mới</ModalHeader>
        <ModalBody>
          <Row>
            <Row>
              <Col span={5}>
                <label className="label-message">Tên chiến dịch</label>
              </Col>
              <Col span={18}>
                <Input
                  defaultValue={listInfoCampaing.name ? listInfoCampaing.name : 'Tạo mới chiến dịch'}
                  onChange={this.getNameCampaign}
                  id="name-campaign"
                  style={{ float: 'right', width: '95%' }}
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Col span={5}>
                <label className="label-message">Tag</label>
              </Col>
              <Col span={18}>
                <CampaignTag defaultValue={this.state.defaulftTag} handleChange={this.handleChange} />
              </Col>
            </Row>
            <br />
            <Row>
              <Col span={6}>
                <label className="label-message">Mô tả</label>
              </Col>
              <Col span={18}>
                <TextArea defaultValue={listInfoCampaing.des} onChange={this.getDes} style={{ width: '95%' }} id="text-content" rows={4} />
              </Col>
            </Row>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button type="link" onClick={this.toggle}>
            Hủy
          </Button>
          <Button type="primary" onClick={this.save}>
            Lưu
          </Button>{' '}
        </ModalFooter>
      </Modal>
    );
  }
}
const mapStateToProps = ({ campaignManagament }: IRootState) => ({
  loading: campaignManagament.loading,
  listInfoCampaing: campaignManagament.listInfoCampaing
});

const mapDispatchToProps = {
  updateInfoCampaign
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateInfoCampaign);
