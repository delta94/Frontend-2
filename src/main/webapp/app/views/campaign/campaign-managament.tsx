import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Translate, translate } from 'react-jhipster';
import { Row, Col, Button, Input, Table, Popover, Icon, Modal } from 'antd';
import SortableTree from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
import LoaderAnim from 'react-loaders';
import Loader from 'react-loader-advanced';
import { openModal, closeModal } from 'app/actions/modal';
import { IRootState } from 'app/reducers';
import treeData, { data, columns } from './example-data';
import { getTreeFolder } from 'app/actions/campaign-managament';
import styled from 'styled-components';
import './campaign-managament.scss';

const { confirm } = Modal;

export interface ICampaginManagamentProps extends StateProps, DispatchProps {}

export interface ICampaginManagamentState {
  treeData: any[];
  hover: boolean;
}

class CampaginManagament extends React.Component<ICampaginManagamentProps, ICampaginManagamentState> {
  state: ICampaginManagamentState = {
    treeData: this.props.list_tree_folder.map(event => {
      let dataChildren;
      return {
        id: event.id,
        title: event.name,
        isDirectory: event.cjFolders.length > 0 ? true : false,
        expanded: event.cjFolders.length > 0 ? true : false,
        children:
          event.cjFolders.length > 0
            ? (dataChildren = event.cjFolders.map(value => {
                return {
                  id: value.id,
                  title: value.name,
                  parentId: event.id,
                  children: value.cjFolders.length > 0 ? dataChildren : value.cjFolders
                };
              }))
            : event.cjFolders
      };
    }),
    hover: false
  };

  componentDidMount = async () => {
    const { getTreeFolder, list_tree_folder } = this.props;
    let { treeData } = this.state;
    await getTreeFolder();
    //  list_tree_folder.map(event => {
    //   let dataChildren;
    //   return {
    //     id: event.id,
    //     title: event.name,
    //     isDirectory: event.cjFolders.length > 0 ? true : false,
    //     expanded: event.cjFolders.length > 0 ? true : false,
    //     children: event.cjFolders.length > 0 ?
    //       dataChildren = event.cjFolders.map(value => {
    //         return {
    //           id: value.id,
    //           title: value.name,
    //           parentId: event.id,
    //           children: value.cjFolders.length > 0 ? dataChildren : value.cjFolders
    //         }
    //       }) : event.cjFolders
    //   }
    // })
    this.setState({ treeData });
    console.log(treeData);
  };

  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name
    })
  };

  alertNodeInfo = ({ node, path, treeIndex }) => {
    const objectString = Object.keys(node)
      .map(k => (k === 'children' ? 'children: Array' : `${k}: '${node[k]}'`))
      .join(',\n   ');

    alert(
      'Info passed to the icon and button generators:\n\n' +
        `node: {\n   ${objectString}\n},\n` +
        `path: [${path.join(', ')}],\n` +
        `treeIndex: ${treeIndex}`
    );
  };

  contentPop = rowInfo => (
    <Row>
      <Row>
        <Button type="primary" onClick={() => this.createFolder(rowInfo)}>
          {' '}
          Thêm mới
        </Button>
      </Row>
      <hr />
      <Row>
        <Button type="ghost"> Đổi tên</Button>
      </Row>
      <hr />
      <Row>
        <Button type="danger"> Xóa</Button>
      </Row>
    </Row>
  );

  contentCreateFolder() {
    let content = (
      <Row>
        <Col span={6}>
          <label style={{ lineHeight: '2' }}> Tên thư mục </label>
        </Col>
        <Col span={18}>
          {' '}
          <Input />{' '}
        </Col>
      </Row>
    );
    return content;
  }

  createFolder = (event?: any) => {
    console.log(event);
    confirm({
      title: 'Do you want to delete these items?',
      content: this.contentCreateFolder(),
      onOk: () => {
        console.log('a');
      },
      onCancel() {}
    });
  };

  render() {
    let { treeData } = this.state;
    return (
      <Fragment>
        <div>
          <Row className="header-row" style={{ height: '50px' }}>
            <label>DANH SÁCH CHIẾN DỊCH</label>
          </Row>
          <Row className="row-main">
            <Col span={6} className="d-none d-lg-block h-100 bg-white  align-items-center">
              <Row className="row-sort-tree">
                <Col style={{ textAlign: 'center' }} span={12}>
                  <label>THƯ MỤC</label>
                </Col>
                <Col style={{ textAlign: 'right' }} span={12}>
                  <Icon style={{ marginRight: '5%', fontSize: '27px' }} onClick={this.createFolder} type="folder-add" />
                </Col>
              </Row>
              <hr />
              <Row>
                <div style={{ height: 700 }}>
                  <SortableTree
                    treeData={treeData[0]}
                    theme={FileExplorerTheme}
                    canDrag={({ node }) => !node.dragDisabled}
                    canDrop={({ nextParent }) => !nextParent || nextParent.isDirectory}
                    generateNodeProps={rowInfo => ({
                      icons: rowInfo.node.isDirectory
                        ? [
                            <div
                              style={{
                                borderLeft: 'solid 8px gray',
                                borderBottom: 'solid 10px gray',
                                marginRight: 10,
                                boxSizing: 'border-box',
                                width: 16,
                                height: 12,
                                filter: rowInfo.node.expanded
                                  ? 'drop-shadow(1px 0 0 gray) drop-shadow(0 1px 0 gray) drop-shadow(0 -1px 0 gray) drop-shadow(-1px 0 0 gray)'
                                  : 'none',
                                borderColor: rowInfo.node.expanded ? 'white' : 'gray'
                              }}
                            />
                          ]
                        : [
                            <div
                              style={{
                                border: 'solid 1px black',
                                fontSize: 8,
                                textAlign: 'center',
                                marginRight: 10,
                                width: 12,
                                height: 16
                              }}
                            >
                              F
                            </div>
                          ],
                      buttons: [
                        <Popover content={this.contentPop(rowInfo)} title="Thông tin" trigger="click" placement="bottomLeft">
                          <Icon type="info-circle" />
                        </Popover>
                      ]
                    })}
                    onChange={treeData => this.setState({ treeData })}
                  />
                </div>
              </Row>
            </Col>
            <Col span={18} className="h-100 bg-white  align-items-center">
              <Row>
                <Col span={6} style={{ padding: '20px' }}>
                  <label>22 Chiến dịch</label>
                </Col>
                <Col span={18} style={{ padding: '20px' }}>
                  <Input style={{ width: '200px' }} placeholder="tìm kiếm" />
                  <Button type="primary" style={{ float: 'right' }}>
                    {' '}
                    Tạo mới chiến dịch
                  </Button>
                </Col>
              </Row>
              <Row>
                <Table rowSelection={this.rowSelection} columns={columns} dataSource={data} />
              </Row>
            </Col>
          </Row>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ campaignManagament }: IRootState) => ({
  loading: campaignManagament.loading,
  list_tree_folder: campaignManagament.tree_folder
});

const mapDispatchToProps = { openModal, closeModal, getTreeFolder };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CampaginManagament);
