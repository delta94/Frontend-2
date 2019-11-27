import React, { Fragment } from 'react';
import { connect, DispatchProp } from 'react-redux';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/reducers';
import LoaderAnim from 'react-loaders';
import { getCjTagsAction, deleteCjTagAction } from 'app/actions/cj-tag';
import { List, Typography, Icon } from 'antd';

interface ICjTagListModalProps extends StateProps, DispatchProps {
  isOpenModalCjTag?: boolean;
  toogleModalCjTagList?: Function;
  closeModalCjTag?: Function;
}

interface ICjTagListModalState {}

class CJTagListModal extends React.Component<ICjTagListModalProps, ICjTagListModalState> {
  state: ICjTagListModalState = {};

  componentDidMount() {
    this.props.getCjTagsAction('');
  }

  deleteCjTag = cjTag => {
    this.props.deleteCjTagAction(cjTag.id);
  };

  render() {
    let { isOpenModalCjTag, closeModalCjTag, toogleModalCjTagList, cjTags } = this.props;
    return (
      <Modal id="modal-cj-tag-list" isOpen={isOpenModalCjTag}>
        <ModalHeader toggle={toogleModalCjTagList}>Danh sách tag</ModalHeader>
        <ModalBody>
          <List
            style={{ color: '#3866DD' }}
            bordered
            dataSource={cjTags}
            renderItem={(item, index) => (
              <List.Item
                key={index}
                actions={[
                  <span
                    style={{ color: 'red' }}
                    onClick={() => {
                      this.deleteCjTag(cjTags[index]);
                    }}
                  >
                    <FontAwesomeIcon icon="trash" />
                    <a key="list-loadmore-edit" style={{ paddingLeft: '5px' }}>
                      Xóa
                    </a>
                  </span>
                ]}
              >
                <div className="cj-tag-name">{item.name}</div>
              </List.Item>
            )}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="link" onClick={closeModalCjTag}>
            Hủy bỏ
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ cjTagState }: IRootState) => ({
  cjTags: cjTagState.cj_tags
});

const mapDispatchToProps = {
  getCjTagsAction,
  deleteCjTagAction
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CJTagListModal);
