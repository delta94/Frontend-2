import React from 'react';
import GGEditorContext from '../../../common/context/GGEditorContext';

export default function(WrappedComponent) {
  interface IInjectGGEditorContextProps {
    forwardRef: any;
  }

  class InjectGGEditorContext extends React.Component<IInjectGGEditorContextProps, any> {
    render() {
      const { forwardRef, ...rest } = this.props;

      return <GGEditorContext.Consumer>{context => <WrappedComponent ref={forwardRef} {...rest} {...context} />}</GGEditorContext.Consumer>;
    }
  }

  return React.forwardRef((props, ref) => <InjectGGEditorContext {...props} forwardRef={ref} />);
}
