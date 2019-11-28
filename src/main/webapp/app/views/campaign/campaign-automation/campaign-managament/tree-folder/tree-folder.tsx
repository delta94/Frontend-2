import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Translate, translate } from 'react-jhipster';
import { Tree } from 'antd';
import { Row, Col, Button, Input, Table, Popover, Icon, Modal } from 'antd';
import SortableTree from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
import { openModal, closeModal } from 'app/actions/modal';
import { IRootState } from 'app/reducers';
import {
  getTreeFolder,
  insertTreeFolder,
  editTreeFolder,
  deleteTreefolder,
  moveTreeFolder,
  getListCampaignInfolderDataAction
} from 'app/actions/campaign-managament';
import $ from 'jquery';
import './tree-folder.scss';

const { TreeNode } = Tree;
const { confirm } = Modal;

export interface ITreeFolderProps extends StateProps, DispatchProps {
  onClick: Function;
}

export interface ITreeFolderState {
  treeData: any[];
  hover: boolean;
  expandedKeys: any;
}

class TreeFolder extends React.Component<ITreeFolderProps, ITreeFolderState> {
  state: ITreeFolderState = {
    treeData: [],
    hover: false,
    expandedKeys: []
  };

  componentDidMount = async () => {
    const { getTreeFolder } = this.props;
    await getTreeFolder();
    await this.getData();
  };

  getData() {
    const { list_tree_folder } = this.props;
    let { treeData, expandedKeys } = this.state;
    let expandData = list_tree_folder.map(item => {
      return item.name;
    });
    let data = list_tree_folder.map(event => {
      return {
        title: event.name,
        key: event.name,
        id: event.id,
        parentId: event.parentId,
        children:
          event.cjFolders && event.cjFolders.length > 0
            ? event.cjFolders.map(value => {
                return {
                  title: value.name,
                  key: value.name,
                  id: value.id,
                  parentId: event.parentId,
                  children:
                    value.cjFolders && value.cjFolders.length > 0
                      ? value.cjFolders.map(item => {
                          return {
                            title: item.name,
                            key: item.name,
                            id: item.id,
                            parentId: value.parentId,
                            children: item.cjFolders
                          };
                        })
                      : [
                          {
                            title: null,
                            key: null
                          }
                        ]
                };
              })
            : [
                {
                  title: null,
                  key: null
                }
              ]
      };
    });
    treeData = data;
    expandedKeys = expandData;
    this.setState({ treeData: data, expandedKeys: expandData });
    console.log(treeData);
  }

