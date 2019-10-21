import React from 'react';
import { connect } from 'react-redux';
import { Button, Table, Row, Badge, Col, Modal, ModalHeader, ModalBody, ModalFooter, Input, Form, FormGroup, Label } from 'reactstrap';
import { AvForm } from 'availity-reactstrap-validation';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './create.scss';
import { getListProp, insertProp } from 'app/actions/properties-customer';
import { IRootState } from 'app/reducers';
import LoaderAnim from 'react-loaders';
import Loader from 'react-loader-advanced';
import { openModal, closeModal } from 'app/actions/modal';
import Select from 'react-select';
import { List } from 'react-movable';
import $ from 'jquery';

export const optionType = [
  { value: 'Text Input', label: 'Text Input' },
  { value: 'Dropdown List', label: 'Dropdown' },
  { value: 'Radio', label: 'Radio Buttons' },
  { value: 'Checkbox', label: 'Check Boxes' },
  { value: 'Date', label: 'Date' }
];

export interface ICreateProps extends StateProps, DispatchProps {
  onClick: Function;
}

export interface ICreateState {
  selectedOptionType: {
    value: string;
    label: string;
  };
  modal: boolean;
  valueName: string;
  validateName: string;
  options: any[];
  addComplete: boolean;
  validateOption: string;
  textError: string;
}

