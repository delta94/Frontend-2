import React from 'react';
import { connect } from 'react-redux';
import { Button, Table, Row, Badge, Col } from 'reactstrap';

import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './tag-list.scss';
import { IRootState } from 'app/reducers';
import { Loader as LoaderAnim } from 'react-loaders';
import Loader from 'react-loader-advanced';
import { getListTagData } from '../../../../actions/tag-management';
import ReactPaginate from 'react-paginate';
import { Input, Icon, Checkbox } from 'antd';
import $ from 'jquery';
import { ITags } from '../../../../reducers/tag-management';

interface ITagListProps extends StateProps, DispatchProps {}

interface ITagListState {
  activePage?: number;
  textSearch?: string;
  pageCount?: number;
  checkAll?: boolean;
  indeterminate?: any;
  listCheckBox?: IItemCheckBox[];
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
    listCheckBox: []
  };

  componentDidMount() {
    let { pageCount, textSearch, listCheckBox } = this.state;
    this.props.getListTagData(textSearch, 1, pageCount);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.list_tags !== state.list_tags) {
      let listCheckBox = props.list_tags && props.list_tags.map(item => ({ ...item, checked: false }));
      return {
        listCheckBox
      };
    }

    return null;
  }

  handlePagination = () => {};

  onCheckAllChange = (id, checked) => {
    let { listCheckBox } = this.state;

    for (let i = 0; i < listCheckBox.length; i++) {
      let item = listCheckBox[i];
      if ((item.id = id)) {
        item.checked = !checked;
        console.log(item);
      }
    }

    console.log(listCheckBox);

    this.setState({ listCheckBox });
  };

  render() {
    let { loading, size, totalPage } = this.props;
    let { activePage, listCheckBox } = this.state;
    const spinner1 = <LoaderAnim color="#ffffff" type="ball-pulse" />;

    return (
      <div className="tag-list">
        <Loader message={spinner1} show={loading} priority={1}>
          <div>
            <p>Tags</p>
            {/* Block out */}

            <div className="block-out">
              <div className="button-action">
                <Button color="primary">Merge</Button>
                <Button color="primary">Delete</Button>
              </div>
              <div className="search">
                <Input prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Search tags" />
              </div>
            </div>
            {/* Table? */}
            <Table striped>
              <thead>
                <tr className="text-center">
                  <th className="checkbox-td">
                    <Checkbox id="add-all" onChange={event => this.onCheckAllChange('add-all', event.target.checked)} />
                  </th>
                  <th className="hand ">Name</th>
                  <th className="hand">Contacts</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {listCheckBox &&
                  listCheckBox.map((item, index) => {
                    let checked = item.checked;
                    return (
                      <tr key={index}>
                        <td>
                          <Checkbox id={item.id} onChange={() => this.onCheckAllChange(item.id, item.checked)} checked={checked} />
                        </td>
                        <td>{item.name}</td>
                        <td>{item.contactNumbers}</td>
                        <td />
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
                  pageRangeDisplayed={totalPage}
                  onPageChange={this.handlePagination}
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
  totalPage: tagDataState.totalPages
});

const mapDispatchToProps = { getListTagData };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TagList);
