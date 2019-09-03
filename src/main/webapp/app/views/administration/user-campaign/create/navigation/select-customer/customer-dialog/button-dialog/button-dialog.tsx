import React from 'react';
import '../button-dialog/button-dialog.scss';
import { Button } from 'reactstrap';
import { DropdownList } from 'react-widgets';
import Ionicon from 'react-ionicons';
import { connect } from 'react-redux';
import { IRootState } from 'app/reducers';
import { getCustomer } from '../../../../../../../../actions/user-campaign';
import { IListNewCustomer } from 'app/common/model/campaign-new-customer.model';

export interface IButtonDialogProps extends StateProps, DispatchProps {
  onClick: Function;
  value: ReadonlyArray<IListNewCustomer>;
}

export interface IButtonDialogState {
  valueList: any[];
  shareholders: any[];
  data: any[];
  value: [];
}
class ButtonDialog extends React.Component<IButtonDialogProps, IButtonDialogState> {
  state: IButtonDialogState = {
    valueList: [],
    shareholders: [{ value: '' }],
    data: [],
    value: []
  };
  componentDidMount() {
    this.setState({
      data: this.props.value
        .filter(item => item.categories)
        .map(event => {
          return event.categories;
        })
    });
  }

  handleAddShareholder = () => {
    this.setState({
      shareholders: this.state.shareholders.concat([{ value: this.state.value }])
    });
  };

  handleRemoveShareholder = (idx, value) => () => {
    this.setState({
      shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx)
    });

    this.state.shareholders.filter((s, sidx, arr) => {
      if (s.value !== '') this.state.data.push(s.value);
    });

    console.log(this.state.data);
  };

  onChangeList = value => {
    this.setState({
      value: value
    });
    this.state.valueList.push(value);
  };

  render() {
    let { value, data } = this.state;

    return (
      <form className="form-button">
        {this.state.shareholders.map((shareholder, idx) => (
          <div className="shareholder" key={idx + 1}>
            <DropdownList data={data} allowCreate="onFilter" onChange={this.onChangeList} textField="name" />

            <Button onClick={this.handleRemoveShareholder(idx, value)} className="pe-7s-close" />
          </div>
        ))}

        <Button
          className="btn-icon"
          onClick={() => {
            this.handleAddShareholder();
            this.setState({
              data: data.filter(item => item !== value)
            });
          }}
        >
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
