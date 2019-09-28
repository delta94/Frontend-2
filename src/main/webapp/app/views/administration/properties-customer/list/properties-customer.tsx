import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table, Row, Badge, Col } from 'reactstrap';
import Create from '../create/create';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../properties-customer/list/properties-customer.scss';
import { openModal, closeModal } from 'app/actions/modal';
import { getListProp } from 'app/actions/properties-customer';
import { IRootState } from 'app/reducers';
import { Loader as LoaderAnim } from 'react-loaders';
import Loader from 'react-loader-advanced';
import Select from 'react-select';
import { List } from 'react-movable';
import SweetAlert from 'sweetalert-react';
import Delete from '../delete/delete';

export const option = [
  { value: 'Date', label: 'Date' },
  { value: 'Dropdown List', label: 'Dropdown List' },
  { value: 'Checkbox', label: 'Checkbox' },
  { value: 'Text Input', label: 'Text Input' },
  { value: 'Radio', label: 'Radio' },
  { value: null, label: 'Any Thing' }
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
    const spinner1 = <LoaderAnim color="#ffffff" type="ball-pulse" />;

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
            <Translate contentKey="properties-management.title" />
          </div>
          <div />
          <div className="panel">
            <Row>
              <Col md="3" />
              <Col md="5" className="search-bar-properties">
                <Select
                  className="select-bar"
                  placeholder="Any type"
                  value={selectedOption.label ? selectedOption : ''}
                  onChange={this.handleChange}
                  options={option}
                />
                <Col md="9">
                  <div className="has-search">
                    <span className=" form-control-feedback" />
                    <input
                      type="text"
                      className="form-control"
                      onKeyDown={this.searchText}
                      placeholder={translate('userManagement.home.search-placer')}
                    />
                  </div>
                </Col>
              </Col>
              <Col md="4" className="form-button">
                <Col md="6">
                  <Button className="btn btn-primary float-right jh-create-entity">
                    <FontAwesomeIcon icon="plus" /> <Translate contentKey="properties-management.button-template" />
                  </Button>
                </Col>
                <Col md="5">
                  <Create onClick={this.openModalCreate} />
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
                <Table
                  responsive
                  striped
                  style={{
                    cursor: isDragged ? 'grabbing' : undefined
                  }}
                >
                  <thead>
                    <tr className="text-center">
                      <th className="hand">
                        <Translate contentKey="properties-management.form.name" />
                      </th>
                      <th className="hand">
                        <Translate contentKey="properties-management.form.type" />
                      </th>
                      <th className="hand">
                        <Translate contentKey="properties-management.form.persionalization" />
                      </th>
                      <th className="hand">
                        <Translate contentKey="properties-management.function" />
                      </th>
                    </tr>
                  </thead>
                  <tbody key={Math.random()} {...props}>
                    {children}
                  </tbody>
                </Table>
              )}
              renderItem={({ value, props, isDragged }) => {
                const row = (
                  <tr
                    {...props}
                    style={{
                      ...props.style,
                      cursor: isDragged ? 'grabbing' : 'grab'
                    }}
                  >
                    <td>{value.title}</td>
                    <td>{value.type}</td>
                    <td>{value.personalizationTag}</td>
                    <td className="text-center">
                      <div className="btn-group flex-btn-group-container">
                        <Button className="buttonUpdate" color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit" />
                          </span>
                        </Button>
                        <Button
                          color="danger"
                          size="sm"
                          onClick={() => {
                            this.state.openModalDelete = true;
                            this.setState({
                              openModalDelete: true,
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
                    </td>
                  </tr>
                );
                return isDragged ? (
                  <Table responsive striped>
                    <tbody className="table-drag">{row}</tbody>
                  </Table>
                ) : (
                  row
                );
              }}
            />
            <Delete isOpen={this.state.openModalDelete} id={this.state.propsId} ramdomId={this.state.ramdomID} />
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
  isComplete: storeState.propertiesState.isCompelete
});

const mapDispatchToProps = { getListProp, openModal, closeModal };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PropertiesCustomer);
