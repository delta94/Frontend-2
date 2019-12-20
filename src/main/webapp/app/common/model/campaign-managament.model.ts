export interface IListCloneVersion {
  id: string;
  cjId: string;
  version: string;
  status: string;
  flow: string;
  description: string;
  flowDetail: {
    graph: {
      nodes: [
        {
          type: string;
          label: string;
          code: string;
          value: string;
          id: string;
          emailConfig: string;
          smsConfig: string;
          countAct: string;
        }
      ];
      edges: [
        {
          source: string;
          sourceAnchor: string;
          target: string;
          targetAnchor: string;
          id: string;
          value: string;
        }
      ];
    };
  };
}
