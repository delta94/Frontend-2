import React, { Fragment, Component } from 'react';
import { Col, Row } from 'reactstrap';
import SweetAlert from 'sweetalert-react';
import { IRootState } from 'app/reducers';
import { connect } from 'react-redux';
import { getInformation, getStepCampaign } from 'app/actions/user-campaign';
import { ULTILS_TYPES } from '../../../../../constants/ultils';
import '../scripts/script.scss';

export interface IScriptsCampaignProps extends StateProps, DispatchProps {
  value: any;
  onClick: Function;
}

export interface IScriptsCampaignState {
  //set url image
  urlImage: string;

  //set name table chosse scripts
  nameScript: string;

  //set display sweet alert
  isError: boolean;

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

    isError: false,

    disableDocument: ULTILS_TYPES.EMPTY
  };

  componentDidMount() {
    this.props.getInformation();
  }

  onClick = (name, id) => {
    this.setState({
      nameScript: name
    });
    if (
      this.props.value.valueDay !== ULTILS_TYPES.EMPTY &&
      this.props.value.valueName !== ULTILS_TYPES.EMPTY &&
      this.props.value.valueDes !== ULTILS_TYPES.EMPTY &&
      this.props.value.validateName === ULTILS_TYPES.EMPTY &&
      this.props.value.validateField === ULTILS_TYPES.EMPTY &&
      this.props.value.validateDay === ULTILS_TYPES.EMPTY
    ) {
      this.setState({
        isError: false,
        disableDocument: ULTILS_TYPES.DISABLE_DOCUMENT
      });
      console.log(id);
      this.props.getStepCampaign(id);
      this.props.onClick(name);
    } else {
      this.setState({
        isError: true,
        disableDocument: ULTILS_TYPES.EMPTY
      });
      this.props.onClick(null);
    }
  };
  render() {
    const { listCampaignInfo } = this.props;
    return (
      <Fragment>
        <SweetAlert
          title={ULTILS_TYPES.MESSAGE_SWEET_ALER}
          confirmButtonColor={ULTILS_TYPES.EMPTY}
          show={this.state.isError}
          text={ULTILS_TYPES.EMPTY}
          type="error"
          onConfirm={() => this.setState({ isError: false })}
        />
        <Row className={this.state.disableDocument}>
          {listCampaignInfo
            ? listCampaignInfo.map((item, index) => {
                let elements;
                elements = (
                  <Col onClick={() => this.onClick(item.name, item.id)}>
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
                return elements;
              })
            : ''}
        </Row>
      </Fragment>
    );
  }
}
const mapStateToProps = ({ userCampaign }: IRootState) => ({
  loading: userCampaign.loading,
  listCampaignInfo: userCampaign.listCampaignInfo
});

const mapDispatchToProps = { getInformation, getStepCampaign };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScriptsCampaign);
