import React from 'react';
import { connect } from 'react-redux';
import { Button, Table, Row, Badge, Col } from 'reactstrap';

import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './tag-list.scss';
import { IRootState } from 'app/reducers';
import { Loader as LoaderAnim } from 'react-loaders';
import Loader from 'react-loader-advanced';
import { getListTagDataAction } from '../../../../actions/tag-management';
import ReactPaginate from 'react-paginate';
import { Input, Icon, Checkbox, Menu, Dropdown } from 'antd';
import { ITags } from '../../../../reducers/tag-management';
import TagModal from '../tag-modal/tag-modal';
import { DELETE_TAG, MERGE_TAG, EDIT_TAG } from '../../../../constants/tag-management';
import $ from 'jquery';
import { KEY_ENTER } from '../../user-campaign/list/tab/all-camp/modal/modal';

interface ITagListProps extends StateProps, DispatchProps {}

interface ITagListState {
  activePage?: number;
  pageCount?: number;
  checkAll?: boolean;
  indeterminate?: any;
  listCheckBox?: IItemCheckBox[];
  openModal?: boolean;
  testChecked: boolean;
  list_tags?: ITags[];
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
    decription?: string;
  };
}

interface IItemCheckBox {
  ITags;
  checked: boolean;
}

class TagList extends React.Component<ITagListProps, ITagListState> {
  state = {
    activePage: 2,
    pageCount: 1,
    textSearch: '',
    checkAll: false,
    indeterminate: null,
    listCheckBox: [],
    testChecked: false,
    list_tags: [],
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
      decription: ''
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

    this.getListTagDataAction(0, 6, textSearch);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.list_tags !== state.list_tags) {
      console.log(props.list_tags);
      let listCheckBox = props.list_tags && props.list_tags.map(item => ({ ...item, checked: false }));
      return {
        list_tags: props.list_tags,
        listCheckBox
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
    let { listCheckBox } = this.state;
    this.setState({
      param,
      dataModal: listCheckBox,
      openFixModal: true,
      singleModalData: item
    });
  };

  closeFixModalData = () => {
    this.setState({ openFixModal: false });
  };

  onCheckAllChange = (id, checked) => {
    let { listCheckBox } = this.state;

    if (id === 'add-all') {
      let newListCheckBox = listCheckBox.map(item => {
        item.checked = checked;
        return item;
      });
      this.setState({ listCheckBox: newListCheckBox });
    } else {
      listCheckBox = listCheckBox.map(item => {
        if (item.id === id) {
          item.checked = checked;
        }
        return item;
      });

      this.setState({ listCheckBox });
    }
  };

  menu = item => {
    return (
      <Menu>
        <Menu.Item key="1" onClick={() => this.openFixModalWithData(DELETE_TAG, item)}>
          <Icon type="delete" /> Delete
        </Menu.Item>
      </Menu>
    );
  };

  toogleFixModal = () => {
    let { openFixModal } = this.state;
    this.setState({ openFixModal: !openFixModal });
  };

  render() {
    let { loading, size, totalPages } = this.props;
    let { activePage, listCheckBox, textSearch, openFixModal, dataModal, param, singleModalData } = this.state;
    const spinner1 = <LoaderAnim color="#ffffff" type="ball-pulse" />;

    return (
      <div className="tag-list">
        <TagModal
          toggleFixModal={this.toogleFixModal}
          openFixModal={openFixModal}
          param={param}
          dataModal={dataModal}
          closeFixModalData={this.closeFixModalData}
          singleModalData={singleModalData}
        />
        <Loader message={spinner1} show={loading} priority={1}>
          <div>
            <p>Tags</p>
            {/* Block out */}
            <div className="block-out">
              <div className="button-action">
                <Button color="primary" onClick={() => this.openFixModalWithData(MERGE_TAG, null)}>
                  Merge
                </Button>
                <Button color="primary" onClick={() => this.openFixModalWithData(DELETE_TAG, null)}>
                  Delete
                </Button>
              </div>
              <div className="search">
                <Input
                  id="searchText"
                  prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  value={textSearch}
                  placeholder="Search tags"
                  onChange={this.handleSearchTags}
                />
              </div>
            </div>
            {/* Table? */}
            <Table striped>
              <thead>
                <tr className="text-center">
                  <th className="checkbox-td">
                    <Checkbox id="add-all" onChange={event => this.onCheckAllChange('add-all', event.target.checked)} />
                  </th>
                  <th>Name</th>
                  <th>Contacts</th>
                  <th>Description</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {listCheckBox &&
                  listCheckBox.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <Checkbox
                            id={item.id}
                            onChange={event => this.onCheckAllChange(item.id, event.target.checked)}
                            checked={item.checked}
                          />
                        </td>
                        <td>{item.name}</td>
                        <td>{item.contactNumbers}</td>
                        <td>{item.description}</td>
                        <td>
                          <Dropdown.Button
                            overlay={() => this.menu(item)}
                            icon={<Icon type="caret-down" />}
                            onClick={() => this.openFixModalWithData(EDIT_TAG, item)}
                          >
                            <span>
                              <Icon type="edit" />
                              Edit
                            </span>
                          </Dropdown.Button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
            {/* Blockout */}
            <div>
              <Row className="justify-content-center">
                <ReactPaginate
                  previousLabel={'<'}
                  nextLabel={'>'}
                  breakLabel={'...'}
                  breakClassName={'break-me'}
                  pageCount={size}
                  marginPagesDisplayed={1}
                  pageRangeDisplayed={totalPages}
                  onPageChange={event => this.props.getListTagDataAction(textSearch, event.selected, 6)}
                  containerClassName={'pagination'}
                  subContainerClassName={'pages pagination'}
                  activeClassName={'active'}
                  forcePage={activePage}
                />
              </Row>
            </div>
          </div>
        </Loader>
      </div>
    );
  }
}

const mapStateToProps = ({ tagDataState }: IRootState) => ({
  loading: tagDataState.loading,
  list_tags: tagDataState.list_tags,
  size: tagDataState.size,
  totalElements: tagDataState.totalElements,
  totalPages: tagDataState.totalPages
});

const mapDispatchToProps = { getListTagDataAction };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TagList);
