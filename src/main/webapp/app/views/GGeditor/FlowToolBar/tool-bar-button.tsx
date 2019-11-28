import React from 'react';
import { Tooltip } from 'antd';
import { Command } from 'gg-editor';
import upperFirst from 'lodash/upperFirst';
import IconFont from '../IconFont/index';
import './flow-tool-bar.scss';

const ToolbarButton = props => {
  const { command, icon, text } = props;

  return (
    <Command name={command}>
      <Tooltip title={text || upperFirst(command)} placement="bottom" overlayClassName="tooltip">
        <IconFont type={`icon-${icon || command}`} />
      </Tooltip>
    </Command>
  );
};

export default ToolbarButton;