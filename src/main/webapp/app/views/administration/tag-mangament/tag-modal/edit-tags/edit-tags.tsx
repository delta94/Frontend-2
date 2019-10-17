import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Input, AutoComplete } from 'antd';
import { Translate } from 'react-jhipster';

interface ITagEditProps extends StateProps, DispatchProps {
  singleModalData: ITagEditUpdateEntity;
  updateValueFromTagEdit: Function;
}

interface ITagEditState {}

interface ITagEditUpdateEntity {
  name?: string;
  description?: string;
  id?: string;
}

class TagEdit extends React.Component<ITagEditProps, ITagEditState> {
  state = {};

  componentDidMount() {
    let { singleModalData } = this.props;
    this.setState({ singleModalData });
    $('.tab-info').keypress(function(event) {
      if (event.keyCode === 9) {
        console.log('ok');
        $(this)
          .next()
          .focus();
      }

      if (event.shiftKey && event.keyCode === 9) {
        $(this)
          .prev()
          .focus();
      }
    });
  }

  handleInput = (value, type) => {
    let { singleModalData } = this.props;

    singleModalData[type] = value;
    this.setState({ singleModalData });
    this.props.updateValueFromTagEdit(singleModalData);
  };

  componentWillUnmount() {
    $('.tab-info').off();
  }

  render() {
    let { singleModalData } = this.props;

    return (
      <div className="tag-edit">
        <div className="tag-modal-content no-color">
          <div className="tag-edit-attribute">
            <Translate contentKey="tag-management.tag-name" />
            <Input
              className="tab-info"
              id="name"
              type="text"
              placeholder="Tên"
              value={singleModalData.name}
              onChange={event => this.handleInput(event.target.value, 'name')}
              maxLength={160}
            />
          </div>
          <div className="tag-edit-attribute">
            <Translate contentKey="tag-management.tag-description" />
            <Input
              className="tab-info"
              id="decription"
              type="text"
              placeholder="Mô tả"
              value={singleModalData.description}
              onChange={event => this.handleInput(event.target.value, 'description')}
              maxLength={160}
            />
          </div>
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
