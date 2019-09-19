import { PureComponent } from 'react';
import React from 'react';
import './Dropdown.scss';
import { faAngleDown, faWindowMinimize } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface IArrayEntity {
  id: number;
  name: string;
}

export interface IDropdownState {
  isShow: boolean;
  value: string;
  classNameMenu: string;
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

class Dropdown extends PureComponent<IDropdownProps, IDropdownState> {
  constructor(props) {
    super(props);
  }

  state = {
    isShow: false,
    value: 'Chọn giá trị',
    classNameMenu: 'topica-dropdown-menu show'
  };

  timeNew = new Date().getTime();
  id = this.timeNew.toString();

  toggleDropdown = item => {
    let { selection } = this.props;

    if (selection) {
      this.props.toggleDropdown(item);
    }
  };

  componentDidMount() {
    let { defaultValue } = this.props;
    let { value } = this.state;

    if (defaultValue) {
      value = defaultValue;
    }

    window.onclick = function(event) {
      let match = event.target.className;
      if (match !== 'toggle-data') {
        var dropdowns = document.getElementsByClassName('topica-dropdown-menu show');
        for (let i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      } else {
        event.stopImmediatePropagation();
      }
    };

    this.setState({ value });
  }

  limitString = (value: string) => {
    let newValue = '';
    if (value.length > 15) {
      for (let i = 0; i < 15; i++) {
        newValue += value[i];
      }

      newValue += '...';
    } else {
      newValue = value;
    }
    return newValue;
  };

  render() {
    const { listArray, defaultValue, width } = this.props;
    const { value, isShow, classNameMenu } = this.state;

    return (
      <div
        className="topica-dropdown"
        style={{
          width: width ? width + 'px' : '150px'
        }}
        onClick={() => {
          this.setState({ classNameMenu: 'topica-dropdown-menu show' });
        }}
      >
        <div
          className={isShow ? 'toggle-dropdown-btn active' : 'toggle-dropdown-btn'}
          onClick={() => {
            this.setState({ isShow: !isShow });
          }}
        >
          <div className="toggle-data">{value ? this.limitString(value) : this.limitString(defaultValue)}</div>
          <div className="toggle-icon">
            <FontAwesomeIcon icon={faAngleDown} size="1x" />
          </div>
        </div>
        <div id={this.id} className={isShow ? 'topica-dropdown-menu show' : 'topica-dropdown-menu'}>
          {listArray &&
            listArray.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    console.log(item);
                    this.toggleDropdown(item);
                    this.setState({ isShow: false, value: item.name });
                  }}
                  style={{
                    color: value === item.name ? 'white' : 'black',
                    backgroundColor: value === item.name ? 'rgb(56, 102, 221)' : ''
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
