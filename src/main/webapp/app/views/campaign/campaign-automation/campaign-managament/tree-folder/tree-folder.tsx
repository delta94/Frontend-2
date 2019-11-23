import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Translate, translate } from 'react-jhipster';
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

const { confirm } = Modal;

export interface ITreeFolderProps extends StateProps, DispatchProps {
  onClick: Function;
}

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
    const { getTreeFolder } = this.props;
    await getTreeFolder();
    await this.getData();
  };
  getData() {
    const { list_tree_folder } = this.props;
    let { treeData } = this.state;

    let data = list_tree_folder.map(event => {
      let dataChildren = event.cjFolders.map(value => {
        let dataChilMin = value.cjFolders.map(item => {
          return {
            id: item.id,
            title: item.name,
            expanded: item.cjFolders.length > 0 ? true : false,
            isDirectory: item.cjFolders.length > 0 ? true : false,
            parentId: value.id
          };
        });
        return {
          id: value.id,
          title: value.name,
          expanded: value.cjFolders.length > 0 ? true : false,
          isDirectory: value.cjFolders.length > 0 ? true : false,
          parentId: event.id,
          children: dataChilMin
        };
      });
      return {
        id: event.id,
        title: event.name,
        isDirectory: event.cjFolders.length > 0 ? true : false,
        expanded: event.cjFolders.length > 0 ? true : false,
        children: event.cjFolders.length > 0 ? dataChildren : event.cjFolders
      };
    });
    treeData = data;
    this.setState({ treeData: data });
  }

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
    <Row style={{ width: '220px' }}>
      <Row>
        <Col span={12}>
          <Button
            type="primary"
            ghost
            onClick={() => {
              this.createFolder(rowInfo, 'getlist');
            }}
          >
            {' '}
            Xem thông tin
          </Button>
        </Col>
        <Col span={12} style={{ textAlign: 'right' }}>
          <Button
            type="ghost"
            onClick={() => {
              this.createFolder(rowInfo, 'edit');
            }}
          >
            {' '}
            Đổi tên
          </Button>
        </Col>
      </Row>

      <hr />
      <Row>
        <Col span={12}>
          <Button type="primary" onClick={() => this.createFolder(rowInfo, 'create')}>
            {' '}
            Thêm mới
          </Button>
        </Col>
        <Col span={12} style={{ textAlign: 'right' }}>
          <Button
            type="danger"
            onClick={() => {
              this.createFolder(rowInfo, 'delete');
            }}
          >
            {' '}
            Xóa
          </Button>
        </Col>
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
          <Input id="nameTree" />{' '}
        </Col>
      </Row>
    );
    return content;
  }

  createFolder = async (event, option) => {
    const { insertTreeFolder, getTreeFolder, editTreeFolder, deleteTreefolder, getListCampaignInfolderDataAction, onClick } = this.props;

    switch (option) {
      case 'create':
        confirm({
          title: 'Thêm mới',
          content: this.contentCreateFolder(),
          onOk: async () => {
            console.log(event ? event.node.id : null);
            let data = {
              name: $(`#nameTree`).val(),
              parentId: event ? event.node.id : null
            };
            await insertTreeFolder(data);
            await getTreeFolder();
            await this.getData();
          },
          onCancel() {}
        });
        break;
      case 'edit':
        confirm({
          title: 'Chỉnh sửa',
          content: this.contentCreateFolder(),
          onOk: async () => {
            let data = {
              name: {
                name: $(`#nameTree`).val()
              },
              id: event ? event.node.id : null
            };
            await editTreeFolder(data);
            await getTreeFolder();
            await this.getData();
          },
          onCancel() {}
        });
        break;

      case 'delete':
        confirm({
          title: 'Xóa',
          content: 'Bạn thực sự muốn xóa ?',
          onOk: async () => {
            let data = event ? event.node.id : null;
            await deleteTreefolder(data);
            await getTreeFolder();
            await this.getData();
          },
          onCancel() {}
        });

        break;
      case 'getlist':
        getListCampaignInfolderDataAction(event ? event.node.id : null, '', '', 0, 4);
        onClick(event ? event.node.id : null);
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
    if (changeData.length === 2) {
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
      title: 'Di chuyển',
      content: `bạn muốn di chuyên ${nameFolderMove[0].name} vào thư mục ${headerFolder[0].name}`,
      onOk: async () => {
        let data = {
          idChil: nameFolderMove[0].id,
          idParent: headerFolder[0].id
        };
        await moveTreeFolder(data);
        this.setState({ treeData: treeDataChane });
      },
      onCancel() {}
    });
  };

  render() {
    let { treeData } = this.state;
    return (
      <Fragment>
        <Row className="row-sort-tree">
          <Col style={{ textAlign: 'center' }} span={12}>
            <label>THƯ MỤC</label>
          </Col>
          <Col style={{ textAlign: 'right' }} span={12}>
            <Icon style={{ marginRight: '5%', fontSize: '27px' }} onClick={() => this.createFolder(null, 'create')} type="folder-add" />
          </Col>
        </Row>
        <hr />
        <Row>
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
              onChange={treeData => this.onChangeData(treeData)}
            />
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
