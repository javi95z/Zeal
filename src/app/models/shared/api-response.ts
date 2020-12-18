interface ApiResource<T> {
  data: T;
  meta?: any;
}

interface ApiCollection<T> {
  data: T[];
  meta?: any;
}
