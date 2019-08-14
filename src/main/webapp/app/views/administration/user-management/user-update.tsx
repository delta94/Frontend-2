import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Row, Col } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { locales, languages } from 'app/config/translation';
import { getUser, getRoles, updateUser, createUser, reset } from 'app/actions/user-management';
import { IRootState } from 'app/reducers';

export interface IUserManagementUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: any }> {}

export interface IUserManagementUpdateState {
  isNew: boolean;
}

export class UserManagementUpdate extends React.Component<IUserManagementUpdateProps, IUserManagementUpdateState> {
  state: IUserManagementUpdateState = {
    isNew: !this.props.match.params || !this.props.match.params.id
  };

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getUser(this.props.match.params.id);
    }
    this.props.getRoles();
    console.log(this.props.match.params.id);
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

  render() {
    const isInvalid = false;
    const { user, loading, updating, roles } = this.props;
    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h1>
              <Translate contentKey="userManagement.home.editLabel">Edit Infomation</Translate>
            </h1>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm onValidSubmit={this.saveUser}>
                <AvGroup>
                  <Label for="fullName">
                    <Translate contentKey="userManagement.fullName">Họ tên</Translate>
                  </Label>
                  <AvField
                    type="text"
                    className="form-control"
                    name="fullName"
                    validate={{
                      required: {
                        value: true,
                        errorMessage: translate('register.messages.validate.login.required')
                      },
                      pattern: {
                        value: '^[_.@A-Za-z0-9-]*$',
                        errorMessage: translate('register.messages.validate.login.pattern')
                      },
                      minLength: {
                        value: 1,
                        errorMessage: translate('register.messages.validate.login.minlength')
                      },
                      maxLength: {
                        value: 50,
                        errorMessage: translate('register.messages.validate.login.maxlength')
                      }
                    }}
                    value={user.fullName}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="phone">
                    <Translate contentKey="userManagement.phone">Phone</Translate>
                  </Label>
                  <AvField
                    type="text"
                    className="form-control"
                    name="phone"
                    validate={{
                      maxLength: {
                        value: 11,
                        errorMessage: translate('entity.validation.maxlength', { max: 11 })
                      }
                    }}
                    value={user.phone}
                  />
                </AvGroup>
                <AvGroup>
                  <AvField
                    name="email"
                    label={translate('global.form.email.label')}
                    placeholder={translate('global.form.email.placeholder')}
                    type="email"
                    validate={{
                      required: {
                        value: true,
                        errorMessage: translate('global.messages.validate.email.required')
                      },
                      email: {
                        errorMessage: translate('global.messages.validate.email.invalid')
                      },
                      minLength: {
                        value: 5,
                        errorMessage: translate('global.messages.validate.email.minlength')
                      },
                      maxLength: {
                        value: 254,
                        errorMessage: translate('global.messages.validate.email.maxlength')
                      }
                    }}
                    value={user.email}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="profiles">
                    <Translate contentKey="userManagement.profiles">Profiles</Translate>
                  </Label>
                  <AvField name="profiles" type="profiles" value={user.profiles} />
                </AvGroup>
                {/* <AvGroup check> */}
                {/* <AvGroup>
                  <Label>
                    <AvInput type="checkbox" name="profiles" value={user.profiles} />{' '}
                    <Translate contentKey="userManagement.profiles">Profiles</Translate>
                  </Label>
                </AvGroup> */}
                {/* <AvGroup>
                  <Label for="profiles">
                    <Translate contentKey="userManagement.langKey">Language Key</Translate>
                  </Label>
                  <AvField type="select" className="form-control" name="langKey" value={user.langKey}>
                    {locales.map(locale => (
                      <option value={locale} key={locale}>
                        {languages[locale].name}
                      </option>
                    ))}
                  </AvField>
                </AvGroup> */}
                {/* <AvGroup>
                  <Label for="authorities">
                    <Translate contentKey="userManagement.profiles">Language Key</Translate>
                  </Label>
                  <AvInput type="select" className="form-control" name="authorities" value={user.authorities} multiple>
                    {roles.map(role => (
                      <option value={role} key={role}>
                        {role}
                      </option>
                    ))}
                  </AvInput>
                </AvGroup> */}
                <Button tag={Link} to="/admin/user-management" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" type="submit" disabled={isInvalid || updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
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
