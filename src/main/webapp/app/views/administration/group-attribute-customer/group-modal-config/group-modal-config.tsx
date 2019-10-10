import React from 'react';
import { connect } from 'react-redux';
import { Button, Table, Row, Badge, Col, ModalHeader, ModalBody, ModalFooter, Label } from 'reactstrap';

import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './group-modal-config.scss';
import { IRootState } from 'app/reducers';
import { getListTagDataAction } from '../../../../actions/tag-management';
import ReactPaginate from 'react-paginate';
import { Input, Icon, Checkbox, Menu, Dropdown, Card } from 'antd';
import { Modal } from 'reactstrap';
// import TagModal from '../tag-modal/tag-modal';
import { DELETE_TAG, MERGE_TAG, EDIT_TAG } from '../../../../constants/tag-management';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import FieldData from './field-data/field-data';
import { getListFieldDataAction } from '../../../../actions/group-attribute-customer';
import GroupListCustomer from '../group-list-customer/group-list-customer';
import { IListFieldData } from 'app/common/model/group-attribute-customer';

interface IGroupModalConfigProps extends StateProps, DispatchProps {
  is_show: boolean;
  toggle: Function;
}

interface IGroupModalConfigState {
  list_field_data_cpn: any;
  list_customer: Array<any>;
}

function makeid(length: number) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

class GroupModalConfig extends React.Component<IGroupModalConfigProps, IGroupModalConfigState> {
  state: IGroupModalConfigState = {
    list_field_data_cpn: [{ id: '1', name: 'ok', last_index: false }, { id: '2', name: 'test', last_index: true }],
    list_customer: [
      {
        id: '0036d8ee-2815-40bf-9ae0-ccaf6e9db413',
        firstName: 'Anna',
        lastName: 'Best',
        mobile: '979168184',
        email: 'msherr@aol.com',
        merchantId: '275ac045-2ae5-418a-87d7-85d967a37cb7',
        fields: [
          {
            id: '2',
            type: 'Radio',
            title: 'Giới tính',
            fieldValue: 'Nam||Nữ||Giới tính thứ 3',
            value: 'Nam'
          }
        ]
      },
      {
        id: '0036d8ee-2815-40bf-9ae0-ccaf6e9db413',
        firstName: 'Anna',
        lastName: 'Best',
        mobile: '979168184',
        email: 'msherr@aol.com',
        merchantId: '275ac045-2ae5-418a-87d7-85d967a37cb7',
        fields: [
          {
            id: '2',
            type: 'Radio',
            title: 'Giới tính',
            fieldValue: 'Nam||Nữ||Giới tính thứ 3',
            value: 'Nam'
          }
        ]
      }
    ]
  };

  componentDidMount() {
    this.props.getListFieldDataAction();
  }

  // TODO: Set value from state;
  setFieldDataFromFieldCpn = event => {};

  // Add new component to list_field_data_cpn
  handleAddNewComponent = () => {
    let { list_field_data_cpn } = this.state;
    let newCpn = { id: makeid(8), name: 'new', last_index: true };
    list_field_data_cpn.push(newCpn);
    this.updateLastIndex(list_field_data_cpn);
  };

  // Delete component by Id
  deleteComponentById = (id: string) => {
    let { list_field_data_cpn } = this.state;
    list_field_data_cpn.forEach((item, index) => {
      if (item.id === id) {
        list_field_data_cpn.splice(index, 1);
      }
    });

    this.updateLastIndex(list_field_data_cpn);
  };

  //TODO: Update last index
  updateLastIndex = (list_field_data_cpn: any) => {
    list_field_data_cpn.forEach((item, index) => {
      if (index < list_field_data_cpn.length - 1) {
        item.last_index = false;
      } else {
        item.last_index = true;
      }
    });

    this.setState({ list_field_data_cpn });
  };

  render() {
    let { is_show, list_field_data } = this.props;
    let { list_field_data_cpn, list_customer } = this.state;
    let list_field_render =
      list_field_data_cpn && list_field_data_cpn.length > 0
        ? list_field_data_cpn.map((item, index) => {
            return (
              <FieldData
                id={item.id}
                list_field_data={list_field_data}
                last_index={item.last_index}
                setFieldDataFromFieldCpn={this.setFieldDataFromFieldCpn}
                deleteComponentById={this.deleteComponentById}
              />
            );
          })
        : [];

    return (
      <Modal isOpen={is_show} toggle={() => this.props.toggle()}>
        <ModalHeader>Thêm nhóm mới</ModalHeader>
        <ModalBody>
          <div className="group-modal-config">
            <div className="input-search_group">
              <label className="input-search_label">Tên nhóm</label>
              <Input placeholder="Học sinh, người nổi tiếng, quần chúng .v.v" />
            </div>
            {/* Chose condition */}

            <div className="group-addition">
              <Card style={{ padding: '0px' }}>
                <div className="group-addition_block-out">
                  <span style={{ textTransform: 'uppercase', fontWeight: 500 }}>CHỌN ĐIỀU KIỆN</span>
                  <Button color="primary" style={{ float: 'right', margin: '3px' }}>
                    Apply
                  </Button>
                </div>
              </Card>
              <Card>
                <div className="group-addition_content">
                  {list_field_render}
                  <div className="group-addition_footer">
                    <Button color="primary" style={{ margin: '2px 14px' }} onClick={this.handleAddNewComponent}>
                      <FontAwesomeIcon icon={faPlus} />
                    </Button>
                    <label style={{ lineHeight: '30px', padding: '0px 14px', fontWeight: 400 }}>Thêm điều kiện khác</label>
                  </div>
                </div>
              </Card>
              <div className="search-table-customer">
                <Table striped>
                  <thead>
                    <tr className="text-center">
                      <th className="checkbox-td">Stt</th>
                      <th>Họ và tên</th>
                      <th>Số điện thoại</th>
                      <th>Email</th>
                      <th>Thẻ/tag</th>
                      <th>Nguồn</th>
                      <th>Ngày tạo</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {list_customer &&
                      list_customer.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{index}</td>
                            <td>{item.firstName + ' ' + item.lastName}</td>
                            <td>{item.phone}</td>
                            <td>{item.email}</td>
                            <td />
                            <td />
                            <td />
                            <td>...</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </div>
            </div>
            {/* Table List Customer */}
          </div>
        </ModalBody>
        <ModalFooter />
      </Modal>
    );
  }
}

const mapStateToProps = ({ tagDataState, groupCustomerState }: IRootState) => ({
  loading: tagDataState.loading,
  list_tags: tagDataState.list_tags,
  size: tagDataState.size,
  totalElements: tagDataState.totalElements,
  totalPages: tagDataState.totalPages,
  list_field_data: groupCustomerState.list_field_data
});

const mapDispatchToProps = { getListTagDataAction, getListFieldDataAction };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupModalConfig);