export class Create extends React.Component<ICreateProps, ICreateState> {
  state: ICreateState = {
    modal: false,
    selectedOptionType: {
      value: '',
      label: ''
    },
    valueName: '',
    validateName: '',
    options: [],
    addComplete: false,
    validateOption: '',
    textError: ''
  };
  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.state,
      addComplete: nextProps.isComplete
    });
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      validateName: '',
      options: [],
      validateOption: '',
      valueName: '',
      textError: '',
      selectedOptionType: {
        value: '',
        label: ''
      }
    });
  };

  handleChangeType = selectedOption => {
    let { options, selectedOptionType } = this.state;
    this.setState({
      selectedOptionType: {
        value: selectedOption.value,
        label: selectedOption.label
      }
    });
    if (options.length < 1) {
      if (!(selectedOption.value === 'Text Input' || selectedOption.value === 'Date' || selectedOption.value === '')) {
        let listOptions = {
          id: Math.random()
            .toString(36)
            .replace(/[^a-z]+/g, '')
            .substr(0, 5),
          name: selectedOptionType.label,
          type: selectedOptionType.value
        };
        options.push(listOptions);
        this.setState({ options, textError: '' });
      }
    }
    if (selectedOption.value === 'Text Input' || selectedOption.value === 'Date' || selectedOption.value === '') {
      this.setState({ options: [], validateOption: '', textError: '' });
    }
  };

  getValueName = event => {
    let { valueName } = this.state;
    valueName = event.target.value;
    this.setState({ valueName });
    if (!valueName.trim()) {
      this.setState({ validateName: translate('properties-management.error.name') });
    } else {
      this.setState({ validateName: '' });
    }
  };

  addField = () => {
    let { valueName, options, selectedOptionType, validateOption } = this.state;
    if (!valueName.trim()) {
      this.setState({ validateName: translate('properties-management.error.name') });
    } else if (validateOption) {
      this.setState({ validateOption: translate('properties-management.error.option') });
    } else {
      let valueTextbox = options.map(event => {
        let arrayCategories = $(`input#${event.id}`).val();
        return arrayCategories.toString();
      });
      let addText = {
        fields: [
          {
            title: valueName,
            type: selectedOptionType.value,
            fieldValue: selectedOptionType.value === 'Date' || selectedOptionType.value === 'Text Input' ? '' : valueTextbox.join('||')
          }
        ]
      };
      this.handleSubmit(valueTextbox, addText);
    }
  };

  handleSubmit = async (valueTextbox, addText) => {
    let { selectedOptionType, addComplete } = this.state;
    const { insertProp, getListProp } = this.props;
    if (!(selectedOptionType.value === 'Text Input' || selectedOptionType.value === 'Date' || selectedOptionType.value === '')) {
      if (!String(valueTextbox)) {
        this.setState({ textError: translate('properties-management.error.empty-option') });
      } else {
        await insertProp(addText);
        await getListProp();
        this.props.onClick(addComplete);
        this.setState({ modal: !this.state.modal, valueName: '' });
      }
    } else if (!selectedOptionType.value) {
      this.setState({ textError: translate('properties-management.error.empty-type') });
    } else {
      await insertProp(addText);
      await getListProp();
      this.props.onClick(addComplete);
      this.setState({
        modal: !this.state.modal,
        valueName: ''
      });
    }
  };

  addOption = () => {
    let { options, selectedOptionType } = this.state;
    let listOptions = {
      id: Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, '')
        .substr(0, 5),
      name: selectedOptionType.label,
      type: selectedOptionType.value
    };
    options.push(listOptions);
    this.setState({ options, textError: '' });
  };

  deleteField = id => {
    let { options } = this.state;
    const deleteItem = options.filter(item => item.id !== id);
    this.setState({ options: deleteItem });
  };

  render() {
    let { options, selectedOptionType } = this.state;
    const { loading } = this.props;
    return (
      <span className="d-inline-block mb-2 mr-2">
        <Button className="btn btn-primary float-right jh-create-entity" color="primary" onClick={this.toggle}>
          <FontAwesomeIcon icon="plus" /> <Translate contentKey="properties-management.button-field" />
        </Button>

        <Modal isOpen={this.state.modal} id="content-properties">
          <ModalHeader toggle={this.toggle} id="create-properties">
            <Translate contentKey="properties-management.add.properties" />
          </ModalHeader>
          <ModalBody>
            <AvForm>
              <Row>
                <Col md="12">
                  <div className="option-create">
                    <Label>
                      <Translate contentKey="properties-management.form.name" />
                    </Label>
                    <Input maxLength={160} name="name" label="Field Name" onChange={this.getValueName} required />
                    <p style={{ marginTop: '5px' }} className="error">
                      {this.state.validateName}
                    </p>
                  </div>
                  <div>
                    <Col md="5" className="option-create">
                      <Label>
                        <Translate contentKey="properties-management.form.type-create" />
                      </Label>
                      <Select
                        className="select-type"
                        placeholder="Chọn kiểu"
                        value={selectedOptionType.value ? selectedOptionType : ''}
                        onChange={this.handleChangeType}
                        options={optionType}
                      />
                    </Col>
                  </div>
                </Col>
              </Row>
              <div id="list-input">
                <PerfectScrollbar>
                  <p className="error-text">{this.state.textError}</p>
                  {selectedOptionType.value === 'Text Input' || selectedOptionType.value === 'Date' || selectedOptionType.value === '' ? (
                    ''
                  ) : (
                    <List
                      values={options}
                      onChange={({ oldIndex, newIndex }) => {
                        let tempArray = options[oldIndex];
                        options[oldIndex] = options[newIndex];
                        options[newIndex] = tempArray;
                        this.setState({ options });
                      }}
                      renderList={({ children, props, isDragged }) => (
                        <Table responsive striped style={{ cursor: isDragged ? 'grabbing' : undefined }}>
                          <tbody key={Math.random()} {...props}>
                            {children}
                          </tbody>
                        </Table>
                      )}
                      renderItem={({ value, props, isDragged }) => {
                        const row = (
                          <tr {...props} style={{ ...props.style, cursor: isDragged ? 'grabbing' : 'grab' }}>
                            <td>
                              <Input
                                maxLength={160}
                                name={value.name}
                                id={value.id}
                                defaultValue={$(`input#${value.id}`).val()}
                                placeholder={'Option'}
                              />
                            </td>
                            <td className="text-center" id="function">
                              <div className="btn-group flex-btn-group-container">
                                <i className="pe-7s-menu icon-gradient bg-ripe-malin" id="icon">
                                  {' '}
                                </i>
                                &nbsp;
                                <Button onClick={() => this.deleteField(value.id)} color="danger" size="sm">
                                  <FontAwesomeIcon icon="trash" />{' '}
                                  <span className="d-none d-md-inline">
                                    <Translate contentKey="entity.action.delete" />
                                  </span>
                                </Button>
                              </div>
                            </td>
                          </tr>
                        );
                        return isDragged ? <div className="input-drag">{row}</div> : row;
                      }}
                    />
                  )}
                </PerfectScrollbar>
              </div>
              <p className="error-text">{this.state.validateOption}</p>
              {selectedOptionType.value === 'Text Input' || selectedOptionType.value === 'Date' || selectedOptionType.value === '' ? (
                ''
              ) : (
                <Button onClick={this.addOption} className="btn btn-primary float-right jh-create-entity" id="button-add">
                  <FontAwesomeIcon icon="plus" /> <Translate contentKey="properties-management.button-add" />
                </Button>
              )}
            </AvForm>
          </ModalBody>
          <ModalFooter>
            <Button color="link" onClick={this.toggle}>
              <Translate contentKey="properties-management.cancel" />
            </Button>
            <Button
              disabled={loading}
              onClick={() => {
                let valueOption = options
                  .map(event => {
                    if ($(`input#${event.id}`).val() === '') {
                      return event.id;
                    }
                  })
                  .filter(function(obj) {
                    return obj;
                  });
                let removeDuplicate = String(Array.from(new Set(valueOption)));
                if (removeDuplicate.trim()) {
                  this.setState({
                    validateOption: ' * Vui lòng nhập giá trị vào Option'
                  });
                } else {
                  this.addField();
                  this.setState({
                    validateOption: ''
                  });
                }
              }}
              color="primary"
            >
              <Translate contentKey="properties-management.button-field" />
            </Button>{' '}
          </ModalFooter>
        </Modal>
      </span>
    );
  }
}
const mapStateToProps = (storeState: IRootState) => ({
  getList: storeState.propertiesState.list_prop,
  loading: storeState.propertiesState.loading,
  isComplete: storeState.propertiesState.isCompelete
});

const mapDispatchToProps = {
  getListProp,
  insertProp,
  openModal,
  closeModal
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Create);
