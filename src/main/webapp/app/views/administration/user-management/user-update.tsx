import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Row, Col } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { locales, languages } from 'app/config/translation';
import { getUser, getRoles, updateUser, createUser, reset, getUserCategories, updateCategory } from 'app/actions/user-management';
import { IRootState } from 'app/reducers';
import FormMultiSelectWidgets from './user-categories-tags';

export interface IUserManagementUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: any }> {}

export interface IUserManagementUpdateState {
  isNew: boolean;
  Category: any[];
}

export class UserManagementUpdate extends React.Component<IUserManagementUpdateProps, IUserManagementUpdateState> {
  state: IUserManagementUpdateState = {
    isNew: !this.props.match.params || !this.props.match.params.id,
    Category: []
  };

  // todo : hiện Modal , không chuyển trang
  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getUser(this.props.match.params.id);
    }
    this.props.getRoles();
    this.props.getUserCategories('');
  }

  componentWillUnmount() {
    this.props.reset();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.categorys) {
      this.setState({
        Category: nextProps.user.categorys
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
    this.props.updateUser(data);
    this.props.getUser(user.id);
  };
  handleClose = () => {
    this.props.history.push('/admin/user-management');
  };

  handleCreate = name => {
    this.props.getUserCategories(name);
  };

  handleChange = category => {
    this.props.updateCategory(category);
  };

  render() {
    const isInvalid = false;

    const { user, users, loading, updating, listCategory, roles } = this.props;
    const { Category } = this.state;
    console.log(user);
    return (
      <div>
        <Row className="updateTitle">
          <Col md="8">
            <h1>
              <Translate contentKey="userManagement.home.editLabel" />
            </h1>
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
                      // pattern: {
                      //   value:
                      //     '^[a-zA-Z]{4,}(?: [a-zA-ZAÁÀẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶEÉÈẺẼẸÊẾỀỂỄỆIÍÌỈĨỊOÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢUÚÙỦŨỤƯỨỪỬỮỰYÝỲỶỸỴĐaáàảãạâấầẩẫậăắằẳẵặeéèẻẽẹêếềểễệiíìỉĩịoóòỏõọôốồổỗộơớờởỡợuúùủũụưứừửữựyýỳỷỹỵđ]+){0,5}$',
                      //   errorMessage: translate('global.messages.validate.name.pattern')
                      // },

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
                  <FormMultiSelectWidgets defaultCate={user.categorys} handleChange={this.handleChange} />
                </AvGroup>

                <Button color="primary" type="submit" disabled={isInvalid || updating} className="save-right">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save" />
                </Button>
                <Button replace color="info" tag={Link} to="/admin/user-management" className="back-left">
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
  user: storeState.userManagement.user,
  users: storeState.userManagement.users,
  roles: storeState.userManagement.authorities,
  loading: storeState.userManagement.loading,
  updating: storeState.userManagement.updating,
  listCategory: storeState.userManagement.listCategory
});

const mapDispatchToProps = { getUser, getRoles, updateUser, createUser, reset, getUserCategories, updateCategory };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserManagementUpdate);
