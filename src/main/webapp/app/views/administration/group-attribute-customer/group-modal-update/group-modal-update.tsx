import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';
import { Translate, translate } from 'react-jhipster';
import './group-customer.scss';
import { IRootState } from 'app/reducers';
import LoaderAnim from 'react-loaders';
import Loader from 'react-loader-advanced';
import { Input, Icon, Menu, Button, Popover } from 'antd';
import $ from 'jquery';
import {
  getListCustomerGroupDataAction,
  getListCustomerWithGroupIdDataAction,
  postDeleteCustomerGroupAction,
  postUpdateCustomerGroupAction
} from '../../../../actions/group-attribute-customer';

interface IGroupModalUpdateProps extends StateProps, DispatchProps {}

interface IGroupModalUpdateState {
  listNewTag: INewTag[];
  textSearch?: string;
  listPopOver?: Array<IPopOver>[];
}

interface INewTag {
  name?: string;
}

interface IPopOver {
  isShow: boolean;
  group_customer: {
    id: string;
    typeName: string;
    contactNumber: string;
  };
}

class GroupModalUpdate extends React.Component<IGroupModalUpdateProps, IGroupModalUpdateState> {
  state = {
    listNewTag: [],
    textSearch: '',
    listPopOver: []
  };

  componentDidMount() {
    let { textSearch } = this.state;
    this.props.getListCustomerGroupDataAction(textSearch);
  }

  handleVisibleChange = (id, isShow) => {
    let { listPopOver } = this.state;

    listPopOver.forEach(item => {
      if (item.id === id) {
        item.isShow = !isShow;
      }
    });

    this.setState({ listPopOver });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.list_group_customer !== prevState.list_group_customer) {
      let listPopOver = nextProps.list_group_customer && nextProps.list_group_customer.map(item => ({ ...item, isShow: false }));
      return {
        listPopOver,
        list_group_customer: nextProps.list_group_customer
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
          <Icon type="edit" />
          Chỉnh sửa
        </Menu.Item>
        <Menu.Item key="1">
          <Icon type="copy" /> Copy
        </Menu.Item>
      </Menu>
    );
  };

  hide = () => {};

  //TODO: Call list customer
  callListCustomer = (id?: string) => {
    let { textSearch } = this.state;
    this.props.getListCustomerWithGroupIdDataAction(textSearch, 0, 0, id);
  };

  render() {
    let { textSearch, listPopOver } = this.state;
    let { loading, list_group_customer } = this.props;
    let active = true;
    const spinner1 = <LoaderAnim type="ball-pulse" active={active} />;
    return (
      <div className="group-customer">
        <p className="group-header">Danh sách nhóm khách hàng</p>
        <Loader message={spinner1} show={loading} priority={1}>
          <div>
            {/* Block out */}
            <div className="block-out">
              <Input
                id="searchText"
                prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Tìm kiếm"
                onChange={event => this.setState({ textSearch: event.target.value })}
                onPressEnter={() => this.props.getListCustomerGroupDataAction(textSearch)}
              />
            </div>
            {/* Table? */}
            <Table striped>
              <thead>
                <tr className="text-center">
                  <th className="checkbox-td">Stt</th>
                  <th>Tên nhóm</th>
                  <th>Số lượng khách hàng</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {listPopOver && listPopOver.length > 0 ? (
                  listPopOver.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index}</td>
                        <td onClick={() => this.callListCustomer(item.id)}>{item.typeName}</td>
                        <td>
                          <div className="item-contact">
                            <Icon type="user" style={{ marginBottom: '10px' }} />
                            <label className="user-contact-item">{item.contactNumbers}</label>
                          </div>
                        </td>
                        <td>
                          <Popover
                            content={
                              <ul style={{ listStyleType: 'none', padding: '0px', cursor: 'pointer', fontSize: '0.8rem' }}>
                                <li className="customer-li" onClick={() => this.props.postDeleteCustomerGroupAction(item.id)}>
                                  {' '}
                                  <Icon type="delete" />
                                  Xóa
                                </li>
                                <li className="customer-li">
                                  {' '}
                                  <Icon type="edit" />
                                  Sửa
                                </li>
                                <li className="customer-li">
                                  {' '}
                                  <Icon type="copy" />
                                  Copy
                                </li>
                              </ul>
                            }
                            trigger="click"
                            placement="bottom"
                            visible={item.isShow}
                            onVisibleChange={() => this.handleVisibleChange(item.id, item.isShow)}
                          >
                            <Button type="ghost">...</Button>
                          </Popover>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr />
                )}
              </tbody>
            </Table>
            {/* Blockout */}
            <div />
          </div>
        </Loader>
      </div>
    );
  }
}

const mapStateToProps = ({ groupCustomerState }: IRootState) => ({
  loading: groupCustomerState.list_group_customer_index.loading,
  list_group_customer: groupCustomerState.list_group_customer,
  modalState: groupCustomerState.postRequest
});

const mapDispatchToProps = {
  getListCustomerGroupDataAction,
  getListCustomerWithGroupIdDataAction,
  postDeleteCustomerGroupAction
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupModalUpdate);
