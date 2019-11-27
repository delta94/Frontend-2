import React, { Fragment } from 'react';
import { RegisterNode } from 'gg-editor';

class CustomNode extends React.Component {
  render() {
    const configCirle = {
      draw(item) {
        const keyShape = this.drawKeyShape(item);

        // 绘制图标
        const group = item.getGraphicGroup();
        const model = item.getModel();

        group.addShape('image', {
          attrs: {
            x: -50,
            y: -50,
            width: 100,
            height: 100,
            img: model.icon
          }
        });

        // 绘制标签
        this.drawLabel(item);

        return keyShape;
      },

      anchor: [
        // [0.5, 0],
        // [0.5, 1],
        // [0 , 0.5],
        [1, 0.5]
      ]
    };

    const configFlow = {
      draw(item) {
        const keyShape = this.drawKeyShape(item);

        // 绘制图标
        const group = item.getGraphicGroup();
        const model = item.getModel();

        group.addShape('image', {
          attrs: {
            x: -50,
            y: -50,
            width: 100,
            height: 100,
            img: model.icon
          }
        });

        // 绘制标签
        this.drawLabel(item);

        return keyShape;
      },

      anchor: [
        // [0.5, 0],
        // [0.5, 1],
        [0, 0.5],
        [1, 0.5]
      ]
    };
    const configCirleMulti = {
      draw(item) {
        const keyShape = this.drawKeyShape(item);

        // 绘制图标
        const group = item.getGraphicGroup();
        const model = item.getModel();

        group.addShape('image', {
          attrs: {
            x: -50,
            y: -50,
            width: 100,
            height: 100,
            img: model.icon
          }
        });

        // 绘制标签
        this.drawLabel(item);

        return keyShape;
      },

      anchor: [
        // [0.5, 0],
        // [0.5, 1],
        [0, 0.5],
        [1, 0.5]
      ]
    };

    const configCondition = {
      draw(item) {
        const keyShape = this.drawKeyShape(item);

        // 绘制图标
        const group = item.getGraphicGroup();
        const model = item.getModel();

        group.addShape('image', {
          attrs: {
            x: -50,
            y: -50,
            width: 100,
            height: 100,
            img: model.icon
          }
        });

        // 绘制标签
        this.drawLabel(item);

        return keyShape;
      },

      anchor: [[0.5, 0], [0.5, 1], [0, 0.5], [1, 0.5]]
    };

    return (
      <Fragment>
        <RegisterNode name="custom-node-circle" config={configCirle} extend={'flow-circle'} />
        <RegisterNode name="custom-node-circle-multi" config={configCirleMulti} extend={'flow-circle'} />
        <RegisterNode name="custom-node-flow" config={configFlow} extend={'flow-rect'} />
        <RegisterNode name="custom-node-rhombus" config={configCondition} extend={'flow-rhombus'} />
      </Fragment>
    );
  }
}

export default CustomNode;
