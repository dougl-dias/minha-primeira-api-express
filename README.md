# Minha Primeira API

Uma API REST simples desenvolvida com **Node.js, Express e TypeScript** para gerenciamento de anotações.

Este projeto foi criado com o objetivo de praticar conceitos de backend como:

- CRUD
- Rotas REST
- Manipulação de dados
- Tipagem com TypeScript

---

# Tecnologias

- Node.js
- Express
- TypeScript

---

# Instalação

#### Clone o repositório:

```bash
git clone https://github.com/dougl-dias/minha-primeira-api-express.git
```

#### Entre na pasta
```bash
cd minha-primeira-api-express
```

#### Instale as dependências
```bash
npm install
```

#### Execute o projeto
```bash
npm run watch
```

# Endpoints

#### Retorna o status da API.

```http
  GET /
```
#### Resposta:
```json
{
  "status": "ok"
}
```

### Anotações
#### Listar todas as anotações
```http
  GET /notes/
```

#### Resposta
```json
[
  {
    "id": 1,
    "title": "Estudar Node.js",
    "content": "Revisar conceitos",
    "category": "Estudos",
    "color": "yellow",
    "userId": 1
  }
]
```

---

#### Buscar anotação por ID
```http
  GET /notes/${id}
```

#### Resposta:
```json
{
  "id": 1,
  "title": "Estudar Node.js",
  "content": "Revisar conceitos",
  "category": "Estudos",
  "color": "yellow",
  "userId": 1
}
```

---

#### Criar nova anotação
```http
  POST /notes/
```

#### Body:
```json
{
  "title": "Estudar Node.js",
  "content": "Revisar conceitos",
  "category": "Estudos",
  "color": "yellow",
  "userId": 1
}
```

#### Resposta:
```json
{
  "id": 6,
  "title": "Nova anotação",
  "content": "Conteúdo da nota",
  "category": "Estudos",
  "color": "green",
  "userId": 1
}
```

---

#### Atualizar nota
```http
  PATCH /notes/${id}
```

#### Body:
```json
{
  "title": "Título atualizado"
}
```

#### Resposta:
```json
{
  "id": 1,
  "title": "Título atualizado",
  "content": "Revisar conceitos",
  "category": "Estudos",
  "color": "yellow",
  "userId": 1
}
```

---

#### Deletar anotação
```http
DELETE /notes/${id}
```

#### Resposta:
```http
204 No Content
```

---

# Melhorias futuras

- [x] Refatoração e organização do código (controllers, services e repositories)
- [ ] Banco de dados PostgreSQL
- [ ] Uso de ORM (Prisma)
- [ ] Autenticação com JWT
- [ ] Validação com Zod
- [ ] Padronização do código com ESLint e Prettier
