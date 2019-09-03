import { Col, Row, CardTitle, Button, ModalBody, Table, Modal, ModalHeader, Label } from 'reactstrap';
import '../customer-dialog/customer-dialog.scss';
import Loader from 'react-loader-advanced';
import { Loader as LoaderAnim } from 'react-loaders';
import { Translate } from 'react-jhipster';
import Ionicon from 'react-ionicons';
import React, { Fragment, Component, useState } from 'react';
import ButtonDialog from '../customer-dialog/button-dialog/button-dialog';
import { connect } from 'react-redux';
import { IRootState } from 'app/reducers';
import ReactPaginate from 'react-paginate';
import { getCustomer } from '../../../../../../../actions/user-campaign';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ITEMS_PER_PAGE, ULTILS_TYPES, ACTIVE_PAGE } from '../../../../../../../constants/ultils';

export interface CustomerDialogProps extends StateProps, DispatchProps {
  onClick: Function;
}

export interface CustomerDialogState {
  modal: boolean;

  // set param to get list
  activePage: number;
  pageSize: number;
  category: string;
}
class CustomerDialog extends React.Component<CustomerDialogProps, CustomerDialogState> {
  state: CustomerDialogState = {
    activePage: ACTIVE_PAGE,
    pageSize: ITEMS_PER_PAGE,
    category: ULTILS_TYPES.EMPTY,
    modal: false
  };

  handlerSaveForm = () => {
    this.setState({
      modal: false
    });
    this.props.onClick(this.state.modal, this.props.listCustomer);
  };

  handlePagination = activePage => {
    this.setState({
      ...this.state,
      activePage: activePage.selected
    });
    this.props.getCustomer(activePage.selected, this.state.pageSize, this.state.category);
  };

  filterGroup = e => {
    console.log(e);
  };
  render() {
    const spinner = <LoaderAnim color="#ffffff" type="ball-pulse" />;
    const { listCustomer, loading, total } = this.props;
    return (
      <Loader message={spinner} show={loading} priority={10}>
        <ModalHeader
          toggle={() => {
            this.setState({
              modal: false
            });
            this.props.onClick(this.state.modal);
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
                <Translate contentKey="campaign.total-contract" /> {total}
              </legend>
            </Col>
            <Col md="3" />
            <Col md="6" className="group-btn">
              <input type="text" className="form-control" placeholder="Tìm kiếm" />
              <Button color="primary" type="submit" className="save-right" onClick={this.handlerSaveForm}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save" />
              </Button>
            </Col>
          </Row>
          <Row>
            <Col md="3" className="import-cus">
              <ButtonDialog onClick={this.filterGroup} value={listCustomer} />
            </Col>
            <Col md="9">
              <div className="modal-table">
                <Table responsive striped className="modal-tab">
                  <thead>
                    <tr className="text-center">
                      <th className="hands ">
                        <div className="name-th">
                          {' '}
                          <Translate contentKey="campaign.fullname" />
                        </div>
                      </th>
                      <th className="hands">
                        <div className="name-th">
                          {' '}
                          <Translate contentKey="campaign.phone" />{' '}
                        </div>
                      </th>
                      <th className="hands">
                        <div className="name-th">
                          {' '}
                          <Translate contentKey="campaign.email" />{' '}
                        </div>
                      </th>
                      <th className="hands">
                        <div className="name-th">
                          {' '}
                          <Translate contentKey="campaign.group" />{' '}
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {listCustomer
                      ? listCustomer.map((event, index) => {
                          var elements;
                          elements = (
                            <tr key={index + 1} className="dialog-content">
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
                    pageCount={this.props.pageCount}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={2}
                    onPageChange={this.handlePagination}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                    forcePage={this.state.activePage}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </ModalBody>
      </Loader>
    );
  }
}
const mapStateToProps = ({ userCampaign }: IRootState) => ({
  loading: userCampaign.loading,
  listCustomer: userCampaign.listNewCustomer,
  pageCount: Math.ceil(userCampaign.totalElements / ITEMS_PER_PAGE),
  total: userCampaign.totalElements
});

const mapDispatchToProps = { getCustomer };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerDialog);
