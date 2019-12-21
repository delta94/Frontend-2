import React from 'react';
import { Card } from 'antd';
import { Minimap } from 'gg-editor';

const EditorMinimap = () => {
  return (
    <Card type="inner" size="default" title="Minimap" bordered={false}>
      <Minimap width={500} height={500} />
    </Card>
  );
};

export default EditorMinimap;
