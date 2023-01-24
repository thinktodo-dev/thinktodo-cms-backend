# Getting Started
Basic CMS by THINKTODO, it was developed on NestJS Framework

In general, the request lifecycle looks like the following:

1. Incoming request
2. Globally bound middleware
3. Module bound middleware
4. Global guards
5. Controller guards
6. Route guards
7. Global interceptors (pre-controller)
8. Controller interceptors (pre-controller)
9. Route interceptors (pre-controller)
10. Global pipes
11. Controller pipes
12. Route pipes
13. Route parameter pipes
14. Controller (method handler)
15. Service (if exists)
16. Route interceptor (post-request)
17. Controller interceptor (post-request)
18. Global interceptor (post-request)
19. Exception filters (route, then controller, then global)
20. Server response

[![Lifecycle Request](https://i.stack.imgur.com/2lFhd.jpg)

## Features CMS THINKTODO BACKEND
1. Support CORS
2. Support user table for login with email
3. Support bcrypt hash password
4. Support Serialization 

# Prerequisites
1. Docker and Docker Compose
2. NodeJS & NestJS
3. Database is Mysql

# Install Dev Tool
## Install TypeOrm
npm i -g typeorm
typeorm init

## CRUD API
nest g resource modules/user

# How to create migration script 
npm run typeorm:create src/migration/CreateUserTable

# How to run CMS
1. Run database and redis first
docker-compose up

2. Run CMS API
npm run start

# Rule of API Url
/{name-microservice}/{secure/{module}/{path}

Example:
/core/v1/user
/core/v1/user/:uuid

# Generate Resource

# Load lazy loading data
## using relations in query
userEntity=await this.usersRepository.findOne({where:{id:userEntity.id},relations: ["role"],})

