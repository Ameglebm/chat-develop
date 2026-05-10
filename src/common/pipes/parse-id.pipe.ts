import {
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIdPipe
  implements PipeTransform
{
  transform(value: string): number {
    const id = Number(value);

    if (Number.isNaN(id) || id <= 0) {
      throw new BadRequestException(
        'Invalid ID',
      );
    }

    return id;
  }
}

