import React from 'react';
import { Button } from 'reactstrap';

export const TBL_LIST_BOOK_COLUMN = [
  {
    Header: 'Tình trạng',
    accessor: 'status',
    Cell: row => (
      <span>
        <span
          style={{
            color: row.value === 'Hoàn thành' ? '#ff2e00' : row.value === 'G' ? '#ffbf00' : '#57d500',
            transition: 'all .3s ease'
          }}
        >
          &#x25cf;
        </span>{' '}
        {row.value}
      </span>
    )
  },
  {
    Header: 'Họ và tên UV',
    accessor: 'fullName'
  },
  {
    Header: 'Vị trí',
    accessor: 'position'
  },
  {
    Header: 'Vòng PV',
    accessor: 'roundInterview'
  },
  {
    Header: 'NPV1',
    accessor: 'npv1'
  },
  {
    Header: 'NPV2',
    accessor: 'npv2'
  },
  {
    Header: 'NPV3',
    accessor: 'npv3'
  },
  {
    Header: 'NPV4',
    accessor: 'npv4'
  },
  {
    Header: 'Nextstep',
    accessor: 'nextstep',
    Cell: row => <Button>Đặt lại lịch</Button>
  },
  {
    Header: 'Hủy lịch',
    accessor: 'cancelBook',
    Cell: row => <Button>Xác nhận hủy</Button>
  },
  {
    Header: 'Email',
    accessor: 'email'
  },
  {
    Header: 'SDT',
    accessor: 'phonenumber'
  },
  {
    Header: 'Converter',
    accessor: 'converter'
  },
  {
    Header: 'Link CV',
    accessor: 'linkCV',
    Cell: row => <a>Link</a>
  },
  {
    Header: 'Link PĐG',
    accessor: 'linkPDG',
    Cell: row => <a>Link</a>
  }
];

export const TBL_LIST_CANDIDATE_COLUMN = [
  {
    Header: 'Thời gian',
    accessor: 'startTime endTime'
  },
  {
    Header: 'Họ và tên UV',
    accessor: 'candidate.candidateName'
  },
  {
    Header: 'Link CV',
    accessor: 'linkCV',
    Cell: row => <a>Link</a>
  },
  {
    Header: 'Vị trí',
    accessor: 'jobCode'
  },
  {
    Header: 'Vòng PV',
    accessor: 'roundName'
  },
  {
    Header: 'Email',
    accessor: 'email'
  },
  {
    Header: 'SĐT',
    accessor: 'phone'
  },
  {
    Header: 'Converter',
    accessor: 'conveter.conveterName'
  },
  {
    Header: 'NPV1',
    accessor: 'interviewers[0].interviewerName'
  },
  {
    Header: 'NPV2',
    accessor: 'interviewers[1].interviewerName'
  },
  {
    Header: 'NPV3',
    accessor: 'interviewers[2].interviewerName'
  },
  {
    Header: 'NPV4',
    accessor: 'interviewers[3].interviewerName'
  },
  {
    Header: 'LinkPGĐ',
    accessor: 'linkPdg',
    Cell: row => <a>row.linkPdg</a>
  },
  {
    Header: 'Skype',
    accessor: 'skype'
  },
  {
    Header: 'Zoom',
    accessor: 'zoom'
  }
];
