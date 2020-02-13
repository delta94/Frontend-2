import React from 'react';
import './import.scss';
import Create from 'app/views/customer/properties-customer/create/create';
import { openModal, closeModal } from 'app/actions/modal';
import { connect } from 'react-redux';
import { Link, RouteComponentProps, Router, Route } from 'react-router-dom';
import UserCategoryTag from 'app/views/customer/user-management/list/categories-tag/categories-tag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { importFileAction, uploadFileExcel, getFields } from 'app/actions/user-management';
import { USER_MANAGE_ACTION_TYPES } from 'app/constants/user-management';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, FormGroup, Label, Card, CardBody, CardTitle } from 'reactstrap';
import { Radio, Select, Row, Col, Collapse, Popover } from 'antd';
import { AvForm } from 'availity-reactstrap-validation';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Translate, translate } from 'react-jhipster';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { IRootState } from 'app/reducers';
import LoaderAnim from 'react-loaders';
import Loader from 'react-loader-advanced';
import Dropzone from 'react-dropzone';
import UserDetail from './detail/detail';
import SweetAlert from 'sweetalert-react';

const { Option } = Select;
const { Panel } = Collapse;

export interface IImportProps extends StateProps, DispatchProps {
  open_import?: boolean;
  toggleImport: Function;
}
export interface IImportState {
  isActive: boolean;
  isComplete: boolean;
  isError: boolean;
  urlImage: string;
  file: string;
  fileImport: string;
  image: string;
  modal: boolean;
  check: boolean;
  current: number;
  headerFields: any[];
  tags: any[];
  typeImport: string;
}

export class Import extends React.Component<IImportProps, IImportState, Route> {
  state: IImportState = {
    isActive: false,
    isComplete: false,
    isError: false,
    urlImage: '',
    file: USER_MANAGE_ACTION_TYPES.MESSAGE_DROP_DEFAUL,
    fileImport: '',
    image: '',
    modal: this.props.isOpenModal,
    check: false,
    current: 0,
    headerFields: [],
    tags: [],
    typeImport: ''
  };
  onDrop = (acceptedFiles, rejectedFiles) => {
    var checkFile = acceptedFiles[0].name;
    var file = checkFile.split('.')[1];
    if (file === USER_MANAGE_ACTION_TYPES.XLS || file === USER_MANAGE_ACTION_TYPES.XLSX) {
      this.setState({
        ...this.state,
        fileImport: acceptedFiles[0],
        isActive: true,
        isComplete: true,
        file: checkFile,
        image: USER_MANAGE_ACTION_TYPES.IMG_COMPLETE
      });
    } else {
      this.setState({
        ...this.state,
        isActive: false,
        isError: true,
        file: '',
        image: USER_MANAGE_ACTION_TYPES.IMG_ERROR
      });
    }
  };

  //pop-up success if add complete
  openModalCreate = async e => {
    if (this.props.isComplete) {
      await this.props.getFields();
      this.props.openModal({
        show: true,
        type: 'success',
        title: translate('modal-data.title.success'),
        text: translate('alert.success-properties')
      });
    }
  };

  toggle = () => {
    const imageFileDown = require('app/assets/utils/images/user-mangament/image-down-files.png');
    this.setState({
      modal: !this.state.modal,
      fileImport: '',
      current: 0,
      image: imageFileDown,
      file: ''
    });

    this.props.toggleImport();
  };

  validated = () => {
    if (this.state.isActive) {
      return this.state.isActive;
    } else {
      return this.state.isActive;
    }
  };

