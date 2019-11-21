import React from 'react';

export const columns = [
  {
    title: 'Chiến dịch',
    dataIndex: 'name',
    render: text => <a>{text}</a>,
    sorter: (a, b) => a.name.length - b.name.length
  },
  {
    title: 'Trạng thái',
    dataIndex: 'age',
    sorter: (a, b) => a.age - b.age
  },
  {
    title: 'Kết quả',
    dataIndex: 'address'
  },
  {
    title: 'Chỉnh sửa gần nhất',
    dataIndex: 'addresss'
  }
];
export const data = [
  {
    key: '1',
    name: 'A AAAAAAAAAA',
    age: 32,
    address: 'New York No. 1 Lake Park'
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park'
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park'
  },
  {
    key: '4',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park'
  }
];

const treeData = [
  {
    title: '.gitignore',
    dragDisabled: true
  },
  { title: 'package' },
  {
    title: 'src',
    isDirectory: true,
    expanded: true,
    children: [{ title: 'styles' }, { title: 'index' }, { title: 'reducers' }, { title: 'actions' }, { title: 'utils' }]
  },
  {
    title: 'tmp',
    isDirectory: true,
    children: [{ title: '12214124-log' }, { title: 'drag-disabled-file', dragDisabled: true }]
  },
  {
    title: 'build',
    isDirectory: true,
    children: [{ title: 'react-sortable-tree' }]
  },
  {
    title: 'public',
    isDirectory: true
  },
  {
    title: 'node_modules',
    isDirectory: true
  }
];

export default treeData;
