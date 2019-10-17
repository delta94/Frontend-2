import React from 'react';
import { connect } from 'react-redux';
import { Button, Table, Badge, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label } from 'reactstrap';
import { Input, Tag, Row, Col, Collapse } from 'antd';
import { AvForm } from 'availity-reactstrap-validation';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Translate, translate } from 'react-jhipster';
import './merge.scss';
import Ionicon from 'react-ionicons';
import { getListDuplicateAction } from 'app/actions/user-management';
import { IRootState } from 'app/reducers';
import LoaderAnim from 'react-loaders';
import Loader from 'react-loader-advanced';
import { openModal, closeModal } from 'app/actions/modal';

const { Panel } = Collapse;

const { Search } = Input;

const styleDiv = {
  chose: {
    color: '#FFFFFF',
    background: '#3866DD'
  },
  unchose: {
    color: '#343A40',
    background: 'white'
  }
};
export interface IMergeProps extends StateProps, DispatchProps {
  onClick: Function;
  id: string;
  email: string;
  phone: string;
}

export interface IMergeState {
  modal: boolean;
  current: number;
  check: boolean;
  is_chose: boolean;
  valueBtn1: string;
  valueBtn2: string;
  valueBtn3: string;
}

export class Merge extends React.Component<IMergeProps, IMergeState> {
  state: IMergeState = {
    modal: false,
    current: 0,
    check: false,
    is_chose: true,
    valueBtn1: '',
    valueBtn2: '',
    valueBtn3: ''
  };

  toggle = () => {
    let { email, phone, id } = this.props;
    this.setState({
      modal: !this.state.modal,
      check: false,
      current: 0
    });
    this.props.getListDuplicateAction(id, email, phone);
  };
  onChange = e => {
    this.setState({ check: e.target.checked });
  };

  contentStepInfo = () => {
    const { loading, listDuplicateUser } = this.props;
    let data = (
      <Row>
        <Col span={24}>
          <div className="option-create">
            <div>
              <Label>
                <Translate contentKey="userManagement.infomation.merge.is-merge" />
              </Label>
            </div>
            <Search maxLength={160} placeholder="input search text" onSearch={value => console.log(value)} style={{ width: 200 }} />
          </div>
          <div>
            <Table id="table-merge" striped>
              <thead>
                <tr className="text-center">
                  <th className="hand" id="name-duplicate">
                    <Translate contentKey="userManagement.home.customer-name" />
                  </th>
                  <th className="hand">
                    <Translate contentKey="userManagement.home.email" />
                  </th>
                  <th className="hand">
                    <Translate contentKey="userManagement.home.date-create" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {listDuplicateUser.length > 0 ? (
                  listDuplicateUser.map((event, index) => {
                    return (
                      <tr key={index}>
                        <td>{event.firstName + event.lastName}</td>
                        <td>{event.email}</td>
                        <td>{event.mobile}</td>
                        <td>
                          <Input type="radio" name="gender" value={event.id} onChange={this.onChange} />
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <td colSpan={4}> không có bản ghi nào</td>
                )}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    );
    return data;
  };

  contentChosseContact = () => {
    let { is_chose } = this.state;
    let data = (
      <Row>
        <Col span={24}>
          <div className="option-create" style={{ textAlign: 'center' }}>
            <div>
              <Label>contact trùng 2 trường update .....</Label>
            </div>

            <Row className="merge-customer_chose">
              <Col
                span={12}
                className="box-chose left-box"
                onClick={() => this.setState({ is_chose: true, check: true })}
                style={!is_chose ? styleDiv.unchose : styleDiv.chose}
              >
                <p>Khách hàng A</p>
                <label>saldjaskjd@gmail.com</label>
              </Col>
              <Col
                span={12}
                className="box-chose right-box"
                onClick={() => this.setState({ is_chose: false, check: true })}
                style={is_chose ? styleDiv.unchose : styleDiv.chose}
              >
                <p> Khách hàng A</p>
                <label>saldjaskjd@gmail.com</label>
              </Col>
            </Row>
            <div />
            <Collapse className="merge-collapse" bordered={false} expandIconPosition="right" defaultActiveKey={['1']}>
              <Panel header="Ẩn chi tiết" key="1">
                <div>
                  <Table id="table-merge" striped>
                    <thead>
                      <tr className="text-center">
                        <th className="hand" id="name-duplicate" />
                        <th className="hand">Khách hàng A</th>
                        <th className="hand">Khách hàng B</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Sở thích </td>
                        <td>A </td>
                        <td>B </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Panel>
            </Collapse>
          </div>
        </Col>
      </Row>
    );
    return data;
  };

  stepConfirm = () => {
    let data = (
      <Row>
        <Col span={24}>
          <div>
            <Label className="head-text">
              <Translate contentKey="properties-management.delete.head-title" />
            </Label>
          </div>
          <div>
            <Col span={24} className="group-btn-delete">
              <Col span={2}>
                <Input
                  type="checkbox"
                  onClick={() => {
                    this.setState({ valueBtn1: $('#btn1').prop('checked') });
                  }}
                  value="a"
                  id="btn1"
                />{' '}
              </Col>
              <Col span={22}>
                <Label for="btn1" className="text">
                  <Translate contentKey="properties-management.delete.content-title-1" />
                </Label>
              </Col>
            </Col>
          </div>
          <div>
            <Col span={24} className="group-btn-delete">
              <Col span={2}>
                <Input
                  type="checkbox"
                  onClick={() => {
                    this.setState({ valueBtn2: $('#btn2').prop('checked') });
                  }}
                  value="b"
                  id="btn2"
                />{' '}
              </Col>
              <Col span={22}>
                <Label for="btn2" className="text">
                  <Translate contentKey="properties-management.delete.content-title-2" />
                </Label>
              </Col>
            </Col>
          </div>
          <div>
            <Col span={24} className="group-btn-delete">
              <Col span={2}>
                <Input
                  type="checkbox"
                  onClick={() => {
                    this.setState({ valueBtn3: $('#btn3').prop('checked') });
                  }}
                  value="c"
                  id="btn3"
                />{' '}
              </Col>
              <Col span={22}>
                <Label for="btn3" className="text">
                  <Translate contentKey="properties-management.delete.content-title-3" />
                </Label>
              </Col>
            </Col>
          </div>
        </Col>
      </Row>
    );
    return data;
  };

  stepTable = () => {
    let data = [
      {
        title: 'First',
        content: this.contentStepInfo()
      },
      {
        title: 'Second',
        content: this.contentChosseContact()
      },
      {
        title: 'Last',
        content: this.stepConfirm()
      }
    ];
    return data;
  };

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current, check: false });
    if (current === 1) {
      this.setState({ check: true });
    }
  }

