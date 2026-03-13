# Minha Primeira API

Uma API REST simples desenvolvida com **Node.js, Express e TypeScript** para gerenciamento de anotações.

Este projeto foi criado com o objetivo de praticar conceitos de backend como:

- CRUD
- Rotas REST
- Manipulação de dados
- Tipagem com TypeScript
- Tratamento global de erros

---

# Tecnologias

- Node.js
- Express
- TypeScript
- Prisma
- PostgreSQL

---

# Instalação

#### Clone o repositório:

```bash
git clone https://github.com/dougl-dias/notes-api.git
```

#### Entre na pasta

```bash
cd notes-api
```

#### Instale as dependências

```bash
npm install
```

#### Rode o comando

```bash
npx prisma generate
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
  "color": "yellow", // enum (yellow, green, cyan, pink, purple, gray)
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

### Usuários

#### Listar todos os usuários

```http
  GET /users/
```

#### Resposta

```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@exemple.com",
    "password": "admin123"
  }
]
```

---

#### Buscar usuário por ID

```http
  GET /users/${id}
```

#### Resposta:

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@exemple.com",
  "password": "admin123"
}
```

---

#### Criar novo usuário

```http
  POST /users/
```

#### Body:

```json
{
  "name": "Mary Jane",
  "email": "mary@exemple.com",
  "password": "admin123"
}
```

#### Resposta:

```json
{
  "id": 5,
  "name": "Mary Jane",
  "email": "mary@exemple.com",
  "password": "admin123"
}
```

---

#### Atualizar usuário

```http
  PATCH /users/${id}
```

#### Body:

```json
{
  "email": "mary.jane@exemple.com"
}
```

#### Resposta:

```json
{
  "id": 5,
  "name": "Mary Jane",
  "email": "mary.jane@exemple.com",
  "password": "admin123"
}
```

---

#### Deletar anotação

```http
DELETE /users/${id}
```

#### Resposta:

```http
204 No Content
```

---

# Melhorias futuras

- [x] Refatoração e organização do código (controllers, services e repositories)
- [x] Banco de dados PostgreSQL
- [x] Uso de ORM (Prisma)
- [ ] Autenticação com JWT
- [x] Validação com Zod
- [ ] Padronização do código com ESLint e Prettier
- [ ] Tratamento global de erros
- [x] Filtro de dados e paginação
