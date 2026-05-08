import { Injectable } from '@nestjs/common';

import { Options } from 'amqplib';

import { RabbitMQService } from '../rabbitmq.service';

@Injectable()
export class BasePublisher {
  constructor(private readonly rabbitmqService: RabbitMQService) {}

  async publish(exchange: string, routingKey: string, message: unknown) {
    const channel = this.rabbitmqService.getChannel();

    const options: Options.Publish = {
      persistent: true,
    };

    await channel.publish(
      exchange,
      routingKey,
      Buffer.from(JSON.stringify(message)),
      options,
    );
  }
}
