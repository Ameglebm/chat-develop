export interface WebsocketEvent<T = unknown> {
  event: string;
  data: T;
}
