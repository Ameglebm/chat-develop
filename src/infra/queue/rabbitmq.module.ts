import { Global, Module } from '@nestjs/common';

import { RabbitMQService } from './rabbitmq.service';

import { BasePublisher } from './publishers/base.publisher';

import { BaseConsumer } from './consumers/base.consumer';

@Global()
@Module({
  providers: [RabbitMQService, BasePublisher, BaseConsumer],

  exports: [RabbitMQService, BasePublisher, BaseConsumer],
})
export class RabbitMQModule {}
