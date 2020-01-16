import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/reducers';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Button, Row, Col, Input } from 'antd';
import { updateInfoCampaign } from 'app/actions/campaign-managament';
import CampaignTag from 'app/views/campaign/campaign-automation/campaign-managament/campaign-list/campaign-tag/campaign-tag';
import './modal-update-info.scss';
import { isThisSecond } from 'date-fns';
import { Translate } from 'react-jhipster';

const { TextArea } = Input;

interface IUpdateInfoCampaignProps extends StateProps, DispatchProps {
  isOpenModal: boolean;
  toggleModal: Function;
}
interface IUpdateInfoCampaignState {
  nameCampaign: string;
  strTag: any[];
  valueDes: string;
  defaulftTag: any[];
}

export class UpdateInfoCampaign extends React.Component<IUpdateInfoCampaignProps, IUpdateInfoCampaignState> {
  state: IUpdateInfoCampaignState = {
    nameCampaign: '',
    strTag: [],
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
    let { isOpenModal, listInfoCampaing, list_clone_version } = this.props;
    let { defaulftTag } = this.state;
    return (
      <Modal className="modal-info-title" isOpen={isOpenModal}>
        <ModalHeader toggle={this.toggle}><Translate contentKey="config-info.new-campaign" /></ModalHeader>
        <ModalBody>
          <Row>
            <Row>
              <Col span={5}>
                <label className="label-message"><Translate contentKey="config-info.name-campaign" /></label>
              </Col>
              <Col span={18}>
                <Input
                  defaultValue={listInfoCampaing.name ? listInfoCampaing.name : list_clone_version.name ? list_clone_version.name : "Tạo chiến dịch mới"}
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
                <CampaignTag defaultValue={listInfoCampaing.tag && listInfoCampaing.tag.length > 0 ? listInfoCampaing.tag : Object.keys(list_clone_version).length > 0 ? list_clone_version.cjTags : []} handleChange={this.handleChange} />
              </Col>
            </Row>
            <br />
            <Row>
              <Col span={6}>
                <label className="label-message"><Translate contentKey="config-info.descrition" /></label>
              </Col>
              <Col span={18}>
                <TextArea defaultValue={listInfoCampaing.des ? listInfoCampaing.des : list_clone_version.description ? list_clone_version.description : ''} onChange={this.getDes} style={{ width: '95%' }} id="text-content" rows={4} />
              </Col>
            </Row>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button type="link" onClick={this.toggle}>
            <Translate contentKey="config-info.cancel" />
          </Button>
          <Button type="primary" onClick={this.save}>
            <Translate contentKey="config-info.save" />
          </Button>{' '}
        </ModalFooter>
      </Modal>
    );
  }
}
const mapStateToProps = ({ campaignManagament }: IRootState) => ({
  loading: campaignManagament.loading,
  listInfoCampaing: campaignManagament.listInfoCampaing,
  list_clone_version: campaignManagament.cloneInfoVersion
});

const mapDispatchToProps = {
  updateInfoCampaign
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UpdateInfoCampaign);
