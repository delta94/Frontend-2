import React from 'react';
import Select from 'react-select';

export interface ICustomSelectProps {
  isValid?: boolean;
  options?: any;
  value?: any;
  placeholder?: any;
  name?: string;
  isClearable?: boolean;
  onChange?: Function;
  onInputChange?: Function;
  isDisabled?: boolean;
}

export interface ICustomSelectState {
  isFocused: boolean;
}

class CustomSelect extends React.Component<ICustomSelectProps, ICustomSelectState> {
  render() {
    const { isValid } = this.props;

    const customStyles = {
      control: (base, state) => ({
        ...base,
        // state.isFocused can display different borderColor if you need it
        borderColor: state.isFocused ? '#ddd' : isValid ? '#ddd' : 'red'
        // overwrittes hover style
        // '&:hover': {
        //   borderColor: state.isFocused ? '#ddd' : isValid ? '#ddd' : 'red'
        // }
      })
    };
    return <Select styles={customStyles} {...this.props} />;
  }
}

export default CustomSelect;
