import { Col, Row, CardTitle, Button, ModalBody, Table, Modal, ModalHeader, Label } from 'reactstrap';
import '../select-customer/select-customer.scss';
import Loader from 'react-loader-advanced';
import { Loader as LoaderAnim } from 'react-loaders';
import { Translate } from 'react-jhipster';
import Ionicon from 'react-ionicons';
import React, { Fragment, Component, useState } from 'react';
import IncorporationForm from './customer-dialog/button-dialog/button-dialog';
import { connect } from 'react-redux';
import { IRootState } from 'app/reducers';
import ReactPaginate from 'react-paginate';
import { getCustomer } from '../../../../../../actions/user-campaign';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CustomerDialog from './customer-dialog/customer-dialog';
import { ITEMS_PER_PAGE, ULTILS_TYPES, ACTIVE_PAGE } from '../../../../../../constants/ultils';

export interface SelectCustomerProps extends StateProps, DispatchProps {}

export interface SelectCustomerState {
  listUser: any[];
  modal: boolean;
  activeTab: string;

  // set param to get list
  activePage: number;
  pageSize: number;
  category: string;
}
class SelectCustomer extends React.Component<SelectCustomerProps, SelectCustomerState> {
  state: SelectCustomerState = {
    activeTab: ULTILS_TYPES.ACTIVE_TAB,
    activePage: ACTIVE_PAGE,
    pageSize: ITEMS_PER_PAGE,
    category: ULTILS_TYPES.EMPTY,
    listUser: [],
    modal: false
  };

  onClick = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
    this.props.getCustomer(this.state.activePage, this.state.pageSize, this.state.category);
  };
  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  handlerModal = (event, list) => {
    this.setState({
      modal: event
    });
    if (list !== undefined) this.state.listUser.push(list);
  };

  render() {
    const spinner = <LoaderAnim color="#ffffff" type="ball-pulse" />;
    const { listUser } = this.state;
    const { loading } = this.props;
    console.log(listUser);
    return (
      <Loader message={spinner} show={loading} priority={10}>
        <Fragment>
          <Modal isOpen={this.state.modal} fade={false} toggle={this.toggle}>
            <CustomerDialog onClick={this.handlerModal} />
          </Modal>
          <Row>
            <Col md="4">
              <CardTitle className="cartitle-customer">
                <Translate contentKey="campaign.list-custom" />
              </CardTitle>
            </Col>
            <Col md="3" className="total-contract-customer">
              <Label />
            </Col>
            <Col md="5" className="total-contract-customer">
              <Col md="6">
                {' '}
                <Label>
                  <Translate contentKey="campaign.all-contract" />
                  <span className="number-contract">100</span>
                </Label>
              </Col>
              <Col md="6">
                {' '}
                <Label>
                  {' '}
                  <Translate contentKey="campaign.duplicate-contract" />
                  <span className="number-contract">100</span>
                </Label>
              </Col>
            </Col>
          </Row>
          <Row className="row-nav">
            <Col md="4">
              <div className="chosse-customer-class" onClick={this.onClick}>
                <div className="grid-items-cus">
                  <div className="camp-top">
                    <Ionicon fontSize="35px" color="blue" icon="ios-add" />
                    <div className="camp-title-click">
                      {' '}
                      <Translate contentKey="campaign.choose-new-customer" />
                    </div>
                  </div>
                </div>
              </div>
            </Col>

            {listUser &&
              listUser.map((item, index, list) => {
                return (
                  <Col md="4" key={item.id + index}>
                    <div className="table-customer">
                      <div className="title-contract">
                        <div className="name-group"> Giám Đốc </div>
                        <div className="camp-top">
                          <label className="total-contract">
                            <Translate contentKey="campaign.sum-contact" /> <span className="number-contract">{list[index].length}</span>
                          </label>
                        </div>
                      </div>
                      <div className="boder-customer">
                        <div>
                          <i className="pe-7s-mail">
                            {' '}
                            <span className="name-icon">
                              {' '}
                              <Translate contentKey="campaign.email" />
                            </span>
                          </i>
                          <label className="label-icon">{list[index].filter(item => item.email !== null).length}</label>
                        </div>
                        <div>
                          <i className="pe-7s-call">
                            {' '}
                            <span className="name-icon">
                              {' '}
                              <Translate contentKey="campaign.sdt" />{' '}
                            </span>{' '}
                          </i>
                          <label className="label-icon"> {list[index].filter(item => item.phone !== null).length}</label>
                        </div>
                        <div>
                          {' '}
                          <img
                            className="img-facebook"
                            src="https://cdn3.iconfinder.com/data/icons/facebook-ui-flat/48/Facebook_UI-03-512.png"
                          />{' '}
                          <span className="name-icon">
                            {' '}
                            <Translate contentKey="campaign.facebook" />
                          </span>
                          <label className="label-icon">{ACTIVE_PAGE}</label>
                        </div>
                        <div>
                          {' '}
                          <img
                            className="img-zalo"
                            src="http://brasol.logozee.com/public/ckeditor/uploads/brasol.vn-logo-zalo-vector-logo-zalo-vector.png"
                          />{' '}
                          <span className="name-icon">
                            {' '}
                            <Translate contentKey="campaign.zalo" />
                          </span>
                          <label className="label-icon"> {ACTIVE_PAGE}</label>
                        </div>
                      </div>
                    </div>
                    <br />
                  </Col>
                );
              })}
          </Row>
        </Fragment>
      </Loader>
    );
  }
}
const mapStateToProps = ({ userCampaign }: IRootState) => ({
  loading: userCampaign.loading,
  listCustomer: userCampaign.listNewCustomer
});

const mapDispatchToProps = { getCustomer };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectCustomer);
