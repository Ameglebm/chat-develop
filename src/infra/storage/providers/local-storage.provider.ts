import { Injectable } from '@nestjs/common';

import { promises as fs } from 'fs';

import { join } from 'path';

import { LoggerService } from '../../logger/logger.service';

import { StorageFile } from '../interfaces/storage-file.interface';

@Injectable()
export class LocalStorageProvider {
  constructor(private readonly logger: LoggerService) {
    this.logger.setContext('LocalStorageProvider');
  }

  async save(file: Express.Multer.File): Promise<StorageFile> {
    const uploadDir = join(process.cwd(), 'uploads');

    await fs.mkdir(uploadDir, { recursive: true });

    const filename = `${Date.now()}-${file.originalname}`;
    const uploadPath = join(uploadDir, filename);

    await fs.writeFile(uploadPath, file.buffer);

    this.logger.log(`Arquivo salvo: ${filename}`, {
      size: file.size,
      mimetype: file.mimetype,
    });

    return {
      filename,
      mimetype: file.mimetype,
      size: file.size,
      path: uploadPath,
    };
  }

  async delete(path: string): Promise<void> {
    try {
      await fs.unlink(path);
      this.logger.log(`Arquivo removido: ${path}`);
    } catch (err) {
      this.logger.error(
        'Erro ao remover arquivo',
        err instanceof Error ? err.message : String(err),
        { path },
      );
    }
  }
}
