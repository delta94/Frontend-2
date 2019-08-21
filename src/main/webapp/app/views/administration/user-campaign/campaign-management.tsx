import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table, Row, Badge, Col } from 'reactstrap';

import { Translate, JhiPagination, getPaginationItemsNumber, getSortState, IPaginationBaseState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ITEMS_PER_PAGE, ACTIVE_PAGE, MAX_BUTTON_COUNT } from 'app/constants/pagination.constants';
import { IRootState } from 'app/reducers';
import ReactPaginate from 'react-paginate';
import SweetAlert from 'sweetalert-react';
import { Loader as LoaderAnim } from 'react-loaders';
import Loader from 'react-loader-advanced';

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
          <div className="panel">
            <Row>
              <Col md="3">
                <div className="totalItems">Tổng số bản ghi</div>
              </Col>

              <Col md="3">
                <div className="has-search">
                  <span className=" form-control-feedback" />
                </div>
              </Col>
            </Row>
            <hr />
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
