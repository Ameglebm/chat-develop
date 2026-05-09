export interface SocketUser {
  userId: string;
  socketId: string;
  username?: string;
  roomIds?: string[];
  connectedAt?: Date;
}
