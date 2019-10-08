import React from 'react';
import { connect } from 'react-redux';
import { Button, Table, Row, Badge, Col, ModalHeader, ModalBody, ModalFooter, Label } from 'reactstrap';

import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './group-modal-config.scss';
import { IRootState } from 'app/reducers';
import { Loader as LoaderAnim } from 'react-loaders';
import { getListTagDataAction } from '../../../../actions/tag-management';
import ReactPaginate from 'react-paginate';
import { Input, Icon, Checkbox, Menu, Dropdown, Card } from 'antd';
import { Modal } from 'reactstrap';
// import TagModal from '../tag-modal/tag-modal';
import { DELETE_TAG, MERGE_TAG, EDIT_TAG } from '../../../../constants/tag-management';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import FieldData from './field-data/field-data';

interface IFieldData {
  id: string;
  type: string;
  title: string;
  fieldValue?: any;
  personalizationTag: string;
}

interface IGroupModalConfigProps extends StateProps, DispatchProps {
  is_show: boolean;
  toggle: Function;
}

interface IGroupModalConfigState {
  list_field_data: IFieldData[];
  list_field_data_cpn: Array<any>[];
}

interface IItemCheckBox {}

const FieldDataCpn = props => <FieldData {...props} />;

class GroupModalConfig extends React.Component<IGroupModalConfigProps, IGroupModalConfigState> {
  state = {
    list_field_data: [
      {
        id: '',
        type: '',
        title: '',
        fieldValue: '',
        personalizationTag: ''
      }
    ],

    list_field_data_cpn: []
  };

  componentDidMount() {
    let { list_field_data_cpn } = this.state;
    list_field_data_cpn.push(FieldDataCpn);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return null;
  }

  setFieldComponent = () => {
    let { list_field_data } = this.state;
    list_field_data && list_field_data.length && list_field_data.forEach(item => {});
  };

  setFieldDataFromFieldCpn = event => {
    let { list_field_data } = this.state;
    list_field_data.forEach(item => {
      if (item.id === event.id) {
        item === event;
      }
    });

    this.setState({ list_field_data });
  };

  render() {
    let { is_show } = this.props;
    let { list_field_data } = this.state;
    let list_field_render =
      list_field_data &&
      list_field_data.length > 0 &&
      list_field_data.map((item, index) => {
        return (
          <li key={index}>
            <FieldDataCpn />
          </li>
        );
      });

    return (
      <Modal isOpen={is_show} toggle={() => this.props.toggle()}>
        <ModalHeader>Thêm nhóm mới</ModalHeader>
        <ModalBody>
          <div className="group-modal-config">
            <div className="input-search_group">
              <label className="input-search_label">Tên nhóm</label>
              <Input />
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
                  <ul>{list_field_render}</ul>
                </div>
                <div className="group-addition_footer">
                  <Button color="primary" style={{ margin: '2px 14px' }}>
                    <FontAwesomeIcon icon={faPlus} />
                  </Button>
                  <label style={{ lineHeight: '30px', padding: '0px 14px', fontWeight: 400 }}>Thêm điều kiện khác</label>
                </div>
              </Card>
            </div>
            {/* Table List Customer */}
          </div>
        </ModalBody>
        <ModalFooter />
      </Modal>
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
)(GroupModalConfig);
