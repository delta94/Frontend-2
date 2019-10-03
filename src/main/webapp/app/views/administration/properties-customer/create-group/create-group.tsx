import React from 'react';
import { connect } from 'react-redux';
import { Button, Table, Row, DropdownItem, Col, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label } from 'reactstrap';
import { AvForm } from 'availity-reactstrap-validation';
import { Icon, Checkbox, Menu, Dropdown } from 'antd';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './create-group.scss';
import { getListProp, insertProp, getTempId, getListTemp } from 'app/actions/properties-customer';
import { IRootState } from 'app/reducers';
import { Loader as LoaderAnim } from 'react-loaders';
import Loader from 'react-loader-advanced';
import { openModal, closeModal } from 'app/actions/modal';
import Select from 'react-select';
import classnames from 'classnames';
import { List } from 'react-movable';
import $ from 'jquery';
import { Input } from 'antd';
import { ITemp } from 'app/reducers/properties-customer';
const { Search } = Input;

const plainOptions = ['Apple', 'Pear', 'Orange'];

export interface ICreateGroupProps extends StateProps, DispatchProps {}

export interface ICreateGroupState {
  modal: boolean;
  activeTab: string;
  checkedList: any[];
  indeterminate: boolean;
  checkAll: boolean;
  listCheckBox?: IItemCheckBox[];
  list_temp?: ITemp[];
  getId: string;
}

interface IItemCheckBox {
  id: string;
  type?: string;
  title?: string;
  personalizationTag?: boolean;
  fieldValue?: string;
  checked: boolean;
}

export class CreateGroup extends React.Component<ICreateGroupProps, ICreateGroupState> {
  state: ICreateGroupState = {
    modal: false,
    activeTab: '1',
    checkedList: [],
    indeterminate: false,
    checkAll: false,
    list_temp: [],
    listCheckBox: [],
    getId: ''
  };

  componentDidMount() {
    this.props.getListTemp('');
    this.props.getTempId(this.state.activeTab);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.temp !== state.list_temp) {
      let listCheckBox = props.temp && props.temp.map(item => ({ ...item, checked: false, id: Math.random() }));
      return {
        list_temp: props.temp,
        listCheckBox
      };
    }
    return null;
  }

  toggle = () => {
    let newListCheckBox = this.state.listCheckBox.map(item => {
      item.checked = false;
      return item;
    });
    this.setState({ listCheckBox: newListCheckBox });
    this.setState({
      modal: !this.state.modal
    });
  };

  Changetab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
    this.props.getTempId(tab);
  }
  onChange = checkedList => {
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && checkedList.length < plainOptions.length,
      checkAll: checkedList.length === plainOptions.length
    });
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

      this.setState({ listCheckBox, getId: id });
    }
  };

  render() {
    const { listTemp, temp } = this.props;
    let { listCheckBox } = this.state;
    return (
      <span className="d-inline-block mb-2 mr-2">
        <Button className="btn btn-primary float-right jh-create-entity" onClick={this.toggle}>
          <FontAwesomeIcon icon="plus" /> <Translate contentKey="properties-management.button-template" />
        </Button>
        <Modal isOpen={this.state.modal} className="content-group-properties">
          <ModalHeader toggle={this.toggle} className="create-group">
            <Translate contentKey="properties-management.add.properties" />
          </ModalHeader>
          <ModalBody>
            <AvForm>
              <Row>
                <Col md=" 4" id="has-search">
                  <Search placeholder="tìm kiếm" onSearch={value => this.props.getListTemp(value)} size="large" enterButton />
                  <div id="recomand">Recommended for you</div>
                  <div>
                    {listTemp
                      ? listTemp.map((event, index) => {
                          return (
                            <DropdownItem
                              key={index}
                              toggle={false}
                              className={classnames({ active: this.state.activeTab === event.id })}
                              onClick={() => {
                                this.Changetab(event.id);
                              }}
                            >
                              <div>
                                <label>{event.title}</label>
                              </div>
                            </DropdownItem>
                          );
                        })
                      : ''}
                  </div>
                </Col>
                <Col md="8" id="table-group">
                  <Col md="6">
                    <div>
                      <Checkbox className="checkbox-all" onChange={event => this.onCheckAllChange('add-all', event.target.checked)}>
                        Check all
                      </Checkbox>
                      {listCheckBox
                        ? listCheckBox.map((item, index) => {
                            return (
                              <div key={index}>
                                <Checkbox onChange={event => this.onCheckAllChange(item.id, event.target.checked)} checked={item.checked} />
                                <Label className="text-temp">{item.title}</Label>
                              </div>
                            );
                          })
                        : ''}

                      <br />
                    </div>
                  </Col>
                  <Col md="6" id="table-right">
                    <Label className="type-temp"> Type</Label>
                    {listCheckBox
                      ? listCheckBox.map((event, index) => {
                          return (
                            <div key={index}>
                              <Label className="text-temp">{event.type}</Label>
                            </div>
                          );
                        })
                      : ''}
                  </Col>
                </Col>
              </Row>
            </AvForm>
          </ModalBody>
          <ModalFooter>
            <Button color="link" onClick={this.toggle}>
              Hủy bỏ
            </Button>
            <Button
              onClick={async () => {
                let addText;
                let list = listCheckBox
                  .map(event => {
                    if (event.checked === true) {
                      addText = {
                        title: event.title,
                        type: event.type,
                        fieldValue: event.fieldValue
                      };
                      return addText;
                    }
                  })
                  .filter(function(obj) {
                    return obj;
                  });

                await this.props.insertProp(list);
                this.toggle();
                this.props.getListProp();
                let newListCheckBox = listCheckBox.map(item => {
                  item.checked = false;
                  return item;
                });
                this.setState({ listCheckBox: newListCheckBox });
                this.props.openModal({
                  show: true,
                  type: 'success',
                  title: translate('modal-data.title.success'),
                  text: translate('alert.success-properties')
                });
              }}
              color="primary"
            >
              Tạo mới
            </Button>{' '}
          </ModalFooter>
        </Modal>
      </span>
    );
  }
}
const mapStateToProps = (storeState: IRootState) => ({
  listTemp: storeState.propertiesState.ListTemp,
  loading: storeState.propertiesState.loading,
  temp: storeState.propertiesState.Temp
});

const mapDispatchToProps = {
  getListProp,
  insertProp,
  openModal,
  getTempId,
  getListTemp,
  closeModal
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateGroup);
