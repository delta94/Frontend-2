import { Moment } from 'moment';

export interface ICandidateId {
  candidateId?: string | number;
  candidateName?: string;
}

export interface IConverterId {
  converterId?: string | number;
  converterName?: string | number;
  converterPhone?: string;
}

export interface IInterviewerId {
  interviewerId?: string | number;
  interviewerName?: string;
}

export interface ICandidate {
  interviewSessionHistoryId?: number | number;
  status?: string;
  date?: any;
  startTime?: string;
  endTime?: string;
  candidate?: ICandidateId;
  jobCode?: string;
  jobDescription?: string;
  roundName?: string;
  email?: string;
  phone?: string;
  converter?: IConverterId;
  interviewers?: IInterviewerId[];
  linkCv?: string;
  linkPdg?: string;
  skype?: string;
  zoom?: string;
  progress?: number;
}

export const defaultCandidateValue: Readonly<ICandidate> = {};
