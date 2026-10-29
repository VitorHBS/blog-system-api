# BrightBlog

Blog full-stack com uma interface responsiva para leitura de artigos e uma API para autenticação e gerenciamento de publicações. O projeto usa React e Vite no frontend, Express no backend e PostgreSQL com Prisma para persistência.

## Funcionalidades

- Página inicial, listagem de artigos e página individual por slug.
- Listagem pública paginada e sugestões de artigos com tags relacionadas.
- Cadastro e login com tokens JWT.
- API protegida para criar, editar, publicar, listar e excluir artigos.
- Upload de capas JPEG e PNG.
- Artigos em rascunho ou publicados.

## Tecnologias

- TypeScript, React, React Router e Vite
- Tailwind CSS
- Node.js e Express
- PostgreSQL e Prisma
- JWT, Zod e Multer

## Requisitos

- Node.js e npm
- PostgreSQL

## Como executar

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Crie um banco de dados PostgreSQL e configure as variáveis de ambiente na raiz do projeto:

   ```env
   DATABASE_URL="postgresql://USUARIO:SENHA@localhost:5432/brightblog?schema=public"
   JWT_KEY="substitua-por-uma-chave-secreta-longa"
   BASE_URL="http://localhost:3000"
   ```

   Use uma chave JWT longa e aleatória. `BASE_URL` é usado para montar as URLs das imagens de capa.

3. Aplique as migrations e gere o cliente Prisma:

   ```bash
   npx prisma migrate deploy
   npx prisma generate
   ```

4. Em um terminal, inicie a API:

   ```bash
   npm run dev
   ```

5. Em outro terminal, inicie o frontend:

   ```bash
   npm run dev:client
   ```

   Abra a URL informada pelo Vite (normalmente `http://localhost:5173`). Durante o desenvolvimento, as requisições `/api` são encaminhadas para o servidor em `http://localhost:3000`.

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor Express com reinicialização automática. |
| `npm run dev:client` | Inicia o servidor de desenvolvimento do Vite. |
| `npm run build` | Gera a versão de produção do frontend em `dist/`. |
| `npm run preview` | Pré-visualiza a versão compilada do frontend. |

Após compilar o frontend, o servidor Express também pode servir os arquivos de `dist/` na porta `3000`.

## API

Todas as rotas abaixo usam o prefixo `/api`. As rotas administrativas e de validação de sessão exigem `Authorization: Bearer <token>`.

| Método | Rota | Acesso | Descrição |
| --- | --- | --- | --- |
| `GET` | `/posts?page=1` | Público | Lista artigos publicados, cinco por página. |
| `GET` | `/posts/:slug` | Público | Busca um artigo publicado pelo slug. |
| `GET` | `/posts/:slug/related` | Público | Lista artigos publicados com tags relacionadas. |
| `POST` | `/auth/signup` | Público | Cria uma conta e retorna um token. |
| `POST` | `/auth/signin` | Público | Autentica uma conta e retorna um token. |
| `POST` | `/auth/validate` | Token | Valida o token e retorna os dados do usuário. |
| `GET` | `/admin/posts?page=1` | Token | Lista artigos, incluindo rascunhos. |
| `GET` | `/admin/posts/:slug` | Token | Busca um artigo pelo slug. |
| `POST` | `/admin/posts` | Token | Cria um artigo com upload de capa. |
| `PUT` | `/admin/posts/:slug` | Token | Edita um artigo, incluindo status e capa. |
| `DELETE` | `/admin/posts/:slug` | Token | Exclui um artigo. |

As rotas de criação e edição usam `multipart/form-data`. Para criar um artigo, envie `title`, `body`, `tags` e `cover`; `cover` deve ser uma imagem JPEG ou PNG. As tags são informadas como texto separado por vírgulas. Novos artigos começam como rascunhos; use a rota de edição para alterar o status para `PUBLISHED`.

## Estrutura do projeto

```text
prisma/       Schema e migrations do banco
public/       Arquivos estáticos e imagens de capa
src/client/   Interface React
src/controllers/
src/routes/   Rotas da API
src/services/ Lógica de acesso a dados e autenticação
```
