import { Injectable } from '@nestjs/common';

import { Options } from 'amqplib';

import { LoggerService } from '../../logger/logger.service';

import { RabbitMQService } from '../rabbitmq.service';

@Injectable()
export class BasePublisher {
  constructor(
    private readonly rabbitmqService: RabbitMQService,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext('RabbitPublisher');
  }

  async publish(
    exchange: string,
    routingKey: string,
    message: unknown,
  ): Promise<void> {
    const channel = this.rabbitmqService.getChannel();

    const options: Options.Publish = {
      persistent: true,
    };

    const sent = await channel.publish(
      exchange,
      routingKey,
      Buffer.from(JSON.stringify(message)),
      options,
    );

    if (!sent) {
      this.logger.warn('Mensagem não confirmada pelo broker', {
        exchange,
        routingKey,
      });
    }
  }
}