  contentUploadFile = () => {
    let { image, file } = this.state;
    const imageFileDown = require('app/assets/utils/images/user-mangament/image-down-files.png');
    let data = (
      <Card className="main-card mb-3">
        <CardBody>
          <div className="container">
            <Row className="justify-content-center">
              <Col span={24}>
                <label className="label-table">
                  <Translate contentKey="global.field.choose-file" />
                  <div className="dropzone-wrapper dropzone-wrapper-lg">
                    <Dropzone onDrop={this.onDrop.bind(this)}>
                      {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          <div className="dropzone-content">
                            <Col span={24}>
                              {' '}
                              <p>
                                <Translate contentKey="userManagement.home.chose-file-to-import" />
                              </p>
                              {image ? <img className="img" src={image} /> : <img style={{ width: '255px' }} src={imageFileDown} />}
                            </Col>
                            {file}
                          </div>
                        </div>
                      )}
                    </Dropzone>
                  </div>
                </label>
              </Col>
            </Row>
          </div>
        </CardBody>
      </Card>
    );
    return data;
  };

  removeDuplicates = (array, key) => {
    return array.reduce((accumulator, element, currentIndex, arr) => {
      if (!accumulator.find(el => el[key] == element[key]) && arr.map(c => c.id).lastIndexOf(element.id) == currentIndex) {
        accumulator.push(element);
      }
      return accumulator;
    }, []);
  };

  removeDuplicatesFields = (array, key) => {
    return array.reduce((accumulator, element, currentIndex, arr) => {
      if (
        !accumulator.find(el => el[key] == element[key]) &&
        arr.map(c => c.columnIndex).lastIndexOf(element.columnIndex) == currentIndex
      ) {
        accumulator.push(element);
      }
      return accumulator;
    }, []);
  };

  handleChangeSelect = (value, columnIndex, columnName) => {
    let { headerFields } = this.state;
    let data = {
      fieldId: String(value).split(',')[0],
      columnName,
      columnIndex,
      fieldCode: String(value).split(',')[1],
      fieldType: String(value).split(',')[2],
      fieldValue: String(value).split(',')[3],
      fieldTitle: String(value).split(',')[4]
    };
    headerFields.push(data);
    this.setState({ headerFields });
  };

  handleChangeCategories = value => {
    let { tags } = this.state;
    let data = value.map(event => {
      return {
        id: event.id,
        name: event.name,
        description: event.description
      };
    });
    tags.push(Object(data));
    this.setState({ tags });
  };

  onChangeRadio = e => {
    this.setState({
      typeImport: e.target.value
    });
  };

  selectFields = () => {
    const { listFileHeader, listFields } = this.props;

    let data = (
      <div>
        <Card className="main-card mb-3">
          <CardBody>
            <div className="container">
              <Row className="justify-content-center">
                <Col span={24}>
                  <label>
                    {' '}
                    <Translate contentKey="userManagement.home.chose-field-to-map" />
                  </label>
                  <label style={{ float: 'right', marginTop: '-13px' }}>
                    {' '}
                    <Create onClick={this.openModalCreate} />
                  </label>
                  <Collapse defaultActiveKey={['1']} destroyInactivePanel={true}>
                    <Panel header="Cột để import" key="1" showArrow={false} extra={'Map vào trường'}>
                      {listFileHeader.fileName !== undefined
                        ? listFileHeader.headerFields.map((event, index) => {
                            return (
                              <Row key={index} style={{ margin: '0px 0px 10px', borderBottom: '1px solid #E5ECF4' }}>
                                <Col span={12} style={{ marginTop: '1%' }}>
                                  <Label>{event.columnName}</Label>
                                </Col>
                                <Col span={12} style={{ textAlign: 'right', marginBottom: '10px' }}>
                                  <Select
                                    defaultValue="Không import trường này"
                                    style={{ width: 200 }}
                                    onChange={e => this.handleChangeSelect(e, event.columnIndex, event.columnName)}
                                  >
                                    {listFields
                                      ? listFields.map((value, index) => {
                                          return (
                                            <Option
                                              key={index}
                                              value={
                                                value.id + ',' + value.code + ',' + value.type + ',' + value.fieldValue + ',' + value.title
                                              }
                                            >
                                              {value.title}
                                            </Option>
                                          );
                                        })
                                      : ''}
                                  </Select>
                                </Col>
                              </Row>
                            );
                          })
                        : ''}
                    </Panel>
                  </Collapse>
                </Col>
              </Row>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardTitle style={{ marginLeft: '7%' }}>
            <Translate contentKey="userManagement.home.add-tag" />
          </CardTitle>
          <p style={{ marginLeft: '7%' }}>
            <Translate contentKey="userManagement.home.tag-info" />
          </p>
          <CardBody style={{ marginLeft: '7%' }} id="card-body-tag">
            <UserCategoryTag handleChange={this.handleChangeCategories} />
          </CardBody>
        </Card>
        <Card>
          <CardTitle style={{ marginLeft: '7%' }}>
            <Translate contentKey="userManagement.home.option-import" />
          </CardTitle>
          <CardBody style={{ textAlign: 'center' }}>
            <Radio.Group onChange={this.onChangeRadio} value={this.state.typeImport}>
              <Radio value="SKIP">
                <Translate contentKey="userManagement.home.skip-import" />
              </Radio>
              <Radio value="OVERRIDE">
                <Translate contentKey="userManagement.home.overide-import" />
              </Radio>
              <Radio value="DUPLICATE">
                <Translate contentKey="userManagement.home.duplicate-import" />
              </Radio>
              <Radio value="MERGE">
                <Translate contentKey="userManagement.home.merge-import" />
              </Radio>
            </Radio.Group>
          </CardBody>
        </Card>
      </div>
    );
    return data;
  };

  //filter step
  stepTable = () => {
    let data = [
      {
        title: translate('userManagement.home.chose-file'),
        content: this.contentUploadFile()
      },
      {
        title: translate('userManagement.home.mapping'),
        content: this.selectFields()
      },
      {
        title: translate('userManagement.home.result'),
        content: <UserDetail />
      }
    ];
    return data;
  };

  next = async () => {
    const { uploadFileExcel, getFields } = this.props;
    const current = this.state.current + 1;
    if (current === 1) {
      await uploadFileExcel(this.state.fileImport);
      await getFields();
    }
    if (current === 2) {
      let { listFileHeader, importFileAction } = this.props;
      let { headerFields, tags, typeImport } = this.state;
      let data = {
        fileName: listFileHeader.fileName,
        typeImport: typeImport,
        headerFields: this.removeDuplicatesFields(headerFields, 'columnIndex'),
        tags: this.removeDuplicates(tags, 'id')[0]
      };
      await importFileAction(data);
    }

    this.setState({ current });
  };

  prev() {
    const current = this.state.current - 1;
    this.setState({ current, check: false });
    if (current === 1) {
      this.setState({ check: true });
    }
  }

  render() {
    const { loading, modalState } = this.props;
    let { current, fileImport } = this.state;
    const imageFileDown = require('app/assets/utils/images/user-mangament/image-down-files.png');
    return (
      <Container fluid>
        <SweetAlert
          title={modalState.title ? modalState.title : 'No title'}
          confirmButtonColor=""
          show={modalState.show ? modalState.show : false}
          text={modalState.text ? modalState.text : 'No'}
          type={modalState.type ? modalState.type : 'error'}
          onConfirm={() => this.props.closeModal()}
        />
        <Card id="card-header">
          {' '}
          <Translate contentKey="userManagement.home.createOrEditLabel" />
        </Card>
        <Card>
          <PerfectScrollbar>
            <Stepper activeStep={current} alternativeLabel className="icon-step">
              {this.stepTable().map(label => (
                <Step key={label.title}>
                  <StepLabel>{label.title}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <AvForm>
              <div className="steps-content">{this.stepTable()[current].content}</div>
            </AvForm>
            <hr />
            <div className="steps-action">
              {current < this.stepTable().length - 1 && (
                <Button
                  onClick={() => {
                    window.location.assign('/#/app/views/customers/user-management');
                  }}
                  color="link"
                >
                  <Translate contentKey="properties-management.cancel" />
                </Button>
              )}
              {current > 0 && current < this.stepTable().length - 1 && (
                <Button id="btn-prev" style={{ float: 'left' }} color="linkaaaaa" onClick={() => this.prev()}>
                  <Translate contentKey="userManagement.home.come-back" />
                </Button>
              )}

              {current < this.stepTable().length - 1 && (
                <Button
                  disabled={fileImport ? false : true}
                  color="primary"
                  onClick={() => {
                    this.next();
                  }}
                >
                  <Translate contentKey="userManagement.home.continue" />
                </Button>
              )}
              {current === this.stepTable().length - 1 && (
                <Button
                  outline
                  color="primary"
                  onClick={() => {
                    window.location.assign('/#/app/views/customers/user-management');
                  }}
                >
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back" />
                  </span>
                </Button>
              )}
            </div>
          </PerfectScrollbar>
        </Card>
      </Container>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  loading: storeState.userManagement.loading,
  listFileHeader: storeState.userManagement.headerFile,
  listFields: storeState.userManagement.listFields,
  isOpenModal: storeState.userManagement.isOpenModalImport,
  isComplete: storeState.propertiesState.isCompelete,
  modalState: storeState.handleModal.data
});

const mapDispatchToProps = { importFileAction, uploadFileExcel, getFields, closeModal, openModal };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Import);
