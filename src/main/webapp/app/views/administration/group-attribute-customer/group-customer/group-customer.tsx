import React from 'react';
import { connect } from 'react-redux';
import { Button, Table, Row, Badge, Col } from 'reactstrap';

import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './group-customer.scss';
import { IRootState } from 'app/reducers';
import { Loader as LoaderAnim } from 'react-loaders';
import Loader from 'react-loader-advanced';
import { getListTagDataAction } from '../../../../actions/tag-management';
import ReactPaginate from 'react-paginate';
import { Input, Icon, Checkbox, Menu, Dropdown } from 'antd';
import { DELETE_TAG, MERGE_TAG, EDIT_TAG } from '../../../../constants/tag-management';
import $ from 'jquery';
import { getListCustomerGroupDataAction } from '../../../../actions/group-attribute-customer';

interface IGroupCustomerProps extends StateProps, DispatchProps {}
interface IGroupCustomerState {
  listNewTag: INewTag[];
  textSearch?: string;
  listCheckBox?: Array<any>[];
}

interface INewTag {
  name?: string;
  listCheckBox?: Array<any>[];
}
class GroupCustomer extends React.Component<IGroupCustomerProps, IGroupCustomerState> {
  state = {
    listNewTag: [],
    textSearch: '',
    listCheckBox: []
  };

  handleNewTag = event => {
    event.preventDefault();
    let { listNewTag } = this.state;
    let textNew = event.target.value;
    let listTextSplit = textNew.split('\n');
    listNewTag =
      listTextSplit.length > 0 &&
      listTextSplit.map(item => ({
        name: item
      }));
  };

  // insertNewTag = () => {
  //   let { listNewTag } = this.state;
  //   let { modalState } = this.props;
  //   if (listNewTag && listNewTag.length > 0) {
  //     this.props.postInsertTagAction(listNewTag);
  //     setTimeout(() => {
  //       this.props.getListTagDataAction('', 0, 6);
  //       this.props.openModal(modalState);
  //     }, 250);
  //     this.setState({ textNew: '' });
  //   } else {
  //     this.props.openModal({
  //       type: WARNING,
  //       title: 'Bạn cần nhập tên tags'
  //     });
  //   }
  // };

  onCheckAllChange = (id, checked) => {
    let { listCheckBox } = this.state;

    if (id === 'add-all') {
      let newListCheckBox = listCheckBox.map(item => {
        item.checked = checked;
        return item;
      });
      this.setState({ listCheckBox: newListCheckBox });
    } else {
      listCheckBox = listCheckBox.map(item => {
        if (item.id === id) {
          item.checked = checked;
        }
        return item;
      });

      this.setState({ listCheckBox });
    }
  };

  componentDidMount() {
    var textAreas = document.getElementsByTagName('textarea');

    Array.prototype.forEach.call(textAreas, function(elem) {
      elem.placeholder = elem.placeholder.replace(/\\n/g, '\n');
    });

    this.props.getListCustomerGroupDataAction('', 0, 0);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.list_group_customer) {
      let listCheckBox = nextProps.list_group_customer.map(item => ({ ...item, checked: false }));
      return {
        listCheckBox
      };
    }
    return null;
  }

  menu = item => {
    return (
      <Menu>
        <Menu.Item key="1">
          <Icon type="delete" /> Delete
        </Menu.Item>
        <Menu.Item key="1">
          <Icon type="delete" /> Chỉnh sửa
        </Menu.Item>
        <Menu.Item key="1">
          <Icon type="delete" /> Copy
        </Menu.Item>
      </Menu>
    );
  };

  render() {
    let { textSearch, listCheckBox } = this.state;
    let { loading, list_group_customer } = this.props;
    console.log(list_group_customer);
    const spinner1 = <LoaderAnim color="#ffffff" type="ball-pulse" />;

    return (
      <div className="group-customer">
        <p>Danh sách nhóm khách hàng</p>
        <Loader message={spinner1} show={loading} priority={1}>
          <div>
            {/* Block out */}
            <div className="block-out">
              <Input id="searchText" prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Tìm kiếm" />
            </div>
            {/* Table? */}
            <Table striped>
              <thead>
                <tr className="text-center">
                  <th className="checkbox-td">
                    <Checkbox id="add-all" onChange={event => this.onCheckAllChange('add-all', event.target.checked)} />
                  </th>
                  <th>Tên nhóm</th>
                  <th>Số lượng khách hàng</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {listCheckBox &&
                  listCheckBox.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <Checkbox id={item.id} checked={item.checked} />
                        </td>
                        <td>{item.name}</td>
                        <td>
                          <Dropdown.Button overlay={() => this.menu(item)} icon={<Icon type="caret-down" />}>
                            <span>
                              <Icon type="edit" />
                              Edit
                            </span>
                          </Dropdown.Button>
                        </td>
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
                  pageCount={1}
                  marginPagesDisplayed={1}
                  pageRangeDisplayed={1}
                  onPageChange={event => this.props.getListCustomerGroupDataAction(textSearch, event.selected, 6)}
                  containerClassName={'pagination'}
                  subContainerClassName={'pages pagination'}
                  activeClassName={'active'}
                  forcePage={1}
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
  loading: groupCustomerState.loading,
  list_group_customer: groupCustomerState.list_group_customer,
  modalState: groupCustomerState.postMailRequest
});

const mapDispatchToProps = {
  getListCustomerGroupDataAction
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupCustomer);
