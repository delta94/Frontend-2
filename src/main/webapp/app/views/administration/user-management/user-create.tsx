import React from 'react';
import './styles/user-management.scss';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import SweetAlert from 'sweetalert-react';
import { Button, Label, Row, Col, Modal, Container, Card, CardBody, CardTitle } from 'reactstrap';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FileDownload from 'js-file-download';

import { downloadFileExcel, uploadFileExcel } from 'app/actions/user-management';
import { IRootState } from 'app/reducers';
import { USER_MANAGE_ACTION_TYPES } from 'app/constants/user-management';
import { toast } from 'react-toastify';

import Dropzone from 'react-dropzone';

export interface IUserManagementUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ login: string }> {}
//todo : sửa tên biến local
export interface IUserManagementUpdateState {
  isNew: boolean;
  isActive: boolean;
  isComplete: boolean;
  isError: boolean;
  urlImage: string;
  file: string;
  fileImport: string;
  image: string;
}

export class UserCreate extends React.Component<IUserManagementUpdateProps, IUserManagementUpdateState> {
  state: IUserManagementUpdateState = {
    isNew: !this.props.match.params || !this.props.match.params.login,
    isActive: false,
    isComplete: false,
    isError: false,
    urlImage: '',
    file: 'Try dropping some files here, or click to select files to upload.',
    fileImport: '',
    image: ''
  };
  onDrop = (acceptedFiles, rejectedFiles) => {
    debugger;
    var checkFile = acceptedFiles[0].name;
    var file = checkFile.split('.')[1];
    //todo: khong duoc hard code
    if (file === USER_MANAGE_ACTION_TYPES.XLS || file === USER_MANAGE_ACTION_TYPES.XLSX) {
      console.log(this.props.fileList);
      this.setState({
        fileImport: acceptedFiles[0],
        isActive: true,
        isComplete: true,
        file: checkFile,
        image: 'https://abeon-hosting.com/images/complete-png-4.png'
      });
    } else {
      this.setState({
        //todo : dua vao the translate
        isActive: false,
        isError: true,
        file: 'please choose file excel',
        image: 'https://www.freeiconspng.com/uploads/error-icon-15.png'
      });
    }
  };

  onClick = async () => {
    await this.props.uploadFileExcel(this.state.fileImport);
  };

  validated = () => {
    //todo return isActive
    if (this.state.isActive) {
      return this.state.isActive;
    } else {
      return this.state.isActive;
    }
  };

  render() {
    const { downloadFileExcel, loading, downloadTemplate } = this.props;
    console.log(this.props.fileList);
    return (
      <Container fluid>
        <Card className="main-card mb-3">
          <CardBody>
            <CardTitle>
              <Translate contentKey="userManagement.home.createOrEditLabel" />
            </CardTitle>

            <Row className="justify-content-left">
              <Col md="6">
                <div className="multi-row">
                  <legend>
                    <Translate contentKey="entity.action.reinstall" />
                    <a className="myButton" href="http://171.244.40.91:8088/v1/customer/template-import">
                      {/* them cac translate vao cac hard code*/}
                      <Translate contentKey="entity.action.at-this" />
                    </a>
                  </legend>
                </div>
              </Col>
              <Col md="6">
                <Button tag={Link} to="/admin/user-management" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back" />
                  </span>
                </Button>
              </Col>
            </Row>

            <div className="container">
              <Row className="justify-content-center">
                <Col md="12">
                  <label className="label-table">
                    <Translate contentKey="global.field.choose-file" />

                    <div className="dropzone-wrapper dropzone-wrapper-lg">
                      <Dropzone onDrop={this.onDrop.bind(this)}>
                        {({ getRootProps, getInputProps }) => (
                          <div {...getRootProps()}>
                            <input {...getInputProps()} />

                            <div className="dropzone-content">
                              <SweetAlert
                                title=""
                                confirmButtonColor=""
                                show={this.state.isComplete}
                                type="success"
                                onConfirm={() => this.setState({ isComplete: false })}
                              />
                              <SweetAlert
                                title="Please Chosse File Again"
                                confirmButtonColor=""
                                show={this.state.isError}
                                text=""
                                type="error"
                                onConfirm={() => this.setState({ isError: false })}
                              />
                              <Col md="12">
                                {' '}
                                <img className="img" src={this.state.image} />
                              </Col>
                              {this.state.file}
                            </div>
                          </div>
                        )}
                      </Dropzone>
                    </div>
                  </label>
                </Col>

                <div>
                  {/* sua lai phan chuyen trang */}
                  <Button
                    tag={Link}
                    to="/admin/user-management/results-files"
                    replace
                    color="info"
                    onClick={this.onClick}
                    disabled={!this.validated()}
                  >
                    &nbsp;
                    <span className="d-none d-md-inline">
                      <Translate contentKey="entity.action.upload" />
                    </span>
                  </Button>
                </div>
                <div className="ModalLoading">
                  <Modal isOpen={loading} id="create time title" className="ModalLoading" autoFocus={false}>
                    <div>
                      <img src="http://interview-test.topica.vn/content/images/loading.svg" alt="" />
                    </div>
                  </Modal>
                </div>
              </Row>
            </div>
          </CardBody>
        </Card>
      </Container>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  downloadTemplate: storeState.userManagement.dowloadTemplate,
  user: storeState.userManagement.user,
  roles: storeState.userManagement.authorities,
  loading: storeState.userManagement.loading,
  updating: storeState.userManagement.updating,
  fileList: storeState.userManagement.listFiles
});

const mapDispatchToProps = { downloadFileExcel, uploadFileExcel };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserCreate);
