import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Translate, translate } from 'react-jhipster';
import { Row, Col, Button, Input, Table, Popover, Icon, Modal } from 'antd';
import SortableTree from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
import { openModal, closeModal } from 'app/actions/modal';
import { IRootState } from 'app/reducers';
import { getTreeFolder } from 'app/actions/campaign-managament';
import './tree-folder.scss';

const { confirm } = Modal;

export interface ITreeFolderProps extends StateProps, DispatchProps {}

export interface ITreeFolderState {
  treeData: any[];
  hover: boolean;
}

class TreeFolder extends React.Component<ITreeFolderProps, ITreeFolderState> {
  state: ITreeFolderState = {
    treeData: [],
    hover: false
  };

  componentDidMount = async () => {
    const { getTreeFolder, list_tree_folder } = this.props;
    let { treeData } = this.state;
    await getTreeFolder();
    treeData = list_tree_folder.map(event => {
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
    });
    this.setState({ treeData });
    console.log(treeData);
  };

  shouldComponentUpdate(nextProps, nextState) {
    let { treeData } = this.state;
    if (treeData != nextState.treeData) {
      return true;
    }
    return false;
  }

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
    const { list_tree_folder } = this.props;
    let { treeData } = this.state;
    return (
      <div style={{ height: 700 }}>
        <SortableTree
          treeData={treeData ? treeData : []}
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
)(TreeFolder);
