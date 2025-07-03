# Challenge  RabbitMq

Este README mostra como **subir o ambiente** completo (API + observabilidade) e **visualizar os logs** no Grafana Explore.

---

## 1. Pré‑requisitos

| Ferramenta | Versão mínima | Verificação        |
| ---------- | ------------- | ------------------ |
| Docker     |  24.x         | `docker --version` |

> O compose abre as portas **3000** (API) e **3001** (Grafana). Ajuste se já estiverem em uso.

## 3. Acessar a API

```bash
curl http://localhost:3000/health
```

Resposta esperada:

```json
{ "status": "ok" }
```

---

## 4. Visualizar logs no Grafana

1. Abra **[http://localhost:3001](http://localhost:3001)** e faça login (`admin` / `admin`).

2. **Adicione o Loki como _Data Source_**:
   1. Menu lateral → **Connections → Data sources → Add data source**.
   2. Escolha **Loki**.
   3. Em **URL** digite `http://loki:3100` (é o serviço interno definido no Compose).
   4. Clique **Save & Test** → deve aparecer "Data source is working".

3. Agora clique em **Explore**.

4. No seletor de _Data source_ escolha **Loki** (o que acabou de criar).

5. No campo de query insira:

```logql
   { env = "production" }
```
