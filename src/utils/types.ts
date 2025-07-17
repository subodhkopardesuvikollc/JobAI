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

type pageable = {
  pageNumber: number;
  pageSize: number;
};

export type PaginatedData<T> = {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  last: boolean;
  pageable: pageable;
  first: boolean;
};
