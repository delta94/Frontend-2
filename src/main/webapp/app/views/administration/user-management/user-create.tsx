import React from 'react';
import './styles/user-management.scss';
import { connect } from 'react-redux';
import { Link, RouteComponentProps, Router, Route } from 'react-router-dom';
import SweetAlert from 'sweetalert-react';
import { Button, Label, Row, Col, Modal, Container, Card, CardBody, CardTitle } from 'reactstrap';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FileDownload from 'js-file-download';
import Loader from 'react-loader-advanced';
import { Loader as LoaderAnim } from 'react-loaders';

import { downloadFileExcel, uploadFileExcel } from 'app/actions/user-management';
import { IRootState } from 'app/reducers';
import { USER_MANAGE_ACTION_TYPES } from 'app/constants/user-management';
import { toast } from 'react-toastify';

import Dropzone from 'react-dropzone';

export interface IUserCreateProps extends StateProps, DispatchProps, RouteComponentProps<{ login: string }> {}
//todo : sửa tên biến local
export interface IUserCreateState {
  isNew: boolean;
  isActive: boolean;
  isComplete: boolean;
  isError: boolean;
  urlImage: string;
  file: string;
  fileImport: string;
  image: string;
}

export class UserCreate extends React.Component<IUserCreateProps, IUserCreateState, Route> {
  state: IUserCreateState = {
    isNew: !this.props.match.params || !this.props.match.params.login,
    isActive: false,
    isComplete: false,
    isError: false,
    urlImage: '',
    file: USER_MANAGE_ACTION_TYPES.MESSAGE_DROP_DEFAUL,
    fileImport: '',
    image: ''
  };
  onDrop = (acceptedFiles, rejectedFiles) => {
    var checkFile = acceptedFiles[0].name;
    var file = checkFile.split('.')[1];
    //todo: khong duoc hard code
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
        //todo : dua vao the translate
        isActive: false,
        isError: true,
        file: '',
        image: USER_MANAGE_ACTION_TYPES.IMG_ERROR
      });
    }
  };

  onClick = async () => {
    await this.props.uploadFileExcel(this.state.fileImport);
    this.props.history.push('/admin/user-management/results-files');
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
    const spinner1 = <LoaderAnim color="#ffffff" type="ball-pulse" />;
    return (
      <Container fluid>
        <Loader message={spinner1} show={loading} priority={1}>
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
                      <a className="myButton" href={USER_MANAGE_ACTION_TYPES.URL_TEMPLATE}>
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
                                  onConfirm={() =>
                                    this.setState({
                                      ...this.state,
                                      isComplete: false
                                    })
                                  }
                                />
                                <SweetAlert
                                  title=""
                                  confirmButtonColor=""
                                  show={this.state.isError}
                                  text=""
                                  type="error"
                                  onConfirm={() =>
                                    this.setState({
                                      ...this.state,
                                      isError: false
                                    })
                                  }
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
                      // to="/admin/user-management/results-files"
                      replace
                      color="info"
                      onClick={this.onClick}
                      // tag={Link}
                      disabled={!this.validated()}
                    >
                      &nbsp;
                      <span className="d-none d-md-inline">
                        <Translate contentKey="entity.action.upload" />
                      </span>
                    </Button>
                  </div>
                  <div className="ModalLoading" />
                </Row>
              </div>
            </CardBody>
          </Card>
        </Loader>
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
