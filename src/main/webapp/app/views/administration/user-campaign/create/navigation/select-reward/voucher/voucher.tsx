import React from 'react';
import { Row, Col, Card, CardBody, CardTitle, Container, Table } from 'reactstrap';
import { DropdownList } from 'react-widgets';
import '../voucher/voucher.scss';
import { connect } from 'react-redux';
import { IRootState } from 'app/reducers';
import { getListEvoucher, getDetailEvoucher } from '../../../../../../../actions/user-campaign';
import { getNavigationReward } from 'app/actions/navigation-info';
import Loader from 'react-loader-advanced';
import { Loader as LoaderAnim } from 'react-loaders';
import { ULTILS_TYPES } from '../../../../../../../constants/ultils';
import { Translate } from 'react-jhipster';

export interface VocherProps extends StateProps, DispatchProps {}

export interface VocherState {
  value: any[];
  displayTable: string;
}
class Vocher extends React.Component<VocherProps, VocherState> {
  state: VocherState = {
    value: [],
    displayTable: ULTILS_TYPES.DISPLAY_VOUCHER
  };
  // init list evoucher
  componentDidMount() {
    this.props.getListEvoucher();
  }

  //show evoucher
  onChangeList = data => {
    this.setState({
      value: data
    });
    if (data !== undefined) {
      this.setState({
        displayTable: ULTILS_TYPES.EMPTY
      });
    } else {
      this.setState({
        displayTable: ULTILS_TYPES.DISPLAY_VOUCHER
      });
    }
    //get value from voucher to select - reward component
    // call api get detail voucher
    this.props.getDetailEvoucher(data.id);
    this.props.getNavigationReward({ type: parseInt(ULTILS_TYPES.SELECT_REWARD), id: data.id });
  };

  render() {
    const { value } = this.state;
    const { loading, listEvoucher, evoucherDetail } = this.props;
    const spinner = <LoaderAnim color="#ffffff" type="ball-pulse" />;
    return (
      <Loader message={spinner} show={loading} priority={10}>
        <Container fluid>
          <Row>
            <Card className="main-card mb-3">
              <CardBody>
                <CardTitle>
                  {' '}
                  <Translate contentKey="campaign.evoucher" />
                </CardTitle>
                <Row form>
                  <Col md={12} className="width-voucher">
                    <DropdownList
                      data={listEvoucher}
                      value={value}
                      allowCreate="onFilter"
                      onChange={data => this.onChangeList(data)}
                      textField="name"
                    />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Row>
          <div className={this.state.displayTable}>
            <table className="table-voucher">
              <thead>
                <tr>
                  <th>
                    {' '}
                    <Translate contentKey="campaign.value" />
                  </th>
                  <th>
                    <Translate contentKey="campaign.time-voucher" />
                  </th>
                  <th>
                    <Translate contentKey="campaign.amount" />{' '}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{evoucherDetail.value}</td>
                  <td>
                    {evoucherDetail.availableFrom} - {evoucherDetail.availableTo}
                  </td>
                  <td>{evoucherDetail.totalCode}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Container>
      </Loader>
    );
  }
}

const mapStateToProps = ({ userCampaign, navigationInfo }: IRootState) => ({
  loading: userCampaign.loading,
  listEvoucher: userCampaign.listEvoucher,
  evoucherDetail: userCampaign.EvoucherDetail,
  navigationInfo
});

const mapDispatchToProps = { getListEvoucher, getDetailEvoucher, getNavigationReward };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Vocher);
