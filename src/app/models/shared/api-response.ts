export interface ApiResource<T> {
  data: T;
  meta?: [];
}

export interface ApiCollection<T> {
  data: T[];
  meta?: MetaData;
}

interface MetaData {
  stats?: [];
}
