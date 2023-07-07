# Fastify with Knex API

This repository contains a sample API built with Fastify and Knex, demonstrating how to create a RESTful API using these technologies. The API provides endpoints for performing CRUD operations on a simple database.

## Table of Contents

- [Installation](#installation)
- [API Endpoints](#api-endpoints)

## Installation

To install and run this API on your local machine, please follow these steps:

1. Clone the repository:

```shell
git clone https://github.com/bernardocjs/fastify-with-knex-api.git
```

2. Go to the project directory:

```shell
cd fastify-with-knex-api
```

3. Install the dependencies:

```shell
npm i
```

4. Set up the environment:

```shell
cp .env.example .env
```

5. Run the migrations:

```shell
npm run knex -- migrate:latest
```

6. Start the application:

```shell
npm run dev
```

## API Endpoints

The following endpoints are available in this API:

| Method | Endpoint              | Description                     |
| ------ | --------------------- | ------------------------------- |
| GET    | /transactions         | Get all transactions from user  |
| GET    | /transactions/:id     | Get a transaction by ID         |
| POST   | /transactions         | Create a new transaction        |
| GET    | /transactions/summary | Get the summary of transactions |
