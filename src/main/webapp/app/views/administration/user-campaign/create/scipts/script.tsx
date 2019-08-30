import React, { Fragment, Component } from 'react';
import { Col, Row } from 'reactstrap';
import SweetAlert from 'sweetalert-react';
import { IRootState } from 'app/reducers';
import { connect } from 'react-redux';
import { getInformation } from 'app/actions/user-campaign';

export interface IResponsiveProps extends StateProps, DispatchProps {
  value: any;
  onClick: Function;
}

export interface IResponsiveState {
  isActive: boolean;
  cssTitle: string;
  cssGrid: string;
  urlImage: string;
  gridItem: string;
  nameScript: string;
  image: string;
  isError: boolean;
  disableDocument: string;
}
export class Responsive extends Component<IResponsiveProps, IResponsiveState> {
  constructor(props: IResponsiveProps) {
    super(props);
  }
  state: IResponsiveState = {
    isActive: true,
    cssTitle: 'camp-titles',
    cssGrid: '',
    urlImage: '',
    gridItem: 'grid-items',
    nameScript: '',
    image: '',
    isError: false,
    disableDocument: ''
  };

  componentDidMount() {
    this.props.getInformation();
  }

  onClick = name => {
    console.log(name);
    this.setState({
      isActive: !this.state.isActive,
      nameScript: name
    });

    if (
      this.props.value.listValid.day !== undefined &&
      this.props.value.listValid.name !== undefined &&
      this.props.value.listValid.descri !== undefined &&
      this.props.value.listValid.day !== '' &&
      this.props.value.listValid.name !== '' &&
      this.props.value.listValid.descri !== '' &&
      this.props.value.ValidateField === '' &&
      this.props.value.ValidateDay === '' &&
      this.props.value.ValidateName === ''
    ) {
      this.setState({
        isError: false,
        disableDocument: 'campaign-document'
      });

      this.props.onClick(name);
    } else {
      this.setState({
        isError: true,
        disableDocument: ''
      });
      this.props.onClick(null);
    }
  };
  render() {
    const { listCampaignInfo } = this.props;
    return (
      <Fragment>
        <SweetAlert
          title="vui lòng input các trường còn thiếu"
          confirmButtonColor=""
          show={this.state.isError}
          text=""
          type="error"
          onConfirm={() => this.setState({ isError: false })}
        />
        <Row className={this.state.disableDocument}>
          {listCampaignInfo
            ? listCampaignInfo.map((item, index) => {
                let elements;
                elements = (
                  <Col onClick={() => this.onClick(item.name)}>
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

const mapDispatchToProps = { getInformation };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Responsive);
