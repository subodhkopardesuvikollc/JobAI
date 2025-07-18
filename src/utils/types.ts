export type Candidates = {
  fileName: string;
  fileUrl: string;
  score: string;
};

export type File = {
  id: string;
  fileName: string;
  blobName: string;
  createdAt: string;
  updatedAt: string;
};

export type FileWithUrl = {
  file: File;
  fileUrl: string;
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
