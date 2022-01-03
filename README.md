<p align="center">
  <h1>Github searcher API</h1>
</p>

## Description

- In developed feature users have right to access complete details of public repositories also users can view complete profile of a handler by using there name.

## What we want to achieve

- Users should be able to get all the public repositories with there respective details, using handler name
- Ability to get complete profile of a handler using handler name

## Prerequisite

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Setting up env files

You will be required to create an environment file and add the content in it (Similar to .env.example).

```
.env
```

## Running app with Docker

```bash
$ docker-compose up -d --build
```

## Installation

```bash
$ npm i
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## APIs

- [Postman Collection](https://www.postman.com/collections/e8835d5b8ee1349e1dcc)

## Further Improvements

- Authentication layer
- Ability to see private repositories