  render() {
    const { loading, listDuplicateUser } = this.props;
    const { current, check } = this.state;
    return (
      <span className="d-inline-block mb-2 mr-2">
        <Button className="btn float-right jh-create-entity" outline color="primary" onClick={this.toggle}>
          <Ionicon color="#343A40" icon="md-git-merge" /> &nbsp; Merge
        </Button>

        <Modal isOpen={this.state.modal} id="content-properties">
          <PerfectScrollbar>
            <ModalHeader toggle={this.toggle} id="create-properties">
              <Translate contentKey="userManagement.infomation.merge.title" />
            </ModalHeader>
            <ModalBody>
              <AvForm>
                <div className="steps-content">{this.stepTable()[current].content}</div>
              </AvForm>
            </ModalBody>
            <ModalFooter>
              <div className="steps-action">
                {current > 0 && (
                  <Button id="btn-prev" color="linkaaaaa" onClick={() => this.prev()}>
                    Previous
                  </Button>
                )}
                <Button color="link" onClick={this.toggle}>
                  <Translate contentKey="properties-management.cancel" />
                </Button>

                {current < this.stepTable().length - 1 && (
                  <Button
                    disabled={!this.state.check}
                    color="primary"
                    onClick={() => {
                      this.next();
                    }}
                  >
                    Tiếp tục
                  </Button>
                )}
                {current === this.stepTable().length - 1 && (
                  <Button
                    color="primary"
                    disabled={this.state.valueBtn1 && this.state.valueBtn2 && this.state.valueBtn3 && !loading ? false : true}
                    onClick={() => {
                      this.props.onClick();
                      this.toggle();
                    }}
                  >
                    <Translate contentKey="userManagement.home.merge" />
                  </Button>
                )}
              </div>
            </ModalFooter>
          </PerfectScrollbar>
        </Modal>
      </span>
    );
  }
}
const mapStateToProps = ({ userManagement }: IRootState) => ({
  loading: userManagement.loading,
  listDuplicateUser: userManagement.listDuplicateUser
});

const mapDispatchToProps = {
  openModal,
  closeModal,
  getListDuplicateAction
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Merge);
