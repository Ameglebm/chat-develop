import { Global, Module } from '@nestjs/common';

import { LoggerModule } from '../logger/logger.module';

import { LocalStorageProvider } from './providers/local-storage.provider';

import { S3StorageProvider } from './providers/s3-storage.provider';

import { StorageService } from './storage.service';

@Global()
@Module({
  imports: [LoggerModule],
  providers: [StorageService, LocalStorageProvider, S3StorageProvider],
  exports: [StorageService],
})
export class StorageModule {}
