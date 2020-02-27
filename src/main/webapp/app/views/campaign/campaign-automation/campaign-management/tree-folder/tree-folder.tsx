import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Translate, translate } from 'react-jhipster';
import { Button as ButtonReactstrap } from 'reactstrap';
import { Row, Col, Button as Btn, Input, Table, Popover, Icon, Modal, Tree } from 'antd';
import { openModal, closeModal } from 'app/actions/modal';
import { IRootState } from 'app/reducers';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faArrowDown, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import {
  getTreeFolder,
  insertTreeFolder,
  editTreeFolder,
  deleteTreefolder,
  moveTreeFolder,
  getListCampaignInfolderDataAction,
  getNode
} from 'app/actions/campaign-management';
import $ from 'jquery';
import './tree-folder.scss';

const { TreeNode } = Tree;
const { confirm } = Modal;
const img_edit = require('app/assets/utils/images/campaign-management/edit.png')
const img_create = require('app/assets/utils/images/campaign-management/plus.png')
const img_delete = require('app/assets/utils/images/campaign-management/delete.png')
export interface ITreeFolderProps extends StateProps, DispatchProps {
  onClick: Function;
}

const const_action = {
  CREATE_FOLDER: 'create',
  EDIT_FOLDER: 'edit',
  DELETE_FOLDER: 'delete',
  GET_FOLDER: 'getlist'
}

export interface ITreeFolderState {
  treeData: any[];
  list_folder: any[]
  hover: boolean;
  level: string;
  expandedKeys: any;
  error_name: string;
  visible: boolean;
}

