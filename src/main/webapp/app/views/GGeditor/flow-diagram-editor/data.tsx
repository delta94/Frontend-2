const SAMPLE_DATA = {
  folderId: 'd9b34973-cc89-4791-98ef-278e7513757d',

  cj: {
    id: '8e8df3d9-694f-43d8-91a9-7f7db3ca72b4',
    name: 'chien dich dac biet no en',
    description: ''
  },
  cjTags: [
    {
      id: '4abef027-1bac-4490-a088-ec324ee98ead',
      name: 'KhachVIP'
    }
  ],
  flow: {
    startTime: '2019-12-24 09:13:00',
    customerAdvancedSave: {
      logicalOperator: 'OR',
      advancedSearches: [
        {
          fieldId: 'lastName',
          fieldCode: 'lastName',
          fieldType: 'Text Input',
          fieldValue: 'EQUAL',
          fieldTitle: 'Họ',
          operator: 'CONTAIN',
          value: 'linh'
        }
      ]
    },
    graph: {
      nodes: [
        {
          type: 'node',
          label: 'Nhóm khách hàng VIP',
          code: 'SOURCE',
          value: '',
          id: '100',
          emailConfig: null,
          smsConfig: null,
          gatewayConfig: null,
          timerEventConfig: null
        },
        {
          type: 'node',
          label: 'Gửi email 1',
          code: 'SEND_MAIL',
          value: '',
          id: '200',
          emailConfig: {
            id: '',
            name: '',
            title: 'gui mail 1',
            content: 'gui mail 1'
          },
          smsConfig: null,
          gatewayConfig: null,
          timerEventConfig: null
        },
        {
          type: 'node',
          label: 'Chờ 1 ngày',
          code: 'TIMER',
          value: 'PT30S',
          id: '300',
          emailConfig: null,
          smsConfig: null,
          gatewayConfig: null,
          timerEventConfig: null
        },
        {
          type: 'node',
          label: 'Gửi tin nhan',
          code: 'SEND_SMS',
          value: '',
          id: '400',
          emailConfig: null,
          smsConfig: {
            id: '',
            name: 'gui tin nhan 1',
            content: 'gui tin nhan 1'
          },
          gatewayConfig: null,
          timerEventConfig: null
        },
        {
          type: 'node',
          label: 'Chờ mở mail',
          code: 'TIMER_EVENT',
          value: 'PT30S',
          id: '500',
          emailConfig: null,
          smsConfig: null,
          gatewayConfig: null,
          timerEventConfig: {
            eventType: 'open-mail',
            emailTemplateId: ''
          }
        },
        {
          type: 'node',
          label: 'Gửi email 3',
          code: 'SEND_MAIL',
          value: '',
          id: '600',
          emailConfig: {
            id: '',
            name: '',
            title: 'gui mail 3',
            content: 'gui mail 3'
          },
          smsConfig: null,
          gatewayConfig: null,
          timerEventConfig: null
        },
        {
          type: 'node',
          label: '',
          code: 'DES',
          value: '',
          id: '700',
          emailConfig: null,
          smsConfig: null,
          gatewayConfig: null,
          timerEventConfig: null
        },
        {
          type: 'node',
          label: '',
          code: 'GATEWAY',
          value: '',
          id: '800',
          emailConfig: null,
          smsConfig: null,
          timerEventConfig: null,
          gatewayConfig: {
            logicalOperator: '',
            advancedSearches: [
              {
                fieldId: 'firstName',
                fieldCode: 'firstName',
                fieldType: 'Text Input',
                fieldValue: 'EQUAL',
                fieldTitle: 'Tên',
                value: 'linh',
                operator: 'CONTAIN'
              }
            ]
          }
        },
        {
          type: 'node',
          label: 'Gửi email 4',
          code: 'SEND_MAIL',
          value: '',
          id: '900',
          emailConfig: {
            id: '',
            name: '',
            title: 'gui mail 4',
            content: 'gui mail 4'
          },
          smsConfig: null,
          gatewayConfig: null,
          timerEventConfig: null
        },
        {
          type: 'node',
          label: '',
          code: 'DES',
          value: '',
          id: '1000',
          emailConfig: null,
          smsConfig: null,
          gatewayConfig: null,
          timerEventConfig: null
        },
        {
          type: 'node',
          label: 'Gửi email 5',
          code: 'SEND_MAIL',
          value: '',
          id: '1100',
          emailConfig: {
            id: '',
            name: '',
            title: 'gui mail 5',
            content: 'gui mail 5'
          },
          smsConfig: null,
          gatewayConfig: null,
          timerEventConfig: null
        },
        {
          type: 'node',
          label: '',
          code: 'DES',
          value: '',
          id: '1200',
          emailConfig: null,
          smsConfig: null,
          gatewayConfig: null,
          timerEventConfig: null
        }
      ],
      edges: [
        {
          source: '100',
          target: '200',
          sourceAnchor: 3,
          targetAnchor: 2,
          id: '1',
          value: ''
        },
        {
          source: '200',
          target: '300',
          sourceAnchor: 3,
          targetAnchor: 2,
          id: '2',
          value: ''
        },
        {
          source: '300',
          target: '400',
          sourceAnchor: 3,
          targetAnchor: 2,
          id: '3',
          value: ''
        },
        {
          source: '400',
          target: '500',
          sourceAnchor: 3,
          targetAnchor: 2,
          id: '4',
          value: ''
        },
        {
          source: '500',
          target: '600',
          sourceAnchor: 3,
          targetAnchor: 2,
          id: '5',
          value: 'true'
        },
        {
          source: '600',
          target: '700',
          sourceAnchor: 3,
          targetAnchor: 2,
          id: '6',
          value: ''
        },
        {
          source: '500',
          target: '800',
          sourceAnchor: 1,
          targetAnchor: 2,
          id: '7',
          value: 'false'
        },
        {
          source: '800',
          target: '900',
          sourceAnchor: 3,
          targetAnchor: 2,
          id: '8',
          value: 'true'
        },
        {
          source: '900',
          target: '1000',
          sourceAnchor: 3,
          targetAnchor: 2,
          id: '9',
          value: ''
        },
        {
          source: '800',
          target: '1100',
          sourceAnchor: 1,
          targetAnchor: 2,
          id: '10',
          value: 'false'
        },
        {
          source: '1100',
          target: '1200',
          sourceAnchor: 3,
          targetAnchor: 2,
          id: '11',
          value: ''
        }
      ]
    }
  }
};
export default SAMPLE_DATA;
