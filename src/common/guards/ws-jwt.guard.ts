import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class WsJwtGuard
  implements CanActivate
{
  canActivate(
    context: ExecutionContext,
  ): boolean {
    const client = context
      .switchToWs()
      .getClient();

    const token =
      client.handshake?.auth?.token;

    if (!token) {
      throw new UnauthorizedException(
        'Token not provided',
      );
    }

     // JWT validation futuramente

    return true;
  }
}

