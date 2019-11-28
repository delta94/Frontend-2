import React, { Fragment, Component } from 'react';
import { Col, Row } from 'reactstrap';
import SweetAlert from 'sweetalert-react';
import { IRootState } from '../../../../../../reducers/index';
import { connect } from 'react-redux';
import { getNavigationId, getNavigationName } from '../../../../../../actions/navigation-info';
import { openModal, closeModal } from '../../../../../../actions/modal';
import { getInformation, getStepCampaign, getContentPageParams } from '../../../../../../actions/user-campaign';
import { ULTILS_TYPES } from '../../../../../../constants/ultils';
import './script.scss';
import { WARNING } from '../../../../../../constants/common';
import { translate } from 'react-jhipster';

export interface IScriptsCampaignProps extends StateProps, DispatchProps {
  value: any;
  onClick: Function;
}

export interface IScriptsCampaignState {
  //set url image
  urlImage: string;

  //set name table chosse scripts
  nameScript: string;

  //set disable Document
  disableDocument: string;
}
export class ScriptsCampaign extends Component<IScriptsCampaignProps, IScriptsCampaignState> {
  constructor(props) {
    super(props);
  }
  state: IScriptsCampaignState = {
    urlImage: ULTILS_TYPES.EMPTY,
    nameScript: ULTILS_TYPES.EMPTY,
    disableDocument: ULTILS_TYPES.EMPTY
  };

  componentDidMount() {
    this.props.getInformation();
  }

  onClick = (name, id) => {
    let { value } = this.props;

    this.setState({
      nameScript: name
    });

    let cutName = value.valueName.trim();
    let cutDes = value.valueDes.trim();

    if (value.startDate && value.endDate && cutName !== '' && cutDes !== '') {
      this.setState({
        disableDocument: ULTILS_TYPES.DISABLE_DOCUMENT
      });
      this.props.getStepCampaign(id);
      this.props.onClick(name, id);
      this.props.getNavigationId(id);
    } else {
      this.props.openModal({
        show: true,
        title: translate('modal-data.title.warning'),
        text: translate('modal-data.text.none-info'),
        type: WARNING
      });
    }
  };
  render() {
    const { listCampaignInfo } = this.props;
    return (
      <Fragment>
        <Row className={this.state.disableDocument}>
          {listCampaignInfo
            ? listCampaignInfo.map((item, index) => {
                return (
                  <Col key={index} onClick={() => this.onClick(item.name, item.id)}>
                    <div className="grid-items" key={index + 1}>
                      <div className="camp-top">
                        <label className="camp-titles"> {item.name}</label>
                        <img className="image-tites" src={this.state.urlImage} />
                      </div>
                      <div className="label-text">
                        <label>{item.description}</label>
                      </div>
                    </div>
                  </Col>
                );
              })
            : ''}
        </Row>
      </Fragment>
    );
  }
}
const mapStateToProps = ({ userCampaign, handleModal }: IRootState) => ({
  loading: userCampaign.loading,
  listCampaignInfo: userCampaign.listCampaignInfo,
  modalState: handleModal.data
});

const mapDispatchToProps = {
  getInformation,
  getStepCampaign,
  getNavigationId,
  openModal,
  closeModal
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScriptsCampaign);
