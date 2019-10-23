import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table, Row, Input, Col } from 'reactstrap';
import Create from '../create/create';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../properties-customer/list/properties-customer.scss';
import { openModal, closeModal } from 'app/actions/modal';
import { getListProp, openModalDel, openModalEdit } from 'app/actions/properties-customer';
import { IRootState } from 'app/reducers';
import LoaderAnim from 'react-loaders';
import Loader from 'react-loader-advanced';
import Select from 'react-select';
import { List } from 'react-movable';
import SweetAlert from 'sweetalert-react';
import Delete from '../delete/delete';
import Edit from '../edit/edit';
import CreateGroup from '../create-group/create-group';

export const option = [
  { value: 'Date', label: 'Date' },
  { value: 'Dropdown List', label: 'Dropdown List' },
  { value: 'Checkbox', label: 'Checkbox' },
  { value: 'Text Input', label: 'Text Input' },
  { value: 'Radio', label: 'Radio' },
  { value: null, label: 'Tất cả' }
];
export interface IPropertiesCustomerProps extends StateProps, DispatchProps, RouteComponentProps<{ id: any }> {}

export interface IPropertiesCustomerState {
  selectedOption: {
    value: string;
    label: string;
  };
  dropItem: any[];
  openModalField: boolean;
  openModalGroup: boolean;
  textSearch: string;
  addComplete: boolean;
  openModalDelete: boolean;
  openModalEdit: boolean;
  propsId: string;
  ramdomID: number;
}

export class PropertiesCustomer extends React.Component<IPropertiesCustomerProps, IPropertiesCustomerState> {
  state: IPropertiesCustomerState = {
    selectedOption: {
      value: '',
      label: ''
    },
    dropItem: [],
    openModalField: false,
    openModalGroup: false,
    textSearch: '',
    addComplete: false,
    openModalDelete: false,
    openModalEdit: false,
    propsId: '',
    ramdomID: 0
  };

