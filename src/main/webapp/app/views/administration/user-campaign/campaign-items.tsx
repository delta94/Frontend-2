import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table, Row, Badge, Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ReactPaginate from 'react-paginate';
import SweetAlert from 'sweetalert-react';
import { Loader as LoaderAnim } from 'react-loaders';
import Loader from 'react-loader-advanced';
import { Translate, JhiPagination, getPaginationItemsNumber, getSortState, IPaginationBaseState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './../user-campaign/style/campaign.scss';

import { ITEMS_PER_PAGE, ACTIVE_PAGE, MAX_BUTTON_COUNT } from 'app/constants/pagination.constants';
import { IRootState } from 'app/reducers';
import { any } from 'prop-types';

export interface ICampaignItemProps extends StateProps, DispatchProps {}

export interface ICampaignItemState {
  isDelete?: boolean;
  modal?: boolean;
  status: string;
  time: string;
  total: string;
  listCamp: any[];
}

export class CampaignItem extends React.Component<ICampaignItemProps, ICampaignItemState> {
  state: ICampaignItemState = {
    isDelete: false,
    modal: false,
    status: '',
    time: '',
    total: '',
    listCamp: [
      {
        status: '',
        time: '',
        total: ''
      }
    ]
  };
  componentDidMount() {
    this.setState({
      modal: false,
      listCamp: [
        {
          time: '23/8/2019 - 24/8/2019',
          status: 'đang hoạt động',
          total: 200
        }
      ]
    });
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
    const { loading } = this.props;
    const spinner1 = <LoaderAnim color="#ffffff" type="ball-pulse" />;

    return (
      <div className="grid-border" onClick={this.toggle}>
        <Loader message={spinner1} show={loading} priority={1}>
          {' '}
        </Loader>
        {/* day la trang camp*/}

        <div />
        {this.state.listCamp
          ? this.state.listCamp.map((event, index, listCamp) => {
              var listC = this.state.listCamp;
              var list;
              // for(i = 0; i< 10; i ++){
              //   if(i<10)
              //   listCamp.push (this.state.listCamp)

              // }

              list = (
                <div className="grid-item">
                  <div className="camp-top">
                    <label className="camp-title"> Chiến dịch M2M thứ {index + 1}</label>
                    <label className="camp-status">{event.status}</label>
                  </div>

                  <div className="camp-bottom">
                    <div className="camp-bottom-left">
                      <label className="quantity">Số lượng</label>
                      <label className="range-time">Thời gian</label>
                    </div>
                    <div className="camp-bottom-right">
                      <div className="camp-bottom-right-top">{event.total} contacts</div>
                      <div className="camp-bottom-right-bot"> {event.time}</div>
                    </div>
                  </div>

                  <Modal isOpen={this.state.modal} fade={false} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                      <span>Chiến dịch M2M thứ {index + 1} </span> <span className="camp-modal-status">{event.status}</span>
                    </ModalHeader>
                    <ModalBody>
                      <div className="modal-grid">
                        <div className="modal-grid-child1">
                          <div className="modal-grid-child1-middle">
                            <span>Mô tả chiến dịch : </span> <span>Chiến dịch dành cho khách hàng chưa đăng ký dịch vụ</span>
                          </div>
                          <div className="modal-grid-child1-bottom">
                            <div className="modal-grid-child1-bottom1">
                              <span>Số lượng contact : </span>
                              <span>Thời gian : </span>
                            </div>
                            <div className="modal-grid-child1-bottom2">{event.total}</div>
                            <div className="modal-grid-child1-bottom3">{event.time}</div>
                            <div className="modal-grid-child1-bottom4" />
                            <div className="modal-grid-child1-bottom5" />
                            <div className="modal-grid-child1-bottom6" />
                          </div>
                        </div>
                        <div className="modal-grid-child2">
                          <div className="modal-searchBar">
                            <input placeholder="Tìm kiếm trong danh sách" />
                          </div>
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
                </div>
              );
              return list;
            })
          : ''}
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
)(CampaignItem);
