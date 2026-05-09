````md
<div align="center">

```bash
 ██████╗██╗  ██╗ █████╗ ████████╗
██╔════╝██║  ██║██╔══██╗╚══██╔══╝
██║     ███████║███████║   ██║
██║     ██╔══██║██╔══██║   ██║
╚██████╗██║  ██║██║  ██║   ██║
 ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝
````

# Chat Develop

### Realtime Backend Architecture NestJS, WebSocket, Redis, RabbitMQ

Arquitetura backend moderna focada em:
WebSocket · Mensageria · Tempo real · Escalabilidade · Infra desacoplada.

---

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge\&logo=nestjs\&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge\&logo=postgresql\&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge\&logo=redis\&logoColor=white)
![RabbitMQ](https://img.shields.io/badge/RabbitMQ-FF6600?style=for-the-badge\&logo=rabbitmq\&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge\&logo=socketdotio\&logoColor=white)

</div>

---

# 🚀 Objetivo

O Chat Develop é uma arquitetura backend em tempo real construída para estudar e aplicar conceitos modernos de sistemas distribuídos:

* WebSocket em tempo real
* Mensageria com RabbitMQ
* Cache e presença online com Redis
* Arquitetura modular no NestJS
* Processamento assíncrono
* Providers desacoplados
* Logs contextualizados
* Estrutura escalável para microsserviços

---

# 🏗️ Arquitetura

```txt
Client
   │
   ▼
WebSocket Gateway
   │
   ▼
Services
   │
   ├── Redis
   ├── RabbitMQ
   ├── Prisma
   └── Storage
```

---

# ⚡ Infraestrutura Atual

| Camada   | Tecnologia        | Responsabilidade                   |
| -------- | ----------------- | ---------------------------------- |
| Backend  | NestJS            | Estrutura modular                  |
| ORM      | Prisma            | Acesso ao PostgreSQL               |
| Cache    | Redis             | Cache e presença online            |
| Queue    | RabbitMQ          | Processamento assíncrono           |
| Realtime | Socket.io         | Comunicação em tempo real          |
| Storage  | Local/S3 Provider | Upload e gerenciamento de arquivos |
| Logs     | Custom Logger     | Logs coloridos e contextualizados  |

---

# 📂 Estrutura de Pastas

```txt
src/
├── common/
├── config/
├── infra/
│   ├── cache/
│   ├── database/
│   ├── logger/
│   ├── queue/
│   ├── storage/
│   └── websocket/
├── modules/
└── main.ts
```

---

# 🐰 RabbitMQ

Estrutura desacoplada com:

* Publishers
* Consumers
* Exchanges
* Routing Keys
* Durable queues
* nack/ack
* Retry ready

---

# 🔌 WebSocket

Sistema realtime preparado para:

* salas
* presença online
* indicadores de digitação
* broadcast
* autenticação JWT
* eventos distribuídos

---

# 🧠 Redis

Redis utilizado para:

* cache
* sessões
* presença online
* heartbeat websocket
* rate limit
* idempotência

---

# 📦 Storage

Provider Pattern implementado:

* Local Storage
* S3 Storage
* fácil troca de provider

---

# 🎨 Logger

Logger customizado com:

* cores ANSI
* contextos
* badges
* metadata
* logs tipados
* suporte enterprise

---

# ⚙️ Rodando o projeto

```bash
# instalar dependências
npm install

# subir containers
docker compose up -d

# rodar projeto
npm run start:dev
```

---

# 🔧 Variáveis de ambiente

```env
PORT=3000

DATABASE_URL=

REDIS_HOST=
REDIS_PORT=

RABBITMQ_URL=
```

---

# 🛣️ Roadmap

## ⚙️ Infraestrutura

### Config

* [x] ConfigModule global
* [x] Configuração separada por contexto
* [x] app.config
* [x] database.config
* [x] redis.config
* [x] rabbitmq.config
* [x] websocket.config

### Logger

* [x] Logger customizado
* [x] Contextos por módulo
* [x] Logs coloridos
* [x] Levels customizados
* [x] Metadata nos logs
* [x] Integração com Nest Logger

### Database

* [x] PrismaModule
* [x] PrismaService
* [x] BaseRepository
* [ ] Soft delete base
* [ ] Transactions helper

### Redis

* [x] RedisModule
* [x] RedisService
* [x] Constantes Redis
* [ ] Presence cache
* [ ] Distributed locks

### RabbitMQ

* [x] RabbitMQModule
* [x] RabbitMQService
* [x] BasePublisher
* [x] BaseConsumer
* [x] Exchanges
* [x] Queues
* [x] Routing keys
* [x] Mensagens persistentes
* [ ] Retry strategy
* [ ] Dead letter queue

### Storage

* [x] StorageModule
* [x] StorageService
* [x] LocalStorageProvider
* [x] S3StorageProvider
* [x] Interface de arquivos
* [ ] Upload multipart
* [ ] File validation
* [ ] CDN integration

---

## 🔌 WebSocket

### Gateway

* [x] AppGateway
* [x] WebsocketService
* [x] Eventos base
* [x] Logs de conexão
* [ ] JWT handshake
* [ ] Rooms
* [ ] Presence system
* [ ] Typing events
* [ ] Read receipts

---

## 🧩 Common

> Ainda não iniciados

---

## 📦 Modules

> Ainda não iniciados

---

## 🧪 Qualidade

> Ainda não iniciados

---

## ⚙️ DevOps

> Ainda não iniciados

---

<div align="center">

Buildando arquitetura realtime com NestJS ⚡

</div>
```
