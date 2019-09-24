import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Row, Col } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SweetAlert from 'sweetalert-react';

import {
  getUser,
  getRoles,
  updateUser,
  createUser,
  reset,
  getUserCategories,
  updateCategory,
  resetMessage
} from 'app/actions/user-management';

import { IRootState } from 'app/reducers';
import UserCategoryTag from './user-categories-tags';

export interface IUserUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: any }> {}

export interface IUserUpdateState {
  isNew: boolean;
  Category: any[];
  isUpdate: boolean;
}

export class UserUpdate extends React.Component<IUserUpdateProps, IUserUpdateState> {
  state: IUserUpdateState = {
    isNew: !this.props.match.params || !this.props.match.params.id,
    Category: [],
    isUpdate: false
  };

  // todo : hiện Modal , không chuyển trang
  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getUser(this.props.match.params.id);
    }
    this.props.getRoles();
  }

  componentWillUnmount() {
    this.props.reset();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.categorys) {
      this.setState({
        ...this.state,
        Category: nextProps.user.categorys
      });
    }

    if (nextProps.usuccess !== this.props.usuccess) {
      this.setState({
        ...this.state,
        isUpdate: nextProps.usuccess
      });
    }
  }

  saveUser = (event, values) => {
    const { user } = this.props;
    let data = {
      id: user.id,
      name: values.name,
      phone: values.mobile,
      email: values.email,
      categorys: user.categorys
    };
    console.log(data.categorys);
    this.props.updateUser(data);
  };

  handleClose = () => {
    this.props.history.push('app/views/administration/user-management');
  };

  handleChange = category => {
    this.props.updateCategory(category);
  };

  render() {
    const { user } = this.props;
    let { isUpdate } = this.state;
    return (
      <div>
        <Row className="updateTitle">
          <Col md="8">
            <h3>
              <Translate contentKey="userManagement.home.editLabel" />
            </h3>
          </Col>
        </Row>
        <div className="updatePanel">
          <Row className="justify-content-center">
            <Col md="8" className="fullNameContent">
              <AvForm onValidSubmit={this.saveUser}>
                <AvGroup>
                  <Label for="name">
                    <Translate contentKey="userManagement.name" />
                  </Label>
                  <AvField
                    type="text"
                    className="form-control"
                    name="name"
                    validate={{
                      required: {
                        value: true,
                        errorMessage: translate('global.messages.validate.name.required')
                      },
                      pattern: {
                        value: '[^0-9!@#$&*%()-=+/,.|~`]$',
                        errorMessage: translate('global.messages.validate.name.pattern')
                      },
                      maxLength: {
                        value: 50,
                        errorMessage: translate('global.messages.validate.name.maxlength')
                      }
                    }}
                    value={user.name}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="mibole">
                    <Translate contentKey="userManagement.mobile" />
                  </Label>
                  <AvField
                    type="text"
                    className="form-control"
                    name="mobile"
                    validate={{
                      maxLength: {
                        value: 11,
                        errorMessage: translate('entity.validation.maxlength', { max: 11 })
                      },
                      required: {
                        value: true,
                        errorMessage: translate('global.messages.validate.mobile.required')
                      },
                      pattern: {
                        value: '^[0-9]',
                        errorMessage: translate('global.messages.validate.mobile.invalid')
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
                <AvGroup className="rowUpdate">
                  <Label for="categories">
                    <Translate contentKey="userManagement.categories" />
                  </Label>
                  <UserCategoryTag defaultCate={user.categorys} handleChange={this.handleChange} />
                </AvGroup>

                <Button
                  color="primary"
                  type="submit"
                  className="save-right"
                  onClick={() => {
                    this.setState({
                      ...this.state,
                      isUpdate: this.props.usuccess
                    });
                    this.props.resetMessage();
                  }}
                >
                  <SweetAlert
                    title={translate('alert.update.title-update')}
                    confirmButtonColor=""
                    confirmButtonText={translate('alert.ok')}
                    show={isUpdate}
                    text={translate('alert.update.complete-update')}
                    type="success"
                    onConfirm={() =>
                      this.setState({
                        ...this.state,
                        isUpdate: false
                      })
                    }
                  />
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save" />
                </Button>

                <Button replace color="info" tag={Link} to="/app/views/administration/user-management" className="back-left">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline ">
                    <Translate contentKey="entity.action.back" />
                  </span>
                  &nbsp;
                </Button>
              </AvForm>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  usuccess: storeState.userManagement.showUpdateSuccessAlert,
  user: storeState.userManagement.user,
  users: storeState.userManagement.users,
  roles: storeState.userManagement.authorities,
  loading: storeState.userManagement.loading,
  updating: storeState.userManagement.updating,
  listCategory: storeState.userManagement.listCategory
});

const mapDispatchToProps = { getUser, getRoles, updateUser, createUser, reset, getUserCategories, updateCategory, resetMessage };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserUpdate);
