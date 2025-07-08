# Introduction

This repository contains a project that allows you to manage access to resources

# How run it

There are two ways to run it, to run locally:
1. `npm install`
2. `npm run setup:run:dev` -> This command will create the database, run the migrations, create a prisma client and run the serve

Another way to run this is using the docker image created:
1. Go to the docker-compose.yaml file
2. Run `docker compose up`

# Project structure

The project structure is divided into the following folders:
- `src`: This folder contains the source code of the project
- `src/presentation`: This folder contains the presentation layer of the project
- `src/infra`: This folder contains the infrastructure layer of the project
- `src/modules`: This folder contains the modules layer of the project
- `src/config`: This folder contains the configuration layer of the project
- `src/errors`: This folder contains the error layer of the project
- `src/modules/users`: This folder contains the users module of the project
- `src/modules/membership`: This folder contains the membership module of the project
- `src/modules/resource-sharing`: This folder contains the resource-sharing module of the project
- `src/modules/resources`: This folder contains the resources module of the project
- `src/modules/groups`: This folder contains the groups module of the project

For each domain of the application, there is a module created, inside each module there is the logic of the domain.
In the modules the structure is divided into the following folders:
- `usecases`: This folder contains the usecases of the domain
- `repository`: This folder contains the repository of the domain
- `services`: This folder contains the services of the domain
- `validators`: This folder contains the validators of the domain
- `dtos`: This folder contains the dtos of the domain
- `entities`: This folder contains the entities of the domain.
