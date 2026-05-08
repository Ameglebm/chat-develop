import { Injectable } from '@nestjs/common';

import { ConfirmChannel } from 'amqplib';

import { RabbitMQService } from '../rabbitmq.service';

@Injectable()
export class BaseConsumer {
  constructor(private readonly rabbitmqService: RabbitMQService) {}

  async consume(queue: string, callback: (message: any) => Promise<void>) {
    const channel = this.rabbitmqService.getChannel();

    await channel.addSetup(async (confirmChannel: ConfirmChannel) => {
      await confirmChannel.assertQueue(queue, {
        durable: true,
      });

      await confirmChannel.consume(queue, async (msg) => {
        if (!msg) return;

        const content = JSON.parse(msg.content.toString());

        await callback(content);

        confirmChannel.ack(msg);
      });
    });
  }
}
