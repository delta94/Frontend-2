import React from 'react';
import './styles/user-management.scss';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import SweetAlert from 'sweetalert-react';
import { Button, Label, Row, Col, Modal, ModalBody } from 'reactstrap';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
}

export class UserCreate extends React.Component<IUserManagementUpdateProps, IUserManagementUpdateState> {
  state: IUserManagementUpdateState = {
    isNew: !this.props.match.params || !this.props.match.params.login,
    isActive: false,
    isComplete: false,
    isError: false,
    urlImage: '',
    file: 'Try dropping some files here, or click to select files to upload.',
    fileImport: ''
  };

  onDrop = (acceptedFiles, rejectedFiles) => {
    debugger;
    var checkFile = acceptedFiles[0].name;
    var file = checkFile.split('.')[1];
    //todo: khong duoc hard code
    if (file === USER_MANAGE_ACTION_TYPES.XLS || file === USER_MANAGE_ACTION_TYPES.XLSX) {
      this.props.uploadFileExcel(acceptedFiles[0]);
      console.log(this.props.fileList);

      this.setState({
        fileImport: acceptedFiles[0],
        isActive: true,
        isComplete: true,
        file: checkFile
      });
    } else {
      this.setState({
        //todo : dua vao the translate
        isActive: false,
        isError: true,
        file: 'please choose file excel'
      });
    }
  };
  onClick = () => {
    console.log(this.state);
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
    const { downloadFileExcel, loading } = this.props;
    return (
      <div>
        <Row>
          <Col md="8">
            <h5 className="d-none d-md-inline">
              <Translate contentKey="userManagement.home.createOrEditLabel" />
            </h5>
          </Col>
        </Row>
        <Row className="justify-content-left">
          <Col md="6">
            <div className="multi-row">
              <Label>
                <Translate contentKey="entity.action.reinstall" />
              </Label>

              <button className="myButton" onClick={() => downloadFileExcel()}>
                {/* them cac translate vao cac hard code*/}
                <Translate contentKey="entity.action.at-this" />
              </button>
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
                            title="Good job!"
                            confirmButtonColor=""
                            show={this.state.isComplete}
                            text="You clicked the button!"
                            type="success"
                            onConfirm={() => this.setState({ isComplete: false })}
                          />
                          <SweetAlert
                            title="Please Chosse File Again"
                            confirmButtonColor=""
                            show={this.state.isError}
                            text="You clicked the button!"
                            type="error"
                            onConfirm={() => this.setState({ isError: false })}
                          />
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
            <Modal isOpen={loading}>
              <ModalBody>processing...</ModalBody>
            </Modal>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
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
