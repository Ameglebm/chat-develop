import { Inject, Injectable, OnModuleInit } from '@nestjs/common';

import type { ConfigType } from '@nestjs/config';

import { ChannelWrapper, connect } from 'amqp-connection-manager';

import { ConfirmChannel } from 'amqplib';

import rabbitmqConfig from '../../config/rabbitmq.config';

import { LoggerService } from '../logger/logger.service';

import { RABBITMQ_EXCHANGES } from './constants/rabbitmq.constants';

@Injectable()
export class RabbitMQService implements OnModuleInit {
  private channel!: ChannelWrapper;

  constructor(
    private readonly logger: LoggerService,
    @Inject(rabbitmqConfig.KEY)
    private readonly config: ConfigType<typeof rabbitmqConfig>,
  ) {
    this.logger.setContext('RabbitMQService');
  }

  async onModuleInit() {
    const connection = connect([this.config.url]);

    connection.on('connect', () => this.logger.success('Conectado ao broker'));

    connection.on('disconnect', ({ err }) =>
      this.logger.error('Desconectado do broker', err?.message),
    );

    this.channel = connection.createChannel({
      setup: async (channel: ConfirmChannel) => {
        await channel.assertExchange(RABBITMQ_EXCHANGES.CHAT, 'topic', {
          durable: true,
        });
      },
    });

    await this.channel.waitForConnect();

    this.logger.success('Canal pronto');
  }

  getChannel(): ChannelWrapper {
    return this.channel;
  }
}
