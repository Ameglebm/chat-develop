import {
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class FileValidationPipe
  implements PipeTransform
{
  transform(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException(
        'File not provided',
      );
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      throw new BadRequestException(
        'File exceeds maximum size',
      );
    }

    return file;
  }
}

