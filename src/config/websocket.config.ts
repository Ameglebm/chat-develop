import { registerAs } from '@nestjs/config';

export default registerAs('websocket', () => ({
  cors: {
    origin: process.env.WS_CORS_ORIGIN ?? '*',
  },
  pingInterval: parseInt(process.env.WS_PING_INTERVAL ?? '25000', 10),
  pingTimeout: parseInt(process.env.WS_PING_TIMEOUT ?? '10000', 10),
}));
