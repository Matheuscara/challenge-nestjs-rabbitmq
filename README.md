# Challenge RabbitMQ

> Demonstração de um sistema de notificações assíncronas em NestJS com RabbitMQ e WebSocket, seguindo princípios de Clean Architecture e DDD.

---

## 1. Modos de Execução

| Modo      | Comando                                                    | Compose                    | Portas      | Observação                                                               |
| --------- | ---------------------------------------------------------- | -------------------------- | ----------- | ------------------------------------------------------------------------ |
| **Dev**   | `docker compose -f docker-compose.dev.yml up -d --build`   | `docker-compose.dev.yml`   | 3000        | Hot-reload (`pnpm start:dev`) e logs coloridos (pino-pretty).            |
| **Debug** | `docker compose -f docker-compose.debug.yml up -d --build` | `docker-compose.debug.yml` | 3000 / 9229 | Igual ao Dev, com **Node Inspector** em 9229 (`pnpm start:debug`).       |
| **Prod**  | `docker compose -f docker-compose.prod.yml up -d --build`  | `docker-compose.prod.yml`  | 3000 / 3001 | Usa `Dockerfile.server`, logs JSON, Loki + Grafana para observabilidade. |

> No **Prod** você também terá Loki (porta 3100) e Grafana (porta 3001) configurados.

---

## 2. Testes

| Tipo                  | Script npm        | Dentro do container                       | Fora do container |
| --------------------- | ----------------- | ----------------------------------------- | ----------------- |
| **Unitários**         | `pnpm test`       | `docker compose exec app pnpm test`       | `pnpm test`       |
| **Unitários (watch)** | `pnpm test:watch` | `docker compose exec app pnpm test:watch` | `pnpm test:watch` |
| **Cobertura**         | `pnpm test:cov`   | `docker compose exec app pnpm test:cov`   | `pnpm test:cov`   |
| **E2E**               | `pnpm test:e2e`   | `docker compose exec app pnpm test:e2e`   | `pnpm test:e2e`   |

Todos os testes usam **Jest**. O repositório de notificações é **in-memory**, não requer banco de dados.

---

## 3. Endpoints da API

| Método & Rota                             | Descrição                                              | Rate-limit  | Status 2xx     |
| ----------------------------------------- | ------------------------------------------------------ | ----------- | -------------- |
| `GET /health`                             | Health-check (uptime, memória, conexões…)              | 100 req/min | `200 OK`       |
| `POST /api/notificar`                     | Envia nova notificação (mensagemId + conteudoMensagem) | 10 req/min  | `202 Accepted` |
| `GET  /api/notificar/status/{mensagemId}` | Consulta status atual de uma notificação               | 20 req/min  | `200 OK`       |

> **WebSocket**
>
> - O gateway emite, na rota WS padrão (`/`), o evento `notificationStatus` com `{ mensagemId, status }`.
> - Clientes Angular consomem esse evento para atualizar _em tempo real_ o histórico de notificações.

---

## 4. Arquitetura Clean / DDD

```
src/
 ├─ application/      # Casos de uso, DTOs, testes
 ├─ domain/           # Entidades, Value Objects, erros
 ├─ infrastructure/   # Controllers, Handlers, Gateway, Config
 └─ utils/            # Logger (Pino), Interceptores, Constantes
```

- **Domain**: regras de negócio puras (entidades, value objects, DomainError).
- **Application**: casos de uso (ex.: `CreateNotificationUseCase`) e DTOs.
- **Infrastructure**: integração (NestJS controllers, RabbitMQ handlers, WebSocket gateway).
- **Utils**: interceptores globais, configuração do logger, constantes.

---

## 5. Interceptores Globais

| Ordem | Interceptor                | Função                                                           |
| ----- | -------------------------- | ---------------------------------------------------------------- |
| 1️⃣    | **DomainErrorInterceptor** | Converte erros de domínio (`DomainError`) em respostas HTTP 400. |
| 2️⃣    | **TransformInterceptor**   | Padroniza respostas 2xx em `{ data, meta }`.                     |
| 3️⃣    | **LoggingInterceptor**     | Loga requisições/respostas e envia para Loki/Grafana.            |

---

## 6. Logging com Pino

- **Dev/Debug**: logs coloridos via `pino-pretty`.
- **Prod**: logs em JSON → Loki → Grafana.
- Configuração automática via variável `NODE_ENV`.

---

## 7. Docker Compose

- **Dev** (`docker-compose.dev.yml`): hot-reload + logs
- **Debug** (`docker-compose.debug.yml`): + Node Inspector (9229)
- **Prod** (`docker-compose.prod.yml`): Dockerfile.server, Loki + Grafana

Todos compartilham o mesmo `.env`:

```dotenv
# .env
RABBITMQ_DEFAULT_USER=teste
RABBITMQ_DEFAULT_PASS=teste
RABBITMQ_URL=amqp://teste:teste@rabbitmq:5672
RABBITMQ_QUEUE_INPUT=fila.notificacao.entrada.matheusdias
RABBITMQ_QUEUE_STATUS=fila.notificacao.status.matheusdias

NODE_ENV=development
LOG_LEVEL=info
LOG_TYPE=pino-pretty
DEBUG_MODE=false
PORT=3000
```

---

Desafio completo: **notificações assíncronas** via RabbitMQ, **processamento simulado**, e **atualização em tempo real** no Angular via WebSocket.
