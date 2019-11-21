export interface ApiResource<T> {
  data: T;
  meta?: any;
}

export interface ApiCollection<T> {
  data: T[];
  meta?: any;
}
