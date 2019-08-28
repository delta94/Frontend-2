import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table, Row, Badge, Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ReactPaginate from 'react-paginate';
import SweetAlert from 'sweetalert-react';
import { Loader as LoaderAnim } from 'react-loaders';
import Loader from 'react-loader-advanced';
import { Translate, JhiPagination, getPaginationItemsNumber, getSortState, IPaginationBaseState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getCampaignInfo } from 'app/actions/user-management';

import './../user-campaign/style/campaign.scss';

import { ITEMS_PER_PAGE, ACTIVE_PAGE, MAX_BUTTON_COUNT } from 'app/constants/pagination.constants';
import { IRootState } from 'app/reducers';
import { any } from 'prop-types';

export interface ICampaignItemProps extends StateProps, DispatchProps {}

export interface ICampaignItemState {
  modal?: boolean;
}

export class CampaignItem extends React.Component<ICampaignItemProps, ICampaignItemState> {
  state: ICampaignItemState = {
    modal: false
  };
  componentDidMount() {
    this.setState({
      modal: false
    });
    this.props.getCampaignInfo();
  }

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    const {} = this.state;
    const { loading, camps } = this.props;
    const spinner1 = <LoaderAnim color="#ffffff" type="ball-pulse" />;

    return (
      <Fragment>
        <Modal isOpen={this.state.modal} fade={false} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            <span>Chiến dịch M2M thứ {1} </span> <span className="camp-modal-status">{}</span>
          </ModalHeader>
          <ModalBody>
            <div className="modal-grid">
              <div className="modal-grid-child">
                <span style={{ width: '15%' }}>Mô tả chiến dịch : </span>
                <span style={{ width: 'auto', fontWeight: 500, marginLeft: '21px', color: 'black' }}>
                  Chiến dịch dành cho khách hàng chưa đăng ký dịch vụ
                </span>
              </div>
              <div className="modal-info">
                <div className="left-info">
                  <div className="modal-grid-child1">
                    <div className="modal-grid-child1-middle">
                      <div>Số lượng contact : </div>
                      <div>Thời gian : </div>
                    </div>
                    <div className="modal-grid-child1-bottom">
                      <div className="modal-grid-child1-bottom2">{}</div>
                      <div className="modal-grid-child1-bottom3">{}</div>
                    </div>
                  </div>
                </div>
                <div className="middle-info">
                  <div className="modal-grid-child1">
                    <div className="modal-grid-child1-middle">
                      <div>Landing Page : </div>
                      <div>Quà tặng : </div>
                    </div>
                    <div className="modal-grid-child1-bottom">
                      <div className="modal-grid-child1-bottom2">Landing Page 1</div>
                      <div className="modal-grid-child1-bottom3">E-voucher 1</div>
                    </div>
                  </div>
                </div>
                <div className="right-info">
                  <div className="modal-grid-child1">
                    <div className="modal-grid-child1-middle">
                      <div>Nội dung : </div>
                    </div>
                    <div className="modal-grid-child1-bottom">
                      <div className="modal-grid-child1-bottom2">Tương tác Email</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-grid-child2">
                <div className="modal-searchBar">
                  <span className=" form-control-feedback" />
                  <input type="text" className="form-control" placeholder="Tìm kiếm" />
                </div>
              </div>

              <div className="modal-table">
                <Table responsive striped className="modal-tables">
                  <thead>
                    <tr className="text-center">
                      <th className="hand">#</th>
                      <th className="hand ">
                        <Translate contentKey="userManagement.name" />
                      </th>
                      <th className="hand">
                        <Translate contentKey="userManagement.mobile" />
                      </th>
                      <th className="hand">
                        <Translate contentKey="userManagement.email" />
                      </th>
                      <th>
                        <Translate contentKey="userManagement.categories" />
                      </th>
                    </tr>
                  </thead>
                </Table>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>
              Do Something
            </Button>{' '}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        {/* Body Content */}
        <div className="grid-border" onClick={this.toggle}>
          <Loader message={spinner1} show={loading} priority={1}>
            {' '}
          </Loader>
          {/* day la trang camp*/}

          <div />
          {camps &&
            camps.map((item, index) => {
              var list;
              list = (
                <div className="grid-item">
                  <div className="camp-top">
                    <div className="camp-title"> Chiến dịch M2M thứ {index + 1}</div>
                    <div className="camp-status">{}</div>
                  </div>

                  <div className="camp-bottom">
                    <div className="camp-bottom-left">
                      <div className="quantity">Số lượng : </div>
                      <div className="range-time">Thời gian : </div>
                    </div>
                    <div className="camp-bottom-right">
                      <div className="quantity-value">{} </div>
                      <div className="time-value"> {}</div>
                    </div>
                  </div>
                </div>
              );
              return list;
            })}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  camps: storeState.userManagement.camps,
  loading: storeState.userManagement.loading,
  listCategory: storeState.userManagement.listCategory,
  pageCount: Math.ceil(storeState.userManagement.totalElements / ITEMS_PER_PAGE)
});

const mapDispatchToProps = { getCampaignInfo };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CampaignItem);
