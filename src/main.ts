import { ValidationPipe } from '@nestjs/common';

import { NestFactory } from '@nestjs/core';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

import { LoggerService } from './infra/logger/logger.service';

process.on('unhandledRejection', (reason) => {
  process.stderr.write(`unhandledRejection: ${JSON.stringify(reason)}\n`, () =>
    process.exit(1),
  );
});

process.on('uncaughtException', (err) => {
  process.stderr.write(`uncaughtException: ${err.stack ?? err.message}\n`, () =>
    process.exit(1),
  );
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const logger = app.get(LoggerService);

  logger.setContext('Bootstrap');

  app.useLogger(logger);

  app.enableCors({
    origin: '*',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.setGlobalPrefix('api');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Chat Develop API')
    .setDescription('Realtime chat backend with websocket and RabbitMQ')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT ?? 3000;

  await app.listen(port, '0.0.0.0');

  const apiUrl = `http://localhost:${port}/api`;

  const swaggerUrl = `http://localhost:${port}/api/docs`;

  const rabbitUrl = 'http://localhost:15672';

  const banner = `
\x1b[35m
 ██████╗██╗  ██╗ █████╗ ████████╗
██╔════╝██║  ██║██╔══██╗╚══██╔══╝
██║     ███████║███████║   ██║
██║     ██╔══██║██╔══██║   ██║
╚██████╗██║  ██║██║  ██║   ██║
 ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝
\x1b[0m

\x1b[1m💬 Chat Develop API\x1b[0m
\x1b[2mRealtime Backend Architecture\x1b[0m

\x1b[2m┌─ Endpoints ─────────────────────────────────────┐\x1b[0m
\x1b[2m│\x1b[0m 🌐 API        ${apiUrl}
\x1b[2m│\x1b[0m 📚 Swagger    ${swaggerUrl}
\x1b[2m│\x1b[0m 🐰 RabbitMQ   ${rabbitUrl}
\x1b[2m└─────────────────────────────────────────────────┘\x1b[0m

\x1b[2m┌─ Infraestrutura ────────────────────────────────┐\x1b[0m
\x1b[2m│\x1b[0m 🗄️ PostgreSQL
\x1b[2m│\x1b[0m ⚡ Redis
\x1b[2m│\x1b[0m 🐰 RabbitMQ
\x1b[2m│\x1b[0m 🔌 Websocket
\x1b[2m└─────────────────────────────────────────────────┘\x1b[0m
`;

  console.log(banner);

  logger.success(`🚀 Aplicação rodando na porta ${port}`);
}

bootstrap().catch((err) => {
  console.error('Erro fatal ao iniciar aplicação', err);

  process.exit(1);
});
