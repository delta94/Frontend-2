import React from 'react';
import { Table } from 'reactstrap';

export default class TableBordered extends React.Component {
  render() {
    return (
      <Table className="mb-0" bordered>
        <thead>
          <tr>
            <td>File dữ liệu</td>
            <td>tổng 651 dòng</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row"></th>
            <td> 641 dòng thành công</td>
            <td>10 dòng không thành công</td>
          </tr>
        </tbody>
      </Table>
    );
  }
}
