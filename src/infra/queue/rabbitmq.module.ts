import { Global, Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import rabbitmqConfig from '../../config/rabbitmq.config';

import { LoggerModule } from '../logger/logger.module';

import { RabbitMQService } from './rabbitmq.service';
import { BasePublisher } from './publishers/base.publisher';
import { BaseConsumer } from './consumers/base.consumer';

@Global()
@Module({
  imports: [LoggerModule, ConfigModule.forFeature(rabbitmqConfig)],
  providers: [RabbitMQService, BasePublisher, BaseConsumer],
  exports: [RabbitMQService, BasePublisher, BaseConsumer],
})
export class RabbitMQModule {}