  componentDidMount() {
    const { getListProp } = this.props;
    getListProp();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.getList !== prevState.dropItem) {
      return {
        dropItem: nextProps.getList
      };
    }
    return null;
  }
  handleChange = selectedOption => {
    let { textSearch } = this.state;
    const { getListProp } = this.props;
    getListProp(selectedOption.value, textSearch);
    this.setState({
      selectedOption: {
        value: selectedOption.value,
        label: selectedOption.label
      }
    });
  };

  searchText = event => {
    if (event.key === 'Enter') {
      const text = event.target.value;
      const { selectedOption } = this.state;
      this.props.getListProp(selectedOption.value ? selectedOption.value : null, text);
    }
  };
  openModalCreate = e => {
    if (this.props.isComplete) {
      this.props.openModal({
        show: true,
        type: 'success',
        title: translate('modal-data.title.success'),
        text: translate('alert.success-properties')
      });
    }
  };

  render() {
    const { loading, modalState, match } = this.props;
    let { dropItem, selectedOption } = this.state;
    const spinner1 = <LoaderAnim type="ball-pulse" active={true} />;

    return (
      <div>
        <SweetAlert
          title={modalState.title ? modalState.title : 'No title'}
          confirmButtonColor=""
          show={modalState.show ? modalState.show : false}
          text={modalState.text ? modalState.text : 'No'}
          type={modalState.type ? modalState.type : 'error'}
          onConfirm={() => this.props.closeModal()}
        />
        <Loader message={spinner1} show={loading} priority={1}>
          <div id="properties-management-title">
            <Row>
              <Col md="6" style={{ paddingTop: '14px' }}>
                <Translate contentKey="properties-management.title" />
              </Col>
              <Col md="6" className="form-button" style={{ textAlign: 'right', padding: '17px 0px 0px 280px' }}>
                <Col md="6">
                  <CreateGroup />
                </Col>
                <Col md="5">
                  <Create onClick={this.openModalCreate} />
                </Col>
              </Col>
            </Row>
          </div>
          <div className="panel">
            <Row>
              <Col md="3" />
              <Col md="5" className="search-bar-properties">
                <Select
                  className="select-bar"
                  placeholder="Chọn loại"
                  value={selectedOption.label ? selectedOption : ''}
                  onChange={this.handleChange}
                  options={option}
                />
                <Col md="9">
                  <div className="has-search">
                    <span className=" form-control-feedback" />
                    <Input
                      maxLength={160}
                      type="text"
                      className="form-control"
                      onKeyDown={this.searchText}
                      placeholder={translate('userManagement.home.search-placer')}
                    />
                  </div>
                </Col>
              </Col>
            </Row>
            <hr />

            <List
              values={dropItem}
              onChange={({ oldIndex, newIndex }) => {
                let tempArray = dropItem[oldIndex];
                dropItem[oldIndex] = dropItem[newIndex];
                dropItem[newIndex] = tempArray;
                this.setState({ dropItem });
              }}
              renderList={({ children, props, isDragged }) => (
                <Table responsive striped>
                  <thead>
                    <tr className="text-center">
                      <th className="hand" id="first-head">
                        <Translate contentKey="properties-management.form.name" />
                      </th>
                      <th className="hand">
                        <Translate contentKey="properties-management.form.type" />
                      </th>
                      <th className="hand" style={{ width: '25%', wordBreak: 'break-all' }}>
                        <Translate contentKey="properties-management.form.persionalization" />
                      </th>
                      <th className="hand">
                        <Translate contentKey="properties-management.function" />
                      </th>
                    </tr>
                  </thead>
                  {this.props.getList.length < 1 ? (
                    <tbody>
                      <tr>
                        <td colSpan={4}>
                          <Translate contentKey="properties-management.no-record" />
                        </td>{' '}
                      </tr>{' '}
                    </tbody>
                  ) : (
                    <tbody key={Math.random()} {...props}>
                      {children}
                    </tbody>
                  )}
                </Table>
              )}
              renderItem={({ value, props, isDragged }) => {
                const row = (
                  <tr {...props}>
                    <td>{value.title}</td>
                    <td>{value.type}</td>
                    <td>{value.personalizationTag.length > 2 ? value.personalizationTag : ''}</td>
                    <td className="text-center">
                      {value.title === 'First Name' ||
                      value.title === 'Last Name' ||
                      value.title === 'Email' ||
                      value.title === 'Mobile' ? (
                        ''
                      ) : (
                        <div className="btn-group flex-btn-group-container">
                          <Button
                            className="buttonUpdate"
                            onClick={() => {
                              this.props.openModalEdit();
                              this.state.openModalEdit = this.props.openEdit;
                              this.setState({
                                openModalEdit: this.props.openEdit,
                                propsId: value.id,
                                ramdomID: Math.random()
                              });
                            }}
                            color="primary"
                            size="sm"
                          >
                            <FontAwesomeIcon icon="pencil-alt" />{' '}
                            <span className="d-none d-md-inline">
                              <Translate contentKey="entity.action.edit" />
                            </span>
                          </Button>
                          <Button
                            color="danger"
                            size="sm"
                            onClick={() => {
                              this.props.openModalDel();
                              this.state.openModalDelete = this.props.openDelete;
                              this.setState({
                                openModalDelete: this.props.openDelete,
                                propsId: value.id,
                                ramdomID: Math.random()
                              });
                            }}
                          >
                            <FontAwesomeIcon icon="trash" />{' '}
                            <span className="d-none d-md-inline">
                              <Translate contentKey="entity.action.delete" />
                            </span>
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
                return isDragged ? (
                  <table className="table-drag">
                    <tbody>{row}</tbody>
                  </table>
                ) : (
                  row
                );
              }}
            />

            <Delete isOpen={this.state.openModalDelete} id={this.state.propsId} ramdomId={this.state.ramdomID} />
            <Edit isOpen={this.state.openModalEdit} id={this.state.propsId} ramdomId={this.state.ramdomID} />
          </div>
        </Loader>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  getList: storeState.propertiesState.list_prop,
  loading: storeState.propertiesState.loading,
  modalState: storeState.handleModal.data,
  isComplete: storeState.propertiesState.isCompelete,
  isDelete: storeState.propertiesState.isDelete,
  openDelete: storeState.propertiesState.openModalDelete,
  openEdit: storeState.propertiesState.openModalEdit
});

const mapDispatchToProps = { getListProp, openModal, closeModal, openModalDel, openModalEdit };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PropertiesCustomer);
