const DEFAULT_DATA = {
  flow: {
    graph: {
      nodes: [
        {
          type: 'node',
          label: '',
          code: 'SOURCE',
          value: '',
          id: '_START_'
        },
        {
          type: 'node',
          label: '',
          code: 'DES',
          value: '',
          id: '_END_'
        }
      ],
      edges: [
        {
          source: '_START_',
          target: '_END_',
          sourceAnchor: 3,
          targetAnchor: 2,
          id: '_START_END_',
          value: ''
        }
      ]
    }
  }
};

export default DEFAULT_DATA;
