import { Injectable } from '@nestjs/common';

import { LoggerService } from '../logger/logger.service';

import { StorageDriver, STORAGE_DRIVER } from './constants/storage.constants';

import { StorageFile } from './interfaces/storage-file.interface';

import { LocalStorageProvider } from './providers/local-storage.provider';

import { S3StorageProvider } from './providers/s3-storage.provider';

@Injectable()
export class StorageService {
  private readonly driver: StorageDriver;

  constructor(
    private readonly localStorageProvider: LocalStorageProvider,
    private readonly s3StorageProvider: S3StorageProvider,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext('StorageService');

    this.driver =
      (process.env.STORAGE_DRIVER as StorageDriver) ?? STORAGE_DRIVER.LOCAL;

    this.logger.log(`Driver de storage: ${this.driver}`);
  }

  async upload(file: Express.Multer.File): Promise<StorageFile> {
    if (this.driver === STORAGE_DRIVER.S3) {
      return this.s3StorageProvider.save(file);
    }

    return this.localStorageProvider.save(file);
  }

  async delete(path: string): Promise<void> {
    if (this.driver === STORAGE_DRIVER.S3) {
      return this.s3StorageProvider.delete(path);
    }

    return this.localStorageProvider.delete(path);
  }
}
