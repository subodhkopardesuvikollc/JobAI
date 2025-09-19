export type Candidates = {
  id: string;
  fileName: string;
  fileUrl: string;
  score: string;
};

export interface File {
  id: string;
  fileName: string;
  blobName: string;
  createdAt: string;
  updatedAt: string;
}

export type FileWithUrl<T> = {
  file: T;
  fileUrl: string;
};

export type JdResponseData = {
  jdUrl: string;
  resumeResults: Candidates[];
};

type page = {
  number: number;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type PaginatedData<T> = {
  content: T[];
  page: page;
};

export type EmailDTO = {
  type: string;
  status: string;
  to: string;
  subject: string;
  body: string;
  createdAt: string;
};

export interface Resume extends File {
  indexStatus: "NOT_INDEXED" | "INDEXING" | "INDEXED" | "FAILED";
  emailId: string;
  reachOutEmails: EmailDTO[];
}

export interface communicationDTO<T> {
  type: string;
  payload: T;
}

export type resumeAnalysis = {
  overallMatchScore: number;
  summary: string;
  skillAssessments: {
    skill: string;
    score: number;
    reason: string;
  }[];
};

export interface ApiError extends Error {
  response?: {
    data?: string;
    status?: number;
  };
}

export type Interview = {
  id: string;
  jdId: string;
  resumeId: string;
  questions: string[];
  status: "NOT_STARTED" | "QUEUED" | "IN_PROGRESS" | "COMPLETED" | "FAILED";
  createdAt: string;
};
