import React, { Fragment } from 'react';
import { NodeMenu, EdgeMenu, GroupMenu, MultiMenu, CanvasMenu, ContextMenu } from 'gg-editor';
import MenuItem from './menu-item';
import './index.scss';
import { Icon } from 'antd';

interface IFlowContextMenuProps {
  onClick: Function;
}

class FlowContextMenu extends React.Component<IFlowContextMenuProps, any> {
  constructor(props) {
    super(props);
  }
  onClick = () => {
    this.props.onClick(true);
  };

  render() {
    return (
      <Fragment>
        <ContextMenu className="contextMenu">
          <NodeMenu>
            <MenuItem command="copy" />
            <MenuItem command="delete" />
            <div className="item" onClick={this.onClick}>
              <Icon type="search" />
              <span>Edit</span>
            </div>
          </NodeMenu>
          <EdgeMenu>
            <MenuItem command="delete" />
          </EdgeMenu>
          <GroupMenu>
            <MenuItem command="copy" />
            <MenuItem command="delete" />
            <MenuItem command="unGroup" icon="ungroup" text="Ungroup" />
          </GroupMenu>
          <MultiMenu>
            <MenuItem command="copy" />
            <MenuItem command="paste" />
            <MenuItem command="addGroup" icon="group" text="Add Group" />
            <MenuItem command="delete" />
          </MultiMenu>
          <CanvasMenu>
            <MenuItem command="undo" />
            <MenuItem command="redo" />
            <MenuItem command="pasteHere" icon="paste" text="Paste Here" />
          </CanvasMenu>
        </ContextMenu>
      </Fragment>
    );
  }
}

export default FlowContextMenu;
