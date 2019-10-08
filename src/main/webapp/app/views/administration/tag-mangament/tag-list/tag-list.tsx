import React from 'react';
import { connect } from 'react-redux';
import { Button, Table, Row, Badge, Col } from 'reactstrap';

import { Translate, translate } from 'react-jhipster';
import './tag-list.scss';
import { IRootState } from 'app/reducers';
import LoaderAnim from 'react-loaders';
import Loader from 'react-loader-advanced';
import { getListTagDataAction } from '../../../../actions/tag-management';
import ReactPaginate from 'react-paginate';
import { Input, Icon, Checkbox, Menu, Dropdown } from 'antd';
import { ITags } from '../../../../reducers/tag-management';
import TagModal from '../tag-modal/tag-modal';
import { DELETE_TAG, MERGE_TAG, EDIT_TAG } from '../../../../constants/tag-management';
import $ from 'jquery';

interface ITagListProps extends StateProps, DispatchProps {}

interface ITagListState {
  activePage?: number;
  pageCount?: number;
  checkAll?: boolean;
  indeterminate?: any;
  listCheckBox?: IItemCheckBox[];
  openModal?: boolean;
  testChecked: boolean;
  textSearch?: string;
  openFixModal?: boolean;
  param?: string;
  dataModal?: any;
  option?: {
    leftButton: string;
    rightButton: string;
  };
  singleModalData: {
    id?: string;
    name?: string;
    description?: string;
  };
}

interface IItemCheckBox {
  ITags;
  checked: boolean;
}

export const limitString = (value: string, numberLimit?: number) => {
  let newValue = '';
  let newNumberLimit = 18;
  if (numberLimit) {
    numberLimit = numberLimit;
  }

  if (value === null) {
    return '';
  } else {
    if (value.length > newNumberLimit) {
      for (let i = 0; i < newNumberLimit; i++) {
        newValue += value[i];
      }

      newValue += '...';
    } else {
      newValue = value;
    }
    return newValue;
  }
};

class TagList extends React.Component<ITagListProps, ITagListState> {
  state = {
    activePage: 0,
    pageCount: 1,
    textSearch: '',
    checkAll: false,
    indeterminate: null,
    listCheckBox: [],
    testChecked: false,
    openFixModal: false,
    param: '',
    dataModal: null,
    option: {
      leftButton: '',
      rightButton: ''
    },
    singleModalData: {
      id: null,
      name: '',
      description: ''
    }
  };

  componentDidMount() {
    let { textSearch } = this.state;
    $('input#searchText').on('keypress', event => {
      let { textSearch } = this.state;
      if (event.which == 13) {
        this.getListTagDataAction(0, 6, textSearch);
      }
    });

    localStorage.setItem('pageIndex', '0');
    this.getListTagDataAction(0, 6, textSearch);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.list_tags !== state.list_tags && state.listCheckBox) {
      let listCheckBox = props.list_tags && props.list_tags.map(item => ({ ...item, checked: false }));

      return {
        list_tags: props.list_tags,
        listCheckBox,
        checkAll: false,
        singleModalData: { id: null, name: null, description: null }
      };
    }

