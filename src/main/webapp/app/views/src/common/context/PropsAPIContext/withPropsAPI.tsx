import React from 'react';
import PropsAPIContext from '../../../common/context/PropsAPIContext';

export default function(WrappedComponent) {
  interface IInjectPropsAPIProps {
    forwardRef: any;
  }

  class InjectPropsAPI extends React.Component<IInjectPropsAPIProps, any> {
    render() {
      const { forwardRef, ...rest } = this.props;

      return (
        <PropsAPIContext.Consumer>
          {propsAPI => <WrappedComponent ref={forwardRef} {...rest} propsAPI={propsAPI} />}
        </PropsAPIContext.Consumer>
      );
    }
  }

  return React.forwardRef((props, ref) => <InjectPropsAPI {...props} forwardRef={ref} />);
}