class TreeFolder extends React.Component<ITreeFolderProps, ITreeFolderState> {
  state: ITreeFolderState = {
    treeData: [],
    hover: false,
    expandedKeys: [],
    list_folder: [],
    level: '',
    error_name: '',
    visible: false
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
        key: event.id + ',1',
        id: event.id,
        parentId: event.parentId,
        check: false,
        children:
          event.cjFolders && event.cjFolders.length > 0
            ? event.cjFolders.map(value => {
              return {
                title: value.name,
                key: value.id + ',2',
                id: value.id,
                parentId: event.parentId,
                check: false,
                children:
                  value.cjFolders && value.cjFolders.length > 0
                    ? value.cjFolders.map(item => {
                      return {
                        title: item.name,
                        key: item.id + ',3',
                        id: item.id,
                        parentId: value.parentId,
                        check: false,
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
  }

  hide = () => {
    let { list_folder } = this.state
    list_folder && list_folder.map(item => {
      return item.check = false
    })
    this.setState({
      visible: false,
    });
  };

  contentPop = rowInfo => (
    <Row style={{ textAlign: 'center' }}>
      <Row style={{ marginBottom: "5%" }}>
        <ButtonReactstrap className="label-info"
          color="none" onClick={() => this.createFolder(rowInfo, 'create')}>
          {' '}
          <img src={img_create} style={{ marginRight: "1em" }} /><Translate contentKey="campaign-auto.management.create" />
        </ButtonReactstrap>
      </Row>
      <Row style={{ marginBottom: "5%" }}>
        <ButtonReactstrap
          className="label-info"
          color="none"
          onClick={() => {
            this.createFolder(rowInfo, 'edit');
          }}
        >
          {' '}
          <img src={img_edit} style={{ marginRight: "1em" }} /> <Translate contentKey="campaign-auto.management.change-name" />
        </ButtonReactstrap>
      </Row>

      <Row style={{ marginBottom: "7%" }}>
        <ButtonReactstrap
          style={{ float: "left", marginRight: "20px" }}
          className="label-info"
          color="none"
          onClick={() => {
            this.createFolder(rowInfo, 'delete');
          }}
        >
          {' '}
          <img src={img_delete} style={{ marginRight: "20px" }} /><Translate contentKey="campaign-auto.management.delete" />
        </ButtonReactstrap>
      </Row>
    </Row>
  );

  contentCreateFolder(folderTitle: string) {
    let content = (
      <Row>
        <Col span={6}>
          <label style={{ lineHeight: '2' }}><Translate contentKey="campaign-auto.management.folder-name" /> </label>
        </Col>
        <Col span={18}>
          {' '}
          <Input maxLength={160} id="nameTree" defaultValue={folderTitle} />{' '}
        </Col>
        <p style={{ color: "red" }}>{this.state.error_name}</p>

      </Row>
    );
    return content;
  }

  createFolder = async (event, option) => {
    const { insertTreeFolder, getTreeFolder, editTreeFolder, deleteTreefolder, onClick } = this.props;
    let { level } = this.state;
    if (event === 'select') {
      level = '1';
    }
    this.hide()
    switch (option) {
      case const_action.CREATE_FOLDER:
        if (Number(level) < 3) {
          confirm({
            cancelButtonProps: { type: 'danger', ghost: true },
            title: translate('campaign-auto.modal.title-create'),
            content: this.contentCreateFolder(''),
            zIndex: 1000000,
            onOk: async () => {
              let name_folder = $(`#nameTree`).val()
              if (name_folder) {
                let data = {
                  name: name_folder,
                  parentId: event ? event.id : null
                };
                await insertTreeFolder(data);
                await getTreeFolder();
                await this.getData();
              } else {
                toast.error(translate('campaign-auto.message-error.name-folder-empty'), { autoClose: false })
                return Promise.reject(translate('campaign-auto.message-error.name-folder-empty'))
              }

            },
            okText: translate('campaign-auto.modal.ok-create-text'),
            onCancel() { },
            cancelText: translate('campaign-auto.modal.cancel')
          });
        } else {
          toast.error(translate('campaign-auto.modal.error-title'), { autoClose: false })
        }

        break;
      case const_action.EDIT_FOLDER:
        confirm({
          cancelButtonProps: { type: 'danger', ghost: true },
          title: translate('campaign-auto.modal.title-edit') + ' ' + event.title,
          content: this.contentCreateFolder(event.title),
          zIndex: 1000000,
          onOk: async () => {
            let name_folder = $(`#nameTree`).val()
            if (name_folder) {
              let data = {
                name: {
                  name: $(`#nameTree`).val()
                },
                id: event ? event.id : null
              };
              await editTreeFolder(data);
              await getTreeFolder();
              await this.getData();
            } else {
              toast.error(translate('campaign-auto.message-error.change-name-folder'), { autoClose: false })
              return Promise.reject(translate('campaign-auto.message-error.change-name-folder'))
            }

          },
          okText: translate('campaign-auto.modal.ok-save-text'),
          onCancel() { },
          cancelText: translate('campaign-auto.modal.cancel')
        });
        break;

      case const_action.DELETE_FOLDER:
        confirm({
          cancelButtonProps: { type: 'danger', ghost: true },
          title: translate('campaign-auto.modal.title-delete'),
          content: translate('campaign-auto.modal.content-delete'),
          onOk: async () => {
            let data = event ? event.id : null;
            await deleteTreefolder(data);
            await getTreeFolder();
            await this.getData();
          },
          zIndex: 1000000,
          okText: translate('campaign-auto.modal.ok-btn-delete'),
          onCancel() { },
          cancelText: translate('campaign-auto.modal.cancel')
        });

        break;
      case const_action.DELETE_FOLDER:
        confirm({
          cancelButtonProps: { type: 'danger', ghost: true },
          title: translate('campaign-auto.modal.view-details'),
          content: translate('campaign-auto.modal.view-details') + ' ' + event.title,
          onOk: async () => {
            await getListCampaignInfolderDataAction(event ? event.id : null, '', '', 0, 4);
            await onClick(event ? event.id : null);
          },
          zIndex: 1000000,
          okText: translate('campaign-auto.modal.ok-submit-text'),
          onCancel() { },
          cancelText: translate('campaign-auto.modal.cancel')
        });

        break;

      default:
        break;
    }

  };

  onDragEnter = info => {
  };

  onDrop = async info => {
    const { moveTreeFolder } = this.props;
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
        item.children.push(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, item => {
        item.children = item.children || [];
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


    let idData = {
      idChil: String(dragKey).split(',')[0],
      idParent: String(dropKey).split(',')[0]
    };

    if (dropPosition >= 0) {
      confirm({
        cancelButtonProps: { type: 'danger', ghost: true },
        title: translate("campaign-auto.modal.move-folder"),
        content: translate("campaign-auto.modal.confirm-move-folder") + ' ' + info.node.props.title ? info.node.props.title.props.children[2] : '',
        onOk: async () => {
          await moveTreeFolder(idData);
          this.setState({
            treeData: data
          });
        },
        okText: translate('campaign-auto.modal.ok-save-text'),
        onCancel() { },
        cancelText: translate('campaign-auto.modal.cancel')
      });
    }
  };

  handleVisibleChange = (visible, id, arr) => {
    arr && arr.map(item => {
      if (item.id === id) {
        return item.check = visible
      }
    })
    this.setState({ visible, list_folder: arr });
  };

  getList = async (key, node) => {
    const { getListCampaignInfolderDataAction, onClick, getNode } = this.props;
    let { level } = this.state;
    let id = String(key).split(',')[0] === '0-0' ? '-99' : String(key).split(',')[0];
    let levelNode = String(key).split(',')[1];
    if (node) {
      await getListCampaignInfolderDataAction(id, '', '', 0, 7);
      await onClick(id);
      await getNode(id);
    }
    if (levelNode)
      this.setState({ level: levelNode });
  };



  render() {
    const img_folder = require('app/assets/utils/images/campaign-management/folder.png');
    const img_files = require('app/assets/utils/images/campaign-management/files.png');
    let { level } = this.state;
    const loop = data =>
      data.map((item, index, arr) => {
        if (item.children && item.children.length) {
          return (
            <TreeNode
              className="tree-children"
              key={item.key}
              title={
                <div style={{ lineHeight: '2' }}>
                  <img src={img_files} /> {item.title}
                </div>
              }
              icon={
                <Popover
                  overlayClassName="pop-data"
                  content={this.contentPop(item)}
                  title=""
                  placement="bottomRight"
                  visible={item.check}
                  onVisibleChange={(visible) => this.handleVisibleChange(visible, item.id, arr)}
                >
                  <FontAwesomeIcon className="icon-ball" icon={faEllipsisH} />
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
              title={
                <div style={{ lineHeight: '2' }}>
                  <img src={img_files} /> {item.title}
                </div>
              }
              icon={
                <Popover
                  overlayClassName="pop-data"
                  content={this.contentPop(item)}
                  title=""
                  placement="bottomRight"
                  visible={item.check}
                  onVisibleChange={(visible) => this.handleVisibleChange(visible, item.id, arr)}
                >
                  <FontAwesomeIcon className="icon-ball" icon={faEllipsisH} />
                </Popover>
              }
            />
          );
        }
      });
    return (
      <Fragment>
        <Row className="row-sort-tree">
          <Col span={18}>
            <label style={{ margin: '5px', color: '#2d3843' }}>THƯ MỤC</label>
          </Col>
          <Col style={{ textAlign: 'right' }} span={6}>
            <Icon
              style={{ marginRight: '10px', fontSize: '24px', color: '#3866DD' }}
              onClick={() => {
                this.createFolder('select', 'create');
              }}
              type="plus"
            />
          </Col>
        </Row>
        <hr />
        <Row>
          <div style={{ height: 700 }} className="tree-data">
            <label onClick={() => { this.props.getListCampaignInfolderDataAction(-99, '', '', 0, 7) }}><Translate contentKey="campaign-auto.all-campaign" /></label>
            <Tree
              onSelect={(info, { selected }) => {
                console.log(info)
                this.getList(info, selected);
              }}
              showIcon
              // selectable = {false}
              className="draggable-tree"
              defaultExpandAll
              defaultExpandedKeys={this.state.expandedKeys}
              draggable
              blockNode
              onDragEnter={this.onDragEnter}
              onDrop={this.onDrop}
            // showLine = {true}
            >
              {this.state.treeData.map((item, index, arr) => {
                if (item.children && item.children.length) {
                  return (
                    <TreeNode
                      className="tree-node"
                      key={item.key}
                      title={
                        <div style={{ lineHeight: '2' }}>
                          <img src={img_files} /> {item.title}
                        </div>
                      }
                      icon={
                        <Popover
                          overlayClassName="pop-data"
                          content={this.contentPop(item)}
                          title=""
                          placement="bottomRight"
                          visible={item.check}
                          onVisibleChange={(visible) => this.handleVisibleChange(visible, item.id, arr)}
                        >
                          <FontAwesomeIcon className="icon-ball" icon={faEllipsisH} />
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

const mapStateToProps = ({ campaignManagement }: IRootState) => ({
  loading: campaignManagement.loading,
  list_tree_folder: campaignManagement.tree_folder
});

const mapDispatchToProps = {
  openModal,
  closeModal,
  getTreeFolder,
  insertTreeFolder,
  editTreeFolder,
  deleteTreefolder,
  moveTreeFolder,
  getListCampaignInfolderDataAction,
  getNode
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TreeFolder);
