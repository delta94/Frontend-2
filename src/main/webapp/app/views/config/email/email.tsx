import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Input, Icon, Row, Tag, Button, Popover as PopverAnt, Progress } from 'antd';
import { Table } from 'reactstrap';

import { Translate, translate } from 'react-jhipster';
import { IRootState } from 'app/reducers';
import LoaderAnim from 'react-loaders';
import SweetAlert from 'sweetalert-react';

export interface IEmailManagementProps extends StateProps, DispatchProps {}
export interface IEmailManagementState {}
class EmailManagement extends React.Component<IEmailManagementProps, IEmailManagementState> {
  state = {};
  render() {
    return (
      <div className="email-management">
        <div id="title-common-header">
          <label>Quản lý email</label>
        </div>
        <Fragment>
        <Row>
                <label className="label-search">Tìm kiếm email</label> &nbsp;
                <Input
                  style={{ float: 'right' }}
                  id="searchText"
                  prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  value={''}
                  placeholder="Nhập từ khóa"
                
                />
            </Row>
          <Row>
          <Table striped>
              <thead>
                <tr className="text-center">
                  <th className="checkbox-td" colSpan={5}>
                    STT
                  </th>
                  <th colSpan={25}>Tên email</th>
                  <th colSpan={25} id="status">
                   Tiêu đề email
                  </th>
                  <th colSpan={25} style={{ width: '25%' }}>
                   Người tạo
                  </th>
                  <th colSpan={20} id="contact-number">
                    Chỉnh sửa gần nhất
                  </th>
                </tr>
              </thead>
              <tbody>
                <td>1</td>
                <td>Happy birth day</td>
                <td>izzi wish you a happy birth day</td>
                <td>admin</td>
                <td>08/01/2020 10:00:00</td>
              </tbody>
            </Table>
          </Row>

        </Fragment>
      </div>
    );
  }
}

const mapStateToProps = ({}: IRootState) => ({
});

const mapDispatchToProps = {
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailManagement);
