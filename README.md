# Projeto Blog's API

Projeto feito para treinar a criação de API's, CRUD (Create, Read, Update, Delete) de posts, utilizando a arquitetura MSC, e também para introduzir a utilização do ORM Sequelize. Seguindo os princípios REST.

Todas os usuários cadastrados têm a validação de login feita utilizando a biblioteca JWT, mantendo a autorização e autenticação nas ações referentes à aplicação de acordo com cada usuário permitido no processo de alteração e publicação dos posts.

<hr></hr>

## 🛠 Habilidades
Node.js, MySQL, Arquitetura MSC, ORM Sequelize e JWT.

<hr></hr>

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar variáveis de ambiente no seu .env

Um exemplo já está disponível no arquivo `.env.example`, bastando renomear para `.env` e escolher o valor das variáveis.

<hr></hr>

## Utilização

- Para clonar o projeto: `git clone git@github.com:joao-pasip/Project-BlogsAPI.git`.

- Para instalar as dependências basta rodar o comando `npm install` e acessar as funcionalidades da aplicação.

- Já existe um arquivo `docker-compose.yml` (Disponibilizado pela Trybe). Bastando usar o comando `docker-compose up` para rodar o MySQL e o Node pelo Docker.

- `npm start` para criar o banco de dados, usar os migrates pelo Sequelize e iniciar a aplicação.

- Utilizar alguma Plataforma de API para acessar os endpoints e entender seus comportamentos. Exemplos: Postman e Insomnia (Utilizado no desenvolvimento desse projeto).

<hr></hr>

## Diagrama

![Diagrama de relacionamentos das tabelas](blogsAPI.png)

<i> Imagem disponibilizada pela Trybe </i>

<hr></hr>

## Endpoints

- POST `/login` que deve receber no body os campos `email` e `password`.
- POST `/user` que deve receber no body os campos `displayName`, `email`, `password` e `image`.
- `A partir desse ponto todos os próximos endpoints requerem validação por token que foi gerado no login (e, devem ser passados no headers Authorization)`
- GET `/user` que retorna todos os usários cadastrados.
- GET `/user/:id` que retorna o usuário pertencente ao id passado por parâmetro.
- POST `/categories` que deve receber no body o campo `name` para o cadastro de uma nova categoria.
- GET `/categories` que retorna todas as categorias do banco de dados.
- POST `/post` que insere um novo post no banco de dados. Deve receber no body os campos `title`, `content` e um array `categoryIds` (contendo ids de categorias já cadastradas no banco de dados).
- GET `/post` que retorna todos os posts do banco de dados.
- GET `/post/:id` que retorna um post pelo id.
- PUT `/post/:id` que edita um post por id.
- DELETE `/post/:id` que deleta um post por id.
<hr></hr>
