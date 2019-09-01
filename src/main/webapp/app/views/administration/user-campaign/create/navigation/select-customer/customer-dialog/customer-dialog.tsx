import { Col, Row, CardTitle, Button, ModalBody, Table, Modal, ModalHeader, Label } from 'reactstrap';
import '../select-customer/select-customer.scss';
import Loader from 'react-loader-advanced';
import { Loader as LoaderAnim } from 'react-loaders';
import { Translate } from 'react-jhipster';
import Ionicon from 'react-ionicons';
import React, { Fragment, Component, useState } from 'react';
import IncorporationForm from '../customer-dialog/button-dialog/button-dialog';
import { connect } from 'react-redux';
import { IRootState } from 'app/reducers';
import ReactPaginate from 'react-paginate';
import { getCustomer } from '../../../../../../../actions/user-campaign';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface SelectCustomerProps extends StateProps, DispatchProps {}

export interface SelectCustomerState {
  listUser: any[];
  modal: boolean;
  activeTab: string;

  // set param to get list
  activePage: string;
  pageSize: string;
  category: string;
}
class SelectCustomer extends React.Component<SelectCustomerProps, SelectCustomerState> {
  state: SelectCustomerState = {
    activeTab: '1',
    activePage: '0',
    pageSize: '5',
    category: '',
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
  handlerSaveForm = () => {
    this.setState({
      modal: false
    });
  };

  render() {
    const spinner = <LoaderAnim color="#ffffff" type="ball-pulse" />;
    const { listUser } = this.state;
    const { listCustomer, loading } = this.props;
    return (
      <Loader message={spinner} show={loading} priority={10}>
        <Fragment>
          <Modal isOpen={this.state.modal} fade={false} toggle={this.toggle}>
            <Loader message={spinner} show={loading} priority={10}>
              <ModalHeader
                toggle={() => {
                  this.setState({
                    modal: false
                  });
                }}
              >
                <span>
                  {' '}
                  <Translate contentKey="campaign.choose-folder" />{' '}
                </span>
              </ModalHeader>

              <ModalBody>
                <Row>
                  <Col md="3">
                    <legend>
                      <Translate contentKey="campaign.total-contract" /> {100}
                    </legend>
                  </Col>
                  <Col md="4">
                    <input type="text" className="form-control" placeholder="Tìm kiếm" />
                  </Col>
                  <Col md="5">
                    <Button color="primary" type="submit" className="save-right" onClick={this.handlerSaveForm}>
                      <FontAwesomeIcon icon="save" />
                      &nbsp;
                      <Translate contentKey="entity.action.save" />
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col md="3" className="import-cus">
                    <IncorporationForm />
                  </Col>
                  <Col md="9">
                    <div className="modal-table">
                      <Table responsive striped className="modal-tables">
                        <thead>
                          <tr className="text-center">
                            <th className="hand ">
                              <Translate contentKey="campaign.fullname" />
                            </th>
                            <th className="hand">
                              <Translate contentKey="campaign.phone" />
                            </th>
                            <th className="hand">
                              <Translate contentKey="campaign.email" />
                            </th>
                            <th>
                              <Translate contentKey="campaign.group" />
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {listCustomer
                            ? listCustomer.map((event, index) => {
                                var elements;
                                elements = (
                                  <tr key={index + 1}>
                                    <td>{event.name}</td>
                                    <td>{event.phone}</td>
                                    <td>{event.email}</td>
                                    <td>{event.categories}</td>
                                  </tr>
                                );
                                return elements;
                              })
                            : ''}
                        </tbody>
                      </Table>
                      <div className="paginator-nav">
                        <ReactPaginate
                          previousLabel={'<'}
                          nextLabel={'>'}
                          breakLabel={'...'}
                          breakClassName={'break-me'}
                          pageCount={2}
                          marginPagesDisplayed={1}
                          pageRangeDisplayed={1}
                          containerClassName={'pagination'}
                          subContainerClassName={'pages pagination'}
                          activeClassName={'active'}
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
              </ModalBody>
            </Loader>
          </Modal>
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
