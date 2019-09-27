import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table, Row, Badge, Col } from 'reactstrap';

import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../properties-customer/properties-customer.scss';
import { ITEMS_PER_PAGE, ACTIVE_PAGE, MAX_BUTTON_COUNT } from 'app/constants/pagination.constants';
import { getListProp } from 'app/actions/properties-customer';
import { IRootState } from 'app/reducers';
import { Loader as LoaderAnim } from 'react-loaders';
import Loader from 'react-loader-advanced';
import Select from 'react-select';
import { List, arrayMove } from 'react-movable';

export const option = [
  { value: 'chocolate', label: 'text' },
  { value: 'strawberry', label: 'radio' },
  { value: 'vanilla', label: 'button' }
];
export interface IPropertiesCustomerProps extends StateProps, DispatchProps, RouteComponentProps<{ id: any }> {}

export interface IPropertiesCustomerState {
  selectedOption: string;
  dropItem: any[];
}

export class PropertiesCustomer extends React.Component<IPropertiesCustomerProps, IPropertiesCustomerState> {
  state: IPropertiesCustomerState = {
    selectedOption: '',
    dropItem: []
  };

  componentDidMount() {
    const { getListProp } = this.props;
    getListProp();
    let { getList } = this.props;

    this.setState({
      dropItem: getList
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.getList !== prevState.dropItem) {
      return {
        dropItem: nextProps.getList
      };
    }
    return null;
  }
  handleChange = selectedOption => {
    this.setState({ selectedOption: selectedOption });
  };

  render() {
    const { loading, match } = this.props;
    let { dropItem } = this.state;
    const spinner1 = <LoaderAnim color="#ffffff" type="ball-pulse" />;
    return (
      <div>
        <Loader message={spinner1} show={loading} priority={1}>
          <div id="properties-management-title">
            <Translate contentKey="properties-management.title" />
          </div>
          <div />
          <div className="panel">
            <Row>
              <Col md="3" />
              <Col md="5" className="search-bar-properties">
                <Select
                  className="select-bar"
                  placeholder="Any type"
                  value={this.state.selectedOption}
                  onChange={this.handleChange}
                  options={option}
                />
                <Col md="9">
                  <div className="has-search">
                    <span className=" form-control-feedback" />
                    <input type="text" className="form-control" placeholder={translate('userManagement.home.search-placer')} />
                  </div>
                </Col>
              </Col>
              <Col md="4" className="form-button">
                <Col md="6">
                  <Button className="btn btn-primary float-right jh-create-entity">
                    <FontAwesomeIcon icon="plus" /> <Translate contentKey="properties-management.button-template" />
                  </Button>
                </Col>
                <Col md="5">
                  <Button to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity">
                    <FontAwesomeIcon icon="plus" /> <Translate contentKey="properties-management.button-field" />
                  </Button>
                </Col>
              </Col>
            </Row>
            <hr />

            <List
              values={dropItem}
              onChange={({ oldIndex, newIndex }) => {
                let tempArray = dropItem[oldIndex];
                dropItem[oldIndex] = dropItem[newIndex];
                dropItem[newIndex] = tempArray;
                this.setState({ dropItem });
              }}
              renderList={({ children, props, isDragged }) => (
                <Table
                  responsive
                  striped
                  style={{
                    cursor: isDragged ? 'grabbing' : undefined
                  }}
                >
                  <thead>
                    <tr className="text-center">
                      <th className="hand">
                        <Translate contentKey="properties-management.form.name" />
                      </th>
                      <th className="hand">
                        <Translate contentKey="properties-management.form.type" />
                      </th>
                      <th className="hand">
                        <Translate contentKey="properties-management.form.persionalization" />
                      </th>
                      <th className="hand">
                        <Translate contentKey="properties-management.function" />
                      </th>
                    </tr>
                  </thead>
                  <tbody key={Math.random()} {...props}>
                    {children}
                  </tbody>
                </Table>
              )}
              renderItem={({ value, props, isDragged, isSelected }) => {
                const row = (
                  <tr
                    {...props}
                    style={{
                      ...props.style,
                      cursor: isDragged ? 'grabbing' : 'grab'
                    }}
                  >
                    <td>{value.name}</td>
                    <td>{value.type}</td>
                    <td>{value.personalization}</td>
                    <td className="text-center">
                      <div className="btn-group flex-btn-group-container">
                        <Button className="buttonUpdate" color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit" />
                          </span>
                        </Button>
                        <Button color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete" />
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
                return isDragged ? (
                  <Table responsive striped>
                    <tbody className="table-drag">{row}</tbody>
                  </Table>
                ) : (
                  row
                );
              }}
            />
          </div>
        </Loader>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  getList: storeState.propertiesState.list_prop,
  loading: storeState.userManagement.loading
});

const mapDispatchToProps = { getListProp };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PropertiesCustomer);
