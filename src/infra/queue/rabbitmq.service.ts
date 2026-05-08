import { Injectable, OnModuleInit } from '@nestjs/common';

import { ChannelWrapper, connect } from 'amqp-connection-manager';

import { ConfirmChannel } from 'amqplib';

import { RABBITMQ_EXCHANGES } from './constants/rabbitmq.constants';

@Injectable()
export class RabbitMQService implements OnModuleInit {
  private channel!: ChannelWrapper;

  async onModuleInit() {
    const connection = connect([process.env.RABBITMQ_URL!]);

    this.channel = connection.createChannel({
      setup: async (channel: ConfirmChannel) => {
        await channel.assertExchange(RABBITMQ_EXCHANGES.CHAT, 'topic', {
          durable: true,
        });
      },
    });

    console.log('🐰 RabbitMQ conectado');
  }

  getChannel() {
    return this.channel;
  }
}
