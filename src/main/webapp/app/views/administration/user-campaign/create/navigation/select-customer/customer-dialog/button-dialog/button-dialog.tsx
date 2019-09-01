import React from 'react';
import ReactDOM from 'react-dom';
import '../button-dialog/button-dialog.scss';
import { Button } from 'reactstrap';
import { DropdownList } from 'react-widgets';
import Ionicon from 'react-ionicons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

let colors = ['Orange', 'Red', 'Blue', 'Purple'];

library.add(faSpinner);
export interface IncorporationFormProps {}

export interface IncorporationFormState {
  activeTab: string;
  name: string;
  shareholders: any[];
  dropdownOpen: boolean;
  people: any[];
  value: any[];
  valueList: any[];
}
class IncorporationForm extends React.Component<IncorporationFormProps, IncorporationFormState> {
  state: IncorporationFormState = {
    name: '',
    shareholders: [{ name: '' }],
    activeTab: '',
    dropdownOpen: false,
    people: colors,
    value: [],
    valueList: []
  };

  handleAddShareholder = () => {
    this.setState({
      shareholders: this.state.shareholders.concat([{ name: '' }])
    });
  };

  handleRemoveShareholder = idx => () => {
    this.setState({
      shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx)
    });
  };

  handleCreate(name) {
    let { people, value } = this.state;

    let newOption = {
      name,
      id: people.length + 1
    };

    this.setState({
      value: [...value, newOption], // select new option
      people: [...people, newOption] // add new option to our dataset
    });
  }
  onChangeList = value => {
    this.setState({
      value
    });
    this.state.valueList.push(value);
    console.log(this.state.valueList);
  };

  render() {
    let { value, people } = this.state;
    return (
      <form className="form-button">
        {this.state.shareholders.map((shareholder, idx) => (
          <div className="shareholder" key={idx + 1}>
            <DropdownList
              data={people}
              allowCreate="onFilter"
              onCreate={name => this.handleCreate(name)}
              onChange={this.onChangeList}
              textField="name"
            />

            <Button onClick={this.handleRemoveShareholder(idx)} className="pe-7s-close" />
          </div>
        ))}

        <Button className="btn-icon" onClick={this.handleAddShareholder}>
          <Ionicon fontSize="35px" color="#333" icon="ios-add" />
        </Button>
      </form>
    );
  }
}

export default IncorporationForm;
