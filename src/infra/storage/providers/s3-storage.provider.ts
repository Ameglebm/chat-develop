import { Injectable } from '@nestjs/common';

import { LoggerService } from '../../logger/logger.service';

import { StorageFile } from '../interfaces/storage-file.interface';

@Injectable()
export class S3StorageProvider {
  constructor(private readonly logger: LoggerService) {
    this.logger.setContext('S3StorageProvider');
  }

  async save(_file: Express.Multer.File): Promise<StorageFile> {
    this.logger.warn('S3StorageProvider.save ainda não implementado');

    return Promise.reject(new Error('S3StorageProvider não implementado'));
  }

  async delete(_path: string): Promise<void> {
    this.logger.warn('S3StorageProvider.delete ainda não implementado');

    return Promise.reject(new Error('S3StorageProvider não implementado'));
  }
}
