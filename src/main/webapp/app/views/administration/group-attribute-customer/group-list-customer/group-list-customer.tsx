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

interface IGroupListCustomerProps extends StateProps, DispatchProps {}

interface IGroupListCustomerState {
  activePage?: number;
  pageCount?: number;
  checkAll?: boolean;
  indeterminate?: any;
  listCheckBox?: IItemCheckBox[];
  openModal?: boolean;
  testChecked: boolean;
  textSearch?: string;
  openFixModal?: boolean;
  param?: string;
  dataModal?: any;
  option?: {
    leftButton: string;
    rightButton: string;
  };
  singleModalData: {
    id?: string;
    name?: string;
    decription?: string;
  };
}

interface IItemCheckBox {
  ITags;
  checked: boolean;
}

class GroupListCustomer extends React.Component<IGroupListCustomerProps, IGroupListCustomerState> {
  state = {
    activePage: 2,
    pageCount: 1,
    textSearch: '',
    checkAll: false,
    indeterminate: null,
    listCheckBox: [],
    testChecked: false,
    list_tags: [],
    openFixModal: false,
    param: '',
    dataModal: null,
    option: {
      leftButton: '',
      rightButton: ''
    },
    singleModalData: {
      id: null,
      name: '',
      decription: ''
    }
  };

  componentDidMount() {
    let { textSearch } = this.state;
    $('input#searchText').on('keypress', event => {
      let { textSearch } = this.state;
      if (event.which == 13) {
        this.getListTagDataAction(0, 6, textSearch);
      }
    });

    this.getListTagDataAction(0, 6, textSearch);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.list_tags !== state.list_tags) {
      let listCheckBox = props.list_tags && props.list_tags.map(item => ({ ...item, checked: false }));
      return {
        list_tags: props.list_tags,
        listCheckBox
      };
    }

    return null;
  }

  getListTagDataAction = (pageIndex, pageSize, textSearch) => {
    this.props.getListTagDataAction(textSearch, pageIndex, pageSize);
  };

  handleSearchTags = event => {
    this.setState({ textSearch: event.target.value });
  };

  openFixModalWithData = (param, item) => {
    let { listCheckBox } = this.state;
    this.setState({
      param,
      dataModal: listCheckBox,
      openFixModal: true,
      singleModalData: item
    });
  };

  closeFixModalData = () => {
    this.setState({ openFixModal: false });
  };

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

  menu = item => {
    return (
      <Menu>
        <Menu.Item key="1" onClick={() => this.openFixModalWithData(DELETE_TAG, item)}>
          <Icon type="delete" /> Delete
        </Menu.Item>
      </Menu>
    );
  };

  toogleFixModal = () => {
    let { openFixModal } = this.state;
    this.setState({ openFixModal: !openFixModal });
  };

  render() {
    let { loading, size, totalPages } = this.props;
    let { activePage, listCheckBox, textSearch, openFixModal, dataModal, param, singleModalData } = this.state;
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
                value={textSearch}
                placeholder="Tìm kiếm"
                onChange={this.handleSearchTags}
              />
            </div>
            {/* Table? */}
            <Table striped>
              <thead>
                <tr className="text-center">
                  <th className="checkbox-td">
                    <Checkbox id="add-all" onChange={event => this.onCheckAllChange('add-all', event.target.checked)} />
                  </th>
                  <th>Họ và tên</th>
                  <th>Số điện thoại</th>
                  <th>Email</th>
                  <th>Phân loại</th>
                  <th>Nguồn</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {listCheckBox &&
                  listCheckBox.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <Checkbox
                            id={item.id}
                            onChange={event => this.onCheckAllChange(item.id, event.target.checked)}
                            checked={item.checked}
                          />
                        </td>
                        <td>{item.name}</td>
                        <td>{item.contactNumbers}</td>
                        <td>{item.description}</td>
                        <td>{item.description}</td>
                        <td>{item.description}</td>
                        <td>...</td>
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
                  pageCount={size}
                  marginPagesDisplayed={1}
                  pageRangeDisplayed={totalPages}
                  onPageChange={event => this.props.getListTagDataAction(textSearch, event.selected, 6)}
                  containerClassName={'pagination'}
                  subContainerClassName={'pages pagination'}
                  activeClassName={'active'}
                  forcePage={activePage}
                />
              </Row>
            </div>
          </div>
        </Loader>
      </div>
    );
  }
}

const mapStateToProps = ({ tagDataState }: IRootState) => ({
  loading: tagDataState.loading,
  list_tags: tagDataState.list_tags,
  size: tagDataState.size,
  totalElements: tagDataState.totalElements,
  totalPages: tagDataState.totalPages
});

const mapDispatchToProps = { getListTagDataAction };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupListCustomer);
