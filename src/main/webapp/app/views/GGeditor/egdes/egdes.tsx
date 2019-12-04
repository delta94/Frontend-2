import React from 'react';
import { RegisterEdge } from 'gg-editor';

class CustomEdge extends React.Component {
  render() {
    const config = {
      getStyle(item) {
        item.model = {
          id: item.getModel().id,
          source: item.getModel().source,
          sourceAnchor: item.getModel().sourceAnchor,
          target: item.getModel().target,
          targetAnchor: item.getModel().targetAnchor,
          type: 'edge'
        };
        const model = item.getModel();
        const { color, size } = model;

        return {
          stroke: color || '#E7F0F9',
          lineWidth: size || 5,
          endArrow: true
        };
      }
    };
    return <RegisterEdge name="custom-edge" config={config} extend={'flow-polyline'} />;
  }
}

export default CustomEdge;
