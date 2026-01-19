export interface LectureRequest {
  topic: string;
}

export interface LectureResponse {
  markdown: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  GENERATING = 'GENERATING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
