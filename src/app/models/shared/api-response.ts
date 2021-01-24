export interface ApiResource<T> {
  data: T;
  meta?: [];
}

export interface ApiCollection<T> {
  data: T[];
  meta?: any;
}
