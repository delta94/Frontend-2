import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Input } from 'antd';

interface ITagEditProps extends StateProps, DispatchProps {
  dataModal: any;
  singleModalData: any;
  updateValueFromTagEdit: Function;
}

interface ITagEditState {
  singleModalData: ITagEditUpdateEntity;
}

interface ITagEditUpdateEntity {
  name?: string;
  description?: string;
  id?: string;
}

class TagEdit extends React.Component<ITagEditProps, ITagEditState> {
  state = {
    dataModal: [],
    singleModalData: {
      name: '',
      description: '',
      id: ''
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.singleModalData !== prevState.singleModalData) {
      return { singleModalData: nextProps.singleModalData };
    }
    return null;
  }

  handleInput = (value, type) => {
    let { singleModalData } = this.state;
    singleModalData[type] = value;
    let updateTag = { id: singleModalData.id, description: singleModalData.description, name: singleModalData.name };
    this.setState({ singleModalData });
    this.props.updateValueFromTagEdit(updateTag);
  };

  render() {
    let { singleModalData } = this.state;

    return (
      <div className="tag-delete">
        <div className="tag-modal-content no-color">
          <p>Name</p>
          <Input
            id="name"
            type="text"
            placeholder="Tên"
            value={singleModalData.name}
            onChange={event => this.handleInput(event.target.value, 'name')}
          />
          <p>Descrition</p>
          <Input
            id="decription"
            type="text"
            placeholder="Mô tả"
            value={singleModalData.description}
            onChange={event => this.handleInput(event.target.value, 'description')}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TagEdit);
