import React from 'react';
import './user-management.scss';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getUser, getRoles, updateUser, createUser, reset } from 'app/actions/user-management';
import { IRootState } from 'app/reducers';
import Dropzone from 'react-dropzone';

export interface IUserManagementUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ login: string }> {}

export interface IUserManagementUpdateState {
  isNew: boolean;
  file: string;
  isActive: boolean;
}

export class UserCreate extends React.Component<IUserManagementUpdateProps, IUserManagementUpdateState> {
  state: IUserManagementUpdateState = {
    isNew: !this.props.match.params || !this.props.match.params.login,
    file: '',
    isActive: false
  };

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getUser(this.props.match.params.login);
    }
    this.props.getRoles();
  }

  componentWillUnmount() {
    this.props.reset();
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    debugger;
    var checkFile = acceptedFiles[0].name;
    var file = checkFile.split('.')[1];
    if (file === 'xls' || file === 'xlsx') {
      this.setState({
        file: checkFile,
        isActive: true
      });
    } else {
      this.setState({
        file: 'xin vui lòng chọn đúng file xls hoặc xlsx',
        isActive: false
      });
    }
  };

  handleClose = () => {
    this.props.history.push('/admin/user-management');
  };

  validated = () => {
    if (this.state.isActive) {
      return true;
    } else {
      return false;
    }
  };

  onClick = e => {
    return String(e);
  };
  render() {
    return (
      <div>
        <Row>
          <Col md="8">
            <h1>
              <Translate contentKey="userManagement.home.createOrEditLabel">Choose file from computer</Translate>
            </h1>
          </Col>
        </Row>
        <Row className="justify-content-left">
          <Col md="6">
            <div className="multi-row">
              <Label>
                <h5 className="d-none d-md-inline">tải file mẫu :</h5>
              </Label>
              <a href="#/top">File_mau_du_lieu_khach_hang.xlsx</a>
            </div>
          </Col>
          <Col md="6">
            <Button tag={Link} to="/admin/user-management" replace color="info">
              <FontAwesomeIcon icon="arrow-left" />
              &nbsp;
              <span className="d-none d-md-inline">
                <Translate contentKey="entity.action.back">Back</Translate>
              </span>
            </Button>
          </Col>
        </Row>

        <div className="container">
          <Row className="justify-content-center">
            <Col md="12">
              <label className="label-table">
                <h3>
                  <Translate contentKey="global.field.choose-file">Choose from computer</Translate>
                </h3>
                <div className="dropzone-wrapper dropzone-wrapper-lg">
                  <Dropzone onDrop={this.onDrop.bind(this)}>
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <div className="dropzone-content">
                          <p>Try dropping some files here, or click to select files to upload.</p>
                          <p>File must be excel</p>
                        </div>
                      </div>
                    )}
                  </Dropzone>
                </div>
              </label>
              {this.state.file}
            </Col>
            <div>
              <Button tag={Link} to="/admin/user-management/results-files" replace color="info" disabled={!this.validated()}>
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.upload">Upload</Translate>
                </span>
              </Button>
            </div>
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
  updating: storeState.userManagement.updating
});

const mapDispatchToProps = { getUser, getRoles, updateUser, createUser, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserCreate);