  contentPop = rowInfo => (
    <Row style={{ textAlign: 'center' }}>
      <Row>
        <Button
          type="dashed"
          onClick={() => {
            this.createFolder(rowInfo, 'getlist');
          }}
        >
          {' '}
          xem chi tiết
        </Button>
      </Row>

      <hr />
      <Row>
        <Button
          type="ghost"
          onClick={() => {
            this.createFolder(rowInfo, 'edit');
          }}
        >
          {' '}
          Đổi tên
        </Button>
      </Row>

      <hr />
      <Row>
        <Button type="primary" onClick={() => this.createFolder(rowInfo, 'create')}>
          {' '}
          Thêm mới
        </Button>
      </Row>
      <hr />
      <Row>
        <Button
          type="danger"
          onClick={() => {
            this.createFolder(rowInfo, 'delete');
          }}
        >
          {' '}
          Xóa
        </Button>
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
          <Input maxLength={160} id="nameTree" />{' '}
        </Col>
      </Row>
    );
    return content;
  }

  createFolder = async (event, option) => {
    const { insertTreeFolder, getTreeFolder, editTreeFolder, deleteTreefolder, getListCampaignInfolderDataAction, onClick } = this.props;

    switch (option) {
      case 'create':
        console.log(event);
        confirm({
          title: 'Tạo thư mục',
          content: this.contentCreateFolder(),
          onOk: async () => {
            let data = {
              name: $(`#nameTree`).val(),
              parentId: event ? event.id : null
            };
            await insertTreeFolder(data);
            await getTreeFolder();
            await this.getData();
          },
          okText: 'Thêm mới',
          onCancel() {},
          cancelText: 'Hủy bỏ'
        });
        break;
      case 'edit':
        confirm({
          title: `Đổi tên thư mục ${event.title}`,
          content: this.contentCreateFolder(),
          onOk: async () => {
            let data = {
              name: {
                name: $(`#nameTree`).val()
              },
              id: event ? event.id : null
            };
            await editTreeFolder(data);
            await getTreeFolder();
            await this.getData();
          },
          okText: 'Lưu lại',
          onCancel() {},
          cancelText: 'Hủy bỏ'
        });
        break;

      case 'delete':
        confirm({
          title: 'Xóa',
          content: 'Bạn thực sự muốn xóa ?',
          onOk: async () => {
            let data = event ? event.id : null;
            await deleteTreefolder(data);
            await getTreeFolder();
            await this.getData();
          },
          okText: 'Xóa',
          onCancel() {},
          cancelText: 'Hủy bỏ'
        });

        break;
      case 'getlist':
        confirm({
          title: 'Xem chi tiết',
          content: `Xem chi tiết ${event.title}`,
          onOk: async () => {
            await getListCampaignInfolderDataAction(event ? event.id : null, '', '', 0, 4);
            await onClick(event ? event.id : null);
          },
          okText: 'Đồng ý',
          onCancel() {},
          cancelText: 'Hủy bỏ'
        });

        break;

      default:
        break;
    }
  };

  onChangeData = treeDataChane => {
    let { treeData } = this.state;
    let nameFolderMove;
    let headerFolder;
    let changeData = treeData.filter(val => !treeDataChane.includes(val));
    console.log(changeData);
    if (changeData.length == 2) {
      nameFolderMove = changeData
        .map(event => {
          if (event.isDirectory === false) {
            return {
              name: event.title,
              id: event.id
            };
          }
        })
        .filter(Boolean);

      headerFolder = changeData
        .map(event => {
          if (event.isDirectory === true) {
            return {
              name: event.title,
              id: event.id
            };
          }
        })
        .filter(Boolean);

      this.confirmChangeData(nameFolderMove, headerFolder, treeDataChane);
    }
  };

  confirmChangeData = async (nameFolderMove, headerFolder, treeDataChane) => {
    const { moveTreeFolder } = this.props;
    confirm({
      title: 'Di chuyển thư mục',
      content: `bạn muốn di chuyên ${nameFolderMove[0] ? nameFolderMove[0].name : ''} vào thư mục ${
        headerFolder[0] ? headerFolder[0].name : ''
      }`,
      onOk: async () => {
        let data = {
          idChil: nameFolderMove[0] ? nameFolderMove[0].id : '',
          idParent: headerFolder[0] ? headerFolder[0].id : ''
        };
        await moveTreeFolder(data);
        this.setState({ treeData: treeDataChane });
      },
      okText: 'Lưu lại',
      onCancel() {},
      cancelText: 'Hủy bỏ'
    });
  };

  onDragEnter = info => {
    console.log(info);
  };

  onDrop = info => {
    console.log(info);
    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;
    const dropPos = info.node.props.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (data, key, callback) => {
      data.forEach((item, index, arr) => {
        if (item.key === key) {
          return callback(item, index, arr);
        }
        if (item.children) {
          return loop(item.children, key, callback);
        }
      });
    };
    const data = [...this.state.treeData];

    // Find dragObject
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert 示例添加到尾部，可以是随意位置
        item.children.push(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert 示例添加到尾部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else {
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }

    this.setState({
      treeData: data
    });
  };

  render() {
    const loop = data =>
      data.map(item => {
        if (item.children && item.children.length) {
          return (
            <TreeNode
              key={item.key}
              title={item.title}
              icon={
                <Popover content={this.contentPop(item)} title="Thông tin" trigger="click" placement="bottomLeft">
                  <Icon type="down" />
                </Popover>
              }
            >
              {loop(item.children)}
            </TreeNode>
          );
        }
        if (item.title) {
          return (
            <TreeNode
              key={item.key}
              title={item.title}
              icon={
                <Popover content={this.contentPop(item)} title="Thông tin" trigger="click" placement="bottomLeft">
                  <Icon type="down" />
                </Popover>
              }
            />
          );
        }
      });
    return (
      <Fragment>
        <Row className="row-sort-tree">
          <Col span={12}>
            <label style={{ margin: '3px' }}>THƯ MỤC</label>
          </Col>
          <Col style={{ textAlign: 'right' }} span={12}>
            <Icon style={{ marginRight: '5%', fontSize: '27px' }} onClick={() => this.createFolder(null, 'create')} type="folder-add" />
          </Col>
        </Row>
        <hr />
        <Row>
          <div style={{ height: 700 }}>
            <Tree
              showIcon
              className="draggable-tree"
              defaultExpandAll
              defaultExpandedKeys={this.state.expandedKeys}
              draggable
              blockNode
              onDragEnter={this.onDragEnter}
              onDrop={this.onDrop}
            >
              {this.state.treeData.map(item => {
                if (item.children && item.children.length) {
                  return (
                    <TreeNode
                      key={item.key}
                      title={item.title}
                      icon={
                        <Popover content={this.contentPop(item)} title="Thông tin" trigger="click" placement="bottomLeft">
                          <Icon type="down" />
                        </Popover>
                      }
                    >
                      {loop(item.children)}
                    </TreeNode>
                  );
                }
                return <TreeNode key={item.key} title={item.title} />;
              })}
            </Tree>
          </div>
        </Row>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ campaignManagament }: IRootState) => ({
  loading: campaignManagament.loading,
  list_tree_folder: campaignManagament.tree_folder
});

const mapDispatchToProps = {
  openModal,
  closeModal,
  getTreeFolder,
  insertTreeFolder,
  editTreeFolder,
  deleteTreefolder,
  moveTreeFolder,
  getListCampaignInfolderDataAction
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TreeFolder);
