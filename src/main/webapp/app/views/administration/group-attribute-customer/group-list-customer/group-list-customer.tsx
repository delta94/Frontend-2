import React from 'react';
import { connect } from 'react-redux';
import { Button, Table, Row, Badge, Col } from 'reactstrap';

import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './group-list-customer.scss';
import { IRootState } from 'app/reducers';
import LoaderAnim from 'react-loaders';
import Loader from 'react-loader-advanced';
import { getListTagDataAction } from '../../../../actions/tag-management';
import ReactPaginate from 'react-paginate';
import { Input, Icon, Checkbox, Menu, Dropdown } from 'antd';
// import TagModal from '../tag-modal/tag-modal';
import { DELETE_TAG, MERGE_TAG, EDIT_TAG } from '../../../../constants/tag-management';
import { getListCustomerWithGroupIdDataAction } from '../../../../actions/group-attribute-customer';

interface IGroupListCustomerProps extends StateProps, DispatchProps {
  id_list_customer?: string;
}

interface IGroupListCustomerState {
  openModal?: boolean;
  textSearch?: string;
  pageIndex?: number;
  pageSize?: number;
}

interface IItemCheckBox {
  ITags;
  checked: boolean;
}

class GroupListCustomer extends React.Component<IGroupListCustomerProps, IGroupListCustomerState> {
  state = {
    activePage: 5,
    textSearch: '',
    pageIndex: 0,
    pageSize: 10
  };

  componentDidMount() {}

  static getDerivedStateFromProps(props, state) {
    if (props.list_tags !== state.list_tags) {
      return {
        list_tags: props.list_tags
      };
    }

    return null;
  }

  handlePagination = (pageIndex?: number) => {
    let { textSearch } = this.state;
    let { id_list_customer } = this.props;
    this.props.getListCustomerWithGroupIdDataAction(textSearch, pageIndex, 10, id_list_customer);
    this.setState({ pageIndex });
  };

  searchCustomer = () => {
    let { textSearch, pageIndex, pageSize } = this.state;
    let { id_list_customer } = this.props;
    textSearch = textSearch.trim();
    this.props.getListCustomerWithGroupIdDataAction(textSearch, pageIndex, pageSize, id_list_customer);
  };

  render() {
    let { loading, list_customer_group_with_id, totalElements, id_list_customer } = this.props;
    let { textSearch } = this.state;
    const spinner1 = <LoaderAnim type="ball-pulse" active={true} />;

    return (
      <div className="group-list-customer b-l">
        <Loader message={spinner1} show={loading} priority={1}>
          <div>
            <p className="group-header">Danh sách khách hàng</p>
            {/* Block out */}
            <div className="block-out">
              <Input
                id="searchText"
                prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
                onChange={event => this.setState({ textSearch: event.target.value })}
                onPressEnter={this.searchCustomer}
                placeholder="Tìm kiếm"
              />
            </div>
            {/* Table? */}
            <Table striped>
              <thead>
                <tr className="text-center">
                  <th className="checkbox-td">Stt</th>
                  <th>Họ và tên</th>
                  <th>Số điện thoại</th>
                  <th>Email</th>
                  <th>Phân loại</th>
                  <th>Nguồn</th>
                </tr>
              </thead>
              <tbody>
                {list_customer_group_with_id &&
                  list_customer_group_with_id.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index}</td>
                        <td>{item.firstName + ' ' + item.lastName}</td>
                        <td>{item.mobile}</td>
                        <td>{item.email}</td>
                        <td>{}</td>
                        <td />
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
            {/* Blockout */}
            <div>
              <Row className="justify-content-center">
                <ReactPaginate
                  previousLabel={'<'}
                  nextLabel={'>'}
                  breakLabel={'...'}
                  breakClassName={'break-me'}
                  pageCount={Math.ceil(totalElements / 10)}
                  marginPagesDisplayed={5}
                  pageRangeDisplayed={8}
                  onPageChange={event => this.handlePagination(event.selected)}
                  containerClassName={'pagination'}
                  subContainerClassName={'pages pagination'}
                  activeClassName={'active'}
                  forcePage={5}
                />
              </Row>
            </div>
          </div>
        </Loader>
      </div>
    );
  }
}

const mapStateToProps = ({ groupCustomerState }: IRootState) => ({
  loading: groupCustomerState.list_customer_with_group_id_index.loading,
  totalElements: groupCustomerState.list_customer_with_group_id_index.totalElements,
  list_customer_group_with_id: groupCustomerState.list_customer_with_group_id
});

const mapDispatchToProps = { getListTagDataAction, getListCustomerWithGroupIdDataAction };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupListCustomer);
