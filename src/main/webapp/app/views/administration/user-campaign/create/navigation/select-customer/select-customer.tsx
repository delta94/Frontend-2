import React, { Fragment } from 'react';
import { Col, Row, CardTitle, Modal, Label } from 'reactstrap';
import '../select-customer/select-customer.scss';
import Loader from 'react-loader-advanced';
import { Loader as LoaderAnim } from 'react-loaders';
import { Translate } from 'react-jhipster';
import Ionicon from 'react-ionicons';
import { connect } from 'react-redux';
import { IRootState } from 'app/reducers';
import { getCustomer, getStatistic } from '../../../../../../actions/user-campaign';
import CustomerDialog from './customer-dialog/customer-dialog';
import { ITEMS_PER_PAGE, ULTILS_TYPES, ACTIVE_PAGE } from '../../../../../../constants/ultils';

export interface SelectCustomerProps extends StateProps, DispatchProps {
  onClick: Function;
}

export interface SelectCustomerState {
  listUser: any[];

  modal: boolean;

  // set param to get list
  activeTab: string;
  activePage: number;
  pageSize: number;
  category: string;
  textSearch: string;

  //sum contact
  sumContact: number;
}
class SelectCustomer extends React.Component<SelectCustomerProps, SelectCustomerState> {
  state: SelectCustomerState = {
    listUser: [],

    modal: false,

    activeTab: ULTILS_TYPES.ACTIVE_TAB,
    activePage: ACTIVE_PAGE,
    pageSize: ITEMS_PER_PAGE,
    category: ULTILS_TYPES.EMPTY,
    textSearch: ULTILS_TYPES.EMPTY,
    sumContact: 0
  };

  onClick = () => {
    const { activePage, pageSize, category, textSearch } = this.state;
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
    this.props.getCustomer(activePage, pageSize, category, textSearch);
  };

  // function event button submit
  handlerModal = (modal, categories, isSubmit, idCategory) => {
    this.setState({
      modal: modal
    });
    let elements;
    if (isSubmit === true) {
      elements = {
        nameGroup: categories,
        totalContact: this.props.total,
        email: this.props.totalEmail,
        phone: this.props.totalPhone,
        facebook: 0,
        zalo: 0,
        categories: idCategory
      };
      this.state.listUser.push(elements);
      // get list from component select customer - to navigation
      this.props.onClick(elements);
    }
  };

  //close element group
  deleteGroup = id => {
    const deleteItem = this.state.listUser.filter(item => item.categories !== id);
    this.setState({
      listUser: deleteItem
    });
  };

  render() {
    const spinner = <LoaderAnim color="#ffffff" type="ball-pulse" />;
    const { listUser } = this.state;
    const { loading } = this.props;
    var sumContact = 0;
    for (var i = 0; i < listUser.length; i++) {
      sumContact += listUser[i].totalContact;
    }
    return (
      <Loader message={spinner} show={loading} priority={10}>
        <Fragment>
          <Modal isOpen={this.state.modal} fade={false}>
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
                  <span className="number-contract">{sumContact} </span>
                </Label>
              </Col>
              <Col md="6">
                {' '}
                <Label>
                  {' '}
                  <Translate contentKey="campaign.duplicate-contract" />
                  <span className="number-contract">{this.props.duplicateContact}</span>
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
              listUser.map((item, index) => {
                return (
                  <Col md="4" key={item.id + index}>
                    <div className="table-customer">
                      <div className="title-contract">
                        <div className="name-group">
                          {item.nameGroup}
                          <i className="lnr-cross-circle" onClick={() => this.deleteGroup(item.categories)} />
                        </div>
                        <div className="camp-top">
                          <label className="total-contract">
                            <Translate contentKey="campaign.sum-contact" /> <span className="number-contract">{item.totalContact}</span>
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
                          <label className="label-icon">{item.email}</label>
                        </div>
                        <div>
                          <i className="pe-7s-call">
                            {' '}
                            <span className="name-icon">
                              {' '}
                              <Translate contentKey="campaign.sdt" />{' '}
                            </span>{' '}
                          </i>
                          <label className="label-icon"> {item.phone}</label>
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
                          <label className="label-icon">{item.facebook}</label>
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
                          <label className="label-icon"> {item.zalo}</label>
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
  listCustomer: userCampaign.listNewCustomer,
  total: userCampaign.totalElements,
  totalEmail: userCampaign.totalEmail,
  totalPhone: userCampaign.totalPhone,
  duplicateContact: userCampaign.duplicateContact
});

const mapDispatchToProps = { getCustomer, getStatistic };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectCustomer);
