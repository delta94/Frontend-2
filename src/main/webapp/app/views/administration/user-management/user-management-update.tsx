import React from 'react';
import './user-management.scss';
import FormDropZone from './form-dropzone';
import ButtonUpload from './button-upload-file';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Row, Col } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { locales, languages } from 'app/config/translation';
import { getUser, getRoles, updateUser, createUser, reset } from 'app/actions/user-management';
import { IRootState } from 'app/reducers';

export interface IUserManagementUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ login: string }> {}

export interface IUserManagementUpdateState {
  isNew: boolean;
}

export class UserManagementUpdate extends React.Component<IUserManagementUpdateProps, IUserManagementUpdateState> {
  state: IUserManagementUpdateState = {
    isNew: !this.props.match.params || !this.props.match.params.login
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

  saveUser = (event, values) => {
    if (this.state.isNew) {
      this.props.createUser(values);
    } else {
      this.props.updateUser(values);
    }
    this.handleClose();
  };

  handleClose = () => {
    this.props.history.push('/admin/user-management');
  };

  onClick = e => {
    console.log(e);
  };
  render() {
    const isInvalid = false;
    const { user, loading, updating, roles } = this.props;
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
            <ButtonUpload onClick={this.onClick} />
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
              <Label>
                <h3>
                  <Translate contentKey="global.field.choose-file">Choose from computer</Translate>
                </h3>
                <FormDropZone />
              </Label>
            </Col>
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
)(UserManagementUpdate);
