import React from 'react';
import { IRootState } from 'app/reducers';
import { Input, Icon, Checkbox, Menu, Card, Dropdown } from 'antd';
import { Button } from 'app/DemoPages/Components/GuidedTours/Examples/Button';

interface IFieldData {
  id: string;
  type: string;
  title: string;
  fieldValue?: any;
  personalizationTag: string;
}

interface IFieldDataProps extends StateProps, DispatchProps {
  fieldData: IFieldData;
  setFieldDataFromFieldCpn: Function;
}

interface IFieldDataState {
  fieldData: IFieldData;
}

interface IItemCheckBox {}

class FieldData extends React.Component<IFieldDataProps, IFieldDataState> {
  state = {
    fieldData: {
      id: '',
      type: '',
      title: '',
      fieldValue: '',
      personalizationTag: ''
    }
  };

  choseType = () => {};

  menuField = () => (
    <Menu onClick={() => this.choseType()}>
      <Menu.Item key="1">1st menu item</Menu.Item>
      <Menu.Item key="2">2nd menu item</Menu.Item>
      <Menu.Item key="3">3rd item</Menu.Item>
    </Menu>
  );

  render() {
    let { fieldData } = this.props;

    return (
      <div className="field-data">
        <Dropdown overlay={this.menuField}>
          <Button>
            Button <Icon type="down" />
          </Button>
        </Dropdown>
        <Dropdown overlay={this.menuField}>
          <Button>
            Button <Icon type="down" />
          </Button>
        </Dropdown>
        <Dropdown overlay={this.menuField}>
          <Button>
            Button <Icon type="down" />
          </Button>
        </Dropdown>
      </div>
    );
  }
}

const mapStateToProps = ({ tagDataState }: IRootState) => ({});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default FieldData;
