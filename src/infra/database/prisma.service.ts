import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

import { PrismaPg } from '@prisma/adapter-pg';

import { LoggerService } from '../logger/logger.service';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private readonly logger: LoggerService) {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL!,
    });

    super({ adapter });

    this.logger.setContext('PrismaService');
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
    this.logger.success('Conectado ao banco de dados');
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
    this.logger.warn('Conexão com banco de dados encerrada');
  }
}
