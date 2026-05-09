import { Injectable } from '@nestjs/common';

import { ConfirmChannel } from 'amqplib';

import { LoggerService } from '../../logger/logger.service';

import { RabbitMQService } from '../rabbitmq.service';

@Injectable()
export class BaseConsumer {
  constructor(
    private readonly rabbitmqService: RabbitMQService,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext('RabbitConsumer');
  }

  async consume(
    queue: string,
    callback: (message: unknown) => Promise<void>,
  ): Promise<void> {
    const channel = this.rabbitmqService.getChannel();

    await channel.addSetup(async (confirmChannel: ConfirmChannel) => {
      await confirmChannel.assertQueue(queue, { durable: true });

      await confirmChannel.consume(queue, async (msg) => {
        if (!msg) return;

        let content: unknown;

        try {
          content = JSON.parse(msg.content.toString());
        } catch {
          this.logger.error(
            'Mensagem com JSON inválido — descartando',
            undefined,
            { queue },
          );
          confirmChannel.nack(msg, false, false);
          return;
        }

        try {
          await callback(content);
          confirmChannel.ack(msg);
        } catch (err) {
          this.logger.error(
            'Falha ao processar mensagem',
            err instanceof Error ? err.message : String(err),
            { queue, content },
          );
          confirmChannel.nack(msg, false, false);
        }
      });
    });
  }
}
