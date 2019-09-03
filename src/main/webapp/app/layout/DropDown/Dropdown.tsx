import { PureComponent } from 'react';
import React from 'react';
import './Dropdown.scss';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface IArrayEntity {
  id?: number;
  name?: string;
}

export interface IDropdownState {
  isShow: boolean;
  value: string;
}

export interface IDropdownProps {
  listArray?: IArrayEntity[];
  defaultValue?: string;
  width?: number;
  height?: number;
  display?: string;
  toggleDropdown?: Function;
  selection: boolean;
}

const styleDropdown = (width?: number, height?: number, display?: string): Object => ({
  width,
  height,
  display
});

const id = (Date.now() / 1000).toString();

class Dropdown extends PureComponent<IDropdownProps, IDropdownState> {
  constructor(props) {
    super(props);
  }

  state = {
    isShow: false,
    value: ''
  };

  toggleDropdown = item => {
    let isShow: boolean = this.state.isShow;
    let data: IArrayEntity = item;
    this.props.toggleDropdown(data, isShow);
  };

  componentDidMount() {
    if (this.props.selection) {
      var allDropSelection = document.querySelectorAll(
        `div.topica-dropdown, div.toggle-dropdown, div.topica-dropdown-menu , div.topica-dropdown-item`
      );

      allDropSelection.forEach((item, index) => {
        item.addEventListener('mousedown', e => {
          e.preventDefault();
        });
      });
    }
  }

  render(defaultValue = this.props.defaultValue, value = this.state.value, isShow = this.state.isShow, width = this.props.width) {
    const listArray = this.props.listArray;

    return (
      <div id={id} className="topica-dropdown" style={{ width: width ? width + 'px' : '150px' }}>
        <div
          id={id}
          className="toggle-dropdown"
          onClick={() => {
            event.preventDefault();
            this.setState({ isShow: !isShow });
          }}
        >
          {value === '' ? defaultValue : value}
          <FontAwesomeIcon icon={faAngleDown} size="1x" />
        </div>
        <div id={id} className="topica-dropdown-menu" style={{ display: isShow ? 'block' : 'none' }}>
          {listArray.map((item, index) => {
            return (
              <div
                id={id}
                key={index}
                onClick={event => {
                  event.preventDefault();
                  this.setState({ isShow: false, value: item.name }), this.toggleDropdown(item);
                }}
                className="topica-dropdown-item"
              >
                <label>{item.name}</label>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Dropdown;
