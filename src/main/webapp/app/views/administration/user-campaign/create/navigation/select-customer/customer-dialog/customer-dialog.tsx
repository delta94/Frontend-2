import React, { Fragment, Component, useState } from 'react';
import { Col, Row, CardTitle, Button, ModalBody, Table, Modal, ModalHeader, Label, Input } from 'reactstrap';
import '../customer-dialog/customer-dialog.scss';
import Loader from 'react-loader-advanced';
import LoaderAnim from 'react-loaders';
import { Translate, translate } from 'react-jhipster';
import Ionicon from 'react-ionicons';
import { connect } from 'react-redux';
import { IRootState } from 'app/reducers';
import ReactPaginate from 'react-paginate';
import { getCustomer, getStatistic } from '../../../../../../../actions/user-campaign';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ITEMS_PER_PAGE, ULTILS_TYPES, ACTIVE_PAGE } from '../../../../../../../constants/ultils';
import CategoryDialog from './../customer-dialog/categories/categories';
import { openModal, closeModal } from '../../../../../../../actions/modal';
import { faKeybase } from '@fortawesome/free-brands-svg-icons';

export interface CustomerDialogProps extends StateProps, DispatchProps {
  onClick: Function;
}

export interface CustomerDialogState {
  //set modal
  modal: boolean;

  isError: boolean;

  // set param to get list
  activePage: number;
  pageSize: number;
  category: string;
  nameCategory: string;
  //text Search
  textSearch: string;
  categories: string;
}
class CustomerDialog extends React.Component<CustomerDialogProps, CustomerDialogState> {
  state: CustomerDialogState = {
    modal: false,

    isError: false,

    activePage: ACTIVE_PAGE,
    pageSize: ITEMS_PER_PAGE,
    category: ULTILS_TYPES.EMPTY,
    nameCategory: ULTILS_TYPES.EMPTY,

    textSearch: ULTILS_TYPES.EMPTY,
    categories: ULTILS_TYPES.EMPTY
  };
  //function submit
  handlerSaveForm = () => {
    const { modal, nameCategory, categories } = this.state;
    const { total } = this.props;
    if (!categories) {
      this.props.openModal({
        show: true,
        type: 'error',
        title: translate('alert.error.title-error'),
        text: translate('alert.error.empty-categorires')
      });
      this.setState({
        modal: true
      });
    } else if (total === 0) {
      this.props.openModal({
        show: true,
        type: 'error',
        title: translate('alert.error.title-error'),
        text: translate('alert.error.contact-greater-0')
      });
      this.setState({
        modal: true
      });
    } else {
      //count contact
      this.props.onClick(false, nameCategory, true, categories);

      this.setState({
        modal: false
      });
    }
  };

  // function panigator
  handlePagination = activePage => {
    const { pageSize, category, textSearch } = this.state;
    this.setState({
      ...this.state,
      activePage: activePage.selected
    });
    this.props.getCustomer(activePage.selected, pageSize, category, textSearch);
  };

  //function search catelogy
  handleChange = async category => {
    let categorieIds = category.map(event => event.id);
    let categorieName = category.map(event => event.typeName);
    const { pageSize, textSearch } = this.state;
    this.setState({
      ...this.state,
      categories: categorieIds.join(),
      nameCategory: categorieName.join(),
      activePage: 0
    });

    await this.props.getCustomer(0, pageSize, categorieIds.join(), textSearch);
    this.props.getStatistic(this.state.categories);
  };

  //function search all item
  search = event => {
    if (event.key === 'Enter') {
      const textSearch = event.target.value;
      const { pageSize, categories } = this.state;
      this.setState({
        ...this.state,
        textSearch,
        activePage: 0
      });
      this.props.getCustomer(0, pageSize, categories, textSearch);
    }
  };
  render() {
    const spinner = <LoaderAnim type="ball-pulse" active={true} />;
    const { listCustomer, loading, total } = this.props;
    return (
      <Loader message={spinner} show={loading} priority={10}>
        <ModalHeader
          toggle={() => {
            this.props.onClick(this.props.showModal);
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
              <Input type="text" className="form-control" onKeyDown={this.search} placeholder="Tìm kiếm" /> <i className="pe-7s-search" />
              <Button color="primary" type="submit" className="save-right" onClick={this.handlerSaveForm}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save" />
              </Button>
            </Col>
          </Row>
          <Row>
            <Col md="3" className="import-cus">
              <CategoryDialog handleChange={this.handleChange} />
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
const mapStateToProps = ({ userCampaign, handleModal }: IRootState) => ({
  loading: userCampaign.loading,
  listCustomer: userCampaign.listNewCustomer,
  pageCount: Math.ceil(userCampaign.totalElements / ITEMS_PER_PAGE),
  total: userCampaign.totalElements,
  showModal: handleModal.data.show
});

const mapDispatchToProps = { getCustomer, getStatistic, openModal, closeModal };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerDialog);
