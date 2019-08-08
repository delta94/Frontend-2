import React from 'react';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';

export interface ICustomAsyncSelectProps {
  cacheOptions?: boolean;
  getOptionValue?: Function;
  getOptionLabel?: Function;
  matchPos?: string;
  loadOptions?: Function;
  value?: any;
  placeholder?: any;
  name?: string;
  isClearable?: boolean;
  onChange?: Function;
  isDisabled?: boolean;
  isValid?: boolean;
  defaultOptions?: boolean;
  isMulti?: boolean;
}

export interface ICustomAsyncSelectState {
  isFocused: boolean;
}

class CustomAsyncSelect extends React.Component<ICustomAsyncSelectProps, ICustomAsyncSelectState> {
  render() {
    const { isValid } = this.props;
    const customStyles = {
      control: (base, state) => ({
        ...base,
        // state.isFocused can display different borderColor if you need it
        borderColor: state.isFocused ? '#ddd' : null === isValid || undefined === isValid || true === isValid ? '#ddd' : 'red'
        // overwrittes hover style
        // '&:hover': {
        //   borderColor: state.isFocused ? '#ddd' : isValid ? '#ddd' : 'red'
        // }
      })
    };
    return <AsyncSelect styles={customStyles} {...this.props} />;
  }
}

export default CustomAsyncSelect;
