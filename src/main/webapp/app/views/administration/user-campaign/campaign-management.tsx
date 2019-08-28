import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table, Row, Badge, Col } from 'reactstrap';
import ReactPaginate from 'react-paginate';
import SweetAlert from 'sweetalert-react';
import { Loader as LoaderAnim } from 'react-loaders';
import Loader from 'react-loader-advanced';
import { Translate, JhiPagination, getPaginationItemsNumber, getSortState, IPaginationBaseState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './../user-campaign/style/campaign.scss';

import { ITEMS_PER_PAGE, ACTIVE_PAGE, MAX_BUTTON_COUNT } from 'app/constants/pagination.constants';
import { IRootState } from 'app/reducers';
import CampaignItem from './campaign-items';

export interface ICreateCampaignProps extends StateProps, DispatchProps, RouteComponentProps<{ id: any }> {}

export interface ICreateCampaignState {
  isDelete: boolean;
}

export class CreateCampaign extends React.Component<ICreateCampaignProps, ICreateCampaignState> {
  state: ICreateCampaignState = {
    isDelete: false
  };

  render() {
    const { match, pageCount, loading } = this.props;
    const spinner1 = <LoaderAnim color="#ffffff" type="ball-pulse" />;

    return (
      <div>
        <Loader message={spinner1} show={loading} priority={1}>
          {/* day la trang quan ly user */}
          <h3 id="user-management-page-heading">
            <Translate contentKey="userManagement.home.title" />
            <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity">
              <FontAwesomeIcon icon="plus" /> <Translate contentKey="userManagement.home.createLabel" />
            </Link>
          </h3>
          <div />
          <div className="search-nav">
            <Row>
              <Col md="3">
                <a className="totalCamp">Tất cả ({100})</a>
              </Col>
              <Col md="3">
                <a className="totalCamp">Chiến dịch đang hoạt động ({30})</a>
              </Col>
              <Col md="3">
                <a className="totalCamp">Chiến dịch chưa kích hoạt/tạm dừng ({50})</a>
              </Col>
              <Col md="3">
                <a className="totalCamp">Chiến dịch đã hoàn thành ({20})</a>
              </Col>
            </Row>
          </div>
          <div className="grid-container-total">
            <CampaignItem />
          </div>
        </Loader>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  loading: storeState.userManagement.loading,
  listCategory: storeState.userManagement.listCategory,
  pageCount: Math.ceil(storeState.userManagement.totalElements / ITEMS_PER_PAGE)
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateCampaign);