    return null;
  }

  getListTagDataAction = (pageIndex, pageSize, textSearch) => {
    this.props.getListTagDataAction(textSearch, pageIndex, pageSize);
  };

  handleSearchTags = event => {
    this.setState({ textSearch: event.target.value });
  };

  openFixModalWithData = (param, item) => {
    let { singleModalData } = this.state;
    if (item) {
      singleModalData = { id: item.id, name: item.name, description: item.description };
    }
    this.setState({
      param,
      openFixModal: true,
      singleModalData
    });
  };

  closeFixModalData = () => {
    this.setState({ openFixModal: false, singleModalData: { id: null, description: null, name: null } });
  };

  onCheckAllChange = (id, checked) => {
    let { listCheckBox } = this.state;
    id === 'add-all'
      ? (listCheckBox.forEach(item => (item.checked = checked)), this.setState({ checkAll: checked }))
      : listCheckBox && listCheckBox.forEach(item => (id === item.id ? (item.checked = checked) : item));
    this.setState({ listCheckBox });
  };

  menu = item => {
    return (
      <Menu>
        <Menu.Item key="1" onClick={() => this.openFixModalWithData(DELETE_TAG, item)}>
          <Icon type="delete" /> <Translate contentKey="tag-management.delete" />
        </Menu.Item>
      </Menu>
    );
  };

  toogleFixModal = () => {
    let { openFixModal } = this.state;
    this.setState({ openFixModal: !openFixModal });
  };

  setPageIndex = event => {
    localStorage.setItem('pageIndex', event);
    this.callData();
  };

  callData = () => {
    let { textSearch } = this.state;
    let pageIndex = localStorage.getItem('pageIndex');
    this.props.getListTagDataAction(textSearch, parseInt(pageIndex), 6);
    this.setState({ checkAll: false });
  };

  render() {
    let { loading, totalPages, list_tags } = this.props;
    const { listCheckBox, textSearch, openFixModal, param, singleModalData, checkAll } = this.state;
    let isDisable = true;
    listCheckBox.forEach(item => {
      if (item.checked) {
        isDisable = false;
      }
    });
    const spinner1 = <LoaderAnim type="ball-pulse" active={true} />;

    return (
      <div className="tag-list">
        <TagModal
          toggleFixModal={this.toogleFixModal}
          openFixModal={openFixModal}
          param={param}
          listCheckBox={listCheckBox}
          closeFixModalData={this.closeFixModalData}
          singleModalData={singleModalData}
          callData={this.callData}
        />
        <Loader message={spinner1} show={loading} priority={1}>
          <div>
            <p style={{ textTransform: 'uppercase', color: '#595C82' }}>
              <Translate contentKey="tag-management.tag-list" />
            </p>
            {/* Block out */}
            <div className="block-out">
              <div className="button-action">
                <Button color="primary" onClick={() => this.openFixModalWithData(MERGE_TAG, null)} disabled={isDisable}>
                  <Translate contentKey="tag-management.merge" />
                </Button>
                <Button color="danger" onClick={() => this.openFixModalWithData(DELETE_TAG, null)} disabled={isDisable}>
                  <Translate contentKey="tag-management.delete" />
                </Button>
              </div>
              <div className="search">
                <Input
                  id="searchText"
                  prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  value={textSearch}
                  placeholder={translate('tag-management.tag-search')}
                  onChange={this.handleSearchTags}
                />
              </div>
            </div>
            {/* Table? */}
            <Table striped>
              <thead>
                <tr className="text-center">
                  <th className="checkbox-td" colSpan={5}>
                    <Checkbox id="add-all" onChange={event => this.onCheckAllChange('add-all', event.target.checked)} checked={checkAll} />
                  </th>
                  <th colSpan={30} id="name">
                    <Translate contentKey="tag-management.tag-name" />
                  </th>
                  <th colSpan={20}>
                    <Translate contentKey="tag-management.tag-contact" />
                  </th>
                  <th colSpan={30} id="description">
                    <Translate contentKey="tag-management.tag-description" />
                  </th>
                  <th colSpan={15} />
                </tr>
              </thead>
              <tbody>
                {listCheckBox && list_tags && list_tags.length > 0 ? (
                  listCheckBox.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td colSpan={5}>
                          <Checkbox
                            id={item.id}
                            onChange={event => this.onCheckAllChange(item.id, event.target.checked)}
                            checked={item.checked}
                          />
                        </td>
                        <td colSpan={30} id="name">
                          <span> {limitString(item.name, 16)}</span>
                        </td>
                        <td colSpan={20}>{item.contactNumbers}</td>
                        <td colSpan={30} id="description">
                          <span> {limitString(item.description)}</span>
                        </td>
                        <td colSpan={15}>
                          <Dropdown.Button
                            overlay={() => this.menu(item)}
                            icon={<Icon type="caret-down" />}
                            onClick={() => this.openFixModalWithData(EDIT_TAG, item)}
                          >
                            <span>
                              <Icon type="edit" />
                              <Translate contentKey="tag-management.edit" />
                            </span>
                          </Dropdown.Button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <div className="none-data">
                    <Translate contentKey="tag-management.none-tag-data" />
                  </div>
                )}
              </tbody>
            </Table>
            {/* Blockout */}
          </div>
        </Loader>
        <div className="navigation ">
          {totalPages && totalPages >= 1 ? (
            <Row className="justify-content-center">
              <ReactPaginate
                previousLabel={'<'}
                nextLabel={'>'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={totalPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={event => this.setPageIndex(event.selected)}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
              />
            </Row>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ tagDataState }: IRootState) => ({
  loading: tagDataState.loading,
  list_tags: tagDataState.list_tags,
  totalPages: tagDataState.totalPages,
  totalElements: tagDataState.totalElements
});

const mapDispatchToProps = { getListTagDataAction };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TagList);
