import React from 'react';
import '../button-dialog/button-dialog.scss';
import { Button } from 'reactstrap';
import { DropdownList } from 'react-widgets';
import Ionicon from 'react-ionicons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { IRootState } from 'app/reducers';
import { getCustomer } from '../../../../../../../../actions/user-campaign';
import { IListNewCustomer } from 'app/common/model/campaign-new-customer.model';

library.add(faSpinner);
export interface IButtonDialogProps extends StateProps, DispatchProps {
  onClick: Function;
  value: ReadonlyArray<IListNewCustomer>;
}

export interface IButtonDialogState {
  shareholders: any[];
  people: any[];
  value: any[];
  valueList: any[];
}
class ButtonDialog extends React.Component<IButtonDialogProps, IButtonDialogState> {
  state: IButtonDialogState = {
    shareholders: [{ name: '' }],
    people: [],
    value: [],
    valueList: []
  };

  handleAddShareholder = () => {
    this.setState({
      shareholders: this.state.shareholders.concat([{ name: '' }])
    });
  };

  handleRemoveShareholder = (idx, value) => () => {
    this.setState({
      shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx)
    });
  };

  onChangeList = value => {
    this.setState({
      value
    });
    this.props.onClick(this.state.value);
  };

  render() {
    let { value, people } = this.state;
    people = this.props.value
      .filter(item => item.categories)
      .map(event => {
        return event.categories;
      });
    return (
      <form className="form-button">
        {this.state.shareholders.map((shareholder, idx) => (
          <div className="shareholder" key={idx + 1}>
            <DropdownList data={people} allowCreate="onFilter" onChange={this.onChangeList} textField="name" />

            <Button onClick={this.handleRemoveShareholder(idx, this.state.value)} className="pe-7s-close" />
          </div>
        ))}

        <Button className="btn-icon" onClick={this.handleAddShareholder}>
          <Ionicon fontSize="35px" color="#333" icon="ios-add" />
        </Button>
      </form>
    );
  }
}

const mapStateToProps = ({ userCampaign }: IRootState) => ({
  loading: userCampaign.loading,
  listCustomer: userCampaign.listNewCustomer
});

const mapDispatchToProps = { getCustomer };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonDialog);
