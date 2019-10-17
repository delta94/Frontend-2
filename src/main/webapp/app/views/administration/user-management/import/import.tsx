import React from 'react';
import './import.scss';
import { connect } from 'react-redux';
import { Link, RouteComponentProps, Router, Route } from 'react-router-dom';
import UserCategoryTag from 'app/views/administration/user-management/list/categories-tag/categories-tag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { importFileAction, uploadFileExcel, getFields } from 'app/actions/user-management';
import { USER_MANAGE_ACTION_TYPES } from 'app/constants/user-management';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, FormGroup, Label, Card, CardBody, CardTitle } from 'reactstrap';
import { Radio, Select, Row, Col, Collapse } from 'antd';
import { AvForm } from 'availity-reactstrap-validation';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Translate, translate } from 'react-jhipster';
import Ionicon from 'react-ionicons';
import { IRootState } from 'app/reducers';
import LoaderAnim from 'react-loaders';
import Loader from 'react-loader-advanced';
import { openModal, closeModal } from 'app/actions/modal';
import Dropzone from 'react-dropzone';

const { Option } = Select;

const { Panel } = Collapse;

export interface IImportProps extends StateProps, DispatchProps {}
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
    modal: false,
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

  toggle = () => {
    const imageFileDown = require('app/assets/utils/images/user-mangament/image-down-files.png');
    this.setState({
      modal: !this.state.modal,
      fileImport: '',
      current: 0,
      image: imageFileDown,
      file: ''
    });
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
          <CardTitle>
            <Translate contentKey="userManagement.home.createOrEditLabel" />
          </CardTitle>
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
                              <p>chọn file để import</p>
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
    tags.push(data);
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
            <CardTitle>
              <Translate contentKey="userManagement.home.createOrEditLabel" />
            </CardTitle>
            <div className="container">
              <Row className="justify-content-center">
                <Col span={24}>
                  <p>Chọn trường bạn muốn đồng bộ hóa</p>
                  <Collapse defaultActiveKey={['1']} accordion>
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
                                    defaultValue="Do not import this fields"
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
                                              {value.code}
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
          <CardTitle style={{ marginLeft: '2%' }}>Thêm thẻ (tùy chọn)</CardTitle>
          <p style={{ marginLeft: '3%' }}>
            Thẻ cho phép bạn xác định danh bạ của bạn. Bạn có thể thêm một thẻ cho cách bạn thông tin, cho dù họ là khách hàng, v.v.
          </p>
          <CardBody>
            <UserCategoryTag handleChange={this.handleChangeCategories} />
          </CardBody>
        </Card>
        <Card>
          <CardTitle style={{ marginLeft: '2%' }}>Tùy chọn import</CardTitle>
          <CardBody style={{ marginLeft: '3%' }}>
            <Radio.Group onChange={this.onChangeRadio} value={this.state.typeImport}>
              <Radio value="SKIP">Bỏ qua nếu trùng</Radio>
              <Radio value="OVERIDE">Ghi đè nếu trùng</Radio>
              <Radio value="DUPLICATE">Nhân đôi nếu trùng</Radio>
              <Radio value="MERGE">Gộp nếu trùng</Radio>
            </Radio.Group>
          </CardBody>
        </Card>
      </div>
    );
    return data;
  };

  stepTable = () => {
    let data = [
      {
        title: 'First',
        content: this.contentUploadFile()
      },
      {
        title: 'Second',
        content: this.selectFields()
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
    const { loading } = this.props;
    let { current, fileImport } = this.state;
    const imageFileDown = require('app/assets/utils/images/user-mangament/image-down-files.png');
    return (
      <Container fluid>
        <span className="d-inline-block mb-2 mr-2">
          <Button className="btn float-right jh-create-entity" outline color="primary" onClick={this.toggle}>
            <Ionicon color="#343A40" icon="md-arrow-down" /> &nbsp; <Translate contentKey="userManagement.home.import" />
          </Button>

          <Modal isOpen={this.state.modal} id="modal-import">
            <PerfectScrollbar>
              <ModalHeader toggle={this.toggle} id="create-properties">
                <Translate contentKey="userManagement.infomation.merge.title" />
              </ModalHeader>
              <ModalBody>
                <AvForm>
                  <div className="steps-content">{this.stepTable()[current].content}</div>
                </AvForm>
              </ModalBody>
              <ModalFooter>
                <div className="steps-action">
                  {current > 0 && (
                    <Button id="btn-prev" color="linkaaaaa" onClick={() => this.prev()}>
                      Previous
                    </Button>
                  )}
                  <Button color="link" onClick={this.toggle}>
                    <Translate contentKey="properties-management.cancel" />
                  </Button>

                  {current < this.stepTable().length - 1 && (
                    <Button
                      disabled={fileImport ? false : true}
                      color="primary"
                      onClick={() => {
                        this.next();
                      }}
                    >
                      Tiếp tục
                    </Button>
                  )}
                  {current === this.stepTable().length - 1 && (
                    <Button
                      color="primary"
                      onClick={async () => {
                        let { listFileHeader, importFileAction } = this.props;
                        let { fileImport, headerFields, tags } = this.state;
                        let data = {
                          fileName: listFileHeader.fileName,
                          typeImport: fileImport,
                          headerFields: this.removeDuplicatesFields(headerFields, 'columnIndex'),
                          tags: this.removeDuplicates(tags, 'id')
                        };
                        await importFileAction(data);
                        this.toggle();
                        window.location.assign('/#/app/views/customers/user-management/results-files');
                      }}
                    >
                      Import File
                    </Button>
                  )}
                </div>
              </ModalFooter>
            </PerfectScrollbar>
          </Modal>
        </span>
      </Container>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  loading: storeState.userManagement.loading,
  listFileHeader: storeState.userManagement.headerFile,
  listFields: storeState.userManagement.listFields
});

const mapDispatchToProps = { importFileAction, uploadFileExcel, getFields };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Import);
