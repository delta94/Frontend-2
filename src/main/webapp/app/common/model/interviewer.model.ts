export interface IInterviewer {
  interviewerId?: string | number;
  interviewerName?: string;
  quotaInterview?: number;
  usedInterview?: number;
}

export const defaultInterviewerValue: Readonly<IInterviewer> = {};
